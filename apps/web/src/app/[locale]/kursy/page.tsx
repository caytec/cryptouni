import Link from "next/link";
import { courses } from "@cryptouni/content";
import { getDictionary } from "@/i18n/dictionaries";

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale).courses;

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-slate-400">{t.subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/${locale}/kurs/${course.slug}`}
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-brand transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl">{course.icon}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  course.tier === "free"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-brand/20 text-brand-light"
                }`}
              >
                {course.tier === "free" ? t.free : t.premium}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold group-hover:text-brand-light">
              {course.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{course.description}</p>
            <div className="mt-4 text-xs text-slate-500">
              {t.level} {course.level} · {course.lessons.length} {t.lessons}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
