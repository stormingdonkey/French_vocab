const LESSONS = [
  {
    id: "l1",
    title: "Begrüßung & Vorstellen",
    subtitle: "Saluer et se présenter",
    grade: 6,
    emoji: "👋",
    words: [
      ["bonjour", "guten Tag"],
      ["salut", "hallo / tschüss"],
      ["au revoir", "auf Wiedersehen"],
      ["merci", "danke"],
      ["s'il te plaît", "bitte"],
      ["oui", "ja"],
      ["non", "nein"],
      ["je m'appelle ...", "ich heiße ..."],
      ["comment tu t'appelles ?", "wie heißt du?"],
      ["ça va ?", "wie geht's?"],
      ["ça va bien", "es geht gut"],
      ["à demain", "bis morgen"],
      ["bienvenue", "willkommen"],
      ["excusez-moi", "entschuldigung"],
      ["je suis", "ich bin"],
      ["tu as", "du hast"],
      ["je voudrais", "ich möchte"]
    ]
  },
  {
    id: "l2",
    title: "Zahlen & Farben",
    subtitle: "Nombres et couleurs",
    grade: 6,
    emoji: "🎨",
    words: [
      ["un", "eins"],
      ["deux", "zwei"],
      ["trois", "drei"],
      ["quatre", "vier"],
      ["cinq", "fünf"],
      ["six", "sechs"],
      ["sept", "sieben"],
      ["huit", "acht"],
      ["neuf", "neun"],
      ["dix", "zehn"],
      ["rouge", "rot"],
      ["bleu", "blau"],
      ["vert", "grün"],
      ["jaune", "gelb"],
      ["noir", "schwarz"],
      ["blanc", "weiß"]
    ]
  },
  {
    id: "l3",
    title: "In der Schule",
    subtitle: "À l'école",
    grade: 6,
    emoji: "🏫",
    words: [
      ["le crayon", "der Stift"],
      ["le stylo", "der Kugelschreiber"],
      ["le cahier", "das Heft"],
      ["le livre", "das Buch"],
      ["le sac à dos", "der Rucksack"],
      ["la gomme", "der Radiergummi"],
      ["la règle", "das Lineal"],
      ["le professeur", "der Lehrer"],
      ["l'élève", "der Schüler"],
      ["la classe", "die Klasse"],
      ["le tableau", "die Tafel"],
      ["la leçon", "die Lektion"],
      ["apprendre", "lernen"],
      ["écrire", "schreiben"],
      ["lire", "lesen"]
    ]
  },
  {
    id: "l4",
    title: "Meine Familie",
    subtitle: "Ma famille",
    grade: 6,
    emoji: "👨‍👩‍👧",
    words: [
      ["la mère", "die Mutter"],
      ["le père", "der Vater"],
      ["le frère", "der Bruder"],
      ["la sœur", "die Schwester"],
      ["les parents", "die Eltern"],
      ["le grand-père", "der Großvater"],
      ["la grand-mère", "die Großmutter"],
      ["l'oncle", "der Onkel"],
      ["la tante", "die Tante"],
      ["le cousin", "der Cousin"],
      ["la cousine", "die Cousine"],
      ["l'enfant", "das Kind"],
      ["les grands-parents", "die Großeltern"],
      ["aimer", "lieben / mögen"]
    ]
  },
  {
    id: "l5",
    title: "Essen & Trinken",
    subtitle: "Manger et boire",
    grade: 6,
    emoji: "🍞",
    words: [
      ["le pain", "das Brot"],
      ["l'eau", "das Wasser"],
      ["le lait", "die Milch"],
      ["le jus d'orange", "der Orangensaft"],
      ["la pomme", "der Apfel"],
      ["la banane", "die Banane"],
      ["le fromage", "der Käse"],
      ["le croissant", "das Croissant"],
      ["le gâteau", "der Kuchen"],
      ["la viande", "das Fleisch"],
      ["le poisson", "der Fisch"],
      ["les légumes", "das Gemüse"],
      ["avoir faim", "Hunger haben"],
      ["manger", "essen"],
      ["boire", "trinken"],
      ["le petit-déjeuner", "das Frühstück"]
    ]
  },
  {
    id: "l6",
    title: "Zeit & Wochentage",
    subtitle: "Le temps",
    grade: 6,
    emoji: "🕒",
    words: [
      ["lundi", "Montag"],
      ["mardi", "Dienstag"],
      ["mercredi", "Mittwoch"],
      ["jeudi", "Donnerstag"],
      ["vendredi", "Freitag"],
      ["samedi", "Samstag"],
      ["dimanche", "Sonntag"],
      ["aujourd'hui", "heute"],
      ["demain", "morgen"],
      ["hier", "gestern"],
      ["le matin", "der Morgen"],
      ["le soir", "der Abend"],
      ["quelle heure est-il ?", "wie viel Uhr ist es?"],
      ["une semaine", "eine Woche"],
      ["un mois", "ein Monat"],
      ["un an", "ein Jahr"]
    ]
  },
  {
    id: "l7",
    title: "Freizeit & Sport",
    subtitle: "Les loisirs",
    grade: 7,
    emoji: "⚽",
    words: [
      ["le football", "der Fußball"],
      ["le vélo", "das Fahrrad"],
      ["la natation", "das Schwimmen"],
      ["la musique", "die Musik"],
      ["le cinéma", "das Kino"],
      ["jouer", "spielen"],
      ["faire du sport", "Sport treiben"],
      ["le week-end", "das Wochenende"],
      ["les vacances", "die Ferien"],
      ["la lecture", "das Lesen"],
      ["danser", "tanzen"],
      ["nager", "schwimmen"],
      ["courir", "laufen"],
      ["regarder", "schauen"],
      ["écouter", "hören"],
      ["sortir", "ausgehen"]
    ]
  },
  {
    id: "l8",
    title: "In der Stadt",
    subtitle: "En ville",
    grade: 7,
    emoji: "🏙️",
    words: [
      ["la rue", "die Straße"],
      ["la ville", "die Stadt"],
      ["le magasin", "das Geschäft"],
      ["la gare", "der Bahnhof"],
      ["le train", "der Zug"],
      ["la voiture", "das Auto"],
      ["le bus", "der Bus"],
      ["l'église", "die Kirche"],
      ["la place", "der Platz"],
      ["acheter", "kaufen"],
      ["aller", "gehen / fahren"],
      ["où est ... ?", "wo ist ...?"],
      ["à gauche", "links"],
      ["à droite", "rechts"],
      ["tout droit", "geradeaus"],
      ["près de", "in der Nähe von"]
    ]
  },
  {
    id: "l9",
    title: "Körper & Gesundheit",
    subtitle: "Le corps",
    grade: 7,
    emoji: "🩹",
    words: [
      ["la tête", "der Kopf"],
      ["les yeux", "die Augen"],
      ["la main", "die Hand"],
      ["le pied", "der Fuß"],
      ["le bras", "der Arm"],
      ["la jambe", "das Bein"],
      ["le cœur", "das Herz"],
      ["avoir mal à ...", "Schmerzen haben in ..."],
      ["le médecin", "der Arzt"],
      ["être malade", "krank sein"],
      ["la pharmacie", "die Apotheke"],
      ["dormir", "schlafen"],
      ["se reposer", "sich ausruhen"],
      ["guérir", "gesund werden"]
    ]
  },
  {
    id: "l10",
    title: "Wetter & Kleidung",
    subtitle: "La météo et les vêtements",
    grade: 7,
    emoji: "🧥",
    words: [
      ["il fait beau", "das Wetter ist schön"],
      ["il fait froid", "es ist kalt"],
      ["il fait chaud", "es ist heiß"],
      ["il pleut", "es regnet"],
      ["il neige", "es schneit"],
      ["le soleil", "die Sonne"],
      ["le vent", "der Wind"],
      ["le manteau", "der Mantel"],
      ["la chemise", "das Hemd"],
      ["le pantalon", "die Hose"],
      ["la robe", "das Kleid"],
      ["les chaussures", "die Schuhe"],
      ["le pull", "der Pullover"],
      ["le chapeau", "der Hut"],
      ["porter", "tragen"]
    ]
  }
];

function wordId(fr, de) {
  return fr.toLowerCase().trim() + "|" + de.toLowerCase().trim();
}

function buildWordIndex() {
  const all = [];
  for (const lesson of LESSONS) {
    for (const [fr, de] of lesson.words) {
      all.push({ id: wordId(fr, de), fr, de, lessonId: lesson.id, grade: lesson.grade, custom: false });
    }
  }
  return all;
}

const ALL_WORDS = buildWordIndex();
