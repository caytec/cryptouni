import { describe, it, expect } from "vitest";
import { computeEarning, streakMultiplier } from "./earning";
import { DEFAULT_EARNING_CONFIG } from "./types";

describe("computeEarning", () => {
  it("nalicza pełną stawkę w pierwszej strefie (100 kroków = 1 KROK)", () => {
    const r = computeEarning({ steps: 5_000 });
    expect(r.fullRateSteps).toBe(5_000);
    expect(r.reducedRateSteps).toBe(0);
    expect(r.uncountedSteps).toBe(0);
    expect(r.baseCoins).toBe(50);
    expect(r.totalCoins).toBe(50);
  });

  it("nalicza stawkę obniżoną powyżej limitu pełnej stawki", () => {
    const r = computeEarning({ steps: 12_000 });
    // 8000 pełną stawką = 80, 4000 połową stawki = 20
    expect(r.fullRateSteps).toBe(8_000);
    expect(r.reducedRateSteps).toBe(4_000);
    expect(r.baseCoins).toBe(100);
  });

  it("nie płaci za kroki powyżej dziennego limitu", () => {
    const r = computeEarning({ steps: 25_000 });
    expect(r.uncountedSteps).toBe(9_000);
    // 8000/100 + 8000/100*0.5 = 80 + 40
    expect(r.baseCoins).toBe(120);
  });

  it("dolicza bonus za streak od całej bazy", () => {
    const r = computeEarning({ steps: 10_000, streakDays: 7 });
    // baza: 80 + 10 = 90; +10% = 9
    expect(r.streakBonusCoins).toBeCloseTo(9);
    expect(r.totalCoins).toBeCloseTo(99);
  });

  it("boost mnoży tylko kroki wykonane w oknie boosta", () => {
    const r = computeEarning({ steps: 6_000, boostedSteps: 2_000 });
    // baza 60, bonus boosta: 2000/100 * (2-1) = 20
    expect(r.boostBonusCoins).toBe(20);
    expect(r.totalCoins).toBe(80);
  });

  it("boost nie obejmuje kroków ponad limit zarabiania", () => {
    const r = computeEarning({
      steps: 20_000,
      boostedSteps: 20_000,
      config: DEFAULT_EARNING_CONFIG,
    });
    // strefa zarabiania to 16k kroków — boost liczony od 16k, nie 20k
    expect(r.boostBonusCoins).toBe(160);
  });

  it("jest odporny na wartości ujemne i ułamkowe", () => {
    const r = computeEarning({ steps: -50, boostedSteps: -10, streakDays: -3 });
    expect(r.totalCoins).toBe(0);
  });
});

describe("streakMultiplier", () => {
  it("rośnie progowo", () => {
    expect(streakMultiplier(0)).toBe(1);
    expect(streakMultiplier(3)).toBe(1.05);
    expect(streakMultiplier(7)).toBe(1.1);
    expect(streakMultiplier(14)).toBe(1.2);
    expect(streakMultiplier(30)).toBe(1.35);
    expect(streakMultiplier(365)).toBe(1.35);
  });
});
