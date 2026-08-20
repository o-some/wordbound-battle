# Migration Record – Wordbound Battle

Migration Date: 2026-08-20

## Source
- Source Repo: `o-some/tulasisland`
- Source reference Commit: `892f676fbcef77ab49373aef7865d60afba0ebb7`
- Source rollback branch: `pre-extraction-wordbound-battle`
- Quellordner im damaligen `tulasisland`: **keine eigenständige Wordbound-Battle-Kopie gefunden**
- Vom Nutzer autorisierter Spiel-Quellbestand: **Wordbound Battle V2.2 aus diesem Chat**

## Target
- Target Repo: `o-some/wordbound-battle`
- ursprünglicher Target-Main vor Migration: `20b7c93fc092219b6774d550c15f09e1021cb71f`
- Target rollback branch: `pre-migration-wordbound-v2-2`
- erster vollständiger Target-Migrationscommit: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`
- letzte vollständig getestete Game-Code-SHA: `06f731d0b9bac32d86fae074b0f169cb848fe4e1`
- erfolgreicher Live-Verifikationsrecord: `c69cf325f46bf2e34ca5deda2c5bf5a787f3afec`

Spätere `[skip ci]`-Commits aktualisieren ausschließlich Migrationsdokumentation und verändern den getesteten Game-Code nicht.

## Kopier-/Transformationshinweise
- Game-Core, Datenmodell, State, Engine, UI, Tests, Astro/Vite-Konfiguration und Dokumentation wurden aus V2.2 übernommen.
- `src/styles.css` wurde zur sicheren modularen Repo-Übertragung in `src/styles.css` + `src/styles/part-01.css` + `part-02.css` + `part-03.css` aufgeteilt. Die CSS-Reihenfolge bleibt über `@import` erhalten.
- `src/game/ui.js` und `src/main.js` wurden während der Connector-Übertragung textuell normalisiert/kompakt übertragen und danach durch Unit-, Build- und Browser-Gates validiert.
- Runtime verwendet keine externen Fetches/Assets; Tula ist in V2.2 als Data-URI eingebettet.
- GitHub Pages verwendet Astro mit Base `/wordbound-battle`.

## Assets
- Tula Runtime Asset: eingebettet in `src/game/data.js`
- lokale Tula SVG: `src/assets/tula-home-anime.svg`
- Gehilfen- und Gegnergrafiken: Inline-SVG in `src/game/ui.js`
- externe Audio-Dateien: keine
- Live gleiche-Origin-Asset-404-Prüfung: PASS

## Vorabtests am autorisierten V2.2-Quellbestand
- Engine: 19/19 PASS
- Standalone: PASS
- Struktur-Audit: PASS

## Finales Release-Gate – getestete Game-Code-SHA `06f731d0b9bac32d86fae074b0f169cb848fe4e1`
- npm install: PASS
- Engine Tests: 19/19 PASS
- Astro Build: PASS
- Playwright Chromium: PASS
- Playwright WebKit: PASS
- iPhone-nah 390×844 / WebKit: PASS
- iPhone-nah 390×844 / Chromium: PASS
- Android-nah 412×915 / Chromium: PASS
- Desktop 1280×850 / Chromium: PASS
- kein horizontaler Overflow: PASS
- keine Gehilfe/Tula-Überlagerung: PASS
- Satz-Challenge richtig/falsch: PASS
- Gegnerdruck: PASS
- Pause/Resume: PASS
- Sprachwechsel: PASS
- Sieg + Belohnung: PASS
- nächster Gegner: PASS
- echte Niederlage: PASS
- Neustart: PASS
- Browser-JavaScript/Page-Errors: keine
- Browser-404-Responses: keine
- Pages Deploy: PASS
- Live HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Assets ohne 404: PASS

Maschinenlesbarer Nachweis: `docs/LIVE_STATUS.json`.

## Live URL
`https://o-some.github.io/wordbound-battle/`

## Source-Recheck nach bestandenem Ziel-Gate
Der Source wurde nach dem erfolgreichen Ziel-Gate erneut frisch gelesen.

- aktueller `o-some/tulasisland/main`: `cf2fb9b3e2dc1eb885d50e88593124def1cbbdc0`
- Suche nach `wordbound`: keine Treffer
- Suche nach `Wordbound Battle`: keine Treffer
- aktuelle Source-Tree-SHA entspricht weiterhin `e9af11bbe0015777650156e5f8860ec1c8f0a93c`

Der Source-Main hat sich während paralleler Arbeiten an anderen Bereichen weiterbewegt. Diese Migration hat diese Änderungen nicht erzeugt und keine anderen Spiele-Repositories verändert.

## Removal Approval
`REMOVE_OLD_COPY = NOT_APPLICABLE`

Da weder am Source-Referenzcommit noch beim aktuellen Source-Recheck eine eigenständige Wordbound-Battle-Kopie identifiziert wurde, gab es **keine Wordbound-Datei, die aus `tulasisland` entfernt werden durfte oder musste**. Es wurde daher nichts aus `tulasisland` gelöscht.

## Ergebnis
Die Migration ist abgeschlossen. Zukünftige Wordbound-Battle-Entwicklung erfolgt ausschließlich in `o-some/wordbound-battle`.
