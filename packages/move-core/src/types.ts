/** Wspólne typy silnika move-to-earn (aplikacja Kroko). */

/** Konfiguracja przelicznika kroki → KROK. */
export interface EarningConfig {
  /** Ile kroków daje 1 KROK w strefie pełnej stawki. */
  stepsPerCoin: number;
  /** Do tylu kroków dziennie obowiązuje pełna stawka. */
  fullRateStepLimit: number;
  /** Powyżej pełnej stawki, do tego limitu, obowiązuje stawka obniżona. */
  reducedRateStepLimit: number;
  /** Mnożnik stawki obniżonej (np. 0.5 = pół KROK-a za tę samą liczbę kroków). */
  reducedRateMultiplier: number;
  /** Mnożnik aktywnego boosta (np. 2 = x2). */
  boostMultiplier: number;
  /** Ile sesji boost przysługuje dziennie. */
  boostSessionsPerDay: number;
  /** Długość jednej sesji boost w minutach. */
  boostDurationMinutes: number;
}

export const DEFAULT_EARNING_CONFIG: EarningConfig = {
  stepsPerCoin: 100,
  fullRateStepLimit: 8_000,
  reducedRateStepLimit: 16_000,
  reducedRateMultiplier: 0.5,
  boostMultiplier: 2,
  boostSessionsPerDay: 2,
  boostDurationMinutes: 20,
};

/** Wynik naliczenia KROK-ów za dzienną pulę kroków. */
export interface EarningBreakdown {
  /** Kroki policzone pełną stawką. */
  fullRateSteps: number;
  /** Kroki policzone stawką obniżoną. */
  reducedRateSteps: number;
  /** Kroki ponad limit — nie zarabiają (anty-abuse). */
  uncountedSteps: number;
  /** KROK-i bazowe (przed streakiem i boostem). */
  baseCoins: number;
  /** KROK-i z mnożnika serii (streak). */
  streakBonusCoins: number;
  /** KROK-i z boosta. */
  boostBonusCoins: number;
  /** Suma do wypłaty. */
  totalCoins: number;
}

/** Jedno okno pomiarowe z krokomierza (do walidacji anty-cheat). */
export interface StepWindow {
  steps: number;
  /** Długość okna w sekundach. */
  seconds: number;
}

export interface AntiCheatVerdict {
  /** Kroki zaakceptowane po przycięciu do wiarygodnego tempa. */
  acceptedSteps: number;
  /** Kroki odrzucone jako niewiarygodne. */
  rejectedSteps: number;
  /** Czy okno wyglądało na manipulację (potrząsanie / emulacja). */
  flagged: boolean;
}

export type ChallengePeriod = "daily" | "weekly";

export interface ChallengeDefinition {
  id: string;
  title: string;
  description: string;
  period: ChallengePeriod;
  /** Próg kroków do zaliczenia. */
  targetSteps: number;
  /** Nagroda w KROK-ach. */
  rewardCoins: number;
  /** Nagroda w XP (poziomy profilu). */
  rewardXp: number;
  icon: string;
}

export interface ChallengeProgress {
  definition: ChallengeDefinition;
  currentSteps: number;
  /** 0..1 */
  ratio: number;
  completed: boolean;
}
