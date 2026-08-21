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
import { HELPER_SPRITES } from "./game/helper-sprites.js";
import { PIRATE_ENEMY_ASSETS, TULA_PIRATE_ASSET } from "./game/pirate-art.js";
import { render } from "./game/ui.js";

function spriteMap() {
  return typeof HELPER_SPRITES === "undefined" ? {} : HELPER_SPRITES;
}

function spriteUrl(asset) {
  if (typeof asset === "string") return asset;
  if (asset && typeof asset === "object" && typeof asset.src === "string") return asset.src;
  return null;
}

function helperById(state, id) {
  return state.helperRoster.find((helper) => helper.id === id) || null;
}

function spriteImage(helper, className = "helper-sprite") {
  const asset = helper ? spriteMap()[helper.id] : null;
  const src = spriteUrl(asset);
  if (!src) return null;
  const img = document.createElement("img");
  img.src = src;
  img.alt = helper.name;
  img.className = className;
  img.decoding = "async";
  img.draggable = false;
  return img;
}

function replaceSvgWithSprite(container, helper, className) {
  const asset = helper ? spriteMap()[helper.id] : null;
  if (!container || !helper || !spriteUrl(asset)) return;
  container.querySelector("svg")?.remove();
  if (!container.querySelector(".helper-sprite")) {
    const img = spriteImage(helper, className);
    if (img) container.prepend(img);
  }
}

function installPirateArt(container, src, alt, className, layout = {}) {
  if (!container || !src) return;
  const marker = className.split(" ")[0];
  if (container.querySelector(`.${marker}`)) return;

  const fallbackNodes = [...container.children].filter((node) => node.matches?.("svg, img"));
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = className;
  img.decoding = "async";
  img.draggable = false;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.display = "block";
  img.style.objectFit = "contain";
  img.style.opacity = "0";
  img.style.transition = "opacity 120ms ease";
  Object.assign(img.style, layout);

  const reveal = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    fallbackNodes.forEach((node) => node.remove());
    img.style.opacity = "1";
    container.dataset.pirateArtReady = "true";
  };
  const restoreFallback = () => {
    img.remove();
    delete container.dataset.pirateArtReady;
  };

  img.addEventListener("load", reveal, { once: true });
  img.addEventListener("error", restoreFallback, { once: true });
  container.prepend(img);
  if (img.complete) reveal();
}

function enemyArtKey(state) {
  return state?.enemy?.id || state?.enemy?.avatar || null;
}

function installEnemyPirateArt(container, state, className) {
  const key = enemyArtKey(state);
  const src = key ? PIRATE_ENEMY_ASSETS[key] : null;
  installPirateArt(container, src, state?.enemy?.name || "Piratengegner", className, {
    filter: "drop-shadow(0 18px 28px rgba(0,0,0,.28))",
    maxWidth: container?.classList.contains("enemy-avatar-wrap") ? "92%" : "100%",
    maxHeight: container?.classList.contains("enemy-avatar-wrap") ? "92%" : "100%",
    transform: container?.classList.contains("enemy-avatar-wrap") ? "translateY(4px)" : "none",
    margin: "0 auto",
  });
}

function installTulaPirateArt(container, className = "tula-pirate-sprite") {
  installPirateArt(container, TULA_PIRATE_ASSET, "Piraten-Tula", className, {
    filter: "drop-shadow(0 16px 26px rgba(0,0,0,.22))",
    transform: "translateY(2px)",
    margin: "0 auto",
  });
}

