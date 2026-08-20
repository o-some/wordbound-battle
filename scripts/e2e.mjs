import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = process.env.WORDBOUND_PREVIEW_URL || "http://127.0.0.1:4321/wordbound-battle/";
const auditDir = process.env.WORDBOUND_AUDIT_DIR || "audit-ci";
await fs.mkdir(auditDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function gameState(page) {
  return page.evaluate(() => {
    const root = document.querySelector("[data-wordbound-battle-root]") || document.querySelector("#app");
    return root?.__wordboundBattleApi?.state || null;
  });
}

async function chooseMatchingHelper(page) {
  const state = await gameState(page);
  assert(state, "Game state unavailable");
  const weakness = state.enemy.currentWeakness;
  const helper = state.helperRoster.find((entry) => entry.hp > 0 && entry.energy > 0 && entry.category === weakness)
    || state.helperRoster.find((entry) => entry.hp > 0 && entry.energy > 0);
  assert(helper, "No usable helper found");
  await page.locator(`[data-helper="${helper.id}"]`).click();
  await page.locator('[data-action="deploy-helper"]').click();
  return helper.id;
}

async function answerWord(page, correct) {
  const state = await gameState(page);
  assert(state?.question?.type === "word", "Expected word question");
  const option = correct
    ? state.question.options.find((entry) => entry.label === state.question.correct)
    : state.question.options.find((entry) => entry.label !== state.question.correct);
  assert(option, `No ${correct ? "correct" : "wrong"} word option found`);
  await page.locator(`[data-answer="${option.id}"]`).click();
}

async function enemyAndNext(page) {
  const enemyButton = page.locator('[data-action="enemy-turn"]');
  if (await enemyButton.count()) await enemyButton.click();
  const nextButton = page.locator('[data-action="next-turn"]');
  if (await nextButton.count()) await nextButton.click();
}

async function reachRoundThree(page) {
  for (let expectedRound = 1; expectedRound <= 2; expectedRound += 1) {
    const before = await gameState(page);
    assert(before.round === expectedRound, `Expected round ${expectedRound}, got ${before.round}`);
    await chooseMatchingHelper(page);
    await answerWord(page, true);
    await enemyAndNext(page);
  }
  const state = await gameState(page);
  assert(state.round === 3, `Expected sentence round 3, got ${state.round}`);
}

async function buildSentence(page, correct) {
  const state = await gameState(page);
  assert(state?.question?.type === "sentence", "Expected sentence question");
  const tokens = [...state.question.tokens];
  if (correct) tokens.sort((a, b) => a.order - b.order);
  else tokens.sort((a, b) => b.order - a.order);
  assert(tokens.length >= 2, "Need at least two sentence tokens");
  for (const token of tokens) {
    await page.locator(`[data-sentence-token="${token.id}"]`).click();
  }
  await page.locator('[data-action="sentence-submit"]').click();
}

async function checkLayout(page, label) {
  const result = await page.evaluate(() => {
    const hero = document.querySelector(".hero-card");
    const guide = document.querySelector(".tula-guide");
    const intersects = (a, b) => {
      if (!a || !b) return false;
      const r = a.getBoundingClientRect();
      const s = b.getBoundingClientRect();
      return !(r.right <= s.left || s.right <= r.left || r.bottom <= s.top || s.bottom <= r.top);
    };
    return {
      viewportWidth: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      heroGuideOverlap: intersects(hero, guide),
      helperCount: document.querySelectorAll("[data-helper]").length,
    };
  });
  assert(!result.overflow, `${label}: horizontal overflow ${result.scrollWidth} > ${result.viewportWidth}`);
  assert(!result.heroGuideOverlap, `${label}: active-helper/Tula guide overlap detected`);
  return result;
}

async function runScenario(browser, { width, height, label, isMobile }) {
  const context = await browser.newContext({
    viewport: { width, height }, isMobile, hasTouch: isMobile, deviceScaleFactor: 1, locale: "de-DE",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const badResponses = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("response", (response) => { if (response.status() === 404) badResponses.push(response.url()); });

  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert(response?.status() === 200, `${label}: preview returned ${response?.status()}`);
  await page.locator('[data-action="start"]').waitFor();
  await page.locator('[data-action="start"]').click();
  assert(await page.locator("[data-helper]").count() === 4, `${label}: expected four helpers`);
  const layoutStart = await checkLayout(page, `${label} start`);

  await chooseMatchingHelper(page);
  await answerWord(page, false);
  let state = await gameState(page);
  assert(state.lastOutcome?.type === "wrong", `${label}: wrong answer not recorded`);
  assert(state.pressure === 1, `${label}: wrong word should raise pressure to 1, got ${state.pressure}`);
  assert(state.turnStep === "result", `${label}: expected result step after answer`);
  await page.locator('[data-action="enemy-turn"]').click();
  state = await gameState(page);
  assert(state.enemyOutcome?.damage > 0, `${label}: enemy turn did not deal damage`);
  await page.locator('[data-action="next-turn"]').click();

  await chooseMatchingHelper(page);
  await answerWord(page, true);
  state = await gameState(page);
  assert(state.lastOutcome?.type === "correct", `${label}: correct answer not recorded`);
  assert(state.pressure === 0, `${label}: correct answer should reduce pressure to 0`);
  await enemyAndNext(page);

  assert((await gameState(page)).round === 3, `${label}: did not reach round 3`);
  await chooseMatchingHelper(page);
  state = await gameState(page);
  assert(state.question?.type === "sentence", `${label}: round 3 is not a sentence challenge`);
  await buildSentence(page, false);
  state = await gameState(page);
  assert(state.lastOutcome?.type === "wrong", `${label}: wrong sentence not recorded`);
  assert(state.pressure === 2, `${label}: wrong sentence should raise pressure by 2, got ${state.pressure}`);

  const roundBeforePause = state.round;
  await page.locator('[data-action="pause"]').click();
  assert((await gameState(page)).paused === true, `${label}: pause failed`);
  await page.locator('[data-action="resume"]').click();
  state = await gameState(page);
  assert(state.paused === false && state.round === roundBeforePause, `${label}: resume mutated state`);

  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-role="source-language"]').selectOption("de");
  await page.locator('[data-role="target-language"]').selectOption("es");
  await page.locator('[data-action="apply-languages"]').click();
  state = await gameState(page);
  assert(state.sourceLang === "de" && state.targetLang === "es", `${label}: language switch failed`);

  const layoutMid = await checkLayout(page, `${label} mid-battle`);
  await page.screenshot({ path: `${auditDir}/${label}.png`, fullPage: false });
  assert(consoleErrors.length === 0, `${label}: console errors: ${consoleErrors.join(" | ")}`);
  assert(pageErrors.length === 0, `${label}: page errors: ${pageErrors.join(" | ")}`);
  assert(badResponses.length === 0, `${label}: 404 responses: ${badResponses.join(" | ")}`);
  await context.close();
  return { label, layoutStart, layoutMid };
}

async function runCorrectSentenceScenario(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.locator('[data-action="start"]').click();
  await reachRoundThree(page);
  await chooseMatchingHelper(page);
  await buildSentence(page, true);
  const state = await gameState(page);
  assert(state.lastOutcome?.type === "correct", "Correct sentence was not accepted");
  await context.close();
  return { correctSentence: "PASS" };
}

const browser = await chromium.launch({ headless: true });
try {
  const results = [];
  results.push(await runScenario(browser, { width: 390, height: 844, label: "iphone-390x844", isMobile: true }));
  results.push(await runScenario(browser, { width: 412, height: 915, label: "android-412x915", isMobile: true }));
  results.push(await runScenario(browser, { width: 1280, height: 850, label: "desktop-1280x850", isMobile: false }));
  results.push(await runCorrectSentenceScenario(browser));
  console.log(JSON.stringify({ status: "PASS", baseUrl, results }, null, 2));
} finally {
  await browser.close();
}
