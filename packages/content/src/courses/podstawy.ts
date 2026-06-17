import type { Course } from "../types";

/**
 * Poziom 1 — Podstawy (FREE).
 * Cel: zrozumieć czym jest krypto i bezpiecznie wykonać pierwsze kroki.
 */
export const podstawy: Course = {
  slug: "podstawy",
  level: 1,
  tier: "free",
  title: "Podstawy kryptowalut",
  description:
    "Od zera: czym jest blockchain, skąd wziął się Bitcoin, jak działają portfele i jak bezpiecznie kupić pierwsze krypto.",
  icon: "🌱",
  lessons: [
    {
      slug: "czym-jest-blockchain",
      title: "Czym jest blockchain i kryptowaluta",
      summary:
        "Pieniądz cyfrowy bez banku pośrodku — jak to w ogóle możliwe i po co powstało.",
      estimatedMinutes: 8,
      body: `# Czym jest blockchain i kryptowaluta

## W skrócie
**Kryptowaluta** to pieniądz cyfrowy, który działa bez centralnego pośrednika (banku).
Zamiast jednej instytucji prowadzącej rejestr, robi to **sieć tysięcy komputerów** na całym świecie.

## Blockchain — wspólny zeszyt
Wyobraź sobie zeszyt, w którym zapisuje się każdą transakcję. Teraz:

- kopia tego zeszytu jest u **tysięcy ludzi naraz**,
- żeby dopisać nową stronę, większość musi się zgodzić, że jest poprawna,
- raz zapisanej strony **nie da się po cichu zmienić**.

To właśnie **blockchain** — łańcuch „bloków" (stron), z których każdy odwołuje się do poprzedniego.
Dlatego mówimy o **decentralizacji** (brak jednego właściciela) i **niezmienności** (historii nie da się sfałszować).

## Dlaczego to powstało
Bitcoin pojawił się w 2008 r., tuż po kryzysie finansowym, jako odpowiedź na pytanie:
*„Czy można przesyłać wartość przez internet bez zaufania do banku?"*. Okazało się, że tak.

## Co to NIE jest
- To **nie jest** „darmowy pieniądz" ani gwarancja zysku.
- To **nie jest** anonimowe — większość blockchainów jest **publiczna i jawna**.
- To **nie znaczy**, że wszystko, co ma w nazwie „coin", ma jakąkolwiek wartość.

> **NFA / DYOR** — to nie jest porada inwestycyjna. Ucz się i sam oceniaj ryzyko.`,
      quiz: {
        id: "quiz-czym-jest-blockchain",
        xpReward: 20,
        passingScore: 0.6,
        questions: [
          {
            id: "q1",
            prompt: "Czym przede wszystkim różni się kryptowaluta od pieniądza w banku?",
            options: [
              { id: "a", text: "Działa bez centralnego pośrednika — rejestr prowadzi sieć komputerów" },
              { id: "b", text: "Zawsze zyskuje na wartości" },
              { id: "c", text: "Jest całkowicie anonimowa i niewidoczna" },
              { id: "d", text: "Jest kontrolowana przez jeden bank centralny" },
            ],
            correctOptionId: "a",
            explanation:
              "Istotą krypto jest decentralizacja: zamiast jednej instytucji rejestr prowadzi rozproszona sieć.",
          },
          {
            id: "q2",
            prompt: "Co oznacza „niezmienność” blockchaina?",
            options: [
              { id: "a", text: "Że ceny się nie zmieniają" },
              { id: "b", text: "Że raz zapisanej historii transakcji nie da się po cichu sfałszować" },
              { id: "c", text: "Że nie można tworzyć nowych kryptowalut" },
              { id: "d", text: "Że transakcje są darmowe" },
            ],
            correctOptionId: "b",
            explanation:
              "Każdy blok odwołuje się do poprzedniego, a kopie ma cała sieć — dlatego historii nie da się niezauważenie zmienić.",
          },
          {
            id: "q3",
            prompt: "Które zdanie jest prawdziwe?",
            options: [
              { id: "a", text: "Każdy token „coin” ma realną wartość" },
              { id: "b", text: "Większość blockchainów jest publiczna i jawna, nie w pełni anonimowa" },
              { id: "c", text: "Krypto gwarantuje zysk" },
              { id: "d", text: "Blockchain kontroluje jedna firma" },
            ],
            correctOptionId: "b",
            explanation:
              "Transakcje na publicznych blockchainach są jawne. Anonimowość jest ograniczona, a wartość tokena nie jest gwarantowana.",
          },
        ],
      },
    },
    {
      slug: "historia-bitcoina",
      title: "Historia: od Bitcoina do dziś",
      summary:
        "2008 i whitepaper Satoshiego, kolejne hossy i bessy, oraz czego uczą nas cykle rynku.",
      estimatedMinutes: 9,
      body: `# Historia: od Bitcoina do dziś

## 2008–2009: początek
W październiku 2008 r. osoba lub grupa pod pseudonimem **Satoshi Nakamoto** opublikowała
*whitepaper* Bitcoina. W styczniu 2009 r. ruszyła sieć i powstał pierwszy blok („genesis block").

## Kamienie milowe
- **2010** — pierwsza realna płatność: 10 000 BTC za dwie pizze („Bitcoin Pizza Day").
- **2013–2014** — pierwsza duża hossa i upadek giełdy **Mt.Gox** (utrata setek tysięcy BTC).
- **2017** — boom ICO i hossa do ~20 000 USD za BTC, potem głęboka bessa.
- **2020–2021** — DeFi, NFT, kolejna hossa do ~69 000 USD.
- **2022** — upadki **Terra/Luna**, **Celsius** i giełdy **FTX** — bolesna bessa.
- **Później** — ETF-y na BTC, regulacje (m.in. MiCA w UE), dojrzewanie rynku.

## Czego uczą cykle
Rynek krypto porusza się w **cyklach**: euforia (hossa) → załamanie (bessa) → odbudowa.
W każdej hossie wracają te same schematy: „tym razem jest inaczej", FOMO, projekty bez wartości rosnące na hype.
W każdej bessie znikają scamy i słabe projekty.

> **Wniosek:** historia się rymuje. Kto rozumie cykle i ryzyko, ten nie daje się ponieść euforii.
> **NFA / DYOR.**`,
      quiz: {
        id: "quiz-historia-bitcoina",
        xpReward: 20,
        passingScore: 0.6,
        questions: [
          {
            id: "q1",
            prompt: "Kto opublikował whitepaper Bitcoina w 2008 r.?",
            options: [
              { id: "a", text: "Satoshi Nakamoto (pseudonim)" },
              { id: "b", text: "Rząd USA" },
              { id: "c", text: "Giełda Mt.Gox" },
              { id: "d", text: "Vitalik Buterin" },
            ],
            correctOptionId: "a",
            explanation:
              "Bitcoin zaproponowała osoba/grupa pod pseudonimem Satoshi Nakamoto; sieć ruszyła w 2009 r.",
          },
          {
            id: "q2",
            prompt: "Czego przykładem był upadek FTX w 2022 r.?",
            options: [
              { id: "a", text: "Sukcesu regulacji" },
              { id: "b", text: "Ryzyka związanego z zaufaniem scentralizowanym instytucjom w krypto" },
              { id: "c", text: "Awarii samego blockchaina Bitcoina" },
              { id: "d", text: "Pierwszej płatności krypto" },
            ],
            correctOptionId: "b",
            explanation:
              "FTX (jak wcześniej Mt.Gox) pokazał, że ryzyko bywa nie w technologii, lecz w zaufaniu scentralizowanym pośrednikom.",
          },
          {
            id: "q3",
            prompt: "Co najlepiej opisuje zachowanie rynku krypto?",
            options: [
              { id: "a", text: "Stały, liniowy wzrost" },
              { id: "b", text: "Powtarzające się cykle hossy i bessy" },
              { id: "c", text: "Brak jakiejkolwiek zmienności" },
              { id: "d", text: "Gwarantowany zysk co rok" },
            ],
            correctOptionId: "b",
            explanation:
              "Rynek porusza się cyklicznie: euforia, załamanie, odbudowa. Zrozumienie cykli chroni przed FOMO.",
          },
        ],
      },
    },
    {
      slug: "portfele-i-klucze",
      title: "Portfele i klucze: kto naprawdę kontroluje Twoje krypto",
      summary:
        "Klucz prywatny, seed phrase, hot vs cold wallet i zasada „not your keys, not your coins”.",
      estimatedMinutes: 10,
      body: `# Portfele i klucze

## Klucz publiczny i prywatny
- **Klucz publiczny / adres** — jak numer konta. Możesz go podać, by ktoś wysłał Ci środki.
- **Klucz prywatny** — jak PIN i podpis razem. **Kto go ma, ten kontroluje środki.** Nigdy go nie udostępniaj.

## Seed phrase (fraza odzyskiwania)
To zwykle **12 lub 24 słowa**, z których odtwarza się klucze. Jeśli ją stracisz — tracisz dostęp.
Jeśli ktoś ją pozna — **ukradnie Twoje środki**.

**Zasady:**
- Zapisz ją **offline** (kartka, metal), nigdy jako zdjęcie ani w chmurze.
- **Nikt** uczciwy nigdy nie poprosi Cię o seed phrase. Każda taka prośba to **scam**.

## Hot wallet vs cold wallet
- **Hot wallet** — portfel połączony z internetem (apka, rozszerzenie). Wygodny, mniej bezpieczny.
- **Cold wallet** — portfel offline (urządzenie sprzętowe). Bezpieczniejszy do większych kwot.

## „Not your keys, not your coins"
Gdy trzymasz krypto na giełdzie, to **giełda** ma klucze — Ty masz tylko obietnicę wypłaty.
Upadki Mt.Gox, Celsius i FTX pokazały, czym to grozi. Większe kwoty warto trzymać we **własnym** portfelu.

> **NFA / DYOR.** Bezpieczeństwo to Twoja odpowiedzialność — w krypto nie ma „infolinii banku", która cofnie przelew.`,
      quiz: {
        id: "quiz-portfele-i-klucze",
        xpReward: 25,
        passingScore: 0.6,
        questions: [
          {
            id: "q1",
            prompt: "Co daje posiadanie klucza prywatnego (lub seed phrase)?",
            options: [
              { id: "a", text: "Pełną kontrolę nad środkami w portfelu" },
              { id: "b", text: "Tylko możliwość odbierania wpłat" },
              { id: "c", text: "Dostęp do infolinii giełdy" },
              { id: "d", text: "Gwarancję zysku" },
            ],
            correctOptionId: "a",
            explanation:
              "Klucz prywatny/seed phrase = kontrola nad środkami. Dlatego nigdy się go nie udostępnia.",
          },
          {
            id: "q2",
            prompt: "Ktoś prosi Cię o Twoją frazę odzyskiwania (seed phrase). Co to oznacza?",
            options: [
              { id: "a", text: "To standardowa procedura wsparcia" },
              { id: "b", text: "To prawie na pewno próba oszustwa" },
              { id: "c", text: "To wymóg giełdy" },
              { id: "d", text: "To sposób na darmowe krypto" },
            ],
            correctOptionId: "b",
            explanation:
              "Nikt uczciwy nigdy nie prosi o seed phrase. Każda taka prośba to scam.",
          },
          {
            id: "q3",
            prompt: "Co oznacza zasada „not your keys, not your coins”?",
            options: [
              { id: "a", text: "Trzymając krypto na giełdzie, nie masz pełnej kontroli nad kluczami" },
              { id: "b", text: "Klucze trzeba kupować osobno" },
              { id: "c", text: "Każdy może użyć Twojego klucza publicznego" },
              { id: "d", text: "Krypto bez kluczy jest droższe" },
            ],
            correctOptionId: "a",
            explanation:
              "Gdy klucze ma giełda, masz tylko obietnicę wypłaty. Większe kwoty bezpieczniej trzymać we własnym portfelu.",
          },
        ],
      },
    },
  ],
};
