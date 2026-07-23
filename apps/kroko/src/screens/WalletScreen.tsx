import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppState } from "../state/AppState";
import { Card, CoinAmount, SectionTitle } from "../components/ui";
import { colors, spacing } from "../theme";

export function WalletScreen() {
  const { balance, earnings, history, todaySteps } = useAppState();
  const recentDays = [...history].reverse().slice(0, 14);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo portfela</Text>
        <CoinAmount value={balance} size={36} />
        <Text style={styles.balanceHint}>
          1 KROK ≈ 100 kroków · wymienialne na nagrody, kursy i sats
        </Text>
      </Card>

      <SectionTitle>Dzisiejsze naliczenie</SectionTitle>
      <Card style={styles.breakdown}>
        <BreakdownRow
          label={`Kroki pełną stawką (${earnings.fullRateSteps.toLocaleString("pl-PL")})`}
          value={earnings.fullRateSteps / 100}
        />
        {earnings.reducedRateSteps > 0 && (
          <BreakdownRow
            label={`Stawka obniżona (${earnings.reducedRateSteps.toLocaleString("pl-PL")})`}
            value={earnings.baseCoins - earnings.fullRateSteps / 100}
          />
        )}
        {earnings.streakBonusCoins > 0 && (
          <BreakdownRow label="Bonus za serię 🔥" value={earnings.streakBonusCoins} />
        )}
        {earnings.boostBonusCoins > 0 && (
          <BreakdownRow label="Bonus boost ⚡" value={earnings.boostBonusCoins} />
        )}
        <View style={styles.divider} />
        <BreakdownRow label="Razem dziś" value={earnings.totalCoins} bold />
      </Card>

      <SectionTitle>Historia</SectionTitle>
      {recentDays.length === 0 ? (
        <Card>
          <Text style={styles.empty}>
            Historia pojawi się po pierwszym zamkniętym dniu. Dziś masz już{" "}
            {todaySteps.toLocaleString("pl-PL")} kroków — tak trzymaj!
          </Text>
        </Card>
      ) : (
        recentDays.map((day) => (
          <Card key={day.date} style={styles.historyRow}>
            <View>
              <Text style={styles.historyDate}>{day.date}</Text>
              <Text style={styles.historySteps}>
                {day.steps.toLocaleString("pl-PL")} kroków
              </Text>
            </View>
            <CoinAmount value={day.coins} size={16} color={colors.success} />
          </Card>
        ))
      )}
    </ScrollView>
  );
}

function BreakdownRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.rowBold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowBold]}>
        {value.toLocaleString("pl-PL", { maximumFractionDigits: 2 })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.sm },
  balanceCard: { alignItems: "center", gap: spacing.xs, paddingVertical: spacing.lg },
  balanceLabel: { color: colors.textMuted, fontSize: 13 },
  balanceHint: { color: colors.textFaint, fontSize: 12, textAlign: "center" },
  breakdown: { gap: spacing.xs },
  row: { flexDirection: "row", justifyContent: "space-between" },
  rowLabel: { color: colors.textMuted, fontSize: 13, flex: 1 },
  rowValue: { color: colors.text, fontSize: 13 },
  rowBold: { fontWeight: "800", color: colors.text, fontSize: 14 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDate: { color: colors.text, fontSize: 14, fontWeight: "700" },
  historySteps: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  empty: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
