"use client";

import { useMemo, useState } from "react";
import type { Quiz as QuizType } from "@cryptouni/content";
import { scoreQuiz } from "@cryptouni/core";
import { useDictionary } from "@/components/DictionaryProvider";
import { useProgress } from "@/store/progress";

export function Quiz({ quiz, lessonSlug }: { quiz: QuizType; lessonSlug: string }) {
  const t = useDictionary().quiz;
  const completeLesson = useProgress((s) => s.completeLesson);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const result = useMemo(() => scoreQuiz(quiz, answers), [quiz, answers]);

  function select(questionId: string, optionId: string) {
    if (revealed[questionId] || finished) return;
    setAnswers((a) => ({ ...a, [questionId]: optionId }));
  }

  function reveal(questionId: string) {
    if (!answers[questionId]) return;
    setRevealed((r) => ({ ...r, [questionId]: true }));
  }

  function finish() {
    const r = scoreQuiz(quiz, answers);
    if (r.passed) completeLesson(lessonSlug, r.xpEarned);
    setFinished(true);
  }

  function retry() {
    setAnswers({});
    setRevealed({});
    setFinished(false);
  }

  const allRevealed = quiz.questions.every((q) => revealed[q.id]);

  if (finished) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center">
        <div className="text-4xl">{result.passed ? "🎉" : "💪"}</div>
        <p className="mt-3 text-lg font-semibold">
          {t.yourScore}: {result.correct}/{result.total}
        </p>
        {result.passed ? (
          <p className="mt-1 text-emerald-300">
            {t.passed} {result.xpEarned} {t.xp}
          </p>
        ) : (
          <p className="mt-1 text-slate-400">{t.failed}</p>
        )}
        {!result.passed && (
          <button
            onClick={retry}
            className="mt-4 rounded-lg bg-brand px-5 py-2 font-medium hover:bg-brand-dark"
          >
            {t.retry}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t.title}</h2>
      {quiz.questions.map((q, idx) => {
        const chosen = answers[q.id];
        const isRevealed = revealed[q.id];
        return (
          <div key={q.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="font-medium">
              {idx + 1}. {q.prompt}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt) => {
                const isChosen = chosen === opt.id;
                const isCorrect = opt.id === q.correctOptionId;
                let cls = "border-slate-700 hover:border-brand-light";
                if (isRevealed) {
                  if (isCorrect) cls = "border-emerald-500 bg-emerald-500/10";
                  else if (isChosen) cls = "border-red-500 bg-red-500/10";
                  else cls = "border-slate-800 opacity-60";
                } else if (isChosen) {
                  cls = "border-brand bg-brand/10";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => select(q.id, opt.id)}
                    disabled={isRevealed}
                    className={`block w-full rounded-lg border px-4 py-2 text-left text-sm transition-colors ${cls}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {!isRevealed ? (
              <button
                onClick={() => reveal(q.id)}
                disabled={!chosen}
                className="mt-3 rounded-lg bg-slate-700 px-4 py-1.5 text-sm font-medium hover:bg-slate-600 disabled:opacity-40"
              >
                {t.check}
              </button>
            ) : (
              <div className="mt-3 text-sm">
                <span
                  className={
                    result.byQuestion[q.id] ? "text-emerald-300" : "text-red-300"
                  }
                >
                  {result.byQuestion[q.id] ? `✓ ${t.correct}` : `✗ ${t.incorrect}`}
                </span>
                <p className="mt-1 text-slate-400">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={finish}
        disabled={!allRevealed}
        className="rounded-lg bg-brand px-6 py-3 font-semibold hover:bg-brand-dark disabled:opacity-40"
      >
        {t.finish}
      </button>
    </div>
  );
}
