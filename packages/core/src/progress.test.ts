import { describe, it, expect } from "vitest";
import {
  initialProgress,
  levelFromXp,
  completeLesson,
  updateStreak,
} from "./progress";

describe("XP i poziomy", () => {
  it("liczy poziom z XP (100 XP/poziom)", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(99)).toBe(1);
    expect(levelFromXp(100)).toBe(2);
    expect(levelFromXp(250)).toBe(3);
  });
});

describe("completeLesson", () => {
  it("dolicza XP i oznacza lekcję", () => {
    const s = completeLesson(initialProgress, "czym-jest-blockchain", 20, "2026-06-17");
    expect(s.xp).toBe(20);
    expect(s.completedLessons).toContain("czym-jest-blockchain");
    expect(s.badges).toContain("pierwsza-lekcja");
  });

  it("nie dolicza XP drugi raz za tę samą lekcję", () => {
    const s1 = completeLesson(initialProgress, "l1", 20, "2026-06-17");
    const s2 = completeLesson(s1, "l1", 20, "2026-06-17");
    expect(s2.xp).toBe(20);
    expect(s2.completedLessons).toHaveLength(1);
  });

  it("przyznaje odznakę łowcy scamów za lekcję anatomia-scamu", () => {
    const s = completeLesson(initialProgress, "anatomia-scamu", 30, "2026-06-17");
    expect(s.badges).toContain("lowca-scamow");
  });
});

describe("updateStreak", () => {
  it("startuje streak od 1", () => {
    expect(updateStreak(initialProgress, "2026-06-17").streak).toBe(1);
  });

  it("zwiększa streak przy kolejnym dniu", () => {
    const d1 = updateStreak(initialProgress, "2026-06-17");
    const d2 = updateStreak(d1, "2026-06-18");
    expect(d2.streak).toBe(2);
  });

  it("resetuje streak po przerwie", () => {
    const d1 = updateStreak(initialProgress, "2026-06-17");
    const d3 = updateStreak(d1, "2026-06-20");
    expect(d3.streak).toBe(1);
  });

  it("nie zmienia streaka przy tej samej dacie", () => {
    const d1 = updateStreak(initialProgress, "2026-06-17");
    const same = updateStreak(d1, "2026-06-17");
    expect(same.streak).toBe(1);
  });
});
