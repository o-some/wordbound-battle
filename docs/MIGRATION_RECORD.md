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
- Target Commit: wird nach dem Migrationscommit ergänzt

## Kopier-/Transformationshinweise
- Game-Core, Datenmodell, State, Engine, UI, Tests, Astro/Vite-Konfiguration und Dokumentation wurden aus V2.2 übernommen.
- `src/styles.css` wurde zur sicheren modularen Repo-Übertragung in `src/styles.css` + `src/styles/part-01.css` + `part-02.css` + `part-03.css` aufgeteilt. Die CSS-Reihenfolge bleibt über `@import` erhalten.
- `src/game/ui.js` und `src/main.js` wurden während der Connector-Übertragung textuell normalisiert/kompakt übertragen; Funktionsumfang muss deshalb im kompletten Build-/Gameplay-Gate validiert werden.
- Runtime verwendet keine externen Fetches/Assets; Tula ist in V2.2 als Data-URI eingebettet.

## Assets
- Tula Runtime Asset: eingebettet in `src/game/data.js`
- lokale Tula SVG: `src/assets/tula-home-anime.svg`
- Gehilfen- und Gegnergrafiken: Inline-SVG in `src/game/ui.js`
- externe Audio-Dateien: keine

## Vorabtests am autorisierten V2.2-Quellbestand
- Engine: 19/19 PASS
- Standalone: PASS
- Struktur-Audit: PASS

## Release-Gates
- GitHub Actions: PENDING
- Astro Build: PENDING
- GitHub Pages: PENDING
- Live HTTP 200: PENDING
- kritische Assets HTTP 200: PENDING
- keine 404/JS-Fehler: PENDING
- iPhone/WebKit: PENDING
- Desktop: PENDING
- Gameplay Sieg/Niederlage/Neustart/Gegnerwechsel: PENDING

## Live URL
`https://o-some.github.io/wordbound-battle/`

## Removal Approval
`REMOVE_OLD_COPY = FORBIDDEN`

Da am Source-Referenzcommit keine Wordbound-spezifische Alt-Kopie identifiziert wurde, ist aktuell **keine Löschung aus `tulasisland` geplant**. Das wird nach bestandenem Ziel-Gate erneut gegen den dann aktuellen `tulasisland/main` geprüft.
