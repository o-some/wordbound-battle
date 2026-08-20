import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, HELPERS, LANGUAGES, SENTENCE_CHALLENGES, VOCABULARY } from "./data.js";
import { createInitialState } from "./state.js";
import {
  advanceTurn,
  buildQuestion,
  deployHelper,
  getCurrentWeakness,
  getEnemyDamagePreview,
  nextEnemy,
  resolveAnswer,
  resolveEnemyTurn,
  resolveSentenceAnswer,
  restartBattle,
  selectHelper,
  selectSentenceToken,
  setLanguages,
  startBattle,
} from "./engine.js";

function correctOption(state) { return state.question.options.find((o) => o.label === state.question.correct); }
function getHelper(state, id) { return state.helperRoster.find((h) => h.id === id); }

test("battle starts in choose step with announced enemy intent", () => {
  const state = createInitialState(); startBattle(state);
  assert.equal(state.phase, "battle"); assert.equal(state.turnStep, "choose"); assert.equal(state.selectedHelperId, null);
  assert.ok(state.enemyIntent); assert.ok(state.enemyIntent.damage >= state.enemyIntent.min); assert.ok(state.enemyIntent.damage <= state.enemyIntent.max);
});

test("helper must be selected and deployed before a question exists", () => {
  const state = createInitialState(); startBattle(state);
  assert.equal(deployHelper(state), false); assert.equal(selectHelper(state, "meli"), true); assert.equal(deployHelper(state), true);
  assert.equal(state.turnStep, "question"); assert.ok(state.question);
});

test("one answer can only resolve once and consumes exactly one energy", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state);
  const meli = getHelper(state, "meli"); const before = meli.energy; const option = correctOption(state);
  const outcome = resolveAnswer(state, option.id); assert.equal(outcome.type, "correct"); assert.equal(meli.energy, before - 1);
  const hpAfter = state.enemy.hp; assert.equal(resolveAnswer(state, option.id), null); assert.equal(meli.energy, before - 1); assert.equal(state.enemy.hp, hpAfter);
});

test("wrong answers reveal correction but do not directly damage helper", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state);
  const meli = getHelper(state, "meli"); const hpBefore = meli.hp;
  const wrong = state.question.options.find((o) => o.label !== state.question.correct); const outcome = resolveAnswer(state, wrong.id);
  assert.equal(outcome.type, "wrong"); assert.equal(meli.hp, hpBefore); assert.equal(state.turnStep, "result");
});

test("enemy turn damages active helper and regenerates bench energy", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state);
  const meli = getHelper(state, "meli"); const skippi = getHelper(state, "skippi"); skippi.energy = 1;
  resolveAnswer(state, correctOption(state).id); const hpBefore = meli.hp; resolveEnemyTurn(state);
  assert.ok(meli.hp < hpBefore); assert.equal(skippi.energy, 2); assert.equal(state.turnStep, "enemy-result");
});

test("next round clears active selection and forces a fresh helper choice", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state);
  resolveAnswer(state, correctOption(state).id); resolveEnemyTurn(state); advanceTurn(state);
  assert.equal(state.turnStep, "choose"); assert.equal(state.selectedHelperId, null); assert.equal(state.activeHelperId, null); assert.equal(state.question, null);
});

test("team receives a safety energy refresh if every living helper is empty", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state);
  resolveAnswer(state, correctOption(state).id); resolveEnemyTurn(state); state.helperRoster.filter((h) => h.hp > 0).forEach((h) => { h.energy = 0; });
  advanceTurn(state); assert.ok(state.helperRoster.filter((h) => h.hp > 0).every((h) => h.energy >= 1));
});

test("enemy weakness phase changes when HP crosses a phase threshold", () => {
  const state = createInitialState(); startBattle(state); state.enemy.hp = Math.ceil(state.enemy.maxHp * 0.68);
  selectHelper(state, "meli"); deployHelper(state); resolveAnswer(state, correctOption(state).id);
  assert.notEqual(getCurrentWeakness(state), "fruit"); assert.equal(state.lastOutcome.weaknessChanged, true);
});

test("pause blocks helper selection and answer resolution without mutating state", () => {
  const state = createInitialState(); startBattle(state); state.paused = true; const snapshot = JSON.stringify(state);
  assert.equal(selectHelper(state, "meli"), false); assert.equal(JSON.stringify(state), snapshot);
  state.paused = false; selectHelper(state, "meli"); deployHelper(state); state.paused = true; const qSnapshot = JSON.stringify(state);
  assert.equal(resolveAnswer(state, correctOption(state).id), null); assert.equal(JSON.stringify(state), qSnapshot);
});

test("language changes keep the same word and reject invalid/same-language pairs", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "skippi"); deployHelper(state); const wordId = state.question.wordId;
  assert.equal(setLanguages(state, "de", "es"), true); assert.equal(state.question.wordId, wordId); assert.equal(setLanguages(state, "de", "de"), false); assert.equal(setLanguages(state, "xx", "en"), false);
});

test("victory rewards cannot be applied twice", () => {
  const state = createInitialState(); startBattle(state); selectHelper(state, "meli"); deployHelper(state); state.enemy.hp = 1;
  const option = correctOption(state); resolveAnswer(state, option.id); assert.equal(state.phase, "victory"); const xp = state.xp, shells = state.shells;
  assert.equal(resolveAnswer(state, option.id), null); assert.equal(state.xp, xp); assert.equal(state.shells, shells);
});

