import { CATEGORIES, ENEMIES, LANGUAGES, SENTENCE_CHALLENGES, VOCABULARY } from "./data.js";
import { resetEnemy } from "./state.js";

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function activeHelpers(state) {
  return state.helperRoster.filter((helper) => helper.hp > 0);
}

function usableHelpers(state) {
  return activeHelpers(state).filter((helper) => helper.energy > 0);
}

function normalizeSentence(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}

export function getSelectedHelper(state) {
  const id = state.activeHelperId || state.selectedHelperId;
  return state.helperRoster.find((helper) => helper.id === id) || null;
}

export function getCurrentWeakness(state) {
  return state.enemy.currentWeakness;
}

export function isSentenceRound(state) {
  return state.round > 0 && state.round % 3 === 0;
}

export function getPressureDamageBonus(state) {
  const pressureBonus = Math.max(0, Number(state.pressure || 0)) * 3;
  const lateBattleBonus = state.round >= 10 ? 5 : 0;
  return pressureBonus + lateBattleBonus;
}

export function getEnemyDamagePreview(state) {
  if (!state.enemyIntent) return { min: 0, max: 0, bonus: 0 };
  const bonus = getPressureDamageBonus(state);
  return {
    min: state.enemyIntent.min + bonus,
    max: state.enemyIntent.max + bonus,
    bonus,
  };
}

function currentWeaknessPhase(state) {
  return state.enemy.weaknessPhases[state.enemy.weaknessPhaseIndex];
}

function ensureTeamEnergy(state) {
  if (usableHelpers(state).length > 0 || activeHelpers(state).length === 0) return false;
  activeHelpers(state).forEach((helper) => {
    helper.energy = Math.min(helper.maxEnergy, helper.energy + 1);
  });
  state.battleLog.unshift("Team-Atempause: Alle einsatzfähigen Gehilfen erhalten +1 Energie.");
  return true;
}

function rollEnemyIntent(state) {
  const pool = state.enemy.attacks || [{ name: "Konter", icon: "💥", min: state.enemy.attack, max: state.enemy.attack + 2 }];
  const attack = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...attack,
    damage: randomInt(attack.min, attack.max),
  };
}

function syncWeaknessPhase(state) {
  const ratio = state.enemy.hp / state.enemy.maxHp;
  const oldIndex = state.enemy.weaknessPhaseIndex;
  const nextIndex = state.enemy.weaknessPhases.findIndex((phase) => ratio >= phase.minHpRatio);
  const safeIndex = nextIndex >= 0 ? nextIndex : state.enemy.weaknessPhases.length - 1;
  state.enemy.weaknessPhaseIndex = safeIndex;
  state.enemy.currentWeakness = state.enemy.weaknessPhases[safeIndex].category;
  return {
    changed: oldIndex !== safeIndex,
    oldIndex,
    newIndex: safeIndex,
    phase: state.enemy.weaknessPhases[safeIndex],
  };
}

function buildWordQuestion(state, helper, forcedWordId = null) {
  const categoryPool = VOCABULARY.filter((word) => word.category === helper.category);
  const forced = forcedWordId ? VOCABULARY.find((word) => word.id === forcedWordId && word.category === helper.category) : null;
  const target = forced || categoryPool[Math.floor(Math.random() * categoryPool.length)];
  const distractorPool = VOCABULARY.filter(
    (word) => word.id !== target.id && word[state.targetLang] !== target[state.targetLang],
  );
  const distractors = shuffle(distractorPool).slice(0, 2);

  return {
    type: "word",
    questionId: `word:${target.id}`,
    wordId: target.id,
    category: target.category,
    prompt: target[state.sourceLang],
    correct: target[state.targetLang],
    options: shuffle([target, ...distractors]).map((word) => ({
      id: word.id,
      label: word[state.targetLang],
      category: word.category,
    })),
  };
}

