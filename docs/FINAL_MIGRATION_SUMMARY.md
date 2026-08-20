# Final Migration Summary – Wordbound Battle

Stand: 2026-08-20

Die Migration von **Wordbound Battle V2.2** in das eigenständige Repository `o-some/wordbound-battle` ist abgeschlossen.

## Verbindliche Referenzen
- Autorisierter Spielquellbestand: Wordbound Battle V2.2 aus dem zugehörigen Chat
- Source-Referenzrepo: `o-some/tulasisland`
- Source-Referenz-SHA: `892f676fbcef77ab49373aef7865d60afba0ebb7`
- Source-Rollback: `pre-extraction-wordbound-battle`
- Target-Rollback: `pre-migration-wordbound-v2-2`
- erster vollständiger Migrationscommit im Target: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`
- letzte vollständig getestete Game-Code-SHA: `06f731d0b9bac32d86fae074b0f169cb848fe4e1`
- dazugehöriger erfolgreicher Live-Verifikationsrecord: `c69cf325f46bf2e34ca5deda2c5bf5a787f3afec`

## Release Gates
- npm install: PASS
- Engine Tests: 19/19 PASS
- Astro Build: PASS
- GitHub Pages Deploy: PASS
- Live HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Assets ohne 404: PASS
- Browser-Konsole ohne Fehler: PASS
- iPhone-naher WebKit-Test 390×844: PASS
- iPhone/Touch Chromium 390×844: PASS
- Android/Touch Chromium 412×915: PASS
- Desktop Chromium 1280×850: PASS
- kein horizontaler Overflow: PASS
- keine Überlagerung zwischen aktivem Gehilfen und Tula-Dialog: PASS
- Satz-Challenge korrekt/falsch: PASS
- Gegnerdruck: PASS
- Pause/Resume: PASS
- Sprachwechsel: PASS
- Sieg: PASS
- nächster Gegner: PASS
- echte Niederlage: PASS
- Neustart nach Niederlage: PASS

## Live
`https://o-some.github.io/wordbound-battle/`

## Source Cleanup
Am ursprünglichen Source-Referenzstand und beim erneuten Check des aktuellen `tulasisland/main` wurde **keine eigenständige Wordbound-Battle-Kopie** gefunden. Deshalb wurde aus `tulasisland` nichts gelöscht.

Aktueller Source-Recheck am 2026-08-20:
- `tulasisland/main`: `cf2fb9b3e2dc1eb885d50e88593124def1cbbdc0`
- Suche nach `wordbound` / `Wordbound Battle`: keine Treffer
- andere Spiele-Repositories: nicht verändert

Entscheidung: `REMOVE_OLD_COPY = NOT_APPLICABLE`.

## Gerätehinweis
Der iPhone-Test ist ein automatisierter Playwright-WebKit-Test mit 390×844-Touch-Viewport. Ein physisches iPhone wird von dieser Session nicht ferngesteuert; ein zusätzlicher Hardware-Smoke-Test kann daher nur manuell erfolgen.
