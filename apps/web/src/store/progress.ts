"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialProgress,
  completeLesson as applyCompleteLesson,
  type ProgressState,
} from "@cryptouni/core";

interface ProgressStore {
  progress: ProgressState;
  /** Rejestruje ukończenie lekcji z przyznanym XP (z quizu). */
  completeLesson: (lessonSlug: string, xpEarned: number) => void;
  reset: () => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      completeLesson: (lessonSlug, xpEarned) =>
        set({
          progress: applyCompleteLesson(
            get().progress,
            lessonSlug,
            xpEarned,
            todayISO(),
          ),
        }),
      reset: () => set({ progress: initialProgress }),
    }),
    { name: "cryptouni-progress" },
  ),
);
