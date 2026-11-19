# 🥐 VokiFranz

VokiFranz ist eine Duolingo-artige App zum Französisch-Lernen – von **A1 (6./7. Klasse) bis B2**.

## Was kann die App?

- **20 Vokabel-Lektionen in vier Niveaus:**
  - **A1 · Anfänger (6.–7. Klasse):** Begrüßung, Zahlen & Farben, Schule, Familie, Essen & Trinken, Zeit, Freizeit, Stadt, Körper & Gesundheit, Wetter & Kleidung
  - **A2:** Reisen & Transport, Restaurant, Wohnen & Haushalt, Beruf & Ausbildung
  - **B1:** Meinung & Diskussion, Umwelt & Klima, Medien & Technik
  - **B2:** Gesellschaft & Politik, Gefühle & Nuancen, Ausdrücke & Redemittel
- **13 Grammatik-Kurzlektionen (📘):** kurze Erklärung + Übungen mit Rückmeldung, eingestreut in den Lernpfad – von Artikeln und être/avoir (A1) über Passé composé und Imparfait (A2) und Subjonctif (B1) bis Plus-que-parfait und Gérondif (B2)
- **Ein Lernpfad:** Alles ist in einer Kette angeordnet – Vokabeln und Grammatik wechseln sich ab, Freischaltung jeweils mit 80 % Bestehen
- **Übungsarten wie bei Duolingo:** Multiple Choice (Deutsch → Französisch und umgekehrt), Sätze ergänzen (Grammatik) und Tippen
- **Wiederholungs-Algorithmus:** Wörter, die oft falsch waren, kommen häufiger wieder. Jedes Wort hat 5 „Meisterschaftsstufen“ und wird bei Fehlern zurückgestuft.
- **XP und Tagesstreak:** Für richtige Antworten gibt es XP ⚡, für jeden Tag mit Übung einen Streak 🔥
- **📷 Vokabeln per Foto:** Eigene Vokabellisten (z. B. aus dem Heft) abfotografieren – die App liest die Wörter per Texterkennung (OCR) ein, man kann sie prüfen/korrigieren und in den Übungs-Algorithmus aufnehmen.

## Wie benutze ich die App?

Einfach im Browser öffnen: **https://stormingdonkey.github.io/French_vocab/**

Am Handy funktioniert sie genauso („Zum Startbildschirm hinzufügen“ für ein App-Gefühl).

## Eigene Vokabeln per Foto

1. Auf der Startseite **📷 Vokabeln per Foto** antippen
2. Foto von der Vokabelliste machen (am besten hell, gerade, gut lesbar)
3. Die App erkennt Zeilen im Format **deutsch = französisch** (auch `-` oder `:` als Trennzeichen)
4. Vor dem Speichern korrigieren, Seiten tauschen oder Zeilen löschen
5. Fertig – die neuen Vokabeln tauchen unter „Meine Vokabeln“ auf und werden mitgelernt

Der Fortschritt wird im Browser gespeichert (localStorage).

## Technik

- Reine **HTML/CSS/JavaScript**-Web-App, kein Build-Schritt, keine Abhängigkeiten
- Texterkennung: [Tesseract.js](https://tesseract.projectnaptha.com/) (läuft komplett im Browser, lädt die Sprachdaten einmalig aus dem Internet)
- Hosting: GitHub Pages von `main`

## Entwicklung

Zum lokalen Testen:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```
