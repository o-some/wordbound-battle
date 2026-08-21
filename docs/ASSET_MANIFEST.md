# Asset Manifest – Wordbound Battle

Aktueller Release-Stand: 21.08.2026

| Asset | Quelle | Repo-Pfad | Git-Blob | Verwendet in | Status |
|---|---|---|---|---|---|
| Tula Runtime-Maskottchen | autorisierter V2.2-Chat-Quellbestand | `src/game/data.js` (`TULA_ASSET`) | – | Intro, Guide, Arena | VERIFIED |
| Tula Anime SVG | V2.2 Quellbestand | `src/assets/tula-home-anime.svg` | – | lokale Referenz / künftige Runtime-Entkopplung | VERIFIED |
| Meli Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/meli.webp` | `0702eb56dff70a0acdcfeeb0ed306cb547fe2577` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Neri Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/neri.webp` | `de74841ea826b99c5ea4c229c0897e3dab75e013` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Skippi Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/skippi.webp` | `03ac5b910271e9a7875ea2becab9b4f7099b2072` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Fino Produktionssprite | freigegebenes lokales WebP | `src/assets/helpers/fino.webp` | `7a190732f7ae251391397d4f29fc338998b830f9` | Teamkarte, Auswahl, aktiver Kampfbereich | BYTE-VERIFIED |
| Helper-Sprite-Mapping | Release-Code | `src/game/helper-sprites.js` | – | Runtime-Zuordnung Meli/Neri/Skippi/Fino | VERIFIED |
| Helper-Sprite-/Mobile-Styles | Release-Code | `src/styles/helper-sprites.css` | – | Sprite-Darstellung + Mobile-Battle-Flow | VERIFIED |
| Coralox | V2.2 UI-Vektor | `src/game/ui.js` | – | Gegner/Arena | VERIFIED |
| Nebulon | V2.2 UI-Vektor | `src/game/ui.js` | – | Gegner/Arena | VERIFIED |
| Sturmkrab | V2.2 UI-Vektor | `src/game/ui.js` | – | Gegner/Arena | VERIFIED |
| Arena-Hintergrund | CSS-generierte Tula-Farbwelt | `src/styles/part-01.css` | – | Battle Stage | VERIFIED |
| UI-/Layout-Styles | V2.2 + Helper-Release | `src/styles/part-01.css`, `part-02.css`, `part-03.css`, `helper-sprites.css` | – | gesamte Spieloberfläche | VERIFIED |

## Netzwerk-/404-Status
Wordbound Battle V2.2 benötigt zur Laufzeit keine externen Bild- oder Audio-URLs. Kritische Grafikbestandteile sind lokal, inline oder als Data-URI eingebettet. Die vier Gehilfen-Sprites werden als lokale WebP-Assets vom Astro/Vite-Build ausgegeben.

Finales Gate für Game-Code-SHA `e3f5f16782ed2fa2769b6ffefd79af5cbb225133`:
- 19/19 Engine Tests: PASS
- Astro Build: PASS
- Standalone-Fallback: PASS
- Struktur-Audit: PASS
- vier Helper-WebP-Assets im Build: PASS
- Live-Startseite HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Asset-URLs ohne 404: PASS
- Browser-E2E ohne 404-Responses: PASS
- Browser-E2E ohne JavaScript/Page-Errors: PASS
- WebKit iPhone-nah 390×844: PASS
- Chromium iPhone/Android/Desktop: PASS
- kein horizontaler Overflow: PASS
- keine Überlagerung Aktiver Gehilfe / Tula-Guide: PASS
- finale CI-Screenshots visuell kontrolliert: PASS

Maschinenlesbarer Live-Verifikationsrecord: `docs/LIVE_STATUS.json`  
Release-Record-Commit: `0067189a19e047c00f62c5d4634e9a9ed7fb6a24`

## Source of Truth
- Dropbox = Master-/Original-Assets, sofern Produktionsgrafiken dort gepflegt werden.
- GitHub = Runtime-/Web-Assets dieses eigenständigen Spiels.
- Für den aktuellen Helper-Release wurden die Git-Blobs vor dem Merge gegen die freigegebenen lokalen WebP-Dateien bytegenau verifiziert.

## Migrationshinweis
Im `tulasisland`-Source wurde keine eigenständige Wordbound-Battle-Assetkopie identifiziert. Deshalb war kein Asset aus `tulasisland` zu löschen.
