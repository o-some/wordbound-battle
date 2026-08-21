# Projekt
Tula’s Island – Wordbound Battle

# Zweck
Eigenständiges, rundenbasiertes Sprachlern-RPG für Tula’s Island. Der Spieler wählt pro Runde einen Gehilfen und verdient jede relevante Kampfaktion durch eine Sprachaufgabe.

# Aktuelle Version
V2.2 / Repository-Version `1.0.0-migrated` mit Pirate-Art-Refresh vom 21.08.2026.

# Letzte vollständig getestete und live verifizierte Game-Code-SHA
`c7eac9c7ec94b4420fc4961b6fa006736a982e4b`

Erfolgreicher Live-Verifikationsrecord danach:
`49a62d9242956ab2223927db8c215f89cd861ab1`

Spätere Commits mit `[skip ci]` aktualisieren ausschließlich Dokumentation und verändern den getesteten Game-Code nicht.

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
- aktueller Character-Look: hochwertiger Pirate-/Ocean-Adventure-Stil
- Deep Navy / Ocean Blue / Türkis / Gold / Creme
- Lerninhalt bleibt wichtiger als Action
- große Touch-Ziele und klare Lesbarkeit
- keine unnötigen Effekte während des Lesens
- keine funktionierende Mechanik ohne ausdrückliche Anweisung entfernen

# Aktueller Funktionsstand
- Gehilfen Meli, Neri, Skippi, Fino mit Produktionssprites
- aktive Gehilfenwahl pro Runde
- Energie + Bank-Regeneration
- wechselnde Gegner-Schwächen
- Gegner Coralox, Nebulon, Sturmkrab
- Pirate-Tula im Intro, Guide und Wartebereich
- Coralox als Korallen-Piratenboss
- Nebulon als spektraler Piratenkapitän
- Sturmkrab als Gewitter-/Krabben-Piratenboss
- Gegnerwerte/Fähigkeiten/Schwächen bleiben gegenüber dem V2.2-Kern unverändert
- sichere Art-Fallbacks auf bestehende SVG-/Tula-Grafiken
- getrennte Spieler- und Gegnerzüge
- Gegnerdruck mit echter Niederlage
- Wortübersetzung
- Satzbau jede dritte Runde
- DE / EN / ES / EL
- XP / Muscheln / Combo
- Pause / Resume
- Sieg / Niederlage / Neustart / nächster Gegner

# Pirate-Art-Technik
- `src/game/pirate-art.js` mappt Pirate-Tula sowie Coralox/Nebulon/Sturmkrab.
- Runtime-Daten liegen lokal unter `src/assets/pirate-data/*.avif.b64.txt`.
- `src/main.js` entfernt alte Grafiken erst nach erfolgreichem `load` des neuen Pirate-Assets.
- Bei Dekodierfehler bleibt der bisherige Tula-/SVG-Fallback erhalten.
- `scripts/make-standalone.mjs` lädt dieselben Asset-Daten in den Standalone-Build.
- Keine zusätzlichen externen Bild-URLs / Netzwerkabhängigkeiten.

# Release-Gate – Stand 21.08.2026
- npm install: PASS
- Engine Unit Tests: 19/19 PASS
- Astro Build: PASS
- Standalone: PASS
- Struktur-Audit: PASS
- bestehender vollständiger Browser-E2E: PASS
- Pirate-AVIF Decode Chromium: 4/4 PASS
- Pirate-AVIF Decode WebKit: 4/4 PASS
- Pirate-Tula im Intro/Battle: PASS
- Pirate-Gegner im Intro/Battle: PASS
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
- Pirate-Mobile-Screenshots Chromium/WebKit visuell geprüft: PASS

Maschinenlesbarer Live-Record: `docs/LIVE_STATUS.json`.

# Wichtige Dateien
- `src/game/data.js`
- `src/game/state.js`
- `src/game/engine.js`
- `src/game/ui.js`
- `src/game/engine.test.mjs`
- `src/game/pirate-art.js`
- `src/assets/pirate-data/tula.avif.b64.txt`
- `src/assets/pirate-data/coralox.avif.b64.txt`
- `src/assets/pirate-data/nebulon.avif.b64.txt`
- `src/assets/pirate-data/sturmkrab.avif.b64.txt`
- `src/main.js`
- `src/styles.css`
- `src/styles/part-01.css`
- `src/styles/part-02.css`
- `src/styles/part-03.css`
- `src/pages/index.astro`
- `scripts/make-standalone.mjs`
- `scripts/e2e.mjs`
- `.github/workflows/pages.yml`

# Assets
- Pirate-Art ist lokale Runtime-Art und benötigt keine externen URLs.
- Die ursprüngliche Tula-Grafik aus `src/game/data.js` bleibt als technischer Fallback erhalten.
- Die ursprünglichen Gegner-Vektoren aus `src/game/ui.js` bleiben als technische Fallbacks erhalten.
- Helper-Produktionssprites Meli/Neri/Skippi/Fino bleiben unverändert.
- Live-Asset-/404-Gate: PASS.

# Deployment
- GitHub Pages: `https://o-some.github.io/wordbound-battle/`
- Workflow: `.github/workflows/pages.yml`
- Astro Base: `/wordbound-battle`
- Pages Source: GitHub Actions
- aktuell live getesteter Game-Code: `c7eac9c7ec94b4420fc4961b6fa006736a982e4b`

# Migration / Rollback
- Source reference: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`
- Source rollback: `pre-extraction-wordbound-battle`
- Target rollback: `pre-migration-wordbound-v2-2`
- Rollback vor Helper-Sprites: `pre-mobile-helper-sprites-20260821`
- Rollback vor Pirate-Art: `pre-pirate-art-refresh-20260821`
- Rollback vor Pirate-Runtime-Verdrahtung: `pre-pirate-runtime-integration-20260821`
- erster vollständiger Migrationscommit: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`

# Source-Recheck / Cleanup
Am Source-Referenzstand und am späteren Source-Check existierte keine eigenständige Wordbound-Battle-Kopie in `tulasisland`. Deshalb wurde **nichts aus `tulasisland` gelöscht**.

`REMOVE_OLD_COPY = NOT_APPLICABLE`

# Do-not-touch-Bereiche
- Keine anderen Spiele-Repositories verändern.
- Keine nicht eindeutig Wordbound-spezifischen Dateien aus `tulasisland` löschen.
- Kein Force-Push.
- Gameplay-/Lernlogik nicht bei reinen Art-Änderungen mitändern.

# Nächster Produkt-Schritt
Die Pirate-Art-Version ist live. Weitere fachliche Entwicklung erfolgt ausschließlich in `o-some/wordbound-battle`. Für eine spätere Integration in die Haupt-App den Game-Core über `mountWordboundBattle(root, options)` und die Events `tulas:wordbound:reward` / `tulas:wordbound:state` anbinden.