test("defeat only occurs after all helpers are KO", () => {
  const state = createInitialState(); startBattle(state); state.helperRoster.forEach((h) => { h.hp = 0; });
  const meli = getHelper(state, "meli"); meli.hp = 1; meli.energy = 3; selectHelper(state, "meli"); deployHelper(state);
  resolveAnswer(state, correctOption(state).id); resolveEnemyTurn(state); assert.equal(state.phase, "defeat"); assert.equal(state.turnStep, "finished");
});

test("next enemy and restart reset transient UI/gameplay state", () => {
  const state = createInitialState(); state.settingsOpen = true; state.settingsError = "x"; state.paused = true; nextEnemy(state);
  assert.equal(state.phase, "intro"); assert.equal(state.settingsOpen, false); assert.equal(state.settingsError, null); assert.equal(state.paused, false);
  state.settingsOpen = true; state.settingsError = "x"; state.paused = true; restartBattle(state);
  assert.equal(state.settingsOpen, false); assert.equal(state.settingsError, null); assert.equal(state.paused, false);
});

test("content model covers every helper category and all four languages", () => {
  assert.deepEqual(Object.keys(LANGUAGES).sort(), ["de", "el", "en", "es"]);
  for (const helper of HELPERS) { assert.ok(CATEGORIES[helper.category]); assert.ok(VOCABULARY.filter((w) => w.category === helper.category).length >= 3); }
  for (const word of VOCABULARY) for (const lang of Object.keys(LANGUAGES)) assert.ok(word[lang], `${word.id} missing ${lang}`);
});

test("questions always have three usable answer options", () => {
  for (const helper of HELPERS) {
    const state = createInitialState(); startBattle(state); selectHelper(state, helper.id); deployHelper(state);
    for (const [source, target] of [["de","en"],["en","es"],["es","el"],["el","de"]]) {
      setLanguages(state, source, target); const q = buildQuestion(state); assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options.map((o) => o.label)).size, 3); assert.ok(q.prompt); assert.ok(q.correct);
    }
  }
});

test("every third round becomes a sentence-building challenge", () => {
  const state = createInitialState(); startBattle(state); state.round = 3; selectHelper(state, "meli"); deployHelper(state);
  assert.equal(state.question.type, "sentence"); assert.ok(state.question.tokens.length >= 3); assert.equal(state.question.selectedTokenIds.length, 0);
  const ordered = [...state.question.tokens].sort((a,b)=>a.order-b.order); for (const token of ordered) assert.equal(selectSentenceToken(state, token.id), true);
  const outcome = resolveSentenceAnswer(state); assert.equal(outcome.type, "correct"); assert.ok(outcome.damage > 0); assert.equal(state.turnStep === "result" || state.phase === "victory", true);
});

test("wrong sentence raises pressure by two and pressure amplifies the enemy attack", () => {
  const state = createInitialState(); startBattle(state); state.round = 3; selectHelper(state, "meli"); deployHelper(state);
  const reversed = [...state.question.tokens].sort((a,b)=>b.order-a.order); for (const token of reversed) selectSentenceToken(state, token.id);
  const outcome = resolveSentenceAnswer(state); assert.equal(outcome.type, "wrong"); assert.equal(state.pressure, 2);
  const preview = getEnemyDamagePreview(state); assert.equal(preview.bonus, 6); const baseHp = getHelper(state, "meli").hp;
  const enemyOutcome = resolveEnemyTurn(state); assert.equal(enemyOutcome.pressureBonus, 6); assert.equal(getHelper(state, "meli").hp, Math.max(0, baseHp - enemyOutcome.damage));
});

test("repeated mistakes can now produce a real defeat", () => {
  const state = createInitialState(); startBattle(state); let turns = 0;
  while (state.phase === "battle" && turns < 30) {
    const helper = state.helperRoster.find((entry) => entry.hp > 0 && entry.energy > 0); assert.ok(helper, "a usable helper should exist at turn start");
    assert.equal(selectHelper(state, helper.id), true); assert.equal(deployHelper(state), true);
    if (state.question.type === "sentence") { const reversed=[...state.question.tokens].sort((a,b)=>b.order-a.order); for(const token of reversed) selectSentenceToken(state,token.id); const outcome=resolveSentenceAnswer(state); assert.equal(outcome.type,"wrong"); }
    else { const wrong=state.question.options.find((option)=>option.label!==state.question.correct); const outcome=resolveAnswer(state,wrong.id); assert.equal(outcome.type,"wrong"); }
    if (state.phase !== "battle") break; resolveEnemyTurn(state); if (state.phase === "battle") advanceTurn(state); turns += 1;
  }
  assert.equal(state.phase, "defeat"); assert.ok(turns < 30);
});

test("sentence content covers every helper category and all four languages", () => {
  for (const helper of HELPERS) assert.ok(SENTENCE_CHALLENGES.filter((entry)=>entry.category===helper.category).length >= 3);
  for (const sentence of SENTENCE_CHALLENGES) for (const lang of Object.keys(LANGUAGES)) assert.ok(sentence[lang], `${sentence.id} missing ${lang}`);
});
