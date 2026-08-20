# Wordbound Battle V2.2 – Migration Audit

Stand: 20.08.2026

## Scope
Nur `o-some/wordbound-battle`. Keine anderen Spiele-Repositories wurden im Rahmen dieser Migration verändert.

## Referenzen
- Source reference: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`
- autorisierter Spielquellbestand: V2.2 aus diesem Chat
- Source rollback: `pre-extraction-wordbound-battle`
- Target initial main: `20b7c93fc092219b6774d550c15f09e1021cb71f`
- Target rollback: `pre-migration-wordbound-v2-2`
- erster vollständiger Migrationscommit: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`
- letzte vollständig getestete Game-Code-SHA: `06f731d0b9bac32d86fae074b0f169cb848fe4e1`
- erfolgreicher Live-Verifikationsrecord: `c69cf325f46bf2e34ca5deda2c5bf5a787f3afec`

## Architektur
- modularer Game-Core unter `src/game/`
- Vite-Entry `src/main.js`
- Astro Wrapper `src/components/WordboundBattle.astro`
- Astro Seite `src/pages/index.astro`
- GitHub-Pages-Base `/wordbound-battle`
- Game-Core bleibt Capacitor-Host-kompatibel
- Browser-Gates mit Playwright Chromium + WebKit

## Migrations-Transformationen
- CSS in drei geordnete Teilmodule gesplittet; `src/styles.css` importiert sie in Originalreihenfolge.
- UI/Main wurden bei Connector-Übertragung textuell normalisiert. Der Zielbestand wurde anschließend durch Unit-, Build-, Browser- und Live-Gates validiert.
- Runtime-Grafiken sind lokal/inline; keine externen Bild-/Audio-Fetches notwendig.

## Build / CI
- npm install: PASS
- Node Engine Tests: 19/19 PASS
- Astro Build: PASS
- Playwright Browser-E2E: PASS
- GitHub Pages Artifact: PASS
- GitHub Pages Deploy: PASS

## Browser / Responsive
- iPhone-nah WebKit 390×844 / Touch: PASS
- iPhone-nah Chromium 390×844 / Touch: PASS
- Android-nah Chromium 412×915 / Touch: PASS
- Desktop Chromium 1280×850: PASS
- kein horizontaler Overflow: PASS
- keine Überlagerung aktiver Gehilfe / Tula-Dialog: PASS
- Browser-Konsole ohne Errors: PASS
- keine 404-Responses im Browser-E2E: PASS

## Gameplay
Durch Unit- und Browser-E2E geprüft:
- Kampfstart: PASS
- Gehilfenwahl und Deploy: PASS
- richtige/falsche Wortantwort: PASS
- Energieverbrauch und Bank-Regeneration: PASS
- Gegnerzug: PASS
- Schwächenwechsel: PASS
- Satz-Challenge: PASS
- korrekter Satz: PASS
- falscher Satz + Gegnerdruck: PASS
- Pause/Resume: PASS
- Sprachwechsel: PASS
- Sieg + Rewards: PASS
- nächster Gegner: PASS
- echte Niederlage nach wiederholten Fehlern: PASS
- Neustart nach Niederlage: PASS

## Live
- URL: `https://o-some.github.io/wordbound-battle/`
- HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Assets ohne 404: PASS
- Maschinenlesbarer Nachweis: `docs/LIVE_STATUS.json`

## Source-Recheck
Nach bestandenem Ziel-Gate wurde `o-some/tulasisland/main` erneut frisch geprüft:
- aktueller Source-main: `cf2fb9b3e2dc1eb885d50e88593124def1cbbdc0`
- Source Tree: `e9af11bbe0015777650156e5f8860ec1c8f0a93c`
- Suche `wordbound`: keine Treffer
- Suche `Wordbound Battle`: keine Treffer

Der Source-main hat sich durch parallele, fremde Arbeiten weiterbewegt. Diese Migration hat diese Änderungen nicht verursacht.

## Destruktive Änderungen / Removal Gate
Es wurde **nichts aus `tulasisland` gelöscht**.

Begründung: Weder am dokumentierten Source-Referenzcommit noch beim aktuellen Source-Recheck existiert eine eigenständige Wordbound-Battle-Kopie.

`REMOVE_OLD_COPY = NOT_APPLICABLE`

## Gerätehinweis
Der iPhone-Test ist ein automatisierter Playwright-WebKit-Test mit iPhone-nahem 390×844-Touch-Viewport. Ein physisches iPhone wird aus dieser Session nicht ferngesteuert.

## Ergebnis
Die Repository-Migration ist freigegeben. Weitere Wordbound-Battle-Entwicklung erfolgt ausschließlich in `o-some/wordbound-battle`.
