import {
  DEFAULT_EARNING_CONFIG,
  type EarningBreakdown,
  type EarningConfig,
} from "./types";

/**
 * Mnożnik serii dni z aktywnością. Progi zamiast liniowego wzrostu:
 * łatwe do zakomunikowania w UI ("od 7 dni masz +10%").
 */
export function streakMultiplier(streakDays: number): number {
  if (streakDays >= 30) return 1.35;
  if (streakDays >= 14) return 1.2;
  if (streakDays >= 7) return 1.1;
  if (streakDays >= 3) return 1.05;
  return 1;
}

export interface ComputeEarningInput {
  /** Suma kroków danego dnia (po anty-cheat). */
  steps: number;
  /** Ile z tych kroków wykonano w aktywnych oknach boost. */
  boostedSteps?: number;
  /** Aktualna seria dni. */
  streakDays?: number;
  config?: EarningConfig;
}

/**
 * Nalicza KROK-i za dzienną pulę kroków.
 *
 * Model trzech stref: pełna stawka → stawka obniżona → zero powyżej limitu.
 * Boost mnoży tylko kroki wykonane w oknie boosta; streak mnoży całość bazy.
 * Wszystko deterministyczne i czyste — łatwe do testów i do przeniesienia
 * na backend bez zmian.
 */
export function computeEarning(input: ComputeEarningInput): EarningBreakdown {
  const config = input.config ?? DEFAULT_EARNING_CONFIG;
  const steps = Math.max(0, Math.floor(input.steps));
  const streakDays = Math.max(0, input.streakDays ?? 0);
  const boostedSteps = Math.min(Math.max(0, input.boostedSteps ?? 0), steps);

  const fullRateSteps = Math.min(steps, config.fullRateStepLimit);
  const reducedRateSteps = Math.min(
    Math.max(0, steps - config.fullRateStepLimit),
    config.reducedRateStepLimit - config.fullRateStepLimit,
  );
  const uncountedSteps = Math.max(0, steps - config.reducedRateStepLimit);

  const baseCoins =
    fullRateSteps / config.stepsPerCoin +
    (reducedRateSteps / config.stepsPerCoin) * config.reducedRateMultiplier;

  const streakBonusCoins = baseCoins * (streakMultiplier(streakDays) - 1);

  // Boost dotyczy tylko kroków w strefie zarabiania (nieprzekraczających limitu).
  const earningSteps = fullRateSteps + reducedRateSteps;
  const boostedEarningSteps = Math.min(boostedSteps, earningSteps);
  const boostBonusCoins =
    (boostedEarningSteps / config.stepsPerCoin) * (config.boostMultiplier - 1);

  const totalCoins = round2(baseCoins + streakBonusCoins + boostBonusCoins);

  return {
    fullRateSteps,
    reducedRateSteps,
    uncountedSteps,
    baseCoins: round2(baseCoins),
    streakBonusCoins: round2(streakBonusCoins),
    boostBonusCoins: round2(boostBonusCoins),
    totalCoins,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
