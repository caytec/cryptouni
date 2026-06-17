"use client";

import { useEffect, useState } from "react";
import {
  levelFromXp,
  levelProgress,
  courseCompletion,
  BADGES,
} from "@cryptouni/core";
import { useDictionary } from "@/components/DictionaryProvider";
import { useProgress } from "@/store/progress";

export default function ProfilePage() {
  const t = useDictionary().profile;
  const progress = useProgress((s) => s.progress);
  const reset = useProgress((s) => s.reset);

  // Unikamy niezgodności hydratacji (localStorage dostępny dopiero po montażu).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const level = levelFromXp(progress.xp);
  const inLevel = Math.round(levelProgress(progress.xp) * 100);
  const completion = Math.round(courseCompletion(progress) * 100);
  const earnedBadges = new Set(progress.badges);

  const stats = [
    { label: t.level, value: level },
    { label: t.xp, value: progress.xp },
    { label: t.streak, value: `${progress.streak} 🔥` },
    { label: t.completion, value: `${completion}%` },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.title}</h1>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center"
          >
            <div className="text-2xl font-bold text-brand-light">{s.value}</div>
            <div className="mt-1 text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-400">
          <span>
            {t.level} {level}
          </span>
          <span>{inLevel}%</span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-brand"
            style={{ width: `${inLevel}%` }}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">{t.badges}</h2>
      {progress.badges.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">{t.noBadges}</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {BADGES.filter((b) => earnedBadges.has(b.id)).map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm"
            >
              <span className="text-lg">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={reset}
        className="mt-10 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:border-red-500 hover:text-red-300"
      >
        {t.reset}
      </button>
    </div>
  );
}
