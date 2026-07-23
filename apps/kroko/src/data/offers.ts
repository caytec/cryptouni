/**
 * Katalog nagród MVP. Kategorie pokazują przewagę ekosystemu nad Sweatcoin:
 * oprócz zniżek partnerów są ścieżki "ucz się i zarabiaj" (kursy CryptoUni),
 * wypłata w satoshi oraz cele charytatywne.
 */
export type OfferCategory = "edukacja" | "partner" | "krypto" | "charytatywne";

export interface Offer {
  id: string;
  category: OfferCategory;
  title: string;
  description: string;
  cost: number;
  icon: string;
  /** Ofertę można kupić tylko raz (np. odblokowanie kursu). */
  oneTime?: boolean;
}

export const OFFERS: Offer[] = [
  {
    id: "cryptouni-btc-course",
    category: "edukacja",
    title: "Kurs: Bitcoin od zera",
    description:
      "Odblokuj pełny kurs CryptoUni. Ukończenie kursu daje mnożnik +5% do zarabiania na stałe.",
    cost: 150,
    icon: "🎓",
    oneTime: true,
  },
  {
    id: "cryptouni-defi-course",
    category: "edukacja",
    title: "Kurs: DeFi w praktyce",
    description: "Zaawansowany kurs CryptoUni o zdecentralizowanych finansach.",
    cost: 300,
    icon: "📚",
    oneTime: true,
  },
  {
    id: "sats-withdraw",
    category: "krypto",
    title: "Wymiana na satoshi",
    description:
      "Wymień 500 KROK na prawdziwe sats wypłacane przez Lightning (MVP: symulacja).",
    cost: 500,
    icon: "⚡",
  },
  {
    id: "partner-coffee",
    category: "partner",
    title: "Kawa -50% u partnera",
    description: "Kupon zniżkowy do sieci kawiarni partnerskich.",
    cost: 80,
    icon: "☕",
  },
  {
    id: "partner-gym",
    category: "partner",
    title: "Tydzień siłowni gratis",
    description: "Karnet próbny w klubach partnerskich.",
    cost: 200,
    icon: "🏋️",
  },
  {
    id: "charity-tree",
    category: "charytatywne",
    title: "Posadź drzewo",
    description: "Przekaż KROK-i na sadzenie drzew — licznik wspólnoty rośnie.",
    cost: 60,
    icon: "🌳",
  },
];

export const CATEGORY_LABELS: Record<OfferCategory, string> = {
  edukacja: "Ucz się i zarabiaj",
  partner: "Partnerzy",
  krypto: "Krypto",
  charytatywne: "Dobro wspólne",
};