function buildSentenceQuestion(state, helper, forcedSentenceId = null) {
  const pool = SENTENCE_CHALLENGES.filter((entry) => entry.category === helper.category);
  const forced = forcedSentenceId ? pool.find((entry) => entry.id === forcedSentenceId) : null;
  const sentence = forced || pool[Math.floor(Math.random() * pool.length)];
  if (!sentence) return buildWordQuestion(state, helper);

  const correctTokens = sentence[state.targetLang].trim().split(/\s+/);
  const tokenObjects = correctTokens.map((label, index) => ({
    id: `${sentence.id}:${state.targetLang}:${index}`,
    label,
    order: index,
  }));

  return {
    type: "sentence",
    questionId: `sentence:${sentence.id}`,
    sentenceId: sentence.id,
    category: sentence.category,
    prompt: sentence[state.sourceLang],
    correct: sentence[state.targetLang],
    correctTokens,
    tokens: shuffle(tokenObjects),
    selectedTokenIds: [],
  };
}

export function buildQuestion(state, forcedQuestionId = null, forcedType = null) {
  const helper = state.helperRoster.find((entry) => entry.id === state.activeHelperId);
  if (!helper) return null;

  const sentenceMode = forcedType ? forcedType === "sentence" : isSentenceRound(state);
  if (sentenceMode) return buildSentenceQuestion(state, helper, forcedQuestionId);
  return buildWordQuestion(state, helper, forcedQuestionId);
}

export function startBattle(state) {
  state.phase = "battle";
  state.turnStep = "choose";
  state.selectedHelperId = null;
  state.activeHelperId = null;
  state.question = null;
  state.enemyIntent = rollEnemyIntent(state);
  state.lastOutcome = null;
  state.enemyOutcome = null;
  state.pressure = 0;
  const weakness = CATEGORIES[getCurrentWeakness(state)];
  state.message = `${state.enemy.name} zeigt eine Schwäche gegen ${weakness.label}.`;
  state.subMessage = "Wähle unten bewusst den Gehilfen für diese Runde. Jede 3. Runde wird zur Satz-Challenge.";
}

export function selectHelper(state, helperId) {
  if (state.phase !== "battle" || state.turnStep !== "choose" || state.busy || state.paused) return false;
  const helper = state.helperRoster.find((entry) => entry.id === helperId);
  if (!helper || helper.hp <= 0 || helper.energy <= 0) return false;

  state.selectedHelperId = helperId;
  const weakness = getCurrentWeakness(state);
  const matches = helper.category === weakness;
  const category = CATEGORIES[helper.category];
  state.message = matches ? `${helper.name} passt perfekt zur Schwäche!` : `${helper.name} kann kämpfen – ist aber nicht optimal.`;
  state.subMessage = matches
    ? `${category.icon} ${category.label} trifft supereffektiv. Jetzt Gehilfen einsetzen.`
    : `${category.icon} ${category.label} verursacht weniger Schaden. Du kannst noch wechseln.`;
  return true;
}

export function deployHelper(state) {
  if (state.phase !== "battle" || state.turnStep !== "choose" || state.paused) return false;
  const helper = state.helperRoster.find((entry) => entry.id === state.selectedHelperId);
  if (!helper || helper.hp <= 0 || helper.energy <= 0) return false;

  state.activeHelperId = helper.id;
  state.turnStep = "question";
  state.question = buildQuestion(state);
  state.selectedAnswer = null;
  state.lastOutcome = null;
  state.enemyOutcome = null;
  state.message = isSentenceRound(state) ? "Satz-Challenge!" : `${helper.name} übernimmt diese Runde.`;
  state.subMessage = isSentenceRound(state)
    ? `Baue den vollständigen Satz in ${LANGUAGES[state.targetLang].label}. Ein Fehler erhöht den Gegnerdruck um 2.`
    : `Löse das Wort, um ${helper.skill} auszulösen. Ein Fehler erhöht den Gegnerdruck.`;
  return true;
}

