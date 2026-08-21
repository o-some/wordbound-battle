# Tula’s Island – Wordbound Battle

Eigenständiges Repository für **Wordbound Battle**, ein rundenbasiertes Sprachlern-RPG aus Tula’s Island.

## Live

**https://o-some.github.io/wordbound-battle/**

GitHub Pages wird über `.github/workflows/pages.yml` aus `main` gebaut und deployt. Pages Source muss auf **GitHub Actions** stehen.

## Spielprinzip

Der Spieler wählt pro Runde einen Gehilfen, berücksichtigt die aktuelle Gegner-Schwäche und löst danach eine Sprachaufgabe. Richtige Antworten erzeugen Angriffe; Fehler erhöhen den Gegnerdruck. Satzbau-Runden ergänzen die klassischen Wortübersetzungen.

## Aktueller Funktionsstand

- Gehilfenwahl pro Runde: Meli, Neri, Skippi, Fino
- lokale Produktionssprites für alle vier Gehilfen
- Gehilfen-Sprites in Teamkarten, Auswahl und aktivem Kampfbereich
- **Piraten-Tula** in Intro, Guide und Warteposition
- **Piraten-Boss-Look für Coralox, Nebulon und Sturmkrab**, bei unveränderten Fähigkeiten/HP/Schwächen
- sichere Grafik-Fallbacks: alte Tula-/SVG-Grafiken bleiben sichtbar, falls ein neues Pirate-Asset nicht dekodiert
- mobile 3-Schritt-Kampfführung: Gehilfe wählen → Aufgabe lösen → Gegnerzug
- Energie + Regeneration auf der Bank
- wechselnde Gegner-Schwächen
- getrennte Spieler- und Gegnerzüge
- Gegnerdruck und echte Niederlage
- Wortübersetzungen
- Satzbau-Aufgaben
- Deutsch / Englisch / Spanisch / Griechisch
- XP, Muscheln, Combo
- Pause / Resume
- Sieg, Niederlage, Neustart, nächster Gegner
- Mobile- und Desktop-Layout

## Stack

- Astro 7
- Vite 8
- Vanilla JavaScript / ESM
- Playwright für Browser-Gates
- statischer GitHub-Pages-Build
- Game-Core bleibt für Einbettung in den Tula’s-Island-Capacitor-Host unabhängig vom Astro-Wrapper

## Lokale Entwicklung

Voraussetzung: Node.js >= 22.12.

```bash
npm install
npm run dev:astro
```

Alternativ Vite:

```bash
npm run dev
```

## Tests

```bash
npm test
npm run audit:structure
npm run standalone
```

Browser-E2E nach installiertem Playwright:

```bash
npx playwright install chromium webkit
npm run build:astro
npx astro preview --host 127.0.0.1 --port 4321
# in einem zweiten Terminal:
WORDBOUND_PREVIEW_URL=http://127.0.0.1:4321/wordbound-battle/ npm run test:e2e
```

## Build

```bash
npm run build
```

Astro-Ausgabe: `dist-astro/`  
Vite-Ausgabe: `dist/`

## Release-Gate

Letzte vollständig getestete und live verifizierte Game-Code-SHA:

`c7eac9c7ec94b4420fc4961b6fa006736a982e4b`

Live-Verifikationsrecord danach:

`49a62d9242956ab2223927db8c215f89cd861ab1`

Dazu erfolgreich geprüft:
- 19/19 Engine Tests
- Astro Build
- Standalone-Fallback
- iPhone-nah WebKit 390×844
- iPhone-/Android-nahe Chromium-Viewports
- Desktop Chromium 1280×850
- vollständiger Browser-Gameplay-Flow inkl. Satzbau, Sieg, nächster Gegner, Niederlage und Neustart
- alle vier Pirate-AVIFs in Chromium und WebKit dekodierbar
- Pirate-Tula und Pirate-Gegner im Intro sowie im Kampf gerendert
- sichere Fallback-Logik für neue Art-Assets
- kein horizontaler Overflow
- keine Überlagerung zwischen aktivem Gehilfen und Tula-Guide
- keine Browser-JavaScript-/Page-Errors
- keine 404-Responses
- GitHub Pages Deploy
- Live HTTP 200 + Reload
- gleiche-Origin-Assets ohne 404

Maschinenlesbarer Live-Status: `docs/LIVE_STATUS.json`  
Vollständige Checkliste: `docs/TEST_CHECKLIST.md`  
Asset-Dokumentation: `docs/ASSET_MANIFEST.md`

## Rollback für Pirate-Art

- Vor kompletter Pirate-Art-Änderung: `pre-pirate-art-refresh-20260821`
- Vor der Runtime-Verdrahtung: `pre-pirate-runtime-integration-20260821`

## Host-Integration

Der Game-Core kann über `mountWordboundBattle(root, options)` in einen bestehenden Host eingebettet werden. Fortschrittsereignisse:

- `tulas:wordbound:reward`
- `tulas:wordbound:state`

Siehe auch `CAPACITOR_INTEGRATION.md`.

## Migration

Die Migration ist in `docs/MIGRATION_RECORD.md` und `docs/FINAL_MIGRATION_SUMMARY.md` dokumentiert.

Source-Referenz: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`

Beim Source-Referenzstand und beim finalen Source-Recheck wurde keine eigenständige Wordbound-Battle-Kopie in `tulasisland` gefunden. Deshalb wurde dort nichts gelöscht.

`REMOVE_OLD_COPY = NOT_APPLICABLE`

Weitere Wordbound-Battle-Entwicklung erfolgt ausschließlich in diesem Repository.
