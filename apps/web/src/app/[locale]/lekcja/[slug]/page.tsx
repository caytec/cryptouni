import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { allLessons, getLessonBySlug } from "@cryptouni/content";
import { getDictionary } from "@/i18n/dictionaries";
import { Quiz } from "@/components/Quiz";

export function generateStaticParams() {
  return allLessons.map(({ lesson }) => ({ slug: lesson.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const found = getLessonBySlug(slug);
  if (!found) notFound();

  const { course, lesson } = found;
  const dict = getDictionary(locale);

  return (
    <article>
      <Link
        href={`/${locale}/kurs/${course.slug}`}
        className="text-sm text-slate-400 hover:text-brand-light"
      >
        ← {dict.lesson.backToCourse}
      </Link>

      <p className="mt-4 text-xs text-slate-500">
        {course.title} · {lesson.estimatedMinutes} {dict.lesson.minutes}
      </p>

      <div className="prose-lesson mt-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
      </div>

      <hr className="my-10 border-slate-800" />

      <Quiz quiz={lesson.quiz} lessonSlug={lesson.slug} />
    </article>
  );
}
