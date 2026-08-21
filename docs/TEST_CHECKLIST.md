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
- [x] temporärer isolierter Validierungsworkflow nach erfolgreichem Gate entfernt
- [x] finaler PR-Diff auf umsetzungsrelevante Wordbound-Dateien begrenzt

## Build / CI – Ziel-Repo
- [x] npm install / Dependency-Resolution PASS
- [x] `npm test` – 19/19 PASS
- [x] `npm run build:astro` PASS
- [x] Standalone-Fallback PASS
- [x] Struktur-Audit PASS
- [x] GitHub Actions Release-Gate PASS
- [x] WebP-Assets im Astro-Build emittiert
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
- [x] Produktionsdeployment für Game-Code-SHA `e3f5f16782ed2fa2769b6ffefd79af5cbb225133` PASS
- [x] maschinenlesbarer Live-Status durch GitHub Actions aktualisiert

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
- [x] finale Screenshots visuell geprüft

Hinweis: WebKit + 390×844 ist ein automatisierter iPhone-naher Browser-Test. Ein physisches iPhone wird aus dieser Session nicht ferngesteuert.

## Release-/Migration Gate
- [x] eigenes Ziel-Repo `o-some/wordbound-battle`
- [x] eigener `main`
- [x] Source-Referenz-SHA dokumentiert: `892f676fbcef77ab49373aef7865d60afba0ebb7`
- [x] Source-Rollback `pre-extraction-wordbound-battle`
- [x] Target-Rollback `pre-migration-wordbound-v2-2`
- [x] zusätzlicher Rollback vor Helper-Sprite-Release: `pre-mobile-helper-sprites-20260821`
- [x] erster vollständiger Target-Migrationscommit dokumentiert: `9d9b9e9aa64a944b32d71ea959b676b799c250ce`
- [x] aktuelle vollständig getestete und live verifizierte Game-Code-SHA: `e3f5f16782ed2fa2769b6ffefd79af5cbb225133`
- [x] erfolgreicher Live-Verifikationsrecord: `0067189a19e047c00f62c5d4634e9a9ed7fb6a24`
- [x] README / HANDOFF / MIGRATION_RECORD / ASSET_MANIFEST / TEST_CHECKLIST vorhanden
- [x] Source main nach dem Ziel-Gate erneut gelesen
- [x] aktueller Source-Recheck: `cf2fb9b3e2dc1eb885d50e88593124def1cbbdc0`
- [x] Suche nach `wordbound` / `Wordbound Battle` im Source erneut ohne Treffer
- [x] keine andere Spiele-Repo verändert
- [x] Alt-Kopie-Entscheidung dokumentiert

## Source Cleanup
`REMOVE_OLD_COPY = NOT_APPLICABLE`

Am dokumentierten Source-Referenzstand und beim erneuten aktuellen Source-Check existiert keine eigenständige Wordbound-Battle-Kopie in `tulasisland`. Deshalb wurde dort **nichts gelöscht**.
