import { HELPERS, ENEMIES } from "./data.js";

function createEnemy(enemy) {
  return {
    ...enemy,
    hp: enemy.maxHp,
    weaknessPhaseIndex: 0,
    currentWeakness: enemy.weaknessPhases[0].category,
  };
}

export function createInitialState() {
  return {
    phase: "intro",
    turnStep: "choose",
    round: 1,
    streak: 0,
    pressure: 0,
    maxPressure: 4,
    xp: 120,
    shells: 36,
    sourceLang: "de",
    targetLang: "en",
    selectedHelperId: null,
    activeHelperId: null,
    helperRoster: HELPERS.map((helper) => ({
      ...helper,
      hp: helper.maxHp,
      energy: helper.maxEnergy,
    })),
    enemyIndex: 0,
    enemy: createEnemy(ENEMIES[0]),
    enemyIntent: null,
    question: null,
    selectedAnswer: null,
    message: "Coralox versperrt den Weg zur nächsten Insel!",
    subMessage: "V2.2: Teamwahl, Satz-Challenges und steigender Gegnerdruck entscheiden den Kampf.",
    lastOutcome: null,
    enemyOutcome: null,
    busy: false,
    settingsOpen: false,
    settingsError: null,
    paused: false,
    battleLog: ["Tula: Beobachte die Schwäche – dann wähle deinen Gehilfen!"],
  };
}

export function resetEnemy(enemy) {
  return createEnemy(enemy);
}
