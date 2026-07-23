import type { AntiCheatVerdict, StepWindow } from "./types";

/**
 * Maksymalne wiarygodne tempo marszu/biegu utrzymywane przez okno pomiarowe.
 * Sprinterzy osiągają ~300 kroków/min w szczycie, ale nie utrzymują tego
 * w dłuższych oknach — 240/min to bezpieczna górna granica dla biegu.
 */
export const MAX_SUSTAINED_STEPS_PER_MINUTE = 240;

/**
 * Tempo, powyżej którego okno oznaczamy jako podejrzane (potrząsanie
 * telefonem, emulator). Kroki i tak przycinamy do MAX_SUSTAINED, ale flaga
 * pozwala UI pokazać ostrzeżenie, a backendowi — obniżyć zaufanie konta.
 */
export const SUSPICIOUS_STEPS_PER_MINUTE = 320;

/**
 * Waliduje pojedyncze okno pomiarowe z krokomierza.
 * Zwraca kroki przycięte do fizjologicznie możliwego tempa.
 */
export function validateStepWindow(window: StepWindow): AntiCheatVerdict {
  const seconds = Math.max(0, window.seconds);
  const steps = Math.max(0, Math.floor(window.steps));

  if (seconds === 0) {
    return { acceptedSteps: 0, rejectedSteps: steps, flagged: steps > 0 };
  }

  const stepsPerMinute = (steps / seconds) * 60;
  const maxAccepted = Math.floor((MAX_SUSTAINED_STEPS_PER_MINUTE / 60) * seconds);
  const acceptedSteps = Math.min(steps, maxAccepted);

  return {
    acceptedSteps,
    rejectedSteps: steps - acceptedSteps,
    flagged: stepsPerMinute > SUSPICIOUS_STEPS_PER_MINUTE,
  };
}

/**
 * Waliduje serię okien (np. minutowych) i agreguje wynik dnia.
 * Dzień z wieloma podejrzanymi oknami dostaje flagę zbiorczą.
 */
export function validateStepWindows(windows: StepWindow[]): AntiCheatVerdict {
  let acceptedSteps = 0;
  let rejectedSteps = 0;
  let flaggedWindows = 0;

  for (const window of windows) {
    const verdict = validateStepWindow(window);
    acceptedSteps += verdict.acceptedSteps;
    rejectedSteps += verdict.rejectedSteps;
    if (verdict.flagged) flaggedWindows += 1;
  }

  return {
    acceptedSteps,
    rejectedSteps,
    flagged: flaggedWindows >= 3 || flaggedWindows > windows.length / 2,
  };
}
