import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale).landing;

  const features = [
    { title: t.feature1Title, body: t.feature1Body, icon: "🚀" },
    { title: t.feature2Title, body: t.feature2Body, icon: "🛡️" },
    { title: t.feature3Title, body: t.feature3Body, icon: "📈" },
  ];

  return (
    <div className="space-y-16">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
          {t.heroTitle}
        </h1>
        <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto">{t.heroSubtitle}</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={`/${locale}/kursy`}
            className="rounded-lg bg-brand px-6 py-3 font-semibold hover:bg-brand-dark"
          >
            {t.ctaStart}
          </Link>
          <Link
            href={`/${locale}/kursy`}
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:border-brand-light"
          >
            {t.ctaCourses}
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{f.body}</p>
          </div>
        ))}
      </section>

      <p className="text-center text-xs text-slate-500 max-w-2xl mx-auto">{t.disclaimer}</p>
    </div>
  );
}
