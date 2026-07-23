import { Pedometer } from "expo-sensors";
import { validateStepWindow } from "@cryptouni/move-core";

export type PedometerMode = "sensor" | "demo" | "unavailable";

export interface StepDelta {
  /** Kroki zaakceptowane po walidacji anty-cheat. */
  steps: number;
  /** Czy okno wyglądało podejrzanie (potrząsanie / emulacja). */
  flagged: boolean;
}

export interface PedometerHandle {
  mode: PedometerMode;
  stop: () => void;
}

/**
 * Startuje nasłuch kroków. Na urządzeniu używa natywnego krokomierza
 * (Core Motion / Sensors API); w symulatorze i na web przełącza się
 * w tryb demo, który generuje realistyczny spacer — dzięki temu cały
 * przepływ zarabiania można klikać bez telefonu.
 *
 * Każde okno pomiarowe przechodzi przez walidację tempa z move-core,
 * więc do stanu aplikacji trafiają wyłącznie wiarygodne kroki.
 */
export async function startPedometer(
  onDelta: (delta: StepDelta) => void,
): Promise<PedometerHandle> {
  let available = false;
  try {
    available = await Pedometer.isAvailableAsync();
  } catch {
    available = false;
  }

  if (available) {
    const permission = await Pedometer.requestPermissionsAsync();
    if (permission.status === "granted") {
      let lastTotal = 0;
      let lastTimestamp = Date.now();
      const subscription = Pedometer.watchStepCount((result) => {
        const now = Date.now();
        const rawDelta = result.steps - lastTotal;
        const seconds = Math.max(1, (now - lastTimestamp) / 1000);
        lastTotal = result.steps;
        lastTimestamp = now;
        if (rawDelta <= 0) return;
        const verdict = validateStepWindow({ steps: rawDelta, seconds });
        if (verdict.acceptedSteps > 0 || verdict.flagged) {
          onDelta({ steps: verdict.acceptedSteps, flagged: verdict.flagged });
        }
      });
      return { mode: "sensor", stop: () => subscription.remove() };
    }
    return { mode: "unavailable", stop: () => undefined };
  }

  // Tryb demo: 2-sekundowe okna, tempo spaceru ~90-140 kroków/min.
  const interval = setInterval(() => {
    const perMinute = 90 + Math.random() * 50;
    const steps = Math.round((perMinute / 60) * 2);
    onDelta({ steps, flagged: false });
  }, 2_000);
  return { mode: "demo", stop: () => clearInterval(interval) };
}
