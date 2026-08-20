import { CATEGORIES, LANGUAGES, TULA_ASSET } from "./data.js";
import { getCurrentWeakness, getEnemyDamagePreview, getSelectedHelper } from "./engine.js";

function hpPercent(hp, maxHp) {
  return Math.max(0, Math.round((hp / maxHp) * 100));
}

function iconSvg(type) {
  const common = `viewBox="0 0 180 180" aria-hidden="true"`;
  const svg = {
    meli: `<svg ${common}><defs><linearGradient id="m1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffce78"/><stop offset="1" stop-color="#ff7f72"/></linearGradient></defs><ellipse cx="90" cy="144" rx="55" ry="14" fill="#00182a" opacity=".3"/><path d="M46 102c2-37 20-62 49-62 30 0 47 22 45 59-2 34-19 50-48 50-31 0-48-16-46-47Z" fill="url(#m1)"/><path d="M59 74c-18-18-12-43 8-51 1 18 9 28 25 32" fill="#75d488"/><path d="M75 74c2-22 19-37 39-38-4 17-14 29-29 38" fill="#43b875"/><circle cx="76" cy="99" r="7" fill="#102a3b"/><circle cx="113" cy="99" r="7" fill="#102a3b"/><path d="M82 119c8 7 19 7 27 0" fill="none" stroke="#102a3b" stroke-width="5" stroke-linecap="round"/><circle cx="72" cy="96" r="2" fill="#fff"/><circle cx="109" cy="96" r="2" fill="#fff"/></svg>`,
    skippi: `<svg ${common}><defs><linearGradient id="s1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#76efff"/><stop offset="1" stop-color="#4a8cff"/></linearGradient></defs><ellipse cx="90" cy="145" rx="56" ry="14" fill="#00182a" opacity=".3"/><path d="M43 102c0-37 21-63 49-63 31 0 49 24 46 62-2 31-19 48-47 48-31 0-48-16-48-47Z" fill="url(#s1)"/><path d="M47 80 22 65l13 32" fill="#8adff2"/><path d="m136 82 26-18-11 35" fill="#8adff2"/><path d="M79 67c6-13 20-20 34-16l-10 19Z" fill="#f6d06d"/><circle cx="75" cy="101" r="7" fill="#0d2437"/><circle cx="112" cy="101" r="7" fill="#0d2437"/><path d="M84 120c7 5 16 5 23-1" fill="none" stroke="#0d2437" stroke-width="5" stroke-linecap="round"/><path d="M92 78v17" stroke="#f6d06d" stroke-width="5" stroke-linecap="round"/></svg>`,
    neri: `<svg ${common}><defs><linearGradient id="n1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b6ef8d"/><stop offset="1" stop-color="#37b787"/></linearGradient></defs><ellipse cx="90" cy="145" rx="56" ry="14" fill="#00182a" opacity=".3"/><path d="M44 103c0-39 20-64 48-64 31 0 49 24 47 62-2 32-20 49-48 49-30 0-47-17-47-47Z" fill="url(#n1)"/><path d="M54 78c-19-5-28-17-27-35 18 1 31 10 39 27" fill="#57c578"/><path d="M83 58c4-23 17-38 39-41-1 20-11 35-29 45" fill="#6ddb81"/><path d="M118 66c18-10 34-7 46 8-14 13-29 16-46 8" fill="#48b777"/><circle cx="76" cy="101" r="7" fill="#102b35"/><circle cx="113" cy="101" r="7" fill="#102b35"/><path d="M84 120c8 6 17 6 24 0" fill="none" stroke="#102b35" stroke-width="5" stroke-linecap="round"/></svg>`,
    fino: `<svg ${common}><defs><linearGradient id="f1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe492"/><stop offset="1" stop-color="#d6a957"/></linearGradient></defs><ellipse cx="90" cy="145" rx="56" ry="14" fill="#00182a" opacity=".3"/><path d="M44 104c0-39 20-65 48-65 31 0 49 24 47 63-2 32-20 49-48 49-30 0-47-17-47-47Z" fill="url(#f1)"/><path d="M49 72 66 31l15 35" fill="#c38f52"/><path d="m106 65 18-36 17 44" fill="#c38f52"/><path d="M62 66h60" stroke="#fff1be" stroke-width="12" stroke-linecap="round" opacity=".75"/><circle cx="76" cy="102" r="7" fill="#382c24"/><circle cx="113" cy="102" r="7" fill="#382c24"/><path d="M84 121c8 5 17 5 24 0" fill="none" stroke="#382c24" stroke-width="5" stroke-linecap="round"/></svg>`,
    coralox: `<svg ${common}><defs><linearGradient id="c1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7697a"/><stop offset=".55" stop-color="#7c4fbd"/><stop offset="1" stop-color="#31447a"/></linearGradient></defs><ellipse cx="90" cy="151" rx="64" ry="13" fill="#00182a" opacity=".42"/><path d="M40 108C34 68 54 43 88 42c36-1 57 23 53 65-3 31-22 45-50 45-29 0-47-14-51-44Z" fill="url(#c1)"/><path d="M49 70 29 49l28 4-5-29 25 24M120 48l25-23-5 29 29-4-24 23" fill="none" stroke="#f08e8c" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M54 93c12-17 25-24 39-21 15 3 28 12 36 27" fill="none" stroke="#f6a487" stroke-width="10" stroke-linecap="round" opacity=".75"/><circle cx="73" cy="103" r="8" fill="#fff2c0"/><circle cx="113" cy="103" r="8" fill="#fff2c0"/><circle cx="73" cy="105" r="4" fill="#1a2235"/><circle cx="113" cy="105" r="4" fill="#1a2235"/><path d="M80 126c7-5 18-5 26 0" fill="none" stroke="#241b30" stroke-width="6" stroke-linecap="round"/></svg>`,
    nebulon: `<svg ${common}><defs><linearGradient id="nb1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8ef0ff"/><stop offset=".45" stop-color="#7490e8"/><stop offset="1" stop-color="#7b5fc1"/></linearGradient></defs><ellipse cx="90" cy="148" rx="65" ry="12" fill="#00182a" opacity=".35"/><path d="M19 89c20-41 52-57 76-51 24-6 55 11 69 54-25-13-41-10-51 8-10 18-26 34-31 34-6 0-21-16-30-35-9-18-19-22-33-10Z" fill="url(#nb1)"/><path d="M49 79c15-8 29-9 42-4M119 75c15 0 25 4 34 11" fill="none" stroke="#cef8ff" stroke-width="7" stroke-linecap="round" opacity=".8"/><circle cx="77" cy="86" r="6" fill="#11273f"/><circle cx="112" cy="86" r="6" fill="#11273f"/><path d="M86 103h15" stroke="#11273f" stroke-width="5" stroke-linecap="round"/></svg>`,
    sturmkrab: `<svg ${common}><defs><linearGradient id="st1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#6cdaf2"/><stop offset=".45" stop-color="#3a73ca"/><stop offset="1" stop-color="#5d3ca8"/></linearGradient></defs><ellipse cx="90" cy="149" rx="66" ry="13" fill="#00182a" opacity=".38"/><path d="M43 95c0-31 19-50 49-50 31 0 49 20 48 52-1 34-17 49-48 49-31 0-49-16-49-51Z" fill="url(#st1)"/><path d="M45 83 18 72l18 26-21 10 34 8M138 83l27-11-18 26 20 10-33 8" fill="none" stroke="#76d9f1" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="m83 27 15-21-3 21 16-6-22 26" fill="#ffe07a"/><circle cx="75" cy="99" r="7" fill="#fff0ad"/><circle cx="112" cy="99" r="7" fill="#fff0ad"/><circle cx="75" cy="101" r="3.5" fill="#11233e"/><circle cx="112" cy="101" r="3.5" fill="#11233e"/><path d="M82 122c8-4 17-4 25 0" fill="none" stroke="#11233e" stroke-width="6" stroke-linecap="round"/></svg>`,
  };
  return svg[type] || svg.meli;
}

