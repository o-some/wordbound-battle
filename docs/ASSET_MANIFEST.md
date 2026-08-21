# Asset Manifest – Wordbound Battle

Aktueller Release-Stand: 21.08.2026

| Asset | Quelle | Repo-Pfad | Git-Blob | Verwendet in | Status |
|---|---|---|---|---|---|
| Pirate-Tula Produktionsgrafik | in diesem Wordbound-Battle-Entwicklungsstand erzeugtes und freigegebenes Pirate-Art-Asset | `src/assets/pirate-data/tula.avif.b64.txt` | `4d22b9d79454abe411f50c0286a510f4ac613dc9` | Intro, Tula-Guide, Warteposition | VERIFIED |
| Coralox Pirate-Boss | in diesem Wordbound-Battle-Entwicklungsstand erzeugtes Pirate-Art-Asset | `src/assets/pirate-data/coralox.avif.b64.txt` | `0f9941ea47bbcd850163965d885d3961c1a125b4` | Gegner-Intro, Battle Stage | VERIFIED |
| Nebulon Geister-Pirat | in diesem Wordbound-Battle-Entwicklungsstand erzeugtes Pirate-Art-Asset | `src/assets/pirate-data/nebulon.avif.b64.txt` | `c445fa5b5c93eb99aac8e9de91f6684cfcaf4ad6` | Gegner-Intro, Battle Stage | VERIFIED |
| Sturmkrab Gewitter-Pirat | in diesem Wordbound-Battle-Entwicklungsstand erzeugtes Pirate-Art-Asset | `src/assets/pirate-data/sturmkrab.avif.b64.txt` | `291f2f54a99a5e99a0aaea423635dfbc844d6783` | Gegner-Intro, Battle Stage | VERIFIED |
| Pirate-Art-Mapping | Release-Code | `src/game/pirate-art.js` | – | Zuordnung Tula / Coralox / Nebulon / Sturmkrab | VERIFIED |
| Tula SVG/Data-URI Fallback | autorisierter V2.2-Chat-Quellbestand | `src/game/data.js` (`TULA_ASSET`) | – | Fallback, falls Pirate-Tula nicht dekodiert | RETAINED |
| Gegner-Vektor-Fallbacks | V2.2 UI-Vektoren | `src/game/ui.js` | – | Fallback für Coralox/Nebulon/Sturmkrab | RETAINED |
| Tula Anime SVG | V2.2 Quellbestand | `src/assets/tula-home-anime.svg` | – | lokale Referenz | VERIFIED |
| Meli Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/meli.webp` | `0702eb56dff70a0acdcfeeb0ed306cb547fe2577` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Neri Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/neri.webp` | `de74841ea826b99c5ea4c229c0897e3dab75e013` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Skippi Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/skippi.webp` | `03ac5b910271e9a7875ea2becab9b4f7099b2072` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Fino Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/fino.webp` | `7a190732f7ae251391397d4f29fc338998b830f9` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Helper-Sprite-Mapping | Release-Code | `src/game/helper-sprites.js` | – | Runtime-Zuordnung Meli/Neri/Skippi/Fino | VERIFIED |
| Helper-Sprite-/Mobile-Styles | Release-Code | `src/styles/helper-sprites.css` | – | Sprite-Darstellung + Mobile-Battle-Flow | VERIFIED |
| Arena-Hintergrund | CSS-generierte Tula-Farbwelt | `src/styles/part-01.css` | – | Battle Stage | VERIFIED |
| UI-/Layout-Styles | V2.2 + Helper-Release | `src/styles/part-01.css`, `part-02.css`, `part-03.css`, `helper-sprites.css` | – | gesamte Spieloberfläche | VERIFIED |

## Pirate-Art Runtime

Die neuen Pirate-Grafiken verändern ausschließlich die visuelle Darstellung. Gegner-IDs, HP, Fähigkeiten, Schwächenphasen, Schaden, Gegnerdruck und Lernlogik bleiben unverändert.

`src/main.js` installiert die neuen Bilder erst nach erfolgreichem `load`. Bis dahin bleiben die vorhandenen SVG-/Tula-Grafiken im DOM. Bei einem Bildfehler wird das neue Bild wieder entfernt und der vorherige Fallback bleibt erhalten.

Der Standalone-Generator lädt dieselben vier Asset-Daten vor `src/game/pirate-art.js`, damit `prototype.html` ohne Astro/Vite dieselbe Pirate-Art verwenden kann.

## Netzwerk-/404-Status

Die Pirate-Grafiken werden als lokale AVIF-Data-URIs aus den vier Base64-Dateien erzeugt. Sie benötigen keine externen Bild-URLs und erzeugen daher keine zusätzliche Netzwerkabhängigkeit.

Finales Gate für Game-Code-SHA `c7eac9c7ec94b4420fc4961b6fa006736a982e4b`:
- 19/19 Engine Tests: PASS
- Astro Build: PASS
- Standalone-Fallback: PASS
- Struktur-Audit: PASS
- alle vier Pirate-AVIFs in Chromium dekodiert: PASS
- alle vier Pirate-AVIFs in WebKit dekodiert: PASS
- Pirate-Tula im Intro / Guide / Battle-Wartezustand: PASS
- Pirate-Gegner im Intro und Battle Stage: PASS
- iPhone-nah WebKit 390×844: PASS
- Chromium iPhone/Android/Desktop: PASS
- Live-Startseite HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Asset-URLs ohne 404: PASS
- Browser-E2E ohne 404-Responses: PASS
- Browser-E2E ohne JavaScript/Page-Errors: PASS
- kein horizontaler Overflow: PASS
- keine Überlagerung Aktiver Gehilfe / Tula-Guide: PASS
- finale Pirate-Mobile-Screenshots in Chromium und WebKit visuell kontrolliert: PASS

Maschinenlesbarer Live-Verifikationsrecord: `docs/LIVE_STATUS.json`  
Live-Verifikationsrecord-Commit: `49a62d9242956ab2223927db8c215f89cd861ab1`

## Source of Truth

- GitHub = Runtime-/Web-Assets dieses eigenständigen Spiels.
- Die hochauflösenden Erzeugungsbilder stammen aus dem aktuellen Wordbound-Battle-Entwicklungsprozess; für die Runtime wurden kompakte 192×192-AVIF-Daten verwendet.
- Die alten Tula-/Gegner-Vektoren bleiben bewusst als technische Fallbacks erhalten und werden nicht gelöscht.

## Migrationshinweis

Im `tulasisland`-Source wurde keine eigenständige Wordbound-Battle-Assetkopie identifiziert. Deshalb war kein Asset aus `tulasisland` zu löschen.
