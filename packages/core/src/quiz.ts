import type { Quiz } from "@cryptouni/content";

export interface QuizResult {
  total: number;
  correct: number;
  /** Odsetek poprawnych (0–1). */
  score: number;
  passed: boolean;
  /** XP zdobyte (xpReward jeśli passed, inaczej 0). */
  xpEarned: number;
  /** Mapa: id pytania -> czy odpowiedź była poprawna. */
  byQuestion: Record<string, boolean>;
}

/**
 * Ocenia rozwiązany quiz.
 * @param quiz definicja quizu
 * @param answers mapa id pytania -> id wybranej opcji
 */
export function scoreQuiz(quiz: Quiz, answers: Record<string, string>): QuizResult {
  const total = quiz.questions.length;
  const byQuestion: Record<string, boolean> = {};
  let correct = 0;

  for (const q of quiz.questions) {
    const isCorrect = answers[q.id] === q.correctOptionId;
    byQuestion[q.id] = isCorrect;
    if (isCorrect) correct += 1;
  }

  const score = total === 0 ? 0 : correct / total;
  const passed = score >= quiz.passingScore;

  return {
    total,
    correct,
    score,
    passed,
    xpEarned: passed ? quiz.xpReward : 0,
    byQuestion,
  };
}
