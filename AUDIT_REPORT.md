# Wordbound Battle V2.2 – Migration Audit

## Scope
Nur `o-some/wordbound-battle`. Keine anderen Spiele-Repositories werden durch diese Migration verändert.

## Referenzen
- Source reference: `o-some/tulasisland@892f676fbcef77ab49373aef7865d60afba0ebb7`
- autorisierter Spielquellbestand: V2.2 aus diesem Chat
- Source rollback: `pre-extraction-wordbound-battle`
- Target rollback: `pre-migration-wordbound-v2-2`

## Vorabprüfung
- Engine: 19/19 PASS
- Standalone-Erzeugung: PASS
- Struktur-Audit: PASS

## Architektur
- modularer Game-Core unter `src/game/`
- Vite-Entry `src/main.js`
- Astro Wrapper `src/components/WordboundBattle.astro`
- Astro Seite `src/pages/index.astro`
- GitHub-Pages-Base `/wordbound-battle`
- Game-Core bleibt Capacitor-Host-kompatibel

## Migrations-Transformationen
- CSS in drei geordnete Teilmodule gesplittet; `src/styles.css` importiert sie in Originalreihenfolge.
- UI/Main wurden bei Connector-Übertragung textuell normalisiert. Deshalb gilt der Zielbestand erst nach CI + Browser-Gameplay als freigegeben.

## Pending Release Gate
Build, CI, GitHub Pages, Live HTTP, Browserkonsole, Asset-HTTP, Mobile/WebKit, Desktop und kompletter Gameplay-Smoke-Test müssen nach dem Migrationscommit erneut durchgeführt werden.

## Destruktive Änderungen
Keine Wordbound-Datei wurde aus `tulasisland` gelöscht. `REMOVE_OLD_COPY = FORBIDDEN`, bis sämtliche Gates bestanden sind.