function hpBar(hp, maxHp, label) {
  const pct = hpPercent(hp, maxHp);
  return `
    <div class="hp-row">
      <span>${label}</span>
      <strong>${hp}/${maxHp}</strong>
    </div>
    <div class="hp-track"><i style="width:${pct}%"></i></div>
  `;
}

function energyPips(helper, compact = false) {
  return `<span class="energy-pips ${compact ? "is-compact" : ""}" aria-label="${helper.energy} von ${helper.maxEnergy} Energie">${Array.from({ length: helper.maxEnergy }, (_, index) => `<i class="energy-pip ${index < helper.energy ? "is-full" : ""}"></i>`).join("")}</span>`;
}

function helperCard(state, helper) {
  const category = CATEGORIES[helper.category];
  const weakness = getCurrentWeakness(state);
  const selected = state.selectedHelperId === helper.id;
  const locked = state.turnStep !== "choose";
  const ko = helper.hp <= 0;
  const exhausted = helper.energy <= 0;
  const disabled = locked || ko || exhausted;
  const match = helper.category === weakness;
  const effectiveness = match ? "PASSEND · ×1,8" : "NORMAL · ×0,68";
  return `
    <button class="helper-card v2-helper ${selected ? "is-selected" : ""} ${match ? "is-match" : ""} ${ko ? "is-ko" : ""} ${exhausted && !ko ? "is-exhausted" : ""}" data-helper="${helper.id}" aria-pressed="${selected ? "true" : "false"}" aria-label="${helper.name}, ${category.label}, ${effectiveness}, Energie ${helper.energy} von ${helper.maxEnergy}" ${disabled ? "disabled" : ""}>
      <span class="helper-avatar">${iconSvg(helper.avatar)}</span>
      <span class="helper-copy">
        <span class="helper-name">${helper.name}</span>
        <span class="helper-role"><b>${category.icon}</b> ${category.label}</span>
        <span class="helper-effectiveness">${ko ? "K. O." : exhausted ? "ERSCHÖPFT" : effectiveness}</span>
      </span>
      <span class="helper-energy-row"><span class="energy-label">ENERGIE</span>${energyPips(helper, true)}</span>
      <span class="helper-mini-hp"><i style="width:${hpPercent(helper.hp, helper.maxHp)}%"></i></span>
    </button>`;
}

