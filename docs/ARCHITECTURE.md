# CryptoUni — Architektura techniczna

## Przegląd

Monorepo (Turborepo + pnpm) maksymalizujące współdzielenie kodu między web a mobile.

```
cryptouni/
├─ apps/
│  ├─ web/      # Next.js 15 (App Router, TS, Tailwind, next-intl) — MVP
│  └─ mobile/   # Expo / React Native — szkielet, współdzieli packages/*
├─ packages/
│  ├─ content/  # treści lekcji (MDX) + quizy (TS) + glosariusz — źródło prawdy
│  ├─ core/     # logika domenowa: typy, scoring quizów, postęp/XP, store
│  └─ config/   # współdzielone tsconfig
└─ docs/        # STRATEGY, CURRICULUM, ARCHITECTURE
```

## Decyzje

| Obszar | Wybór | Uzasadnienie |
|---|---|---|
| Monorepo | Turborepo + pnpm | Jeden język (TS), współdzielenie `content`/`core` web↔mobile, szybki cache buildów |
| Web | Next.js 15 App Router | SSR/SSG dla SEO (ważne dla pozyskania ruchu PL), nowoczesny DX |
| Stylowanie | Tailwind CSS | Szybkie, spójne UI |
| i18n | next-intl | Domyślnie `pl`, łatwe dodanie `en` (routing `/[locale]`) |
| Mobile | Expo / React Native | iOS+Android z jednej bazy, reużycie pakietów TS |
| Stan/postęp (MVP) | Zustand + localStorage | Bez backendu na start — MVP w pełni demonstrowalne; konta/DB w Fazie 2 |
| Treści | MDX + obiekty TS | Łatwa aktualizacja, wersjonowanie w gicie, walidacja typów |
| Dane cenowe | CoinGecko API (free) | 10k kredytów/mies., dane historyczne; proxy z cache w `/api/prices` |

## Współdzielenie kodu

- `packages/content` — eksportuje listę kursów/lekcji/quizów + glosariusz. Importowane zarówno przez web, jak i mobile.
- `packages/core` — czysta logika (bez UI): typy domenowe, `scoreQuiz()`, model postępu i XP, store. Testowana w Vitest.
- Dzięki temu dodanie ekranu w mobile = reużycie tych samych danych i logiki co web.

## Web — struktura tras (App Router, locale-prefixed)

```
app/[locale]/
├─ page.tsx               # landing
├─ kursy/page.tsx         # katalog kursów (poziomy)
├─ kurs/[slug]/page.tsx   # opis kursu + lista lekcji
├─ lekcja/[slug]/page.tsx # widok lekcji (MDX) + quiz
├─ profil/page.tsx        # postęp, XP, odznaki (localStorage)
└─ symulator/page.tsx     # zaślepka symulatora (ceny z /api/prices)
app/api/prices/route.ts   # proxy do CoinGecko z cache
```

## Symulator (paper trading)

- MVP: zaślepka pokazująca live ceny BTC/ETH z `/api/prices` (proxy CoinGecko, cache 60 s).
- Faza 2: wirtualny portfel (saldo startowe w wirtualnej walucie), kupno/sprzedaż po cenie live, historia, P&L — wszystko po stronie konta użytkownika. Zero realnych środków → zero wymogów KYC/AML.

## Uruchomienie

```bash
pnpm install
pnpm dev          # uruchamia wszystkie apps (web na :3000)
pnpm build        # build całego monorepo
pnpm test         # testy (packages/core)
```

Zmienne środowiskowe (web): `COINGECKO_API_KEY` (opcjonalny — free tier działa też bez klucza z niższym limitem). Patrz `apps/web/.env.example`.
