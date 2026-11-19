const GRAMMAR = [
  {
    id: "g1",
    title: "Artikel & Plural",
    level: "A1",
    emoji: "📘",
    explain: "Französische Nomen haben ein Geschlecht. Bestimmte Artikel: <b>le</b> (m), <b>la</b> (f), <b>l'</b> vor Vokal, <b>les</b> (Plural). Unbestimmte: <b>un</b> (m), <b>une</b> (f), <b>des</b> (Plural). Im Plural hängt man meist ein <b>-s</b> an: le livre → les livres.",
    exercises: [
      { sentence: "___ livre (das Buch)", options: ["le", "la", "les", "une"], c: 0, why: "livre ist männlich → le livre." },
      { sentence: "___ maison (das Haus)", options: ["le", "la", "les", "une"], c: 1, why: "maison ist weiblich → la maison." },
      { sentence: "___ ami (der Freund)", options: ["le", "la", "l'", "les"], c: 2, why: "Vor Vokal wird le/la zu l' → l'ami." },
      { sentence: "un livre → ___ (Plural)", options: ["des livres", "les livres", "des livre", "du livres"], c: 0, why: "Unbestimmter Artikel im Plural: des + Nomen + s → des livres." },
      { sentence: "J'ai ___ sœur (eine Schwester).", options: ["un", "une", "des", "le"], c: 1, why: "sœur ist weiblich, unbestimmt → une sœur." },
      { sentence: "___ profs (die Lehrer)", options: ["les", "le", "la", "l'"], c: 0, why: "Plural → les profs." }
    ]
  },
  {
    id: "g2",
    title: "être & avoir",
    level: "A1",
    emoji: "📘",
    explain: "Die zwei wichtigsten Verben im Präsens. <b>être</b> (sein): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. <b>avoir</b> (haben): j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
    exercises: [
      { sentence: "Nous ___ élèves.", options: ["sommes", "sont", "est", "avez"], c: 0, why: "nous → sommes." },
      { sentence: "Elle ___ un frère.", options: ["a", "as", "est", "ont"], c: 0, why: "elle → a (haben)." },
      { sentence: "Vous ___ grands.", options: ["êtes", "es", "sont", "sommes"], c: 0, why: "vous → êtes." },
      { sentence: "J'___ quinze ans.", options: ["ai", "a", "suis", "as"], c: 0, why: "Das Alter steht bei avoir: avoir ... ans." },
      { sentence: "Ils ___ fatigués.", options: ["sont", "ont", "est", "avez"], c: 0, why: "ils → sont." },
      { sentence: "Tu ___ raison.", options: ["as", "es", "a", "ont"], c: 0, why: "avoir raison = recht haben → tu as raison." }
    ]
  },
  {
    id: "g3",
    title: "Verben auf -er",
    level: "A1",
    emoji: "📘",
    explain: "Regelmäßige Verben auf <b>-er</b> (parler): Stamm + <b>-e, -es, -e, -ons, -ez, -ent</b>. Nur -ons und -ez hört man – die restlichen Endungen sind stumm.",
    exercises: [
      { sentence: "Je ___ français. (parler)", options: ["parle", "parles", "parlent", "parlons"], c: 0, why: "je → parle." },
      { sentence: "Nous ___ la géographie. (étudier)", options: ["étudions", "étudiez", "étudient", "étudie"], c: 0, why: "nous → -ons: étudions." },
      { sentence: "Vous ___ au foot. (jouer)", options: ["jouez", "jouons", "jouent", "joues"], c: 0, why: "vous → -ez: jouez." },
      { sentence: "Elles ___ la télé. (regarder)", options: ["regardent", "regarde", "regardons", "regardez"], c: 0, why: "ils/elles → -ent (stumm)." },
      { sentence: "Tu ___ beaucoup. (travailler)", options: ["travailles", "travaille", "travaillent", "travaillons"], c: 0, why: "tu → -es." },
      { sentence: "On ___ une pizza. (manger)", options: ["mange", "manges", "mangeons", "mangent"], c: 0, why: "on = er/sie/es → mange." }
    ]
  },
  {
    id: "g4",
    title: "Negation & Fragen",
    level: "A1",
    emoji: "📘",
    explain: "Verneinung: <b>ne ... pas</b> umschließt das konjugierte Verb: je <b>ne</b> mange <b>pas</b>. Vor Vokal: n'. Fragen: mit <b>Est-ce que</b> + Aussagesatz oder nur mit Fragetöne: Tu aimes le chocolat ?",
    exercises: [
      { sentence: "Je ne mange ___ de viande.", options: ["pas", "plus", "rien", "jamais"], c: 0, why: "nicht = ne ... pas." },
      { sentence: "___ tu aimes le chocolat ?", options: ["Est-ce que", "Qu'est-ce que", "Où est-ce", "Pourquoi"], c: 0, why: "Ja/Nein-Frage: Est-ce que + Satz." },
      { sentence: "Elle n'___ pas de frère.", options: ["a", "est", "as", "ont"], c: 0, why: "Verneinung bei avoir: elle n'a pas." },
      { sentence: "Tu ___ allemand ? (Sprichst du Deutsch?)", options: ["parles", "parle", "parlent", "parlons"], c: 0, why: "Frage durch Tonhöhe, Wortstellung bleibt: tu parles ?" },
      { sentence: "Ils ne ___ pas de temps. (haben keine Zeit)", options: ["ont", "sont", "avez", "a"], c: 0, why: "avoir → ils n'ont pas." },
      { sentence: "«___ tu fais ?» (Was machst du?)", options: ["Qu'est-ce que", "Quoi", "Quel", "Qui"], c: 0, why: "Was = Qu'est-ce que: Qu'est-ce que tu fais ?" }
    ]
  },
  {
    id: "g5",
    title: "Passé composé",
    level: "A2",
    emoji: "📗",
    explain: "Vergangenheit: <b>avoir/être im Präsens + Partizip</b>. Partizip: -er → é (parlé), -ir → i (fini), -re → u (vendu). Mit <b>être</b>: Bewegungsverben (aller, venir, partir, entrer ...) und alle Reflexivverben – dann passt sich das Partizip an: elle est all<b>e</b>.",
    exercises: [
      { sentence: "J'___ mangé une pizza.", options: ["ai", "suis", "a", "es"], c: 0, why: "manger bildet das PC mit avoir → j'ai mangé." },
      { sentence: "Elle ___ allée à Paris.", options: ["est", "a", "ont", "es"], c: 0, why: "aller → être; weiblich: allée." },
      { sentence: "Nous avons ___ (finir).", options: ["fini", "finé", "finits", "finu"], c: 0, why: "-ir → i: fini." },
      { sentence: "Ils sont ___ (partir).", options: ["partis", "partés", "parti", "partu"], c: 0, why: "Mit être: ils → partis." },
      { sentence: "Tu as ___ (boire).", options: ["bu", "boiré", "bui", "boi"], c: 0, why: "boire → bu." },
      { sentence: "Je me ___ levé(e).", options: ["suis", "ai", "a", "est"], c: 0, why: "Reflexivverben → être: je me suis levé(e)." }
    ]
  },
  {
    id: "g6",
    title: "Imparfait",
    level: "A2",
    emoji: "📗",
    explain: "Das Imparfait beschreibt die Vergangenheit (Gewohnheiten, Zustand, Umgebung). Bildung: Stamm der <b>nous</b>-Form im Präsens + <b>-ais, -ais, -ait, -ions, -iez, -aient</b> (nous parlons → je parlais). Beispiel: Quand j'étais petit, je jouais au foot.",
    exercises: [
      { sentence: "Quand j'étais petit, je ___ souvent au parc. (jouer)", options: ["jouais", "joue", "jouait", "jouiez"], c: 0, why: "nous jouons → jou- + ais." },
      { sentence: "Il ___ très gentil. (être)", options: ["était", "est", "étions", "étaient"], c: 0, why: "être unregelmäßig: j'étais, tu étais, il était ..." },
      { sentence: "Nous ___ au bord de la mer. (habiter)", options: ["habitions", "habitaient", "habitait", "habitiez"], c: 0, why: "nous habitons → habit- + ions." },
      { sentence: "Vous ___ quoi hier soir ? (faire)", options: ["faisiez", "faites", "faisaient", "faisions"], c: 0, why: "vous faites → fais- + iez." },
      { sentence: "Elles ___ fatiguées. (être)", options: ["étaient", "étions", "étiez", "seront"], c: 0, why: "être → ils/elles étaient." },
      { sentence: "Le soleil ___. (briller)", options: ["brillait", "brille", "brilliez", "brillons"], c: 0, why: "nous brillons → brill- + ait." }
    ]
  },
  {
    id: "g7",
    title: "Futur proche & futur simple",
    level: "A2",
    emoji: "📗",
    explain: "Zwei Zukünfte: <b>Futur proche</b> = aller + Infinitiv (je vais partir – nahes Geplantes). <b>Futur simple</b> = Infinitiv + -ai, -as, -a, -ons, -ez, -ont (je parlerai). Unregelmäßige Stämme: être → ser-, avoir → aur-, aller → ir-, faire → fer-.",
    exercises: [
      { sentence: "Je ___ partir demain. (futur proche)", options: ["vais", "va", "irai", "suis"], c: 0, why: "futur proche: aller + Infinitiv → je vais partir." },
      { sentence: "Demain, il ___ beau temps. (faire)", options: ["fera", "fait", "ferait", "feras"], c: 0, why: "faire → fer- + a: il fera." },
      { sentence: "Nous ___ bientôt quinze ans. (avoir)", options: ["aurons", "avons", "serons", "irons"], c: 0, why: "avoir → aur- + ons: nous aurons." },
      { sentence: "Vous ___ à la fête ce soir. (aller, futur proche)", options: ["allez", "irez", "vont", "iront"], c: 0, why: "futur proche: vous allez + Infinitiv." },
      { sentence: "Les élèves ___ beaucoup de devoirs. (avoir)", options: ["auront", "ont", "seront", "iront"], c: 0, why: "avoir → ils/elles auront." },
      { sentence: "Elle ___ à Paris l'année prochaine. (être)", options: ["sera", "est", "aura", "sont"], c: 0, why: "être → ser- + a: elle sera." }
    ]
  },
  {
    id: "g8",
    title: "Objektpronomen le, la, les, lui, leur",
    level: "A2",
    emoji: "📗",
    explain: "Direkte Objekte ersetzen <b>le/la/les</b>, indirekte Objekte (mit à) ersetzen <b>lui</b> (Singular) und <b>leur</b> (Plural). Das Pronomen steht direkt vor dem konjugierten Verb: Tu vois Marie ? — Je <b>la</b> vois.",
    exercises: [
      { sentence: "Tu vois Marie ? — Oui, je ___ vois.", options: ["la", "le", "lui", "les"], c: 0, why: "voir quelqu'un = direktes Objekt → la." },
      { sentence: "Tu parles à ton frère ? — Oui, je ___ parle.", options: ["lui", "le", "leur", "la"], c: 0, why: "parler à quelqu'un = indirekt → lui (Sing.)." },
      { sentence: "On adore les croissants — on ___ adore.", options: ["les", "le", "lui", "la"], c: 0, why: "Plural, direkt → les." },
      { sentence: "Il téléphone à ses parents ? — Il ___ téléphone.", options: ["leur", "lui", "les", "la"], c: 0, why: "indirekt, Plural → leur." },
      { sentence: "Tu manges la pomme ? — Je ___ mange.", options: ["la", "le", "lui", "les"], c: 0, why: "manger quelque chose = direkt → la." },
      { sentence: "J'écris à mes amis — je ___ écris.", options: ["leur", "lui", "les", "la"], c: 0, why: "écrire à quelqu'un = indirekt, Plural → leur." }
    ]
  },
  {
    id: "g9",
    title: "Conditionnel",
    level: "B1",
    emoji: "📙",
    explain: "Futurstamm + Imparfait-Endungen (-ais, -ais, -ait, -ions, -iez, -aient). Für Wünsche und Höflichkeit (je voudrais, pourriez-vous ...) und für si-Sätze: <b>Si + imparfait → conditionnel</b> (Si j'avais du temps, je ferais du sport).",
    exercises: [
      { sentence: "Je ___ un croissant, s'il vous plaît. (vouloir)", options: ["voudrais", "veux", "voulais", "voudrai"], c: 0, why: "Höflichkeit: vouloir → voudrais." },
      { sentence: "Si j'avais du temps, je ___ plus de sport. (faire)", options: ["ferais", "faisais", "ferai", "fasse"], c: 0, why: "Si + imparfait → conditionnel: fera- + ais." },
      { sentence: "___ -tu m'aider ? (pouvoir)", options: ["Pourrais", "Peux", "Pouvais", "Pourrai"], c: 0, why: "Höfliche Bitte: pourrais-tu ... ?" },
      { sentence: "Nous ___ voyager en Italie. (aimer)", options: ["aimerions", "aimions", "aimerons", "aimerais"], c: 0, why: "aimer- + ions: nous aimerions." },
      { sentence: "À ta place, je ___ ce livre. (lire)", options: ["lirais", "lisais", "lirai", "lise"], c: 0, why: "lire → lir- + ais." },
      { sentence: "À ta place, tu ___ lui dire la vérité. (devoir)", options: ["devrais", "dois", "devais", "devras"], c: 0, why: "Ratschlag: devoir → devrais." }
    ]
  },
  {
    id: "g10",
    title: "Subjonctif – Grundlagen",
    level: "B1",
    emoji: "📙",
    explain: "Bildung: Stamm der <b>ils</b>-Form im Präsens + <b>-e, -es, -e, -ions, -iez, -ent</b> (ils finissent → que je finisse). Unregelmäßig: être → que je sois, avoir → que j'aie, aller → que j'aille, faire → que je fasse. Nach Ausdrücken von Notwendigkeit/Wunsch/Gefühl mit <b>que</b>: il faut que, je veux que, bien que.",
    exercises: [
      { sentence: "Il faut que tu ___ tes devoirs. (finir)", options: ["finisses", "finis", "finiras", "finirais"], c: 0, why: "ils finissent → finiss- + es." },
      { sentence: "Je veux que tu ___ à l'heure. (être)", options: ["sois", "es", "soit", "seras"], c: 0, why: "être unregelmäßig: que je sois, que tu sois." },
      { sentence: "Bien qu'il ___ froid, on sort. (faire)", options: ["fasse", "fait", "fera", "ferait"], c: 0, why: "bien que + subjonctif: qu'il fasse." },
      { sentence: "Il faut que nous ___ tôt. (partir)", options: ["partions", "partons", "partirons", "partaient"], c: 0, why: "ils partent → part- + ions." },
      { sentence: "Je suis content(e) que vous ___. (venir)", options: ["veniez", "venez", "viendrez", "viennes"], c: 0, why: "ils viennent → ven- + iez." },
      { sentence: "Il faut que j'y ___. (aller)", options: ["aille", "vais", "ira", "irai"], c: 0, why: "aller unregelmäßig: que j'aille." }
    ]
  },
  {
    id: "g11",
    title: "Relativpronomen qui, que, dont, où",
    level: "B1",
    emoji: "📙",
    explain: "<b>qui</b> = Subjekt (der Mann, der spricht), <b>que</b> = Objekt (das Buch, das ich lese), <b>dont</b> = ersetzt de + etwas (parler de ...), <b>où</b> = Ort/Zeit (die Stadt, in der ...).",
    exercises: [
      { sentence: "L'homme ___ parle est mon professeur.", options: ["qui", "que", "dont", "où"], c: 0, why: "Subjekt des Nebensatzes → qui." },
      { sentence: "Le livre ___ je lis est fascinant.", options: ["que", "qui", "dont", "où"], c: 0, why: "Objekt (je le lis) → que." },
      { sentence: "Le village ___ il est né est petit.", options: ["où", "que", "dont", "qui"], c: 0, why: "Ort → où." },
      { sentence: "Le sujet ___ elle a parlé est intéressant.", options: ["dont", "que", "qui", "où"], c: 0, why: "parler de → dont." },
      { sentence: "Les amis ___ j'attends sont en retard.", options: ["que", "dont", "qui", "où"], c: 0, why: "attendre quelqu'un (Objekt) → que." },
      { sentence: "Le copain ___ je joue au tennis est sympa.", options: ["avec qui", "qui", "dont", "que"], c: 0, why: "jouer avec quelqu'un → avec qui." }
    ]
  },
  {
    id: "g12",
    title: "Plus-que-parfait & Zeitenfolge",
    level: "B2",
    emoji: "📕",
    explain: "Vorvergangenheit: <b>avoir/être im imparfait + Partizip</b> (j'avais mangé, elle était allée) – für das, was vor einem Vergangenheitsmoment geschah. Im if-Satz der Vergangenheit: <b>Si + plus-que-parfait → conditionnel passé</b> (Si tu avais su, tu m'aurais aidé).",
    exercises: [
      { sentence: "Il ___ déjà mangé quand je suis arrivé.", options: ["avait", "a", "était", "ont"], c: 0, why: "avoir im imparfait: avait + Partizip." },
      { sentence: "Elle ___ allée à Rome avant la pandémie.", options: ["était", "a", "est", "sont"], c: 0, why: "être im imparfait: était allée." },
      { sentence: "Nous ___ tout compris avant la fin. (avoir)", options: ["avions", "sommes", "avons", "étaient"], c: 0, why: "avoir → nous avions." },
      { sentence: "Si tu ___ su, tu m'aurais aidé.", options: ["avais", "as", "auras", "es"], c: 0, why: "Si + plus-que-parfait → conditionnel passé." },
      { sentence: "Ils ___ rentrés très tard hier soir.", options: ["étaient", "avaient", "sont", "ont"], c: 0, why: "rentrer → être im imparfait: ils étaient rentrés." },
      { sentence: "J'espérais qu'elle ___ déjà partie.", options: ["était", "est", "avait", "sera"], c: 0, why: "être im imparfait + Partizip: qu'elle était partie." }
    ]
  },
  {
    id: "g13",
    title: "Gérondif & Verbindungen",
    level: "B2",
    emoji: "📕",
    explain: "Gérondif = <b>en + participe présent</b> (Stamm der nous-Form + <b>-ant</b>): en regardant, en courant. Ausnahme: être → étant, avoir → ayant, savoir → sachant. Wichtige Verbindungen: néanmoins / en revanche (dennoch / hingegen), par conséquent (folglich), bien que (obwohl).",
    exercises: [
      { sentence: "J'ai appris le français en ___ la télé. (regarder)", options: ["regardant", "regarder", "regarde", "regardé"], c: 0, why: "en + participe présent: en regardant." },
      { sentence: "___ vite, j'ai manqué le bus. (courir)", options: ["En courant", "Courant", "En courir", "En couru"], c: 0, why: "en + participe présent, auch am Satzanfang." },
      { sentence: "Elle chante en ___. (cuisiner)", options: ["cuisinant", "cuisine", "cuisiné", "cuisinons"], c: 0, why: "nous cuisinons → cuisin- + ant." },
      { sentence: "Il est riche, ___ il n'est pas heureux.", options: ["néanmoins", "donc", "parce que", "puisque"], c: 0, why: "Widerspruch → néanmoins." },
      { sentence: "Il pleuvait, ___ le match a été annulé.", options: ["par conséquent", "cependant", "quoique", "même si"], c: 0, why: "Folge → par conséquent." },
      { sentence: "___ sachant la vérité, elle est restée calme.", options: ["Bien que", "Parce que", "Puisque", "Comme"], c: 0, why: "bien que + gérondif: Bien que sachant." }
    ]
  }
];
