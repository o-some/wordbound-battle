# Capacitor-Integration

Wordbound Battle enthält bewusst **keine eigene native iOS-/Android-Shell**. Tula’s Island besitzt bereits den Capacitor-Host; das Minispiel bleibt ein Web-Modul und wird dort gemountet.

## Erwarteter Host

- bestehende Tula’s-Island-App baut Web-Assets in ihr vorhandenes `webDir`
- `src/main.js` exportiert `mountWordboundBattle(root)`
- alternativ kann ein Host-Element mit `data-wordbound-battle-root` automatisch gemountet werden
- Game-State und DOM hängen nicht von Browser-Routing oder einem Server-Backend ab

## Einbindung in den bestehenden Host

```js
import { mountWordboundBattle } from "./games/wordbound-battle/main.js";

const root = document.querySelector("#wordbound-battle");
const battle = mountWordboundBattle(root);
```

Der eigentliche Capacitor-App-Identifier und die vorhandene `capacitor.config.*` bleiben Eigentum der Haupt-App und werden hier absichtlich nicht dupliziert.
