# CryptoUni 🪙

**Niezależna polska platforma do nauki kryptowalut — od podstaw do poziomu zaawansowanego.**
Web + aplikacja mobilna. Nacisk na realia rynku: co jest prawdziwe, co jest scamem, na czym
można (świadomie) zarobić, a na czym i jak traci się pieniądze.

> To projekt edukacyjny. Treści nie stanowią porady inwestycyjnej (NFA / DYOR).

## Co tu jest

- **Dokumenty strategiczne** — `docs/`:
  - [`STRATEGY.md`](docs/STRATEGY.md) — research rynku i konkurencji, model biznesowy, monetyzacja, roadmapa, ryzyka.
  - [`CURRICULUM.md`](docs/CURRICULUM.md) — pełny program nauczania (4 poziomy).
  - [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — decyzje techniczne.
- **MVP web** (`apps/web`) — Next.js: landing, katalog kursów, lekcje (Markdown), interaktywne quizy z XP, profil/postęp, symulator (live ceny z CoinGecko).
- **Szkielet mobile** (`apps/mobile`) — Expo/React Native reużywający wspólnych pakietów.
- **Wspólne pakiety** (`packages/`):
  - `content` — treści lekcji + quizy + glosariusz (źródło prawdy, po polsku).
  - `core` — logika domenowa: scoring quizów, postęp, XP, odznaki (z testami).
  - `config` — współdzielona konfiguracja TS.

## Stack

Monorepo **Turborepo + pnpm** · **Next.js 15** (web) · **Expo/React Native** (mobile) ·
TypeScript · Tailwind CSS · Zustand · i18n (domyślnie `pl`, gotowe na EN).

## Szybki start

```bash
pnpm install
pnpm dev            # uruchamia web na http://localhost:3000 (przekierowanie -> /pl)
```

Inne komendy:

```bash
pnpm build          # build całego monorepo
pnpm test           # testy (packages/core)
pnpm lint           # lint
```

Symulator korzysta z CoinGecko (free tier). Opcjonalny klucz: skopiuj
`apps/web/.env.example` do `apps/web/.env.local` i ustaw `COINGECKO_API_KEY`.

## Struktura

```
cryptouni/
├─ apps/
│  ├─ web/          # Next.js (MVP)
│  └─ mobile/       # Expo (szkielet)
├─ packages/
│  ├─ content/      # lekcje + quizy + glosariusz
│  ├─ core/         # logika: quizy, postęp, XP
│  └─ config/       # wspólny tsconfig
└─ docs/            # strategia, program, architektura
```

## Roadmapa (skrót)

Faza 0 (MVP web — teraz) → Faza 1 (pełny mobile) → Faza 2 (konta, płatności, pełny symulator) →
Faza 3 (społeczność, ranking) → Faza 4 (wersja EN, B2B). Szczegóły w [`docs/STRATEGY.md`](docs/STRATEGY.md).
