# Kroko — chodź i zarabiaj 🚶⚡

Aplikacja mobilna move-to-earn (Expo / React Native) w ekosystemie CryptoUni.
Liczy kroki natywnym krokomierzem, nalicza walutę **KROK** i pozwala wymieniać
ją na kursy, nagrody partnerów, satoshi i cele charytatywne.

## Uruchomienie

```bash
pnpm install            # w katalogu głównym monorepo
cd apps/kroko
pnpm start              # Expo Dev Server → zeskanuj QR w Expo Go
```

Na symulatorze / web krokomierz nie istnieje — aplikacja przechodzi w **tryb
demo** i symuluje spacer, więc cały przepływ zarabiania można przetestować bez
telefonu.

## Architektura

- `@cryptouni/move-core` — czysta, przetestowana logika: naliczanie KROK-ów
  (strefy stawek, boost, streak), anty-cheat (walidacja tempa), poziomy XP,
  wyzwania. Zero zależności od React Native → gotowe do przeniesienia 1:1 na
  backend.
- `src/services/pedometer.ts` — natywny krokomierz (expo-sensors) z walidacją
  każdego okna pomiarowego i automatycznym fallbackiem demo.
- `src/state/AppState.tsx` — stan aplikacji + persystencja (AsyncStorage),
  rozliczanie dnia (rollover), seria, portfel.
- `src/screens/*` — Dziś, Wyzwania, Portfel, Nagrody, Profil.

## Model zarabiania (domyślny)

| Strefa | Kroki | Stawka |
|---|---|---|
| Pełna | 0–8 000 | 100 kroków = 1 KROK |
| Obniżona | 8 000–16 000 | 200 kroków = 1 KROK |
| Ponad limit | 16 000+ | 0 (anty-abuse) |

Do tego: boost ×2 (2 × 20 min dziennie), bonus serii do +35%, nagrody
z wyzwań. Szczegóły i analiza przewagi nad Sweatcoin:
[`docs/MOVE_TO_EARN.md`](../../docs/MOVE_TO_EARN.md).
