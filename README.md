# Tula’s Island – Wordbound Battle

Eigenständiges Repository für **Wordbound Battle**, ein rundenbasiertes Sprachlern-RPG aus Tula’s Island.

## Spielprinzip

Der Spieler wählt pro Runde einen Gehilfen, berücksichtigt die aktuelle Gegner-Schwäche und löst danach eine Sprachaufgabe. Richtige Antworten erzeugen Angriffe; Fehler erhöhen den Gegnerdruck. Satzbau-Runden ergänzen die klassischen Wortübersetzungen.

## Aktueller Funktionsstand

- Gehilfenwahl pro Runde: Meli, Neri, Skippi, Fino
- Energie + Regeneration auf der Bank
- wechselnde Gegner-Schwächen
- getrennte Spieler- und Gegnerzüge
- Gegnerdruck und echte Niederlage
- Wortübersetzungen
- Satzbau-Aufgaben
- Deutsch / Englisch / Spanisch / Griechisch
- XP, Muscheln, Combo
- Pause / Resume
- Mobile- und Desktop-Layout

## Stack

- Astro 7
- Vite 8
- Vanilla JavaScript / ESM
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

## Build

```bash
npm run build
```

Astro-Ausgabe: `dist-astro/`  
Vite-Ausgabe: `dist/`

## Deployment

GitHub Pages wird über `.github/workflows/pages.yml` aus `main` gebaut und deployt.

Geplante Live-URL:

`https://o-some.github.io/wordbound-battle/`

Pages muss im Repository unter **Settings → Pages → Source: GitHub Actions** aktiviert sein.

## Host-Integration

Der Game-Core kann über `mountWordboundBattle(root, options)` in einen bestehenden Host eingebettet werden. Fortschrittsereignisse:

- `tulas:wordbound:reward`
- `tulas:wordbound:state`

Siehe auch `CAPACITOR_INTEGRATION.md`.

## Migration

Die Repo-Migration wird in `docs/MIGRATION_RECORD.md` dokumentiert. Solange die dort genannten Release-Gates nicht vollständig bestanden sind, darf aus `o-some/tulasisland` nichts im Zusammenhang mit Wordbound Battle gelöscht werden.
