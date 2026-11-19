const OCR = (() => {
  let workerPromise = null;

  function available() {
    return typeof Tesseract !== "undefined";
  }

  async function getWorker() {
    if (!workerPromise) {
      workerPromise = Tesseract.createWorker("fra", 1, {
        logger: (m) => {
          if (m.status === "recognizing text" && App.currentScreen === "photo") {
            App.setOcrProgress(m.progress);
          }
        }
      });
    }
    return workerPromise;
  }

  async function recognize(file) {
    if (!available()) {
      throw new Error("Die Texterkennung konnte nicht geladen werden. Bist du mit dem Internet verbunden?");
    }
    const worker = await getWorker();
    const result = await worker.recognize(file);
    return result.data.text;
  }

  const GERMAN_MARKERS = [
    "der ", "die ", "das ", "ein ", "eine ", "ich ", "du ", "nicht ", "ist ", "und ",
    "sein", "haben", "ändern", "werden", "mit ", "nach ", "heute", "morgen", "gestern",
    "schön", "klein", "groß", "guten", "gute", "haben", "sein"
  ];
  const FRENCH_MARKERS = [
    "le ", "la ", "les ", "un ", "une ", "des ", "je ", "tu ", "il ", "elle ", "être",
    "avoir", "c'est", "qu'", "d'", "l'", "mon ", "ma ", "mes ", "ce ", "cette ",
    "faire", "aller", "s'il", "à ", "aux"
  ];

  function scoreLanguage(s, markers) {
    const lower = " " + s.toLowerCase() + " ";
    let score = 0;
    for (const m of markers) if (lower.includes(m)) score++;
    if (/[äöüß]/.test(lower)) score += 2;
    if (/[àâçéèêëîïôùûœ]/.test(lower)) score += 1;
    return score;
  }

  function parseLines(text) {
    const out = [];
    const lines = text.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (line.length < 3) continue;
      let split = null;
      const seps = [/\s*=\s*/, /\t+/, /\s+[-–—]\s+/, /\s*:\s+/, / {2,}/];
      for (const sep of seps) {
        const parts = line.split(sep);
        if (parts.length === 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0) {
          split = parts;
          break;
        }
        if (parts.length > 2) {
          const first = parts[0].trim();
          const rest = parts.slice(1).join(" ").trim();
          if (first.length > 0 && rest.length > 0) {
            split = [first, rest];
            break;
          }
        }
      }
      if (!split) continue;
      let left = split[0].trim().replace(/\s+/g, " ");
      let right = split[1].trim().replace(/\s+/g, " ").replace(/[.,;]+$/, "");
      if (left.length < 1 || right.length < 1 || left === right) continue;
      if (scoreLanguage(left, FRENCH_MARKERS) - scoreLanguage(left, GERMAN_MARKERS) >= 2 &&
          scoreLanguage(right, GERMAN_MARKERS) > scoreLanguage(right, FRENCH_MARKERS)) {
        [left, right] = [right, left];
      }
      out.push({ de: left, fr: right, raw: line });
    }
    return out;
  }

  return { recognize, parseLines, available };
})();