function answerOptions(state) {
  if (!state.question) return "";
  const locked = state.turnStep !== "question" || state.paused;
  return state.question.options.map((option) => {
    const isSelected = state.selectedAnswer === option.id;
    const isCorrect = state.lastOutcome && option.label === state.question.correct;
    const isWrongSelected = state.lastOutcome?.type === "wrong" && isSelected;
    const classNames = ["answer-btn", isSelected ? "is-selected" : "", isCorrect ? "is-correct" : "", isWrongSelected ? "is-wrong" : ""].filter(Boolean).join(" ");
    return `<button class="${classNames}" data-answer="${option.id}" ${locked ? "disabled" : ""}><span>${option.label}</span></button>`;
  }).join("");
}

function languageOptions(selected) {
  return Object.entries(LANGUAGES).map(([key, lang]) => `<option value="${key}" ${key === selected ? "selected" : ""}>${lang.flag} ${lang.label}</option>`).join("");
}

function weaknessPhaseDots(state) {
  return `<span class="phase-dots" aria-label="Gegnerphase ${state.enemy.weaknessPhaseIndex + 1} von ${state.enemy.weaknessPhases.length}">${state.enemy.weaknessPhases.map((phase, index) => `<i class="phase-dot ${index === state.enemy.weaknessPhaseIndex ? "is-active" : ""}" title="${CATEGORIES[phase.category].label}"></i>`).join("")}</span>`;
}

function introOverlay(state) {
  const weakness = CATEGORIES[getCurrentWeakness(state)];
  return `
    <div class="modal-backdrop">
      <section class="intro-card glass-panel" role="dialog" aria-modal="true">
        <div class="intro-badge">WORDBOUND BATTLE · V2.2</div>
        <div class="intro-vs">
          <div class="tula-portrait" aria-label="Tula"><img src="${TULA_ASSET}" alt="Tula" /></div>
          <span class="vs-mark">VS</span>
          <div class="enemy-intro-avatar">${iconSvg(state.enemy.avatar)}</div>
        </div>
        <h1>${state.enemy.name}</h1>
        <p>${state.enemy.intro}</p>
        <div class="rule-row"><span>1</span><b>Wähle jede Runde den Gehilfen neu.</b></div>
        <div class="rule-row"><span>2</span><b>Fehler erhöhen den Gegnerdruck und machen seine Treffer stärker.</b></div>
        <div class="rule-row"><span>3</span><b>Jede 3. Runde: ganzen Satz richtig bauen.</b></div>
        <div class="intro-weakness">Erste Schwäche: ${weakness.icon} <b>${weakness.label}</b></div>
        <button class="primary-btn" data-action="start">Kampf starten</button>
      </section>
    </div>`;
}

