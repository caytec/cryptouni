import { describe, it, expect } from "vitest";
import { levelFromXp, levelProgress, xpRequiredForLevel } from "./levels";
import { evaluateChallenges, CHALLENGES } from "./challenges";

describe("poziomy", () => {
  it("krzywa jest spójna w obie strony", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(xpRequiredForLevel(2)).toBe(50);
    expect(levelFromXp(50)).toBe(2);
    expect(levelFromXp(49)).toBe(1);
    for (let level = 1; level <= 20; level += 1) {
      expect(levelFromXp(xpRequiredForLevel(level))).toBe(level);
    }
  });

  it("liczy postęp wewnątrz poziomu", () => {
    const p = levelProgress(75);
    expect(p.level).toBe(2);
    expect(p.xpIntoLevel).toBe(25);
    expect(p.xpForNextLevel).toBe(150);
  });
});

describe("wyzwania", () => {
  it("dzienne liczy z kroków dnia, tygodniowe z kroków tygodnia", () => {
    const progress = evaluateChallenges(6_500, 50_000);
    const daily = progress.find((p) => p.definition.id === "daily-6k");
    const weekly = progress.find((p) => p.definition.id === "weekly-45k");
    const bigWeekly = progress.find((p) => p.definition.id === "weekly-70k");
    expect(daily?.completed).toBe(true);
    expect(weekly?.completed).toBe(true);
    expect(bigWeekly?.completed).toBe(false);
    expect(bigWeekly?.ratio).toBeCloseTo(50_000 / 70_000);
    expect(progress).toHaveLength(CHALLENGES.length);
  });
});
