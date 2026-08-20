# Projekt
Tula’s Island – Wordbound Battle

# Zweck
Eigenständiges, rundenbasiertes Sprachlern-RPG für Tula’s Island. Der Spieler wählt pro Runde einen Gehilfen und verdient jede relevante Kampfaktion durch eine Sprachaufgabe.

# Aktuelle Version
V2.2 / Repository-Version `1.0.0-migrated`.

# Letzte vollständig getestete Game-Code-SHA
`06f731d0b9bac32d86fae074b0f169cb848fe4e1`

Erfolgreicher Live-Verifikationsrecord danach:
`c69cf325f46bf2e34ca5deda2c5bf5a787f3afec`

Spätere Commits mit `[skip ci]` aktualisieren ausschließlich Migrationsdokumentation und verändern den getesteten Game-Code nicht.

# Framework
- Astro 7
- Vite 8
- Vanilla JavaScript / ESM
- statischer GitHub-Pages-Build
- Capacitor-kompatibler Game-Core für den bestehenden Tula’s-Island-Host
- Playwright für automatisierte Browser-/Viewport-Gates

# Plattform-/Browser-Gate
- iPhone-nah WebKit, 390×844, Touch: PASS
- iPhone-nah Chromium, 390×844, Touch: PASS
- Android-nah Chromium, 412×915, Touch: PASS
- Desktop Chromium, 1280×850: PASS
- kein horizontaler Overflow: PASS
- keine Überlagerung aktiver Gehilfe / Tula-Dialog: PASS

Ein physisches iPhone kann aus dieser Session nicht ferngesteuert werden. Der iPhone-Gate ist deshalb ein automatisierter Playwright-WebKit-Test mit iPhone-nahem Viewport und Touch-Konfiguration.

# Designregeln
- Mobile first
- Tula’s-Island Anime-/Adventure-Look
- Deep Navy / Ocean Blue / Türkis / Gold / Creme
- Lerninhalt bleibt wichtiger als Action
- große Touch-Ziele und klare Lesbarkeit
- keine unnötigen Effekte während des Lesens
- keine funktionierende Mechanik ohne ausdrückliche Anweisung entfernen

# Aktueller Funktionsstand
- Gehilfen Meli, Neri, Skippi, Fino
- aktive Gehilfenwahl pro Runde
- Energie + Bank-Regeneration
- wechselnde Gegner-Schwächen
- Gegner Coralox, Nebulon, Sturmkrab
- getrennte Spieler- und Gegnerzüge
- Gegnerdruck mit echter Niederlage
- Wortübersetzung
- Satzbau jede dritte Runde
- DE / EN / ES / EL
- XP / Muscheln / Combo
- Pause / Resume
- Sieg / Niederlage / Neustart / nächster Gegner

# Release-Gate – Stand 20.08.2026
- npm install: PASS
- Engine Unit Tests: 19/19 PASS
- Astro Build: PASS
- Browser-E2E: PASS
- Satz richtig/falsch: PASS
- Gegnerdruck: PASS
- Sieg: PASS
- XP-/Muschel-Belohnung: PASS
- nächster Gegner: PASS
- echte Niederlage: PASS
- Neustart: PASS
- Pause/Resume: PASS
- Sprachwechsel: PASS
- Browser-Konsole / Page Errors: PASS
- 404-Responses: PASS
- GitHub Pages Deploy: PASS
- Live HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Assets ohne 404: PASS

Maschinenlesbarer Live-Record: `docs/LIVE_STATUS.json`.

# Wichtige Dateien
- `src/game/data.js`
- `src/game/state.js`
- `src/game/engine.js`
- `src/game/ui.js`
- `src/game/engine.test.mjs`
- `src/main.js`
- `src/styles.css`
- `src/styles/part-01.css`
- `src/styles/part-02.css`
- `src/styles/part-03.css`
- `src/pages/index.astro`
- `scripts/e2e.mjs`
- `.github/workflows/pages.yml`

# Assets
- V2.2 nutzt Tula zur Laufzeit als eingebettete SVG/Data-URI in `src/game/data.js`.
- Zusätzlich ist `src/assets/tula-home-anime.svg` als lokale Quellkopie enthalten.
- Gegner/Gehilfen sind vektorbasierte Runtime-Grafiken in `src/game/ui.js` und haben keine externen Netzwerkabhängigkeiten.
- Live-Asset-/404-Gate: PASS.

# Deployment
- GitHub Pages: `https://o-some.github.io/wordbound-battle/`
- Workflow: `.github/workflows/pages.yml`
- Astro Base: `/wordbound-battle`
- Pages Source: GitHub Actions

# Migration / Rollback
- Source reference: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`
- Source rollback: `pre-extraction-wordbound-battle`
- Target initial main: `20b7c93fc092219b6774d550c15f09e1021cb71f`
- Target rollback: `pre-migration-wordbound-v2-2`
- erster vollständiger Migrationscommit: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`

# Source-Recheck nach bestandenem Ziel-Gate
Aktueller `tulasisland/main` beim Abschlusscheck:
`cf2fb9b3e2dc1eb885d50e88593124def1cbbdc0`

Suche nach `wordbound` / `Wordbound Battle`: keine Treffer.

Am Source-Referenzstand und am aktuellen Source-Stand existiert keine eigenständige Wordbound-Battle-Kopie. Deshalb wurde **nichts aus `tulasisland` gelöscht**.

`REMOVE_OLD_COPY = NOT_APPLICABLE`

# Do-not-touch-Bereiche
- Keine anderen Spiele-Repositories verändern.
- Keine nicht eindeutig Wordbound-spezifischen Dateien aus `tulasisland` löschen.
- Kein Force-Push.

# Nächster Produkt-Schritt
Die Migration ist abgeschlossen. Fachliche Weiterentwicklung kann ab jetzt ausschließlich in `o-some/wordbound-battle` stattfinden. Für eine spätere Integration in die Haupt-App den Game-Core über `mountWordboundBattle(root, options)` und die Events `tulas:wordbound:reward` / `tulas:wordbound:state` anbinden.
