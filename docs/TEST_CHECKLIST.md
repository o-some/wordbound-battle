# Test Checklist – Wordbound Battle

Stand während Migration. Nur tatsächlich ausgeführte Tests werden abgehakt.

## Vorab am autorisierten V2.2-Quellbestand
- [x] Engine Unit Tests – 19/19 PASS
- [x] Standalone-Generator
- [x] Struktur-Audit

## Build / CI
- [ ] npm install / Dependency-Resolution
- [ ] `npm test` im Ziel-Repo
- [ ] `npm run build:astro`
- [ ] GitHub Actions grün
- [ ] Pages-Artifact erfolgreich
- [x] GitHub Pages Source auf **GitHub Actions** gesetzt (vom Nutzer bestätigt, 20.08.2026)

## Allgemein Live
- [ ] Startseite HTTP 200
- [ ] Reload funktioniert
- [ ] keine weiße/blaue leere Seite
- [ ] keine JavaScript-Fehler
- [ ] keine 404-Assets
- [ ] relative Base-Pfade korrekt

## Gameplay
- [ ] Kampf startet
- [ ] Gehilfe auswählbar
- [ ] Gehilfe muss vor Frage eingesetzt werden
- [ ] richtige Wortantwort reagiert korrekt
- [ ] falsche Wortantwort reagiert korrekt
- [ ] Energieverbrauch korrekt
- [ ] Bank-Regeneration korrekt
- [ ] Gegnerzug korrekt
- [ ] Schwächenphase wechselt
- [ ] Satz-Challenge erscheint
- [ ] Satz korrekt baubar
- [ ] falscher Satz erhöht Gegnerdruck um 2
- [ ] Gegnerdruck erhöht Schaden
- [ ] echte Niederlage funktioniert
- [ ] Sieg funktioniert
- [ ] Neustart funktioniert
- [ ] nächster Gegner funktioniert
- [ ] Pause/Resume erhält State
- [ ] DE/EN/ES/EL Sprachwechsel

## Geräte / Viewports
- [ ] iPhone-Viewport 390×844
- [ ] WebKit/iOS-nahe Browserengine
- [ ] Android/Chrome oder begründet ausstehend
- [ ] Desktop Chrome 1280×850 oder größer
- [ ] Desktop Safari/WebKit soweit verfügbar
- [ ] keine Überlagerung Aktiver Gehilfe / Tula-Dialog
- [ ] kein horizontaler Overflow

## Migration Gate
- [ ] Ziel-main sauber und dokumentiert
- [ ] Target Commit dokumentiert
- [ ] Live URL dokumentiert
- [ ] letzte getestete Commit-SHA in HANDOFF
- [ ] Quell-/Zielbestand verglichen
- [ ] Source main erneut gelesen
- [ ] Entscheidung über Alt-Kopie dokumentiert

Bis alle Release-Gates erfüllt sind: `REMOVE_OLD_COPY = FORBIDDEN`.
