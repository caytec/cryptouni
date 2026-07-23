# Kroko vs Sweatcoin — analiza przewagi konkurencyjnej

Kroko to aplikacja move-to-earn w ekosystemie CryptoUni: użytkownik zarabia
walutę **KROK** za chodzenie i wymienia ją na nagrody. Poniżej analiza, gdzie
i dlaczego wygrywamy ze Sweatcoin — w czterech obszarach: funkcje, GUI, UX,
ekosystem.

## 1. Funkcje

| Obszar | Sweatcoin | Kroko | Przewaga |
|---|---|---|---|
| Przelicznik | ~1 000 kroków = 0,95 SWC, potrącana "prowizja" | 100 kroków = 1 KROK, jawne strefy stawek | Prostota i przejrzystość — użytkownik umie policzyć zarobek w pamięci |
| Limit dzienny | Twardy sufit (nagle przestajesz zarabiać) | Strefy malejące: 100%→50%→0 | Łagodna krzywa nie karze aktywnych; mniejsza frustracja |
| Boost | 2× boost 20 min | 2× boost 20 min, **planowany świadomie przed spacerem** + odliczanie na ringu | Boost jako rytuał "wychodzę na spacer", nie przypadkowy klik |
| Streak | Brak realnego systemu serii | Progi +5/+10/+20/+35% widoczne w UI | Najsilniejsza pętla retencji znana z Duolingo — Sweatcoin jej nie ma |
| Wyzwania | Płatne "trackery" i loterie | Dzienne + tygodniowe wyzwania z nagrodą KROK **i XP** | Podwójna waluta postępu: ekonomia (KROK) i prestiż (poziomy) |
| Anty-cheat | Serwerowa weryfikacja GPS+kroki, nieprzejrzysta | Walidacja tempa **na urządzeniu** (240 kroków/min), jawny komunikat o odrzuconych krokach | Transparentność: użytkownik wie, co i dlaczego nie zostało naliczone |
| Wypłata wartości | SWAT token (opóźniany latami, niska płynność) | Wymiana na sats (Lightning) + kursy + kupony | Realna, zrozumiała wartość zamiast obietnicy tokena |

## 2. GUI

- **Ciemny motyw domyślnie** — aplikacja działa godzinami w tle na spacerach;
  na ekranach AMOLED ciemne UI realnie oszczędza baterię, a to baterii dotyczy
  najczęstsza skarga na Sweatcoin.
- **Jeden bohater ekranu**: pierścień postępu z krokami i zarobkiem w środku.
  Sweatcoin rozprasza: banery ofert, loterie i reklamy konkurują z licznikiem.
  U nas hierarchia jest jednoznaczna: kroki → KROK-i → cel dnia.
- **Kolor jako informacja**: limonka = zarabianie, złoto = aktywny boost,
  fiolet = progres profilu/edukacja. Pierścień zmienia kolor podczas boosta —
  status widać bez czytania czegokolwiek.
- **Zero reklam w rdzeniu pętli**. Sweatcoin monetyzuje się reklamami wideo
  ("daily rewards"), które zaśmiecają główny ekran. Kroko monetyzuje
  marketplace (prowizja od partnerów) i subskrypcję premium — GUI zostaje
  czyste.

## 3. User Experience

- **Zarabianie widać natychmiast**: każdy przyrost kroków od razu przelicza
  się na saldo na ekranie głównym. W Sweatcoin naliczanie bywa opóźnione
  ("verified steps" raz na jakiś czas) — u nas pętla dopaminowa jest ciągła.
- **Przejrzyste rozliczenie** w portfelu: osobno stawka pełna, obniżona,
  bonus serii, bonus boosta. Sweatcoin pokazuje jedną liczbę i ukrytą
  prowizję 5% — my pokazujemy pełny rachunek.
- **Uczciwa komunikacja anty-cheat**: zamiast cichego "kroki się nie
  zweryfikowały", jawny komunikat ile okien odrzucono i dlaczego.
- **Onboarding bez konta**: apka działa od pierwszego uruchomienia (stan
  lokalny), konto potrzebne dopiero przy wypłacie — usuwamy największą barierę
  wejścia.
- **Tryb demo na symulatorze/web** — pełny przepływ można pokazać inwestorowi
  lub przetestować bez telefonu; przyspiesza też development.
- **Szybka pętla nagrody dla nowych**: krzywa XP jest kwadratowa — pierwsze
  poziomy wpadają w dni, nie tygodnie (moment "wow" w pierwszym tygodniu
  decyduje o retencji D7).

## 4. Ekosystem — najważniejsza przewaga

Sweatcoin ma marketplace z kuponami i token SWEAT, którego wartość użytkowa
jest niejasna. Kroko spina **ruch + edukację + realne krypto** w jedną pętlę:

```
chodzisz → zarabiasz KROK → odblokowujesz kurs CryptoUni →
ukończony kurs daje trwały mnożnik zarabiania → chodzisz więcej…
```

1. **Move-to-earn + learn-to-earn**: KROK-ami płacisz za kursy krypto
   (CryptoUni), a ukończone kursy dają stały mnożnik (+5%). Nagroda nie jest
   konsumowana — inwestuje się w siebie i w przyszłe zarobki. Tego nie ma
   żaden konkurent.
2. **Wymiana na sats przez Lightning**: zamiast własnego tokena bez płynności
   dajemy najtwardszą, najbardziej rozpoznawalną wartość w krypto. Użytkownik
   kursów CryptoUni rozumie, co dostaje.
3. **Marketplace partnerski zorientowany na zdrowie** (kawiarnie, siłownie) —
   nagrody wzmacniają nawyk ruchu zamiast go tylko konsumować.
4. **Cele charytatywne** ze wspólnym licznikiem — motywacja prospołeczna,
   którą Sweatcoin ma, ale bez powiązania ze społecznością lokalną.
5. **Wspólny monorepo i wspólna logika** (`@cryptouni/move-core` obok
   `@cryptouni/core`): silnik naliczania jest czystym TS bez zależności od
   UI — ten sam kod trafi na backend przy przejściu z modelu lokalnego na
   serwerowy, bez ryzyka rozjazdu reguł.

## Model ekonomii (MVP)

- Strefy: 0–8 000 kroków pełna stawka (100 kroków = 1 KROK); 8 000–16 000
  połowa stawki; powyżej — zero (ochrona ekonomii).
- Boost ×2: dwie sesje po 20 minut dziennie; mnoży tylko kroki wykonane
  w oknie boosta.
- Seria: min. 1 000 kroków dziennie; progi bonusu 3/7/14/30 dni →
  +5/+10/+20/+35%.
- Wyzwania: dzienne (6k, 10k) i tygodniowe (45k, 70k) — KROK + XP.
- Anty-cheat: przycinanie okien pomiarowych do 240 kroków/min, flagowanie
  ponad 320 kroków/min; dzień z ≥3 podejrzanymi oknami dostaje flagę konta.

## Roadmapa po MVP

1. Backend (konta, synchronizacja, weryfikacja serwerowa naliczeń — silnik
   move-core przenosi się bez zmian).
2. Integracja HealthKit / Health Connect (wiarygodniejsze kroki + wsteczne
   naliczanie dnia).
3. Prawdziwa wypłata Lightning (LNURL-withdraw) i realne odblokowywanie
   kursów CryptoUni jednym kontem.
4. Wyzwania duo/drużynowe i ligi tygodniowe (mechanika społeczna).
5. Premium: wyższy limit dzienny + dodatkowy boost zamiast reklam.
