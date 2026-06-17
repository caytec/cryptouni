import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@cryptouni/content";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const dict = getDictionary(locale);
  const t = dict.courses;

  return (
    <div>
      <Link href={`/${locale}/kursy`} className="text-sm text-slate-400 hover:text-brand-light">
        ← {t.title}
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl">{course.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-sm text-slate-500">
            {t.level} {course.level} · {course.lessons.length} {t.lessons}
          </p>
        </div>
      </div>
      <p className="mt-4 text-slate-300">{course.description}</p>

      <ol className="mt-8 space-y-3">
        {course.lessons.map((lesson, i) => (
          <li key={lesson.slug}>
            <Link
              href={`/${locale}/lekcja/${lesson.slug}`}
              className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-brand transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/20 text-sm font-bold text-brand-light">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-medium">{lesson.title}</span>
                <span className="block text-sm text-slate-400">{lesson.summary}</span>
              </span>
              <span className="text-xs text-slate-500">
                {lesson.estimatedMinutes} {dict.lesson.minutes}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
