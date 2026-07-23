import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppState } from "../state/AppState";
import { ProgressRing } from "../components/ProgressRing";
import { Card, CoinAmount, PrimaryButton } from "../components/ui";
import { colors, spacing } from "../theme";
import type { PedometerMode } from "../services/pedometer";

const DAILY_GOAL_STEPS = 10_000;

export function HomeScreen({ mode }: { mode: PedometerMode }) {
  const {
    todaySteps,
    earnings,
    streakDays,
    boostActive,
    boostEndsAt,
    boostsLeft,
    startBoost,
    cheatFlags,
  } = useAppState();

  // Odliczanie boosta odświeżane co sekundę tylko gdy aktywny.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!boostActive) return;
    const timer = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(timer);
  }, [boostActive]);

  const boostSecondsLeft =
    boostActive && boostEndsAt ? Math.max(0, Math.round((boostEndsAt - now) / 1000)) : 0;
  const km = (todaySteps * 0.00075).toFixed(2);
  const kcal = Math.round(todaySteps * 0.04);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Dziś</Text>
        {streakDays > 0 && (
          <Text style={styles.streak}>🔥 seria: {streakDays} dni</Text>
        )}
      </View>

      <ProgressRing
        progress={todaySteps / DAILY_GOAL_STEPS}
        size={240}
        color={boostActive ? colors.gold : colors.accent}
        style={styles.ring}
      >
        <Text style={styles.steps}>{todaySteps.toLocaleString("pl-PL")}</Text>
        <Text style={styles.stepsLabel}>
          / {DAILY_GOAL_STEPS.toLocaleString("pl-PL")} kroków
        </Text>
        <View style={styles.earnedPill}>
          <CoinAmount value={earnings.totalCoins} size={18} />
        </View>
      </ProgressRing>

      <View style={styles.statsRow}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{km} km</Text>
          <Text style={styles.statLabel}>dystans</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{kcal}</Text>
          <Text style={styles.statLabel}>kcal</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>
            {earnings.uncountedSteps > 0 ? "MAX" : `${boostsLeft}×`}
          </Text>
          <Text style={styles.statLabel}>
            {earnings.uncountedSteps > 0 ? "limit dnia" : "boost dziś"}
          </Text>
        </Card>
      </View>

      <Card style={styles.boostCard}>
        {boostActive ? (
          <>
            <Text style={styles.boostTitle}>
              ⚡ Boost x2 aktywny — {formatSeconds(boostSecondsLeft)}
            </Text>
            <Text style={styles.boostHint}>
              Każdy krok liczy się podwójnie. Idź!
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.boostTitle}>⚡ Boost x2 na 20 minut</Text>
            <Text style={styles.boostHint}>
              Zaplanuj spacer i włącz boost, gdy ruszasz — kroki liczą się
              podwójnie. Pozostało dziś: {boostsLeft}.
            </Text>
            <PrimaryButton
              label={boostsLeft > 0 ? "Włącz boost" : "Wykorzystane na dziś"}
              onPress={startBoost}
              disabled={boostsLeft === 0}
            />
          </>
        )}
      </Card>

      {mode === "demo" && (
        <Text style={styles.demoNote}>
          Tryb demo: brak krokomierza w tym urządzeniu — kroki są symulowane,
          żeby pokazać pełny przepływ zarabiania.
        </Text>
      )}
      {cheatFlags > 0 && (
        <Text style={styles.cheatNote}>
          ⚠️ Wykryto {cheatFlags} podejrzanych okien ruchu — takie kroki nie są
          naliczane.
        </Text>
      )}
    </ScrollView>
  );
}

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: colors.text, fontSize: 28, fontWeight: "800" },
  streak: { color: colors.gold, fontSize: 15, fontWeight: "700" },
  ring: { alignSelf: "center", marginVertical: spacing.sm },
  steps: { color: colors.text, fontSize: 40, fontWeight: "900" },
  stepsLabel: { color: colors.textMuted, fontSize: 13 },
  earnedPill: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statsRow: { flexDirection: "row", gap: spacing.sm },
  stat: { flex: 1, alignItems: "center", paddingVertical: spacing.sm },
  statValue: { color: colors.text, fontSize: 17, fontWeight: "800" },
  statLabel: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  boostCard: { gap: spacing.sm },
  boostTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  boostHint: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  demoNote: { color: colors.textFaint, fontSize: 12, textAlign: "center" },
  cheatNote: { color: colors.danger, fontSize: 12, textAlign: "center" },
});
