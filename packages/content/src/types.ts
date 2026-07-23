/**
 * Typy domeny treści edukacyjnych CryptoUni.
 * Współdzielone przez web i mobile (źródło prawdy dla lekcji i quizów).
 */

export type Level = 1 | 2 | 3 | 4;

export type Tier = "free" | "premium";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  /** Treść pytania. */
  prompt: string;
  options: QuizOption[];
  /** id poprawnej opcji. */
  correctOptionId: string;
  /** Wyjaśnienie pokazywane po odpowiedzi (dydaktyka, nie tylko ocena). */
  explanation: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  /** XP przyznawane za zaliczenie quizu (próg passingScore). */
  xpReward: number;
  /** Minimalny odsetek poprawnych (0–1), by uznać quiz za zaliczony. */
  passingScore: number;
}

export interface Lesson {
  slug: string;
  title: string;
  /** Krótki opis na karcie/listingu. */
  summary: string;
  /** Szacowany czas czytania w minutach. */
  estimatedMinutes: number;
  /** Treść lekcji w Markdown (renderowana przez web i mobile). */
  body: string;
  quiz: Quiz;
}

export interface Course {
  slug: string;
  level: Level;
  tier: Tier;
  title: string;
  description: string;
  /** Emoji/ikona dla karty kursu. */
  icon: string;
  lessons: Lesson[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}
