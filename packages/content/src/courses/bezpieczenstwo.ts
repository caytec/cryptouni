import type { Course } from "../types";

/**
 * Poziom 4 — Bezpieczeństwo i scamy (część FREE — kluczowy wyróżnik platformy).
 * Cel: nie stracić pieniędzy na oszustwach.
 */
export const bezpieczenstwo: Course = {
  slug: "bezpieczenstwo-i-scamy",
  level: 4,
  tier: "free",
  title: "Bezpieczeństwo i scamy",
  description:
    "Najwięcej pieniędzy w krypto traci się nie na rynku, lecz na oszustwach. Naucz się je rozpoznawać.",
  icon: "🛡️",
  lessons: [
    {
      slug: "anatomia-scamu",
      title: "Anatomia scamu: jak rozpoznać oszustwo",
      summary:
        "Rug pull, ponzi, pump & dump, phishing, fałszywe airdropy — typy oszustw i ich czerwone flagi.",
      estimatedMinutes: 11,
      body: `# Anatomia scamu

Najczęstsze sposoby, w jakie ludzie tracą pieniądze w krypto, to **nie spadki rynku, lecz oszustwa**.
Poznaj wzorce, a większość rozpoznasz w kilka sekund.

## Najczęstsze typy scamów
- **Rug pull** — twórcy projektu/tokena znikają z pieniędzmi inwestorów (wyciągają płynność).
- **Ponzi / HYIP** — „gwarantowane" wysokie zyski wypłacane z wpłat nowych ludzi, aż piramida się wali (np. BitConnect, OneCoin).
- **Pump & dump** — grupa sztucznie pompuje cenę, sprzedaje na górce, reszta zostaje ze stratą.
- **Phishing** — fałszywe strony/maile/aplikacje wyłudzające seed phrase lub zatwierdzenie złośliwego kontraktu.
- **Fałszywe airdropy / „giveaway"** — „wyślij 1 ETH, dostaniesz 2 z powrotem" — zawsze oszustwo.
- **Fałszywe „grupy sygnałowe"** — sprzedaż „pewnych" wejść; zarabia tylko sprzedawca.

## Czerwone flagi (jeśli widzisz — uciekaj)
1. **Gwarantowany / stały zysk** — na rynku nic nie jest gwarantowane.
2. **Presja czasu** — „tylko teraz", „ostatnie miejsca", FOMO.
3. **Anonimowy zespół** bez historii i bez kodu/audytu.
4. **Prośba o seed phrase** lub klucz prywatny.
5. **Nierealne obietnice** („x100 w tydzień").
6. **Płać, by wejść** do „elitarnej" grupy zysków.

## Złota zasada
> Jeśli coś brzmi zbyt dobrze, by było prawdziwe — **jest oszustwem**.
> Nikt nie rozdaje darmowych pieniędzy. **NFA / DYOR.**`,
      quiz: {
        id: "quiz-anatomia-scamu",
        xpReward: 30,
        passingScore: 0.66,
        questions: [
          {
            id: "q1",
            prompt: "„Wyślij 1 ETH, a odeślemy Ci 2 ETH” — co to jest?",
            options: [
              { id: "a", text: "Legalna promocja giełdy" },
              { id: "b", text: "Klasyczny scam typu fałszywy giveaway" },
              { id: "c", text: "Standardowy airdrop" },
              { id: "d", text: "Forma stakingu" },
            ],
            correctOptionId: "b",
            explanation:
              "Nikt nie odsyła dwukrotności za darmo. To zawsze oszustwo (fałszywy giveaway).",
          },
          {
            id: "q2",
            prompt: "Która z poniższych to silna czerwona flaga oszustwa?",
            options: [
              { id: "a", text: "Otwarty kod i publiczny zespół" },
              { id: "b", text: "Gwarantowany, stały, wysoki zysk" },
              { id: "c", text: "Jawne ryzyko opisane w dokumentacji" },
              { id: "d", text: "Audyt bezpieczeństwa" },
            ],
            correctOptionId: "b",
            explanation:
              "Gwarancja stałego, wysokiego zysku to znak rozpoznawczy schematów ponzi. Na rynku nic nie jest gwarantowane.",
          },
          {
            id: "q3",
            prompt: "Czym jest „rug pull”?",
            options: [
              { id: "a", text: "Aktualizacją sieci" },
              { id: "b", text: "Sytuacją, gdy twórcy projektu znikają z pieniędzmi inwestorów" },
              { id: "c", text: "Rodzajem portfela sprzętowego" },
              { id: "d", text: "Opłatą transakcyjną" },
            ],
            correctOptionId: "b",
            explanation:
              "Rug pull = twórcy wycofują płynność/znikają z pieniędzmi, a token traci wartość.",
          },
          {
            id: "q4",
            prompt: "Co zrobić, gdy „admin” wsparcia prosi o seed phrase, by „odblokować konto”?",
            options: [
              { id: "a", text: "Podać ją szybko, żeby nie stracić środków" },
              { id: "b", text: "Nigdy nie podawać — to oszustwo" },
              { id: "c", text: "Podać połowę słów dla bezpieczeństwa" },
              { id: "d", text: "Wysłać zdjęcie frazy" },
            ],
            correctOptionId: "b",
            explanation:
              "Nikt uczciwy nigdy nie prosi o seed phrase. To zawsze próba kradzieży środków.",
          },
        ],
      },
    },
  ],
};