function victoryOverlay(state) {
  return `
    <div class="modal-backdrop">
      <section class="victory-card glass-panel" role="dialog" aria-modal="true">
        <div class="result-icon">✦</div>
        <span class="eyebrow">INSELKAMPF GEWONNEN</span>
        <h1>${state.enemy.name} besiegt!</h1>
        <p>Du hast dein Team gewechselt, Energie verwaltet und die Sprachschwächen genutzt.</p>
        <div class="reward-row"><span>+35 XP</span><span>+10 🐚</span></div>
        <button class="primary-btn" data-action="next-enemy">Nächste Insel</button>
      </section>
    </div>`;
}

function defeatOverlay() {
  return `
    <div class="modal-backdrop">
      <section class="victory-card defeat-card glass-panel" role="dialog" aria-modal="true">
        <div class="result-icon">☠</div>
        <span class="eyebrow">TEAM BESIEGT</span>
        <h1>Diesmal gewinnt der Gegner.</h1>
        <p>Zu viele Fehler lassen den Gegnerdruck steigen. Starte neu, baue den Druck mit richtigen Antworten ab und nutze dein Team taktischer.</p>
        <button class="primary-btn" data-action="restart">Kampf neu starten</button>
      </section>
    </div>`;
}

function settingsOverlay(state) {
  if (!state.settingsOpen) return "";
  return `
    <div class="modal-backdrop settings-layer">
      <section class="settings-card glass-panel" role="dialog" aria-modal="true" aria-label="Kampfsprachen">
        <div class="settings-head"><div><span class="eyebrow">SPRACHE</span><h2>Kampfsprachen</h2></div><button class="icon-btn" data-action="close-settings" aria-label="Schließen">×</button></div>
        <label>Ausgangssprache<select data-role="source-language">${languageOptions(state.sourceLang)}</select></label>
        <label>Zielsprache<select data-role="target-language">${languageOptions(state.targetLang)}</select></label>
        <p class="settings-note">DE, EN, ES und EL bleiben zentral im Wortmodell. Eine laufende Aufgabe behält beim Sprachwechsel dasselbe Zielwort bzw. denselben Satz.</p>
        ${state.settingsError ? `<p class="settings-error" role="alert">${state.settingsError}</p>` : ""}
        <button class="primary-btn" data-action="apply-languages">Übernehmen</button>
      </section>
    </div>`;
}

function pauseOverlay(state) {
  if (!state.paused) return "";
  return `
    <div class="modal-backdrop pause-layer">
      <section class="pause-card glass-panel" role="dialog" aria-modal="true" aria-label="Spiel pausiert">
        <div class="result-icon">⏸</div>
        <h2>Pausiert</h2>
        <p>Runde, Gehilfenwahl, Energie, HP, Frage, Gegnerzug, XP und Combo bleiben exakt erhalten.</p>
        <button class="primary-btn" data-action="resume">Weiter</button>
      </section>
    </div>`;
}

function choosePanel(state) {
  const selected = state.helperRoster.find((entry) => entry.id === state.selectedHelperId);
  const weakness = CATEGORIES[getCurrentWeakness(state)];
  if (!selected) {
    return `
      <div class="strategy-panel choose-panel">
        <div class="strategy-kicker">DEINE ENTSCHEIDUNG</div>
        <h3>Welchen Gehilfen schickst du?</h3>
        <p>Suche unten nach <b>${weakness.icon} ${weakness.label}</b>. Ein passender Gehilfe verursacht deutlich mehr Schaden.</p>
        <div class="choose-arrow">↓ TEAM AUSWÄHLEN</div>
      </div>`;
  }
  const category = CATEGORIES[selected.category];
  const match = selected.category === getCurrentWeakness(state);
  return `
    <div class="strategy-panel choose-panel has-selection ${match ? "is-good-choice" : ""}">
      <div class="selected-helper-mini">${iconSvg(selected.avatar)}</div>
      <div class="selected-helper-copy">
        <div class="strategy-kicker">AUSGEWÄHLT</div>
        <h3>${selected.name} · ${category.icon} ${category.label}</h3>
        <p>${match ? "Perfekter Konter gegen die aktuelle Schwäche." : "Kann angreifen, aber der Treffer ist deutlich schwächer."}</p>
        <div class="selected-energy">${energyPips(selected)} <span>${selected.energy}/${selected.maxEnergy} Energie</span></div>
      </div>
      <button class="deploy-btn" data-action="deploy-helper">${match ? "Gehilfen einsetzen · SUPEREFFEKTIV" : "Gehilfen trotzdem einsetzen"}</button>
    </div>`;
}

