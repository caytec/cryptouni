# CryptoUni — aplikacja mobilna (Expo)

Szkielet aplikacji mobilnej (iOS/Android) demonstrujący **współdzielenie kodu** z web:
importuje `@cryptouni/content` i `@cryptouni/core` z monorepo i renderuje listę lekcji.

## Uruchomienie

```bash
pnpm install          # z katalogu głównego monorepo
cd apps/mobile
pnpm start            # uruchamia Expo (skanuj kod QR w Expo Go)
```

## Status

To celowo minimalny szkielet (Faza 0). Pełny natywny UI — lekcje, quizy, profil,
powiadomienia o serii dni — powstaje w Fazie 1 (patrz `docs/STRATEGY.md`),
reużywając tych samych pakietów `content`/`core` co aplikacja web.
