import type {
  ChallengeDefinition,
  ChallengeProgress,
} from "./types";

/** Katalog wyzwań MVP — docelowo serwowany z backendu. */
export const CHALLENGES: ChallengeDefinition[] = [
  {
    id: "daily-6k",
    title: "Dzienna szóstka",
    description: "Zrób 6 000 kroków dzisiaj.",
    period: "daily",
    targetSteps: 6_000,
    rewardCoins: 10,
    rewardXp: 40,
    icon: "🎯",
  },
  {
    id: "daily-10k",
    title: "Klasyczna dycha",
    description: "Zrób 10 000 kroków dzisiaj.",
    period: "daily",
    targetSteps: 10_000,
    rewardCoins: 25,
    rewardXp: 80,
    icon: "🔥",
  },
  {
    id: "weekly-45k",
    title: "Tygodniowy maraton",
    description: "Uzbieraj 45 000 kroków w tym tygodniu.",
    period: "weekly",
    targetSteps: 45_000,
    rewardCoins: 120,
    rewardXp: 300,
    icon: "🏆",
  },
  {
    id: "weekly-70k",
    title: "Liga mistrzów chodu",
    description: "Uzbieraj 70 000 kroków w tym tygodniu.",
    period: "weekly",
    targetSteps: 70_000,
    rewardCoins: 250,
    rewardXp: 600,
    icon: "👑",
  },
];

export function evaluateChallenge(
  definition: ChallengeDefinition,
  currentSteps: number,
): ChallengeProgress {
  const steps = Math.max(0, currentSteps);
  return {
    definition,
    currentSteps: steps,
    ratio: Math.min(1, steps / definition.targetSteps),
    completed: steps >= definition.targetSteps,
  };
}

export function evaluateChallenges(
  dailySteps: number,
  weeklySteps: number,
  definitions: ChallengeDefinition[] = CHALLENGES,
): ChallengeProgress[] {
  return definitions.map((definition) =>
    evaluateChallenge(
      definition,
      definition.period === "daily" ? dailySteps : weeklySteps,
    ),
  );
}
