# Projekt
Tula’s Island – Wordbound Battle

# Zweck
Eigenständiges, rundenbasiertes Sprachlern-RPG für Tula’s Island. Der Spieler wählt pro Runde einen Gehilfen und verdient jede relevante Kampfaktion durch eine Sprachaufgabe.

# Aktuelle Version
V2.2 / Repository-Version `1.0.0-migrated`.

# Letzte getestete Commit-SHA
Wird nach bestandenem GitHub-Pages-/Live-Gate auf die finale Test-SHA gesetzt. Während der Migration ist `REMOVE_OLD_COPY = FORBIDDEN`.

# Framework
- Astro 7
- Vite 8
- Vanilla JavaScript / ESM
- statischer GitHub-Pages-Build
- Capacitor-kompatibler Game-Core für den bestehenden Tula’s-Island-Host

# Plattformen
- iOS Safari / WebKit: zu prüfen im Release-Gate
- Android Chrome: zu prüfen bzw. begründet ausstehend
- Desktop Chrome: zu prüfen
- Desktop Safari/WebKit: soweit verfügbar zu prüfen

# Designregeln
- Mobile first
- Tula’s-Island Anime-/Adventure-Look
- Deep Navy / Ocean Blue / Türkis / Gold / Creme
- Lerninhalt bleibt wichtiger als Action
- große Touch-Ziele und klare Lesbarkeit
- keine unnötigen Effekte während des Lesens
- keine funktionierende Mechanik ohne ausdrückliche Anweisung entfernen

# Aktueller Funktionsstand
- Gehilfen Meli, Neri, Skippi, Fino
- aktive Gehilfenwahl pro Runde
- Energie + Bank-Regeneration
- wechselnde Gegner-Schwächen
- Gegner Coralox, Nebulon, Sturmkrab
- getrennte Spieler- und Gegnerzüge
- Gegnerdruck mit echter Niederlage
- Wortübersetzung
- Satzbau jede dritte Runde
- DE / EN / ES / EL
- XP / Muscheln / Combo
- Pause / Resume
- Sieg / Niederlage / Neustart / nächster Gegner

# Bekannte Fehler / offene Gates
- Live-/Pages-Gate muss nach dem Migrationscommit vollständig ausgeführt werden.
- Ein physisches iPhone steht dieser Session nicht direkt zur Verfügung; WebKit + iPhone-Viewport wird technisch geprüft, ein physischer Gerätetest wird nur als PASS markiert, wenn er tatsächlich erfolgt.
- `src/styles.css` wurde bei der Migration in drei geordnete CSS-Teilmodule aufgeteilt. Reihenfolge und Scoping müssen im Build-/Browser-Gate bestätigt werden.

# Nächste Schritte
1. Migrationscommit erstellen.
2. CI/Build prüfen.
3. GitHub Pages prüfen.
4. Live-URL, Reload, Browserkonsole und Assets prüfen.
5. Mobile/Desktop-Gameplay prüfen.
6. Dokumentation mit letzter getesteter SHA aktualisieren.
7. Erst bei vollständigem Gate über alte Kopie entscheiden.

# Wichtige Dateien
- `src/game/data.js`
- `src/game/state.js`
- `src/game/engine.js`
- `src/game/ui.js`
- `src/game/engine.test.mjs`
- `src/main.js`
- `src/styles.css`
- `src/styles/part-01.css`
- `src/styles/part-02.css`
- `src/styles/part-03.css`
- `src/pages/index.astro`
- `.github/workflows/pages.yml`

# Do-not-touch-Bereiche
- Keine anderen Spiele-Repositories.
- `o-some/tulasisland` nur nach den Migrations-Gates und nur Wordbound-spezifisch ändern.
- Kein Force-Push.

# Assets
- V2.2 nutzt Tula zur Laufzeit als eingebettete SVG/Data-URI in `src/game/data.js`.
- Zusätzlich ist `src/assets/tula-home-anime.svg` als nachvollziehbare lokale Quellkopie enthalten.
- Gegner/Gehilfen sind aktuell vektorbasierte Runtime-Grafiken in `src/game/ui.js` und haben keine externen Netzwerkabhängigkeiten.

# Deployment
- GitHub Pages URL: `https://o-some.github.io/wordbound-battle/`
- Workflow: `.github/workflows/pages.yml`
- Astro Base: `/wordbound-battle`

# Letzter erfolgreicher Test
Vor der Repo-Migration auf dem autorisierten V2.2-Quellbestand:
- Engine: 19/19 PASS
- Standalone-Generator: PASS
- Struktur-Audit: PASS
- vollständiger GitHub-Pages-/Live-Test: noch auszuführen

# Wichtige Regeln
- Vor jedem Write aktuellen `main` neu lesen.
- Kein Force-Push.
- Mobile immer mitprüfen.
- Vor großen Änderungen Sicherungspunkt beibehalten.
- Bei STOP CONDITION nichts aus `tulasisland` löschen.
