import { describe, it, expect } from "vitest";
import { validateStepWindow, validateStepWindows } from "./anticheat";

describe("validateStepWindow", () => {
  it("akceptuje normalny spacer", () => {
    // 110 kroków w minutę — typowy marsz
    const v = validateStepWindow({ steps: 110, seconds: 60 });
    expect(v.acceptedSteps).toBe(110);
    expect(v.rejectedSteps).toBe(0);
    expect(v.flagged).toBe(false);
  });

  it("przycina tempo ponad fizjologiczny limit", () => {
    const v = validateStepWindow({ steps: 500, seconds: 60 });
    expect(v.acceptedSteps).toBe(240);
    expect(v.rejectedSteps).toBe(260);
    expect(v.flagged).toBe(true);
  });

  it("bieg pozostaje nieoznaczony", () => {
    const v = validateStepWindow({ steps: 230, seconds: 60 });
    expect(v.acceptedSteps).toBe(230);
    expect(v.flagged).toBe(false);
  });

  it("odrzuca kroki w oknie zerowej długości", () => {
    const v = validateStepWindow({ steps: 100, seconds: 0 });
    expect(v.acceptedSteps).toBe(0);
    expect(v.flagged).toBe(true);
  });
});

describe("validateStepWindows", () => {
  it("agreguje dzień i flaguje przy wielu podejrzanych oknach", () => {
    const windows = [
      { steps: 100, seconds: 60 },
      { steps: 600, seconds: 60 },
      { steps: 700, seconds: 60 },
      { steps: 650, seconds: 60 },
    ];
    const v = validateStepWindows(windows);
    expect(v.acceptedSteps).toBe(100 + 240 * 3);
    expect(v.flagged).toBe(true);
  });

  it("pojedynczy pik nie flaguje dnia", () => {
    const windows = [
      { steps: 100, seconds: 60 },
      { steps: 120, seconds: 60 },
      { steps: 400, seconds: 60 },
    ];
    const v = validateStepWindows(windows);
    expect(v.flagged).toBe(false);
    expect(v.acceptedSteps).toBe(100 + 120 + 240);
  });
});
