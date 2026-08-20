import "./styles.css";
import { createInitialState } from "./game/state.js";
import {
  advanceTurn,
  deployHelper,
  nextEnemy,
  resolveAnswer,
  resolveEnemyTurn,
  resolveSentenceAnswer,
  resetSentenceTokens,
  restartBattle,
  selectHelper,
  selectSentenceToken,
  setLanguages,
  undoSentenceToken,
  startBattle,
} from "./game/engine.js";
import { render } from "./game/ui.js";

/** Mounts one self-contained Wordbound Battle instance into a host element. */
export function mountWordboundBattle(rootOrSelector = "#app", options = {}) {
  const app = typeof rootOrSelector === "string" ? document.querySelector(rootOrSelector) : rootOrSelector;
  if (!app) throw new Error("Wordbound Battle mount target not found.");
  if (app.dataset.wordboundMounted === "true") return app.__wordboundBattleApi;
  const state = createInitialState();
  if (Number.isFinite(options.initialXp)) state.xp = Math.max(0, Number(options.initialXp));
  if (Number.isFinite(options.initialShells)) state.shells = Math.max(0, Number(options.initialShells));
  let destroyed = false;
  function paint() { if (destroyed) return; app.innerHTML = `<div class="wordbound-battle">${render(state)}</div>`; wireEvents(); }
  function emitProgress(beforeXp, beforeShells) {
    const xpDelta = state.xp - beforeXp, shellsDelta = state.shells - beforeShells;
    if (!xpDelta && !shellsDelta) return;
    const detail = { xpDelta, shellsDelta, xp: state.xp, shells: state.shells, phase: state.phase };
    app.dispatchEvent(new CustomEvent("tulas:wordbound:reward", { detail, bubbles: true }));
    if (typeof options.onReward === "function") options.onReward(detail);
  }
  function emitStateChange(action) {
    const detail = { action, state };
    app.dispatchEvent(new CustomEvent("tulas:wordbound:state", { detail, bubbles: true }));
    if (typeof options.onStateChange === "function") options.onStateChange(detail);
  }
  function wireEvents() {
    app.querySelectorAll("[data-helper]").forEach((button) => button.addEventListener("click", () => { selectHelper(state, button.dataset.helper); emitStateChange("select-helper"); paint(); }));
    app.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => { const beforeXp=state.xp,beforeShells=state.shells; resolveAnswer(state, button.dataset.answer); emitProgress(beforeXp,beforeShells); emitStateChange("resolve-answer"); paint(); }));
    app.querySelectorAll("[data-sentence-token]").forEach((button) => button.addEventListener("click", () => { selectSentenceToken(state, button.dataset.sentenceToken); emitStateChange("select-sentence-token"); paint(); }));
    app.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
      const beforeXp=state.xp,beforeShells=state.shells;
      switch(button.dataset.action){
        case "start": startBattle(state); break;
        case "deploy-helper": deployHelper(state); break;
        case "sentence-undo": undoSentenceToken(state); break;
        case "sentence-reset": resetSentenceTokens(state); break;
        case "sentence-submit": resolveSentenceAnswer(state); break;
        case "enemy-turn": resolveEnemyTurn(state); break;
        case "next-turn": advanceTurn(state); break;
        case "next-enemy": nextEnemy(state); break;
        case "restart": restartBattle(state); break;
        case "settings": state.settingsOpen=true; state.settingsError=null; break;
        case "close-settings": state.settingsOpen=false; state.settingsError=null; break;
        case "pause": state.paused=true; break;
        case "resume": state.paused=false; break;
        case "apply-languages": {
          const source=app.querySelector('[data-role="source-language"]')?.value;
          const target=app.querySelector('[data-role="target-language"]')?.value;
          if(!source||!target){state.settingsError="Bitte beide Sprachen auswählen.";break;}
          if(source===target){state.settingsError="Ausgangs- und Zielsprache müssen verschieden sein.";break;}
          if(setLanguages(state,source,target)){state.settingsError=null;state.settingsOpen=false;}
          break;
        }
        default: break;
      }
      emitProgress(beforeXp,beforeShells); emitStateChange(button.dataset.action); paint();
    }));
  }
  const api={state,repaint:paint,destroy(){destroyed=true;app.innerHTML="";delete app.dataset.wordboundMounted;delete app.__wordboundBattleApi;}};
  app.dataset.wordboundMounted="true"; app.__wordboundBattleApi=api; paint(); return api;
}
function autoMount(){ const roots=[...document.querySelectorAll("[data-wordbound-battle-root]")]; const defaultRoot=document.querySelector("#app"); if(defaultRoot&&!roots.includes(defaultRoot))roots.push(defaultRoot); roots.forEach((root)=>{if(root.dataset.wordboundMounted!=="true")mountWordboundBattle(root);}); }
if(typeof document!=="undefined"){ if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",autoMount,{once:true}); else autoMount(); }
