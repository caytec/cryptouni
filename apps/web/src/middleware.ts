import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/dictionaries";

/** Przekierowuje ścieżki bez prefiksu locale na domyślny język (np. / -> /pl). */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Pomijamy api, zasoby Next i pliki ze statycznym rozszerzeniem.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
