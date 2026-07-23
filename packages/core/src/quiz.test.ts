import { describe, it, expect } from "vitest";
import type { Quiz } from "@cryptouni/content";
import { scoreQuiz } from "./quiz";

const quiz: Quiz = {
  id: "t",
  xpReward: 30,
  passingScore: 0.6,
  questions: [
    { id: "q1", prompt: "", options: [], correctOptionId: "a", explanation: "" },
    { id: "q2", prompt: "", options: [], correctOptionId: "b", explanation: "" },
    { id: "q3", prompt: "", options: [], correctOptionId: "c", explanation: "" },
  ],
};

describe("scoreQuiz", () => {
  it("przyznaje XP gdy wynik osiąga próg", () => {
    const r = scoreQuiz(quiz, { q1: "a", q2: "b", q3: "x" });
    expect(r.correct).toBe(2);
    expect(r.score).toBeCloseTo(2 / 3);
    expect(r.passed).toBe(true);
    expect(r.xpEarned).toBe(30);
  });

  it("nie przyznaje XP poniżej progu", () => {
    const r = scoreQuiz(quiz, { q1: "a", q2: "x", q3: "x" });
    expect(r.correct).toBe(1);
    expect(r.passed).toBe(false);
    expect(r.xpEarned).toBe(0);
  });

  it("oznacza poprawność per pytanie", () => {
    const r = scoreQuiz(quiz, { q1: "a", q2: "x", q3: "c" });
    expect(r.byQuestion).toEqual({ q1: true, q2: false, q3: true });
  });
});
