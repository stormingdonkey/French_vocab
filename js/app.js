const SKEY = "vokifranz-v1";
const XP_PER_CORRECT = 10;
const PERFECT_BONUS = 20;

function defaultState() {
  return { xp: 0, streak: { n: 0, last: null }, completed: {}, stats: {}, custom: [] };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SKEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) {}
  return defaultState();
}

function saveState() {
  localStorage.setItem(SKEY, JSON.stringify(App.state));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function wordStat(id) {
  return App.state.stats[id] || { s: 0, r: 0, w: 0 };
}

function norm(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ").replace(/[.!?]+$/g, "").replace(/[’‘]/g, "'");
}

function looseMatch(a, b) {
  const strip = (s) => norm(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 /']/g, "");
  const pa = a.split("/").map((p) => strip(p)).filter(Boolean);
  const pb = b.split("/").map((p) => strip(p)).filter(Boolean);
  return pa.some((x) => x && pb.includes(x)) || strip(a) === strip(b);
}

function lessonWords(lessonId) {
  if (lessonId === "custom") {
    return App.state.custom.map((c) => ({ id: c.id, fr: c.fr, de: c.de, lessonId: "custom", grade: 0, custom: true }));
  }
  return ALL_WORDS.filter((w) => w.lessonId === lessonId);
}

function allLessonIds() {
  return LESSONS.map((l) => l.id).concat(["custom"]);
}

function lessonUnlocked(lessonId) {
  const ids = LESSONS.map((l) => l.id);
  if (lessonId === "custom") {
    return App.state.custom.length > 0;
  }
  const idx = ids.indexOf(lessonId);
  if (idx <= 0) return true;
  return !!App.state.completed[ids[idx - 1]];
}

function lessonAvgMastery(lessonId) {
  const words = lessonWords(lessonId);
  if (!words.length) return 0;
  const total = words.reduce((sum, w) => sum + wordStat(w.id).s, 0);
  return total / words.length;
}

const App = {
  state: loadState(),
  currentScreen: "home",
  session: null,
  reviewData: [],

  setOcrProgress(p) {
    const bar = document.getElementById("ocr-progress");
    if (bar) {
      bar.style.display = "block";
      bar.querySelector("div").style.width = Math.round(p * 100) + "%";
    }
  },

  navigate(hash) {
    location.hash = hash;
  },

  route() {
    const hash = location.hash || "#/home";
    const parts = hash.slice(2).split("/");
    const [name, arg] = parts;
    saveState();
    if (name === "lesson" && arg) this.screenLesson(arg);
    else if (name === "practice") this.startSession(arg === "custom" ? "custom" : "practice", arg === "custom" ? "custom" : null);
    else if (name === "photo") this.screenPhoto();
    else if (name === "reuse") this.screenReview();
    else if (name === "words") this.screenWords();
    else if (name === "result") this.screenResult();
    else this.screenHome();
  },

  updateHeader() {
    const xp = document.getElementById("xp-value");
    const st = document.getElementById("streak-value");
    if (xp) xp.textContent = this.state.xp;
    if (st) st.textContent = this.state.streak.n;
  },

  updateStreak() {
    const today = todayStr();
    const s = this.state.streak;
    if (s.last === today) return;
    const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    s.n = s.last === yest ? s.n + 1 : 1;
    s.last = today;
  },

  startSession(mode, lessonId) {
    let pool = [];
    let title = "";
    if (mode === "lesson") {
      pool = lessonWords(lessonId);
      const lesson = LESSONS.find((l) => l.id === lessonId);
      title = lesson ? lesson.emoji + " " + lesson.title : "Lektion";
    } else if (mode === "custom") {
      pool = lessonWords("custom");
      title = "📄 Meine Vokabeln";
    } else {
      const seen = ALL_WORDS.concat(lessonWords("custom")).filter((w) => w.custom || wordStat(w.id).s > 0 || wordStat(w.id).w > 0);
      if (seen.length < 2) {
        this.session = null;
        alert("Du brauchst mindestens ein paar gelernte Wörter, um zu üben. Starte zuerst eine Lektion!");
        return;
      }
      const weighted = [];
      for (const w of seen) {
        const st = wordStat(w.id);
        const weight = Math.max(1, 6 - st.s) + (st.w > st.r ? 3 : 0);
        for (let i = 0; i < weight; i++) weighted.push(w);
      }
      const picked = [];
      const usedIds = new Set();
      while (picked.length < 10 && picked.length < seen.length) {
        const w = weighted[Math.floor(Math.random() * weighted.length)];
        if (!usedIds.has(w.id)) {
          usedIds.add(w.id);
          picked.push(w);
        }
        if (weighted.length > 5000) break;
      }
      pool = picked;
      title = "🔁 Üben";
    }
    if (pool.length < 2) {
      this.session = null;
      alert("Für diese Übung brauchst du mindestens 2 Vokabeln.");
      return;
    }
    const exercises = [];
    const queue = pool.slice();
    for (let round = 0; round < 2 && queue.length; round++) {
      shuffle(queue);
      for (const w of queue) {
        if (exercises.length >= 12) break;
        const type = round === 0 ? (Math.random() < 0.5 ? "choice-de-fr" : "choice-fr-de") : (Math.random() < 0.4 ? "type-de-fr" : (Math.random() < 0.5 ? "choice-de-fr" : "choice-fr-de"));
        exercises.push(this.makeExercise(w, type, pool));
      }
      if (exercises.length >= 12) break;
    }
    shuffle(exercises);
    this.session = { mode, lessonId, title, exercises, index: 0, correct: 0, answered: false, xpGain: 0 };
    this.currentScreen = "session";
    this.renderExercise();
  },

  makeExercise(word, type, pool) {
    const others = pool.filter((w) => w.id !== word.id);
    shuffle(others);
    const options = others.slice(0, 3).map((w) => ({ fr: w.fr, de: w.de }));
    const correctIdx = Math.floor(Math.random() * (options.length + 1));
    options.splice(correctIdx, 0, { fr: word.fr, de: word.de });
    return { word, type, options, correctIdx };
  },

  renderExercise() {
    const s = this.session;
    const ex = s.exercises[s.index];
    const root = document.getElementById("app");
    this.currentScreen = "session";
    root.innerHTML = `
      <div class="session-head">
        <a class="close-btn" href="#/home" title="Beenden">✕</a>
        <div class="bar"><div style="width:${(s.index / s.exercises.length) * 100}%"></div></div>
        <span class="session-count">${s.index + 1}/${s.exercises.length}</span>
      </div>
      <h2 class="prompt">${ex.type === "choice-fr-de" ? "Was bedeutet" : "Wie sagt man"} „${ex.type === "choice-fr-de" ? ex.word.fr : ex.word.de}“${ex.type === "choice-fr-de" ? "?" : " auf Französisch?"}</h2>
      <div id="options" class="options"></div>
      <div id="feedback" class="feedback"></div>
      <div id="controls" class="controls"></div>
    `;
    const opts = document.getElementById("options");
    if (ex.type.startsWith("choice")) {
      const field = ex.type === "choice-fr-de" ? "de" : "fr";
      ex.options.forEach((o, i) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = o[field];
        btn.onclick = () => this.answer(i === ex.correctIdx, ex, btn);
        opts.appendChild(btn);
      });
    } else {
      const input = document.createElement("input");
      input.className = "type-input";
      input.placeholder = "Französisch eingeben ...";
      input.autocomplete = "off";
      input.autocapitalize = "off";
      input.spellcheck = false;
      input.onkeydown = (e) => {
        if (e.key === "Enter" && !s.answered) this.checkTyped(ex, input);
        else if (e.key === "Enter" && s.answered) this.nextExercise();
      };
      opts.appendChild(input);
      setTimeout(() => input.focus(), 30);
    }
    const ctrl = document.getElementById("controls");
    if (ex.type.startsWith("type")) {
      const btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.id = "check-btn";
      btn.textContent = "Prüfen";
      btn.onclick = () => {
        const input = document.querySelector(".type-input");
        if (!s.answered) this.checkTyped(ex, input);
        else this.nextExercise();
      };
      ctrl.appendChild(btn);
    } else {
      ctrl.appendChild(document.createElement("div"));
    }
    this.updateHeader();
  },

  checkTyped(ex, input) {
    const val = input.value.trim();
    if (!val) return;
    this.answer(looseMatch(val, ex.word.fr), ex, input);
  },

  answer(correct, ex, el) {
    const s = this.session;
    if (s.answered) return;
    s.answered = true;
    const st = App.state.stats[ex.word.id] || { s: 0, r: 0, w: 0 };
    if (correct) {
      st.s = Math.min(5, st.s + 1);
      st.r++;
      s.correct++;
      s.xpGain += XP_PER_CORRECT;
    } else {
      st.s = Math.max(0, st.s - 1);
      st.w++;
    }
    App.state.stats[ex.word.id] = st;
    const fb = document.getElementById("feedback");
    fb.classList.add(correct ? "good" : "bad");
    fb.innerHTML = correct
      ? "✅ Richtig!"
      : `❌ Fast! Richtig ist: <b>${ex.word.fr}</b> – <b>${ex.word.de}</b>`;
    document.querySelectorAll(".option").forEach((btn, i) => {
      btn.disabled = true;
      if (i === ex.correctIdx) btn.classList.add("correct");
      else if (btn === el) btn.classList.add("wrong");
    });
    const typed = document.querySelector(".type-input");
    if (typed) {
      typed.disabled = true;
      if (!correct) typed.value = ex.word.fr;
    }
    let check = document.getElementById("check-btn");
    if (!check) {
      check = document.createElement("button");
      check.className = "btn btn-primary";
      document.getElementById("controls").replaceChildren(check);
    }
    check.textContent = "Weiter";
    check.onclick = () => this.nextExercise();
    this.updateHeader();
  },

  nextExercise() {
    const s = this.session;
    s.index++;
    s.answered = false;
    if (s.index >= s.exercises.length) this.finishSession();
    else this.renderExercise();
  },

  finishSession() {
    const s = this.session;
    const acc = s.correct / s.exercises.length;
    if (acc === 1) s.xpGain += PERFECT_BONUS;
    this.state.xp += s.xpGain;
    if (s.mode === "lesson" && acc >= 0.8) this.state.completed[s.lessonId] = true;
    this.updateStreak();
    saveState();
    this.navigate("#/result");
  },

  screenResult() {
    const s = this.session || { correct: 0, exercises: [], xpGain: 0, mode: "practice", lessonId: null };
    const acc = Math.round((s.correct / Math.max(1, s.exercises.length)) * 100);
    const passed = acc >= 80;
    this.currentScreen = "result";
    document.getElementById("app").innerHTML = `
      <div class="result">
        <div class="result-emoji">${passed ? "🎉" : "💪"}</div>
        <h2>${passed ? "Gut gemacht!" : "Weiter üben!"}</h2>
        <p>${s.correct} von ${s.exercises.length} richtig (${acc} %)</p>
        <p class="xp-big">+${s.xpGain} XP</p>
        <div class="result-actions">
          <a class="btn btn-primary" href="#/home">Weiter</a>
          <button class="btn btn-ghost" id="again-btn">Nochmal</button>
        </div>
      </div>
    `;
    document.getElementById("again-btn").onclick = () => {
      if (s.mode === "lesson") this.navigate("#/lesson/" + s.lessonId);
      else if (s.mode === "custom") this.navigate("#/practice/custom");
      else this.navigate("#/practice");
    };
    this.updateHeader();
  },

  screenHome() {
    this.currentScreen = "home";
    const seenCount = ALL_WORDS.concat(lessonWords("custom")).filter((w) => wordStat(w.id).s > 0).length;
    const section = (grade, label) => {
      const items = LESSONS.filter((l) => l.grade === grade).map((lesson) => {
        const unlocked = lessonUnlocked(lesson.id);
        const done = !!this.state.completed[lesson.id];
        const m = lessonAvgMastery(lesson.id);
        const starCount = Math.round(m / 2);
        let badge;
        if (!unlocked) badge = `<span class="lock">🔒</span>`;
        else if (done) badge = `<span class="stars">${"★".repeat(starCount)}${"☆".repeat(3 - starCount)}</span>`;
        else badge = `<span class="start-label">Start</span>`;
        return `
          <a class="lesson-row ${unlocked ? "" : "locked"}" href="${unlocked ? "#/lesson/" + lesson.id : "#"}" ${unlocked ? "" : 'onclick="return false;"'}>
            <span class="lesson-emoji">${lesson.emoji}</span>
            <span class="lesson-text">
              <span class="lesson-title">${lesson.title}</span>
              <span class="lesson-sub">${lesson.subtitle} · ${lesson.words.length} Wörter</span>
            </span>
            ${badge}
          </a>`;
      });
      return `<h3 class="grade-label">${label}</h3><div class="lesson-list">${items.join("")}</div>`;
    };
    const practiceReady = seenCount >= 4;
    const customCount = this.state.custom.length;
    document.getElementById("app").innerHTML = `
      <div class="activities">
        <div class="activity-card photo-card" onclick="App.navigate('#/photo')">
          <span class="ac-emoji">📷</span>
          <span><b>Vokabeln per Foto</b><br>Karte abfotografieren, App liest die Wörter ein</span>
        </div>
        <div class="activity-card practice-card ${practiceReady ? "" : "disabled"}" onclick="${practiceReady ? "App.navigate('#/practice')" : "App.toast('Erst ein paar Wörter lernen, dann kannst du hier üben!')"};return false;">
          <span class="ac-emoji">🔁</span>
          <span><b>Üben</b><br>${practiceReady ? "Gelernte Wörter gemischt wiederholen" : "Verfügbar, sobald du Wörter gelernt hast"}</span>
        </div>
        <div class="activity-card custom-card ${customCount ? "" : "disabled"}" onclick="${customCount ? "App.navigate('#/words')" : "App.toast('Noch keine eigenen Vokabeln – nutze 📷');"};return false;">
          <span class="ac-emoji">📄</span>
          <span><b>Meine Vokabeln</b><br>${customCount ? customCount + " eigene Vokabeln · üben ansehen" : "Noch keine eigenen Vokabeln"}</span>
        </div>
      </div>
      <div id="toast" class="toast"></div>
      ${section(6, "6. Klasse · A1")}
      ${customCount ? `
      <h3 class="grade-label">Meine Vokabeln</h3>
      <div class="lesson-list">
        <a class="lesson-row" href="#/practice/custom">
          <span class="lesson-emoji">📄</span>
          <span class="lesson-text">
            <span class="lesson-title">Fotografierte Vokabeln üben</span>
            <span class="lesson-sub">${customCount} eigene Vokabeln</span>
          </span>
          <span class="start-label">Start</span>
        </a>
      </div>` : ""}
      ${section(7, "7. Klasse · A1 weiterführend")}
    `;
    this.updateHeader();
  },

  toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2600);
  },

  screenLesson(lessonId) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (lesson) this.startSession("lesson", lessonId);
    else this.screenHome();
  },

  screenPhoto() {
    this.currentScreen = "photo";
    document.getElementById("app").innerHTML = `
      <div class="photo-screen">
        <h2>📷 Vokabeln per Foto</h2>
        <p class="hint">Fotografiere deine Vokabelliste (z.&nbsp;B. aus dem Heft). Format: <b>deutsch = französisch</b> – auch Trennstriche oder Doppelpunkte funktionieren.</p>
        <label class="btn btn-primary camera-btn">
          Foto aufnehmen / Bild wählen
          <input type="file" id="photo-input" accept="image/*" capture="environment" hidden>
        </label>
        <div id="ocr-progress" class="bar ocr-bar" style="display:none"><div></div></div>
        <div id="ocr-status" class="hint"></div>
        <div id="ocr-preview" class="preview"></div>
      </div>
      <div id="toast" class="toast"></div>
    `;
    document.getElementById("photo-input").onchange = (e) => {
      const file = e.target.files[0];
      if (file) this.handlePhoto(file);
    };
  },

  async handlePhoto(file) {
    const status = document.getElementById("ocr-status");
    const preview = document.getElementById("ocr-preview");
    const prog = document.getElementById("ocr-progress");
    prog.style.display = "block";
    prog.querySelector("div").style.width = "10%";
    status.textContent = "Bild wird erkannt ... (einen Moment gedulden)";
    preview.innerHTML = "";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
    try {
      const text = await OCR.recognize(file);
      const pairs = OCR.parseLines(text);
      prog.style.display = "none";
      if (!pairs.length) {
        status.textContent = "Ich konnte keine Vokabeln erkennen. Versuche ein schärferes, helles Foto mit klaren Trennzeichen (=, – oder :).";
        return;
      }
      this.reviewData = pairs;
      status.textContent = "";
      this.screenReview();
    } catch (err) {
      prog.style.display = "none";
      status.textContent = err.message || "Fehler bei der Texterkennung.";
    }
  },

  screenReview() {
    this.currentScreen = "reuse";
    const pairs = this.reviewData;
    document.getElementById("app").innerHTML = `
      <div class="review-screen">
        <h2>Wörter prüfen</h2>
        <p class="hint">Kontrolliere die erkannten Vokabeln. Tippen zum Korrigieren, Pfeil = Seiten tauschen.</p>
        <div id="review-list"></div>
        <div class="review-actions">
          <button class="btn btn-primary" id="save-review">Alle Speichern</button>
          <a class="btn btn-ghost" href="#/photo">Abbrechen</a>
        </div>
      </div>
      <div id="toast" class="toast"></div>
    `;
    const list = document.getElementById("review-list");
    pairs.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "review-row";
      row.innerHTML = `
        <input class="de-input" value="">
        <button class="swap-btn" title="Seiten tauschen">⇄</button>
        <input class="fr-input" value="">
        <button class="del-btn" title="Löschen">🗑</button>
      `;
      row.querySelector(".de-input").value = p.de;
      row.querySelector(".fr-input").value = p.fr;
      row.querySelector(".swap-btn").onclick = () => {
        const d = row.querySelector(".de-input");
        const f = row.querySelector(".fr-input");
        const tmp = d.value;
        d.value = f.value;
        f.value = tmp;
      };
      row.querySelector(".del-btn").onclick = () => row.remove();
      list.appendChild(row);
    });
    document.getElementById("save-review").onclick = () => this.saveReview();
    this.updateHeader();
  },

  saveReview() {
    const rows = document.querySelectorAll(".review-row");
    let added = 0;
    let skipped = 0;
    rows.forEach((row) => {
      const de = row.querySelector(".de-input").value.trim();
      const fr = row.querySelector(".fr-input").value.trim();
      if (!de || !fr) return;
      const id = wordId(fr, de);
      if (App.state.custom.some((c) => c.id === id) || ALL_WORDS.some((w) => w.id === id)) {
        skipped++;
        return;
      }
      App.state.custom.push({ id, fr, de });
      added++;
    });
    saveState();
    this.reviewData = [];
    this.navigate("#/home");
    setTimeout(() => this.toast(`${added} Vokabeln hinzugefügt${skipped ? `, ${skipped} Duplikate übersprungen` : ""}`), 100);
  },

  screenWords() {
    this.currentScreen = "words";
    const words = this.state.custom;
    document.getElementById("app").innerHTML = `
      <div class="words-screen">
        <h2>📄 Meine Vokabeln</h2>
        <p class="hint">${words.length} eigene Vokabeln. Sie werden in <a href="#/practice/custom">eigenen Übungssitzungen</a> und beim gemischten Üben mitgefragt.</p>
        <div class="word-list">
          ${words.length ? words.map((w) => {
            const st = wordStat(w.id);
            return `<div class="word-row">
              <span class="word-pair"><b>${w.de}</b> – ${w.fr}</span>
              <span class="word-mastery">${"●".repeat(st.s)}${"○".repeat(5 - st.s)}</span>
              <button class="del-btn" data-id="${w.id}" title="Löschen">🗑</button>
            </div>`;
          }).join("") : "<p class='hint'>Noch keine Vokabeln. Nutze 📷 auf der Startseite.</p>"}
        </div>
        <div class="review-actions">
          <a class="btn btn-primary" href="#/photo">📷 Mehr hinzufügen</a>
          <a class="btn btn-ghost" href="#/home">Zurück</a>
        </div>
      </div>
      <div id="toast" class="toast"></div>
    `;
    document.querySelectorAll(".del-btn[data-id]").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        this.state.custom = this.state.custom.filter((c) => c.id !== id);
        delete this.state.stats[id];
        saveState();
        this.screenWords();
      };
    });
    this.updateHeader();
  }
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

window.addEventListener("hashchange", () => App.route());
App.route();