function sentenceQuestionPanel(state, source, target, helper, category) {
  const selectedIds = state.question?.selectedTokenIds || [];
  const selectedTokens = selectedIds
    .map((id) => state.question.tokens.find((token) => token.id === id))
    .filter(Boolean);
  const selectedSet = new Set(selectedIds);
  const complete = selectedIds.length === state.question.tokens.length;
  const builtSentence = selectedTokens.length
    ? selectedTokens.map((token) => token.label).join(" ")
    : "Tippe die Wörter unten in der richtigen Reihenfolge an …";

  return `
    <div class="question-card v2-question sentence-question">
      <div class="question-topline"><span>🔥 SATZ-CHALLENGE · RUNDE ${state.round}</span><span>${category.icon} ${helper.name} · Fehler = +2 Gegnerdruck</span></div>
      <div class="question-copy sentence-source">
        <span>Baue den ganzen Satz auf ${target.label}</span>
        <strong>${state.question?.prompt || "…"}</strong>
        <small>${source.flag} ${source.label} → ${target.flag} ${target.label}</small>
      </div>
      <div class="sentence-build-zone ${selectedTokens.length ? "has-words" : ""}" aria-live="polite">
        <span class="sentence-build-label">DEIN SATZ</span>
        <div class="sentence-built">${builtSentence}</div>
      </div>
      <div class="sentence-token-bank" aria-label="Wörter für den Satz">
        ${state.question.tokens.map((token) => `<button class="sentence-token ${selectedSet.has(token.id) ? "is-used" : ""}" data-sentence-token="${token.id}" ${selectedSet.has(token.id) ? "disabled" : ""}>${token.label}</button>`).join("")}
      </div>
      <div class="sentence-actions">
        <button class="sentence-secondary" data-action="sentence-undo" ${selectedTokens.length ? "" : "disabled"}>↶ Letztes Wort</button>
        <button class="sentence-secondary" data-action="sentence-reset" ${selectedTokens.length ? "" : "disabled"}>Neu ordnen</button>
        <button class="sentence-submit" data-action="sentence-submit" ${complete ? "" : "disabled"}>Satz prüfen ${complete ? "→" : `· ${selectedTokens.length}/${state.question.tokens.length}`}</button>
      </div>
    </div>`;
}

function questionPanel(state, source, target, helper) {
  const category = CATEGORIES[helper.category];
  if (state.question?.type === "sentence") return sentenceQuestionPanel(state, source, target, helper, category);
  return `
    <div class="question-card v2-question">
      <div class="question-topline"><span>GEHILFE FEST EINGESETZT</span><span>${category.icon} ${helper.name} · Fehler = +1 Gegnerdruck</span></div>
      <div class="question-copy">
        <span>Übersetze für ${helper.skill}</span>
        <strong>${state.question?.prompt || "…"}</strong>
        <small>${source.flag} ${source.label} → ${target.flag} ${target.label}</small>
      </div>
      <div class="answer-grid">${answerOptions(state)}</div>
    </div>`;
}

function resultPanel(state, helper) {
  const correct = state.lastOutcome?.type === "correct";
  const shifted = state.lastOutcome?.weaknessChanged;
  const sentence = state.question?.type === "sentence";
  const newWeakness = CATEGORIES[getCurrentWeakness(state)];
  const preview = getEnemyDamagePreview(state);
  return `
    <div class="strategy-panel result-panel ${correct ? "is-success" : "is-error"}">
      <div class="result-word-row"><span>${correct ? "✓ RICHTIG" : "✕ FALSCH"}${sentence ? " · SATZ" : ""}</span><b>${state.question.prompt} → ${state.question.correct}</b></div>
      <h3>${correct ? (sentence ? "Satz-Challenge geschafft!" : state.lastOutcome.helperMatchesWeakness ? "Supereffektiver Sprachangriff!" : "Sprachangriff trifft") : "Der Gegnerdruck steigt!"}</h3>
      <p>${correct
        ? `${helper.name} verursacht ${state.lastOutcome.damage} Schaden. Gegnerdruck: ${state.pressure}/${state.maxPressure}.`
        : `Merke dir „${state.question.correct}“. ${sentence ? "Satzfehler erhöhen" : "Fehler erhöht"} den Gegnerdruck auf ${state.pressure}/${state.maxPressure}.`}</p>
      ${shifted ? `<div class="phase-shift-banner">⚡ PANZERPHASE GEBROCHEN · Neue Schwäche: <b>${newWeakness.icon} ${newWeakness.label}</b></div>` : ""}
      <div class="enemy-turn-preview ${state.pressure >= 3 ? "is-danger" : ""}"><span>NÄCHSTER SCHRITT</span><b>${state.enemyIntent.icon} ${state.enemy.name}: ${state.enemyIntent.name}</b><small>${preview.min}–${preview.max} HP${preview.bonus ? ` · +${preview.bonus} Druckbonus` : ""}</small></div>
      <button class="enemy-turn-btn" data-action="enemy-turn">Gegnerzug ausführen <span>→</span></button>
    </div>`;
}

