# CryptoUni — Program nauczania (sylabus)

Ścieżka od zera do poziomu zaawansowanego. 4 poziomy, każdy z lekcjami (MDX) i quizami.
Treści źródłowe: `packages/content`. Wszystko po polsku, struktura i18n-ready.

> Każda lekcja kończy się quizem z natychmiastowym feedbackiem i wyjaśnieniem.
> Każda treść ma disclaimer: **To nie jest porada inwestycyjna (NFA / DYOR).**

---

## Poziom 1 — Podstawy (FREE)
Cel: zrozumieć czym jest krypto i bezpiecznie wykonać pierwsze kroki.

1. **Czym jest blockchain i kryptowaluta** — pieniądz cyfrowy, decentralizacja, po co to powstało.
2. **Historia: od Bitcoina do dziś** — 2008 whitepaper Satoshiego, kluczowe wydarzenia, hossy i bessy, czego uczą cykle.
3. **Portfele i klucze** — klucz publiczny/prywatny, seed phrase, hot vs cold wallet, „not your keys, not your coins".
4. **Giełdy (CEX) vs DEX** — gdzie i jak kupić pierwsze krypto, czym się różnią, na co uważać.
5. **Twoja pierwsza transakcja (bezpiecznie)** — krok po kroku, opłaty, potwierdzenia, najczęstsze błędy.

## Poziom 2 — Średniozaawansowany (PREMIUM)
Cel: zrozumieć ekosystem poza Bitcoinem.

1. **Ethereum i smart kontrakty** — czym jest „programowalny pieniądz", gas.
2. **Altcoiny i tokeny** — czym się różnią, jak oceniać projekt (zespół, tokenomia, użyteczność).
3. **Stablecoiny** — rodzaje (fiat-backed, krypto-backed, algorytmiczne), ryzyka (lekcja Terra/UST).
4. **DeFi** — DEX-y, lending, staking, yield farming, ryzyka (impermanent loss, exploit).
5. **NFT i Web3** — co ma sens, a co było bańką.

## Poziom 3 — Zaawansowany (PREMIUM)
Cel: świadome zarządzanie portfelem i ryzykiem.

1. **Analiza techniczna** — świece, trendy, wsparcia/opory, wskaźniki (z ostrzeżeniem: AT to nie wróżenie).
2. **Analiza fundamentalna i on-chain** — metryki sieci, aktywność, podaż.
3. **Zarządzanie ryzykiem** — pozycja, dywersyfikacja, DCA, dlaczego dźwignia niszczy konta.
4. **Podatki od krypto w Polsce** — podstawy rozliczeń (z zastrzeżeniem: skonsultuj z doradcą).
5. **Strategie portfela** — długoterminowe vs aktywne, rebalancing.

## Poziom 4 — Bezpieczeństwo i scamy (część FREE — kluczowy wyróżnik)
Cel: nie stracić pieniędzy na oszustwach.

1. **Anatomia scamu** — typy: rug pull, ponzi/HYIP, pump & dump, phishing, fałszywe airdropy, „giveaway".
2. **Czerwone flagi projektu** — anonimowy zespół, gwarantowane zyski, presja czasu, brak kodu/audytu.
3. **Due diligence krok po kroku** — jak samodzielnie sprawdzić projekt (DYOR).
4. **Bezpieczeństwo portfela** — phishing, fałszywe strony, zatwierdzenia kontraktów, sprzętowe portfele.
5. **Case studies** — Mt.Gox, QuadrigaCX, BitConnect, OneCoin, Terra/Luna, Celsius, FTX — czego uczą.

---

## Mapowanie na strukturę danych

- Kursy = `Course` (poziom), lekcje = `Lesson` (MDX), quizy = `Quiz` (JSON) — patrz `packages/content/src/types.ts`.
- W MVP zaimplementowane są w pełni: **wybrane lekcje Poziomu 1** + **1 lekcja Poziomu 4 (scamy)** jako dowód działania całej ścieżki (lekcja → quiz → XP → postęp).
