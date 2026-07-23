import type { Metadata } from "next";
import "../globals.css";
import { getDictionary, locales } from "@/i18n/dictionaries";
import { DictionaryProvider } from "@/components/DictionaryProvider";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "CryptoUni — nauka kryptowalut od podstaw",
  description:
    "Niezależna polska akademia kryptowalut: od pierwszej transakcji po zaawansowane strategie. Z naciskiem na bezpieczeństwo i rozpoznawanie scamów.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <DictionaryProvider dictionary={dict}>
          <Nav dict={dict} locale={locale} />
          <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
          <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CryptoUni · {dict.footer.rights}
          </footer>
        </DictionaryProvider>
      </body>
    </html>
  );
}