function enemyResultPanel(state, helper) {
  const outcome = state.enemyOutcome;
  return `
    <div class="strategy-panel enemy-result-panel">
      <div class="enemy-result-icon">${outcome.icon}</div>
      <div>
        <div class="strategy-kicker">GEGNERZUG · DRUCK ${state.pressure}/${state.maxPressure}</div>
        <h3>${state.enemy.name} · ${outcome.attack}</h3>
        <p>${helper.name} verliert <b>${outcome.damage} HP</b>${outcome.pressureBonus ? ` – davon <b>+${outcome.pressureBonus}</b> durch Gegnerdruck.` : "."} ${outcome.ko ? `${helper.name} ist K. O. und fällt aus.` : "Die Bank regeneriert Energie."}</p>
      </div>
      <button class="next-turn-btn" data-action="next-turn">Neue Runde · Gehilfen neu wählen <span>→</span></button>
    </div>`;
}

function mainActionPanel(state, source, target, helper) {
  if (state.turnStep === "choose") return choosePanel(state);
  if (state.turnStep === "question") return questionPanel(state, source, target, helper);
  if (state.turnStep === "result") return resultPanel(state, helper);
  if (state.turnStep === "enemy-result") return enemyResultPanel(state, helper);
  return "";
}

export function render(state) {
  const helper = getSelectedHelper(state);
  const weakness = CATEGORIES[getCurrentWeakness(state)];
  const source = LANGUAGES[state.sourceLang];
  const target = LANGUAGES[state.targetLang];
  const phase = state.enemy.weaknessPhases[state.enemy.weaknessPhaseIndex];
  const enemyHit = state.lastOutcome?.type === "correct";
  const heroHit = state.enemyOutcome?.type === "enemy";
  const enemyPreview = getEnemyDamagePreview(state);

  return `
    <main class="game-shell v2-shell step-${state.turnStep} ${state.lastOutcome?.type ? `outcome-${state.lastOutcome.type}` : ""}">
      <div class="ambient-orb orb-a"></div><div class="ambient-orb orb-b"></div>
      <header class="topbar glass-panel">
        <div class="brand-lockup">
          <div class="brand-mark">T</div>
          <div><span>TULA'S ISLAND</span><strong>WORDBOUND BATTLE · V2.2</strong></div>
        </div>
        <div class="top-stats">
          <button class="stat-pill lang-pill" data-action="settings"><span>${source.flag}</span><b>${source.short} → ${target.short}</b></button>
          <div class="stat-pill"><span>🐚</span><b>${state.shells}</b></div>
          <div class="stat-pill xp-pill"><span>XP</span><b>${state.xp}</b></div>
          <button class="pause-btn" data-action="pause" aria-label="Pause">Ⅱ</button>
        </div>
      </header>

      <section class="battle-stage">
        <div class="sky-layer"></div>
        <div class="island island-back"></div>
        <div class="island island-front"></div>
        <div class="water-lines"></div>

        <article class="enemy-unit ${enemyHit ? "hit-shake" : ""}">
          <div class="combat-card enemy-card glass-panel">
            <div class="combat-card-head">
              <div><span class="eyebrow">GEGNER · LV ${state.enemy.level}</span><h2>${state.enemy.name}</h2><p>${state.enemy.subtitle}</p></div>
              <span class="weakness-chip">${weakness.icon} ${weakness.label}</span>
            </div>
            <div class="phase-row"><span>PHASE ${state.enemy.weaknessPhaseIndex + 1}/${state.enemy.weaknessPhases.length} · ${phase.name}</span>${weaknessPhaseDots(state)}</div>
            ${hpBar(state.enemy.hp, state.enemy.maxHp, "HP")}
            ${state.enemyIntent && state.phase === "battle" ? `<div class="intent-chip"><span>${state.enemyIntent.icon}</span><b>${state.enemyIntent.name}</b><small>${enemyPreview.min}–${enemyPreview.max} HP</small></div>` : ""}
          </div>
          <div class="enemy-avatar-wrap">${iconSvg(state.enemy.avatar)}${enemyHit ? `<span class="damage-pop enemy-damage">−${state.lastOutcome.damage}</span>` : ""}</div>
        </article>

        <article class="hero-unit ${heroHit ? "hit-shake" : ""}">
          <div class="helper-avatar-large ${helper ? "" : "is-tula-waiting"}">
            ${helper ? iconSvg(helper.avatar) : `<img src="${TULA_ASSET}" alt="Tula wartet auf die Teamwahl" />`}
            ${heroHit ? `<span class="damage-pop hero-damage">−${state.enemyOutcome.damage}</span>` : ""}
          </div>
          <div class="combat-card hero-card glass-panel">
            ${helper ? `
              <div class="combat-card-head"><div><span class="eyebrow">${state.turnStep === "choose" ? "VORAUSWAHL" : "AKTIVER GEHILFE"}</span><h2>${helper.name}</h2><p>${helper.title}</p></div><span class="weakness-chip helper-chip">${CATEGORIES[helper.category].icon} ${CATEGORIES[helper.category].label}</span></div>
              ${hpBar(helper.hp, helper.maxHp, "HP")}
              <div class="active-energy"><span>ENERGIE</span>${energyPips(helper)}<b>${helper.energy}/${helper.maxEnergy}</b></div>
            ` : `
              <div class="combat-card-head"><div><span class="eyebrow">TULAS TEAM</span><h2>Gehilfe wählen</h2><p>Jede Runde neu entscheiden</p></div><span class="weakness-chip helper-chip">↓ TEAM</span></div>
              <div class="waiting-copy">Die Gegner-Schwäche bestimmt, wer jetzt sinnvoll ist.</div>
            `}
          </div>
        </article>

        <aside class="tula-guide glass-panel" aria-live="polite" aria-atomic="true">
          <div class="tula-mini"><img src="${TULA_ASSET}" alt="Tula" /></div>
          <div><span class="eyebrow">TULA</span><strong>${state.message}</strong><p>${state.subMessage}</p></div>
        </aside>
      </section>

      <section class="control-deck glass-panel v2-deck">
        <div class="deck-meta">
          <div class="round-chip"><span>RUNDE</span><b>${state.round}</b></div>
          <div class="combo-chip"><span>SPRACH-COMBO</span><b>×${state.streak}</b></div>
          <div class="mission-chip"><span>AKTUELLE SCHWÄCHE</span><b>${weakness.icon} ${weakness.label}</b></div>
          <div class="pressure-chip ${state.pressure >= 3 ? "is-danger" : ""}"><span>GEGNERDRUCK</span><b>${"◆".repeat(state.pressure)}${"◇".repeat(state.maxPressure - state.pressure)} <em>${state.pressure}/${state.maxPressure}</em></b></div>
        </div>

        <div class="v2-action-area">${mainActionPanel(state, source, target, helper)}</div>

        <div class="team-panel">
          <div class="team-panel-head"><div><span>DEIN TEAM</span><b>${state.turnStep === "choose" ? "Wähle für diese Runde" : "Auswahl bis zur nächsten Runde gesperrt"}</b></div><small>⚡ Bank regeneriert nach Gegnerzug</small></div>
          <div class="helper-strip" aria-label="Gehilfen auswählen">
            ${state.helperRoster.map((entry) => helperCard(state, entry)).join("")}
          </div>
        </div>
      </section>

      <section class="battle-log glass-panel">
        <span class="eyebrow">KAMPFLOG</span>
        <p>${state.battleLog.slice(0, 3).join(" · ")}</p>
      </section>

      ${state.phase === "intro" ? introOverlay(state) : ""}
      ${state.phase === "victory" ? victoryOverlay(state) : ""}
      ${state.phase === "defeat" ? defeatOverlay() : ""}
      ${settingsOverlay(state)}
      ${pauseOverlay(state)}
    </main>
  `;
}
