import pl from "../../messages/pl.json";

/**
 * Lekki system i18n (bez zależności): słowniki + routing po locale.
 * Domyślnie `pl`. Dodanie `en` = nowy plik messages + wpis tutaj.
 * Strukturę można w przyszłości podmienić na next-intl bez zmiany tras.
 */
export const locales = ["pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export type Dictionary = typeof pl;

const dictionaries: Record<Locale, Dictionary> = { pl };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}
