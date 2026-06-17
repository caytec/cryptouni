import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";

export function Nav({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <header className="border-b border-slate-800 bg-ink/80 backdrop-blur sticky top-0 z-10">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 h-14">
        <Link href={`/${locale}`} className="font-bold text-lg">
          <span className="text-brand-light">Crypto</span>Uni
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href={`/${locale}/kursy`} className="hover:text-brand-light">
            {dict.nav.courses}
          </Link>
          <Link href={`/${locale}/symulator`} className="hover:text-brand-light">
            {dict.nav.simulator}
          </Link>
          <Link
            href={`/${locale}/profil`}
            className="rounded-md bg-brand px-3 py-1.5 font-medium hover:bg-brand-dark"
          >
            {dict.nav.profile}
          </Link>
        </div>
      </nav>
    </header>
  );
}