export function selectSentenceToken(state, tokenId) {
  if (state.busy || state.paused || state.phase !== "battle" || state.turnStep !== "question" || state.question?.type !== "sentence") return false;
  const token = state.question.tokens.find((entry) => entry.id === tokenId);
  if (!token || state.question.selectedTokenIds.includes(tokenId)) return false;
  state.question.selectedTokenIds.push(tokenId);
  return true;
}

export function undoSentenceToken(state) {
  if (state.busy || state.paused || state.turnStep !== "question" || state.question?.type !== "sentence") return false;
  if (!state.question.selectedTokenIds.length) return false;
  state.question.selectedTokenIds.pop();
  return true;
}

export function resetSentenceTokens(state) {
  if (state.busy || state.paused || state.turnStep !== "question" || state.question?.type !== "sentence") return false;
  state.question.selectedTokenIds = [];
  return true;
}

function finishPlayerAnswer(state, correct, answerId = null) {
  const helper = state.helperRoster.find((entry) => entry.id === state.activeHelperId);
  if (!helper || helper.hp <= 0 || helper.energy <= 0 || !state.question) return null;

  helper.energy = Math.max(0, helper.energy - 1);
  const weaknessBefore = getCurrentWeakness(state);
  const helperMatchesWeakness = helper.category === weaknessBefore;
  const sentenceChallenge = state.question.type === "sentence";

  if (correct) {
    state.streak += 1;
    state.pressure = Math.max(0, state.pressure - 1);
    const masteryBonus = Math.min(6, state.streak);
    const weaknessMultiplier = helperMatchesWeakness ? 1.8 : 0.68;
    const challengeMultiplier = sentenceChallenge ? 1.28 : 1;
    const damage = Math.max(4, Math.round((helper.attack + masteryBonus) * weaknessMultiplier * challengeMultiplier));
    state.enemy.hp = Math.max(0, state.enemy.hp - damage);
    state.xp += 4 + masteryBonus + (sentenceChallenge ? 6 : 0);
    state.shells += (helperMatchesWeakness ? 2 : 1) + (sentenceChallenge ? 1 : 0);

    const phaseShift = syncWeaknessPhase(state);
    state.lastOutcome = {
      type: "correct",
      questionType: state.question.type,
      damage,
      helperMatchesWeakness,
      answerId,
      weaknessBefore,
      weaknessAfter: getCurrentWeakness(state),
      weaknessChanged: phaseShift.changed,
      newPhaseName: phaseShift.phase.name,
      pressure: state.pressure,
    };
    state.message = sentenceChallenge ? "Satz perfekt gebaut!" : helperMatchesWeakness ? "Supereffektiv!" : "Treffer – aber nicht mit voller Wirkung.";
    state.subMessage = `${helper.name} nutzt ${helper.skill}: −${damage} HP. Gegnerdruck ${state.pressure}/${state.maxPressure}.`;
    state.battleLog.unshift(`${helper.name}: ${state.question.prompt} → ${state.question.correct} (−${damage})`);

    if (phaseShift.changed && state.enemy.hp > 0) {
      const nextWeakness = CATEGORIES[getCurrentWeakness(state)];
      state.battleLog.unshift(`${state.enemy.name} wechselt Phase: neue Schwäche ${nextWeakness.icon} ${nextWeakness.label}.`);
    }

    if (state.enemy.hp <= 0) {
      state.phase = "victory";
      state.turnStep = "finished";
      state.busy = false;
      state.xp += 35;
      state.shells += 10;
      state.message = `${state.enemy.name} ist besiegt!`;
      state.subMessage = "Die Inselroute ist frei. Bonus: +35 XP · +10 Muscheln";
      return state.lastOutcome;
    }
  } else {
    state.streak = 0;
    const pressureGain = sentenceChallenge ? 2 : 1;
    const beforePressure = state.pressure;
    state.pressure = Math.min(state.maxPressure, state.pressure + pressureGain);
    state.lastOutcome = {
      type: "wrong",
      questionType: state.question.type,
      damage: 0,
      answerId,
      correct: state.question.correct,
      helperMatchesWeakness,
      weaknessBefore,
      weaknessAfter: weaknessBefore,
      weaknessChanged: false,
      pressureGain: state.pressure - beforePressure,
      pressure: state.pressure,
    };
    state.message = sentenceChallenge ? "Der Satz war noch nicht richtig." : "Fast – das Sprachwort war noch nicht richtig.";
    state.subMessage = `Richtig: „${state.question.correct}“. Gegnerdruck steigt auf ${state.pressure}/${state.maxPressure} – der nächste Treffer wird härter.`;
    state.battleLog.unshift(`${helper.name}: ${state.question.prompt} → richtig wäre ${state.question.correct}`);
  }

  state.turnStep = "result";
  state.busy = false;
  return state.lastOutcome;
}