function battleStepGuide(state) {
  const step = state.turnStep === "choose" ? 1 : state.turnStep === "question" ? 2 : 3;
  const task = state.question?.type === "sentence" ? "Satz bauen" : "Wort lösen";
  const hint = step === 1
    ? "Tippe unten auf einen Gehilfen. Grün markiert = beste Wahl gegen die aktuelle Schwäche."
    : step === 2
      ? `Löse jetzt ${state.question?.type === "sentence" ? "den Satz" : "das Wort"}, um deinen Angriff auszuführen.`
      : state.turnStep === "result"
        ? "Dein Angriff ist beendet. Jetzt folgt der angekündigte Gegnerzug."
        : "Danach beginnt die nächste Runde und du wählst dein Teammitglied erneut.";
  return `<div class="mobile-battle-steps" aria-label="Kampfschritte">
    <div class="mobile-step ${step === 1 ? "is-active" : "is-done"}"><b>1</b><span>Gehilfe wählen</span></div>
    <div class="mobile-step ${step === 2 ? "is-active" : step > 2 ? "is-done" : ""}"><b>2</b><span>${task}</span></div>
    <div class="mobile-step ${step === 3 ? "is-active" : ""}"><b>3</b><span>Gegnerzug</span></div>
    <p>${hint}</p>
  </div>`;
}

function enhanceRenderedUi(app, state) {
  app.querySelectorAll("[data-helper]").forEach((card) => {
    const helper = helperById(state, card.dataset.helper);
    replaceSvgWithSprite(card.querySelector(".helper-avatar"), helper, "helper-sprite helper-sprite-card");
  });

  const activeHelper = helperById(state, state.activeHelperId || state.selectedHelperId);
  replaceSvgWithSprite(
    app.querySelector(".helper-avatar-large:not(.is-tula-waiting)"),
    activeHelper,
    "helper-sprite helper-sprite-active",
  );
  replaceSvgWithSprite(
    app.querySelector(".selected-helper-mini"),
    helperById(state, state.selectedHelperId),
    "helper-sprite helper-sprite-mini",
  );

  installTulaPirateArt(app.querySelector(".tula-portrait"), "tula-pirate-sprite tula-pirate-sprite-intro");
  installTulaPirateArt(app.querySelector(".tula-mini"), "tula-pirate-sprite tula-pirate-sprite-guide");
  installTulaPirateArt(app.querySelector(".helper-avatar-large.is-tula-waiting"), "tula-pirate-sprite tula-pirate-sprite-waiting");
  installEnemyPirateArt(app.querySelector(".enemy-intro-avatar"), state, "enemy-pirate-sprite enemy-pirate-sprite-intro");
  installEnemyPirateArt(app.querySelector(".enemy-avatar-wrap"), state, "enemy-pirate-sprite enemy-pirate-sprite-battle");

  const actionArea = app.querySelector(".v2-action-area");
  if (actionArea && state.phase === "battle") {
    actionArea.insertAdjacentHTML("afterbegin", battleStepGuide(state));
  }

  if (state.turnStep === "choose") {
    const teamHeadline = app.querySelector(".team-panel-head b");
    const teamHint = app.querySelector(".team-panel-head small");
    if (teamHeadline) teamHeadline.textContent = "Tippe auf einen Gehilfen";
    if (teamHint) teamHint.textContent = "✓ Grün = passend · ⚡ Energie beachten";
  }
}

/** Mounts one self-contained Wordbound Battle instance into a host element. */
export function mountWordboundBattle(rootOrSelector = "#app", options = {}) {
  const app = typeof rootOrSelector === "string" ? document.querySelector(rootOrSelector) : rootOrSelector;
  if (!app) throw new Error("Wordbound Battle mount target not found.");
  if (app.dataset.wordboundMounted === "true") return app.__wordboundBattleApi;
  const state = createInitialState();
  if (Number.isFinite(options.initialXp)) state.xp = Math.max(0, Number(options.initialXp));
  if (Number.isFinite(options.initialShells)) state.shells = Math.max(0, Number(options.initialShells));
  let destroyed = false;
  function paint() {
    if (destroyed) return;
    app.innerHTML = `<div class="wordbound-battle">${render(state)}</div>`;
    enhanceRenderedUi(app, state);
    wireEvents();
  }
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
