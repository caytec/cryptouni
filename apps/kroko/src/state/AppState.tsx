import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CHALLENGES,
  computeEarning,
  evaluateChallenges,
  levelProgress,
  type ChallengeProgress,
  type EarningBreakdown,
  type LevelProgress,
} from "@cryptouni/move-core";

const STORAGE_KEY = "kroko/state/v1";
const BOOST_DURATION_MS = 20 * 60 * 1000;
const BOOSTS_PER_DAY = 2;
/** Minimum kroków, by dzień podtrzymał serię. */
const STREAK_MIN_STEPS = 1_000;

export interface DayRecord {
  /** Data w formacie YYYY-MM-DD. */
  date: string;
  steps: number;
  coins: number;
}

interface PersistedState {
  date: string;
  todaySteps: number;
  boostedStepsToday: number;
  boostsUsedToday: number;
  boostEndsAt: number | null;
  streakDays: number;
  settledBalance: number;
  spentCoins: number;
  xp: number;
  history: DayRecord[];
  claimedChallenges: string[];
  redeemedOffers: string[];
  cheatFlags: number;
}

const initialState: PersistedState = {
  date: todayKey(),
  todaySteps: 0,
  boostedStepsToday: 0,
  boostsUsedToday: 0,
  boostEndsAt: null,
  streakDays: 0,
  settledBalance: 0,
  spentCoins: 0,
  xp: 0,
  history: [],
  claimedChallenges: [],
  redeemedOffers: [],
  cheatFlags: 0,
};

export interface AppStateValue {
  ready: boolean;
  todaySteps: number;
  streakDays: number;
  earnings: EarningBreakdown;
  /** Saldo dostępne do wydania (rozliczone dni + dziś − wydatki). */
  balance: number;
  xp: number;
  level: LevelProgress;
  history: DayRecord[];
  challenges: ChallengeProgress[];
  claimedChallenges: string[];
  redeemedOffers: string[];
  boostActive: boolean;
  boostEndsAt: number | null;
  boostsLeft: number;
  cheatFlags: number;
  addSteps: (steps: number, flagged: boolean) => void;
  startBoost: () => void;
  claimChallenge: (id: string) => void;
  redeemOffer: (id: string, cost: number) => boolean;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function weekSteps(history: DayRecord[], todaySteps: number): number {
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // poniedziałek = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek);
  const mondayKey = todayKey(monday);
  const past = history
    .filter((d) => d.date >= mondayKey && d.date !== todayKey(now))
    .reduce((sum, d) => sum + d.steps, 0);
  return past + todaySteps;
}

/** Zamyka poprzedni dzień: rozlicza saldo, aktualizuje serię i historię. */
function rolloverIfNeeded(state: PersistedState): PersistedState {
  const today = todayKey();
  if (state.date === today) return state;

  const earned = computeEarning({
    steps: state.todaySteps,
    boostedSteps: state.boostedStepsToday,
    streakDays: state.streakDays,
  });
  const closedDay: DayRecord = {
    date: state.date,
    steps: state.todaySteps,
    coins: earned.totalCoins,
  };
  return {
    ...state,
    date: today,
    todaySteps: 0,
    boostedStepsToday: 0,
    boostsUsedToday: 0,
    boostEndsAt: null,
    streakDays:
      state.todaySteps >= STREAK_MIN_STEPS ? state.streakDays + 1 : 0,
    settledBalance: state.settledBalance + earned.totalCoins,
    history: [...state.history, closedDay].slice(-30),
    claimedChallenges: state.claimedChallenges.filter((id) =>
      id.startsWith("weekly-"),
    ),
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [ready, setReady] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw) as PersistedState;
          setState(rolloverIfNeeded({ ...initialState, ...parsed }));
        }
      } catch {
        // uszkodzony zapis — startujemy od zera
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {
      // brak miejsca / storage niedostępny — stan przetrwa w pamięci
    });
  }, [state, ready]);

  const addSteps = useCallback((steps: number, flagged: boolean) => {
    setState((prev) => {
      const next = rolloverIfNeeded(prev);
      const boostActive =
        next.boostEndsAt !== null && next.boostEndsAt > Date.now();
      return {
        ...next,
        todaySteps: next.todaySteps + steps,
        boostedStepsToday: boostActive
          ? next.boostedStepsToday + steps
          : next.boostedStepsToday,
        cheatFlags: flagged ? next.cheatFlags + 1 : next.cheatFlags,
      };
    });
  }, []);

  const startBoost = useCallback(() => {
    setState((prev) => {
      const next = rolloverIfNeeded(prev);
      const active = next.boostEndsAt !== null && next.boostEndsAt > Date.now();
      if (active || next.boostsUsedToday >= BOOSTS_PER_DAY) return next;
      return {
        ...next,
        boostEndsAt: Date.now() + BOOST_DURATION_MS,
        boostsUsedToday: next.boostsUsedToday + 1,
      };
    });
  }, []);

  const claimChallenge = useCallback((id: string) => {
    setState((prev) => {
      const next = rolloverIfNeeded(prev);
      if (next.claimedChallenges.includes(id)) return next;
      const definition = CHALLENGES.find((c) => c.id === id);
      if (!definition) return next;
      const progress = evaluateChallenges(
        next.todaySteps,
        weekSteps(next.history, next.todaySteps),
        [definition],
      )[0];
      if (!progress || !progress.completed) return next;
      return {
        ...next,
        claimedChallenges: [...next.claimedChallenges, id],
        settledBalance: next.settledBalance + definition.rewardCoins,
        xp: next.xp + definition.rewardXp,
      };
    });
  }, []);

  const redeemOffer = useCallback((id: string, cost: number): boolean => {
    const current = stateRef.current;
    const earned = computeEarning({
      steps: current.todaySteps,
      boostedSteps: current.boostedStepsToday,
      streakDays: current.streakDays,
    });
    const balance =
      current.settledBalance + earned.totalCoins - current.spentCoins;
    if (balance < cost) return false;
    setState((prev) => ({
      ...prev,
      spentCoins: prev.spentCoins + cost,
      redeemedOffers: [...prev.redeemedOffers, id],
      xp: prev.xp + 20,
    }));
    return true;
  }, []);

  const value = useMemo<AppStateValue>(() => {
    const earnings = computeEarning({
      steps: state.todaySteps,
      boostedSteps: state.boostedStepsToday,
      streakDays: state.streakDays,
    });
    const boostActive =
      state.boostEndsAt !== null && state.boostEndsAt > Date.now();
    return {
      ready,
      todaySteps: state.todaySteps,
      streakDays: state.streakDays,
      earnings,
      balance:
        Math.round(
          (state.settledBalance + earnings.totalCoins - state.spentCoins) * 100,
        ) / 100,
      xp: state.xp,
      level: levelProgress(state.xp),
      history: state.history,
      challenges: evaluateChallenges(
        state.todaySteps,
        weekSteps(state.history, state.todaySteps),
      ),
      claimedChallenges: state.claimedChallenges,
      redeemedOffers: state.redeemedOffers,
      boostActive,
      boostEndsAt: state.boostEndsAt,
      boostsLeft: Math.max(0, BOOSTS_PER_DAY - state.boostsUsedToday),
      cheatFlags: state.cheatFlags,
      addSteps,
      startBoost,
      claimChallenge,
      redeemOffer,
    };
  }, [state, ready, addSteps, startBoost, claimChallenge, redeemOffer]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useAppState musi być użyty wewnątrz AppStateProvider");
  }
  return value;
}
