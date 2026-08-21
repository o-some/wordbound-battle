# Test Checklist – Wordbound Battle

Aktueller Release-Stand 21.08.2026. Es sind nur tatsächlich ausgeführte Prüfungen als PASS markiert.

## Vorab am autorisierten V2.2-Quellbestand
- [x] Engine Unit Tests – 19/19 PASS
- [x] Standalone-Generator PASS
- [x] Struktur-Audit PASS

## Helper-Sprite-/Mobile-Release
- [x] Meli als lokales WebP-Produktionsasset eingebunden
- [x] Neri als lokales WebP-Produktionsasset eingebunden
- [x] Skippi als lokales WebP-Produktionsasset eingebunden
- [x] Fino als lokales WebP-Produktionsasset eingebunden
- [x] alle vier WebP-Dateien byte-verifiziert
- [x] Sprite-Nutzung in Teamkarten, Auswahl und aktivem Kampfbereich geprüft
- [x] mobile 3-Schritt-Kampfführung geprüft

## Pirate-Art-Release
- [x] Rollback vor Pirate-Art: `pre-pirate-art-refresh-20260821`
- [x] Rollback vor Runtime-Integration: `pre-pirate-runtime-integration-20260821`
- [x] Asset-Stufe separat über PR #2 gemerged
- [x] Runtime-Integration separat über PR #3 vorbereitet
- [x] Pirate-Tula in Intro, Guide und Warteposition verdrahtet
- [x] Coralox Pirate-Boss im Intro und Kampf verdrahtet
- [x] Nebulon Geister-Pirat im Asset-Mapping vorhanden und dekodiert
- [x] Sturmkrab Gewitter-Pirat im Asset-Mapping vorhanden und dekodiert
- [x] Gegner-Fähigkeiten / HP / Schwächen / Schaden gegenüber V2.2 unverändert
- [x] neue Grafiken ersetzen alte Grafiken erst nach erfolgreichem Bild-Load
- [x] SVG-/Tula-Fallback bleibt bei Bildfehler erhalten
- [x] Standalone-Generator um Pirate-Art ergänzt
- [x] alle vier AVIF-Assets in Chromium dekodiert – 192×192
- [x] alle vier AVIF-Assets in WebKit dekodiert – 192×192
- [x] Pirate-Art im Intro in Chromium geprüft
- [x] Pirate-Art im Intro in WebKit geprüft
- [x] Pirate-Art in der Battle Stage in Chromium geprüft
- [x] Pirate-Art in der Battle Stage in WebKit geprüft
- [x] Pirate-Mobile-Screenshots visuell geprüft
- [x] temporärer Pirate-Validierungsworkflow nach erfolgreichem Gate entfernt
- [x] finaler Runtime-PR-Diff nur auf `src/main.js` und `scripts/make-standalone.mjs` begrenzt

## Build / CI – Ziel-Repo
- [x] npm install / Dependency-Resolution PASS
- [x] `npm test` – 19/19 PASS
- [x] `npm run build:astro` PASS
- [x] Standalone-Fallback PASS
- [x] Struktur-Audit PASS
- [x] isolierter Pirate-Runtime-Release-Gate PASS
- [x] normaler GitHub-Pages-Produktions-Gate PASS
- [x] Pages-Artifact erfolgreich erstellt
- [x] GitHub Pages Source auf **GitHub Actions** gesetzt

## Live
- [x] `https://o-some.github.io/wordbound-battle/` HTTP 200
- [x] Reload HTTP 200
- [x] Seite enthält Wordbound-Battle-Inhalt
- [x] keine JavaScript-/Page-Errors im Browser-E2E
- [x] keine 404-Responses im Browser-E2E
- [x] gleiche-Origin-Assets auf 404 geprüft – PASS
- [x] Astro Base `/wordbound-battle` im Build/Live-Gate bestätigt
- [x] Produktionsdeployment für Pirate-Runtime-Game-Code-SHA `c7eac9c7ec94b4420fc4961b6fa006736a982e4b` PASS
- [x] maschinenlesbarer Live-Status durch GitHub Actions aktualisiert
- [x] Live-Verifikationsrecord-Commit: `49a62d9242956ab2223927db8c215f89cd861ab1`

