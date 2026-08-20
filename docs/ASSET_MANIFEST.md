# Asset Manifest – Wordbound Battle

| Asset | Quelle | Repo-Pfad | Verwendet in | Status |
|---|---|---|---|---|
| Tula Runtime-Maskottchen | autorisierter V2.2-Chat-Quellbestand | `src/game/data.js` (`TULA_ASSET`) | Intro, Guide, Arena | COPIED |
| Tula Anime SVG | V2.2 Quellbestand | `src/assets/tula-home-anime.svg` | Referenz / künftige Runtime-Entkopplung | COPIED |
| Meli | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | COPIED |
| Neri | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | COPIED |
| Skippi | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | COPIED |
| Fino | V2.2 UI-Vektor | `src/game/ui.js` | Team/Arena | COPIED |
| Coralox | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | COPIED |
| Nebulon | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | COPIED |
| Sturmkrab | V2.2 UI-Vektor | `src/game/ui.js` | Gegner/Arena | COPIED |
| Arena-Hintergrund | CSS-generierte Tula-Farbwelt | `src/styles/part-01.css` | Battle Stage | COPIED |

## Netzwerk-/404-Risiko
V2.2 benötigt zur Laufzeit keine externen Bild- oder Audio-URLs. Kritische Grafikbestandteile sind lokal oder inline. Nach Deployment wird trotzdem geprüft, dass HTML/JS/CSS und lokale Assets HTTP 200 liefern und keine 404 in der Browserkonsole auftreten.

## Source of Truth
- Dropbox = Master-/Original-Assets, sofern später echte Produktionsgrafiken ergänzt werden.
- GitHub = Runtime-/Web-Assets.