export function resolveAnswer(state, answerId) {
  if (state.busy || state.paused || state.phase !== "battle" || state.turnStep !== "question" || state.question?.type !== "word") return null;

  const helper = state.helperRoster.find((entry) => entry.id === state.activeHelperId);
  if (!helper || helper.hp <= 0 || helper.energy <= 0) return null;

  state.busy = true;
  state.selectedAnswer = answerId;
  const answer = state.question.options.find((option) => option.id === answerId);
  const correct = answer?.label === state.question.correct;
  return finishPlayerAnswer(state, correct, answerId);
}

export function resolveSentenceAnswer(state) {
  if (state.busy || state.paused || state.phase !== "battle" || state.turnStep !== "question" || state.question?.type !== "sentence") return null;
  if (state.question.selectedTokenIds.length !== state.question.tokens.length) return null;

  const helper = state.helperRoster.find((entry) => entry.id === state.activeHelperId);
  if (!helper || helper.hp <= 0 || helper.energy <= 0) return null;

  state.busy = true;
  const built = state.question.selectedTokenIds
    .map((id) => state.question.tokens.find((token) => token.id === id)?.label)
    .filter(Boolean)
    .join(" ");
  const correct = normalizeSentence(built) === normalizeSentence(state.question.correct);
  state.selectedAnswer = built;
  return finishPlayerAnswer(state, correct, built);
}

export function resolveEnemyTurn(state) {
  if (state.phase !== "battle" || state.turnStep !== "result" || state.paused) return null;
  const helper = state.helperRoster.find((entry) => entry.id === state.activeHelperId);
  if (!helper || helper.hp <= 0) return null;

  const intent = state.enemyIntent || rollEnemyIntent(state);
  const pressureBonus = getPressureDamageBonus(state);
  const damage = intent.damage + pressureBonus;
  helper.hp = Math.max(0, helper.hp - damage);

  state.helperRoster.forEach((entry) => {
    if (entry.id !== helper.id && entry.hp > 0) {
      entry.energy = Math.min(entry.maxEnergy, entry.energy + 1);
    }
  });

  const ko = helper.hp <= 0;
  state.enemyOutcome = {
    type: "enemy",
    damage,
    baseDamage: intent.damage,
    pressureBonus,
    ko,
    attack: intent.name,
    icon: intent.icon,
  };
  state.turnStep = "enemy-result";
  state.message = `${state.enemy.name} nutzt ${intent.icon} ${intent.name}!`;
  state.subMessage = ko
    ? `${helper.name} verliert ${damage} HP und ist K. O. Gegnerdruck: ${state.pressure}/${state.maxPressure}.`
    : `${helper.name} verliert ${damage} HP${pressureBonus ? ` (${pressureBonus} davon durch Gegnerdruck)` : ""}.`;
  state.battleLog.unshift(`${state.enemy.name}: ${intent.name} trifft ${helper.name} (−${damage})`);

  if (activeHelpers(state).length === 0) {
    state.phase = "defeat";
    state.turnStep = "finished";
    state.message = "Niederlage – das ganze Team ist K. O.";
    state.subMessage = "Fehler erhöhen den Gegnerdruck. Beim nächsten Versuch musst du ihn mit richtigen Antworten wieder abbauen.";
  }

  return state.enemyOutcome;
}

