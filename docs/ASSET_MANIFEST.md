# Asset Manifest – Wordbound Battle

Finaler Migrationsstand: 20.08.2026

| Asset | Quelle | Repo-Pfad | Verwendet in | Status |
|---|---|---|---|---|
| Tula Runtime-Maskottchen | autorisierter V2.2-Chat-Quellbestand | `src/game/data.js` (`TULA_ASSET`) | Intro, Guide, Arena | VERIFIED |
| Tula Anime SVG | V2.2 Quellbestand | `src/assets/tula-home-anime.svg` | lokale Referenz / künftige Runtime-Entkopplung | VERIFIED |
| Meli | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | VERIFIED |
| Neri | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | VERIFIED |
| Skippi | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | VERIFIED |
| Fino | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | VERIFIED |
| Coralox | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | VERIFIED |
| Nebulon | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | VERIFIED |
| Sturmkrab | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | VERIFIED |
| Arena-Hintergrund | CSS-generierte Tula-Farbwelt | `src/styles/part-01.css` | Battle Stage | VERIFIED |
| UI-/Layout-Styles | V2.2 | `src/styles/part-01.css`, `part-02.css`, `part-03.css` | gesamte Spieloberfläche | VERIFIED |

## Netzwerk-/404-Status
Wordbound Battle V2.2 benötigt zur Laufzeit keine externen Bild- oder Audio-URLs. Kritische Grafikbestandteile sind lokal, inline oder als Data-URI eingebettet.

Finales Gate für Game-Code-SHA `06f731d0b9bac32d86fae074b0f169cb848fe4e1`:
- Astro HTML/JS/CSS ausgeliefert: PASS
- Live-Startseite HTTP 200: PASS
- Reload HTTP 200: PASS
- gleiche-Origin-Asset-URLs ohne 404: PASS
- Browser-E2E ohne 404-Responses: PASS
- Browser-E2E ohne JavaScript/Page-Errors: PASS
- WebKit iPhone-nah 390×844: PASS
- Chromium Mobile/Desktop: PASS

## Source of Truth
- Dropbox = Master-/Original-Assets, sofern später echte Produktionsgrafiken ergänzt werden.
- GitHub = Runtime-/Web-Assets dieses eigenständigen Spiels.

## Migrationshinweis
Im `tulasisland`-Source wurde keine eigenständige Wordbound-Battle-Assetkopie identifiziert. Deshalb war kein Asset aus `tulasisland` zu löschen.
