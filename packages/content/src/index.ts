import type { Course, Lesson } from "./types";
import { podstawy } from "./courses/podstawy";
import { bezpieczenstwo } from "./courses/bezpieczenstwo";

export * from "./types";
export { glossary } from "./glossary";

/** Wszystkie kursy platformy (posortowane wg poziomu). */
export const courses: Course[] = [podstawy, bezpieczenstwo].sort(
  (a, b) => a.level - b.level,
);

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLessonBySlug(slug: string): { course: Course; lesson: Lesson } | undefined {
  for (const course of courses) {
    const lesson = course.lessons.find((l) => l.slug === slug);
    if (lesson) return { course, lesson };
  }
  return undefined;
}

/** Płaska lista wszystkich lekcji (np. do liczenia postępu). */
export const allLessons: { courseSlug: string; lesson: Lesson }[] = courses.flatMap((c) =>
  c.lessons.map((lesson) => ({ courseSlug: c.slug, lesson })),
);

/** Łączna liczba lekcji na platformie. */
export const totalLessonCount = allLessons.length;