export function advanceTurn(state) {
  if (state.phase !== "battle" || state.turnStep !== "enemy-result") return false;

  state.round += 1;
  state.selectedAnswer = null;
  state.lastOutcome = null;
  state.enemyOutcome = null;
  state.question = null;
  state.selectedHelperId = null;
  state.activeHelperId = null;
  state.turnStep = "choose";
  state.busy = false;

  const refreshed = ensureTeamEnergy(state);
  state.enemyIntent = rollEnemyIntent(state);
  const weakness = CATEGORIES[getCurrentWeakness(state)];
  const phase = currentWeaknessPhase(state);
  const sentenceNotice = isSentenceRound(state) ? " SATZ-CHALLENGE in dieser Runde!" : "";
  state.message = `Runde ${state.round}: ${weakness.icon} Schwäche ${weakness.label}`;
  state.subMessage = refreshed
    ? `Team-Atempause: +1 Energie. Gegnerphase „${phase.name}“.${sentenceNotice}`
    : `Gegnerphase „${phase.name}“. Gegnerdruck ${state.pressure}/${state.maxPressure}.${sentenceNotice}`;
  return true;
}

export function nextEnemy(state) {
  const nextIndex = (state.enemyIndex + 1) % ENEMIES.length;
  state.enemyIndex = nextIndex;
  const nextEnemyData = ENEMIES[nextIndex];
  state.enemy = resetEnemy(nextEnemyData);
  state.helperRoster.forEach((helper) => {
    helper.hp = Math.min(helper.maxHp, helper.hp + Math.round(helper.maxHp * 0.28));
    helper.energy = helper.maxEnergy;
  });
  state.round = 1;
  state.streak = 0;
  state.pressure = 0;
  state.phase = "intro";
  state.turnStep = "choose";
  state.question = null;
  state.selectedHelperId = null;
  state.activeHelperId = null;
  state.selectedAnswer = null;
  state.lastOutcome = null;
  state.enemyOutcome = null;
  state.enemyIntent = null;
  state.busy = false;
  state.settingsOpen = false;
  state.settingsError = null;
  state.paused = false;
  state.message = `${nextEnemyData.name} wartet auf der nächsten Insel.`;
  state.subMessage = nextEnemyData.intro;
  state.battleLog.unshift(`Neuer Gegner: ${nextEnemyData.name}`);
}

export function restartBattle(state) {
  state.helperRoster.forEach((helper) => {
    helper.hp = helper.maxHp;
    helper.energy = helper.maxEnergy;
  });
  const enemyData = ENEMIES[state.enemyIndex];
  state.enemy = resetEnemy(enemyData);
  state.round = 1;
  state.streak = 0;
  state.pressure = 0;
  state.selectedHelperId = null;
  state.activeHelperId = null;
  state.phase = "intro";
  state.turnStep = "choose";
  state.question = null;
  state.selectedAnswer = null;
  state.lastOutcome = null;
  state.enemyOutcome = null;
  state.enemyIntent = null;
  state.busy = false;
  state.settingsOpen = false;
  state.settingsError = null;
  state.paused = false;
  state.message = `${enemyData.name} fordert Tulas Team erneut heraus.`;
  state.subMessage = enemyData.intro;
}

export function setLanguages(state, sourceLang, targetLang) {
  if (!LANGUAGES[sourceLang] || !LANGUAGES[targetLang] || sourceLang === targetLang) return false;
  state.sourceLang = sourceLang;
  state.targetLang = targetLang;
  if (state.phase === "battle" && state.turnStep === "question" && state.question) {
    const forcedId = state.question.type === "sentence" ? state.question.sentenceId : state.question.wordId;
    state.question = buildQuestion(state, forcedId, state.question.type);
  }
  return true;
}