## Gameplay – Engine + Browser-E2E
- [x] Kampf startet
- [x] vier Gehilfen sichtbar und auswählbar
- [x] Gehilfe muss vor Frage eingesetzt werden
- [x] richtige Wortantwort reagiert korrekt
- [x] falsche Wortantwort reagiert korrekt
- [x] Energieverbrauch korrekt
- [x] Bank-Regeneration korrekt
- [x] Gegnerzug verursacht Schaden
- [x] Schwächenphase wechselt
- [x] Satz-Challenge erscheint in Runde 3
- [x] korrekter Satz wird akzeptiert
- [x] falscher Satz erhöht Gegnerdruck um 2
- [x] Gegnerdruck erhöht Gegnerschaden
- [x] echte Niederlage nach wiederholten Fehlern funktioniert
- [x] Neustart nach Niederlage funktioniert
- [x] Sieg funktioniert
- [x] XP-/Muschel-Belohnung bei Sieg vorhanden
- [x] nächster Gegner funktioniert und wechselt Gegner
- [x] Pause/Resume erhält Game-State
- [x] Sprachwechsel DE → ES im Browser funktioniert
- [x] Datenmodell deckt DE / EN / ES / EL ab
- [x] Antworten können technisch nur einmal aufgelöst werden

## Geräte / Viewports
- [x] iPhone-naher Touch-Viewport 390×844 in Chromium PASS
- [x] iPhone-naher Touch-Viewport 390×844 in Playwright WebKit PASS
- [x] Android-naher Touch-Viewport 412×915 in Chromium PASS
- [x] Desktop Chromium 1280×850 PASS
- [x] keine Überlagerung Aktiver Gehilfe / Tula-Dialog
- [x] kein horizontaler Overflow
- [x] Browser-Screenshots als CI-Artefakt erzeugt
- [x] Pirate-Art-Screenshots in Chromium und WebKit erzeugt
- [x] finale Screenshots visuell geprüft

Hinweis: WebKit + 390×844 ist ein automatisierter iPhone-naher Browser-Test. Ein physisches iPhone wird aus dieser Session nicht ferngesteuert.

## Release-/Migration Gate
- [x] eigenes Ziel-Repo `o-some/wordbound-battle`
- [x] eigener `main`
- [x] Source-Referenz-SHA dokumentiert: `892f676fbcef77ab49373aef7865d60afba0ebb7`
- [x] Source-Rollback `pre-extraction-wordbound-battle`
- [x] Target-Rollback `pre-migration-wordbound-v2-2`
- [x] Rollback vor Helper-Sprite-Release: `pre-mobile-helper-sprites-20260821`
- [x] Rollback vor Pirate-Art-Release: `pre-pirate-art-refresh-20260821`
- [x] Rollback vor Pirate-Runtime-Integration: `pre-pirate-runtime-integration-20260821`
- [x] erster vollständiger Target-Migrationscommit dokumentiert: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`
- [x] aktuelle vollständig getestete und live verifizierte Game-Code-SHA: `c7eac9c7ec94b4420fc4961b6fa006736a982e4b`
- [x] erfolgreicher Live-Verifikationsrecord: `49a62d9242956ab2223927db8c215f89cd861ab1`
- [x] README / HANDOFF / MIGRATION_RECORD / ASSET_MANIFEST / TEST_CHECKLIST vorhanden
- [x] keine andere Spiele-Repo verändert
- [x] Alt-Kopie-Entscheidung unverändert dokumentiert

## Source Cleanup
`REMOVE_OLD_COPY = NOT_APPLICABLE`

Am dokumentierten Source-Referenzstand und beim erneuten Source-Check existiert keine eigenständige Wordbound-Battle-Kopie in `tulasisland`. Deshalb wurde dort **nichts gelöscht**.
