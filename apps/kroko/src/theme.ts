/**
 * Motyw Kroko: ciemne tło pod użycie na dworze (mniejsze zużycie baterii
 * na AMOLED podczas długich spacerów) + limonkowy akcent "energii".
 * Fiolet łączy wizualnie z resztą ekosystemu CryptoUni.
 */
export const colors = {
  bg: "#0b1020",
  surface: "#111827",
  surfaceRaised: "#1a2336",
  border: "#243049",
  accent: "#a3e635",
  accentDark: "#4d7c0f",
  secondary: "#a78bfa",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  textFaint: "#64748b",
  danger: "#f87171",
  success: "#34d399",
  gold: "#fbbf24",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
} as const;
