/**
 * Krzywa poziomów profilu: koszt kolejnego poziomu rośnie kwadratowo,
 * więc początek jest szybki (nagroda za onboarding), a późne poziomy
 * są prestiżowe.
 */
export function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  return 50 * (level - 1) * (level - 1);
}

export function levelFromXp(xp: number): number {
  const safeXp = Math.max(0, xp);
  return Math.floor(Math.sqrt(safeXp / 50)) + 1;
}

export interface LevelProgress {
  level: number;
  /** XP zebrane w bieżącym poziomie. */
  xpIntoLevel: number;
  /** XP potrzebne, by wejść na następny poziom. */
  xpForNextLevel: number;
  /** 0..1 */
  ratio: number;
}

export function levelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const currentFloor = xpRequiredForLevel(level);
  const nextFloor = xpRequiredForLevel(level + 1);
  const xpIntoLevel = Math.max(0, xp) - currentFloor;
  const xpForNextLevel = nextFloor - currentFloor;
  return {
    level,
    xpIntoLevel,
    xpForNextLevel,
    ratio: Math.min(1, xpIntoLevel / xpForNextLevel),
  };
}
