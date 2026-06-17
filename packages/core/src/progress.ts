import { totalLessonCount } from "@cryptouni/content";

/** Stan postępu użytkownika (utrwalany lokalnie w MVP, w bazie w Fazie 2). */
export interface ProgressState {
  xp: number;
  /** sluge ukończonych lekcji. */
  completedLessons: string[];
  /** Liczba dni z rzędu (streak). */
  streak: number;
  /** Data ostatniej aktywności (YYYY-MM-DD). */
  lastActiveDate: string | null;
  /** Zdobyte odznaki (id). */
  badges: string[];
}

export const initialProgress: ProgressState = {
  xp: 0,
  completedLessons: [],
  streak: 0,
  lastActiveDate: null,
  badges: [],
};

/** 100 XP na poziom — prosta, czytelna krzywa. */
export const XP_PER_LEVEL = 100;

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/** Postęp (0–1) w obrębie bieżącego poziomu. */
export function levelProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}

/** Odsetek ukończonych lekcji na całej platformie (0–1). */
export function courseCompletion(state: ProgressState): number {
  if (totalLessonCount === 0) return 0;
  return state.completedLessons.length / totalLessonCount;
}

function dayDiff(fromISO: string, toISO: string): number {
  const from = new Date(fromISO + "T00:00:00Z").getTime();
  const to = new Date(toISO + "T00:00:00Z").getTime();
  return Math.round((to - from) / 86_400_000);
}

/** Aktualizuje streak na podstawie daty aktywności (dziś = todayISO). */
export function updateStreak(state: ProgressState, todayISO: string): ProgressState {
  if (state.lastActiveDate === todayISO) return state;
  if (state.lastActiveDate === null) {
    return { ...state, streak: 1, lastActiveDate: todayISO };
  }
  const diff = dayDiff(state.lastActiveDate, todayISO);
  const streak = diff === 1 ? state.streak + 1 : 1;
  return { ...state, streak, lastActiveDate: todayISO };
}

/**
 * Rejestruje ukończenie lekcji: dolicza XP, oznacza lekcję, aktualizuje streak.
 * Idempotentne względem XP za lekcję (XP nie dolicza się drugi raz za tę samą lekcję).
 */
export function completeLesson(
  state: ProgressState,
  lessonSlug: string,
  xpEarned: number,
  todayISO: string,
): ProgressState {
  const alreadyDone = state.completedLessons.includes(lessonSlug);
  const next: ProgressState = {
    ...state,
    xp: alreadyDone ? state.xp : state.xp + xpEarned,
    completedLessons: alreadyDone
      ? state.completedLessons
      : [...state.completedLessons, lessonSlug],
  };
  return awardBadges(updateStreak(next, todayISO));
}

/** Przyznaje odznaki na podstawie stanu (proste reguły MVP). */
export function awardBadges(state: ProgressState): ProgressState {
  const earned = new Set(state.badges);
  if (state.completedLessons.length >= 1) earned.add("pierwsza-lekcja");
  if (state.streak >= 7) earned.add("tydzien-z-rzedu");
  if (state.completedLessons.includes("anatomia-scamu")) earned.add("lowca-scamow");
  if (courseCompletion(state) >= 1) earned.add("absolwent");
  return { ...state, badges: [...earned] };
}

export interface BadgeMeta {
  id: string;
  label: string;
  icon: string;
}

export const BADGES: BadgeMeta[] = [
  { id: "pierwsza-lekcja", label: "Pierwsza lekcja", icon: "🎓" },
  { id: "tydzien-z-rzedu", label: "7 dni z rzędu", icon: "🔥" },
  { id: "lowca-scamow", label: "Łowca scamów", icon: "🛡️" },
  { id: "absolwent", label: "Absolwent", icon: "🏆" },
];
