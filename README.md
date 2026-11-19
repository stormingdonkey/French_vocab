# 🥐 VokiFranz

VokiFranz ist eine kleine Duolingo-artige App zum Französisch-Lernen für die **6. und 7. Klasse (Niveau A1)**.

## Was kann die App?

- **10 Lektionen** mit den Grund-Vokabeln der 6. und 7. Klasse (Begrüßung, Zahlen & Farben, Schule, Familie, Essen & Trinken, Zeit, Freizeit, Stadt, Körper & Gesundheit, Wetter & Kleidung)
- **Übungsarten wie bei Duolingo:** Multiple Choice (Deutsch → Französisch und umgekehrt) und Tippen
- **Wiederholungs-Algorithmus:** Wörter, die oft falsch waren, kommen häufiger wieder. Jedes Wort hat 5 „Meisterschaftsstufen“ und wird bei Fehlern zurückgestuft.
- **XP und Tagesstreak:** Für richtige Antworten gibt es XP ⚡, für jeden Tag mit Übung einen Streak 🔥
- **Lektionen schalten sich frei:** Eine Lektion wird verfügbar, sobald die vorherige (zu 80 % richtig) abgeschlossen ist.
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
