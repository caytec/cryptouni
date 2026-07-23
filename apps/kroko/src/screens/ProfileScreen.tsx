import React from "react";
import { ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { useAppState } from "../state/AppState";
import { Card, PrimaryButton, ProgressBar, SectionTitle } from "../components/ui";
import { colors, spacing } from "../theme";

const REFERRAL_CODE = "KROKO-START";

export function ProfileScreen() {
  const { level, xp, history, streakDays, redeemedOffers } = useAppState();
  const totalSteps = history.reduce((sum, day) => sum + day.steps, 0);
  const bestDay = history.reduce((best, day) => Math.max(best, day.steps), 0);

  const invite = () => {
    Share.share({
      message: `Chodzę i zarabiam w Kroko 🚶⚡ Dołącz z kodem ${REFERRAL_CODE} — oboje dostaniemy 50 KROK na start!`,
    }).catch(() => undefined);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.levelCard}>
        <Text style={styles.levelBadge}>⭐ Poziom {level.level}</Text>
        <ProgressBar ratio={level.ratio} color={colors.secondary} />
        <Text style={styles.levelHint}>
          {level.xpIntoLevel} / {level.xpForNextLevel} XP do poziomu{" "}
          {level.level + 1} · łącznie {xp} XP
        </Text>
      </Card>

      <SectionTitle>Statystyki</SectionTitle>
      <View style={styles.statsGrid}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{totalSteps.toLocaleString("pl-PL")}</Text>
          <Text style={styles.statLabel}>kroków w historii</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{bestDay.toLocaleString("pl-PL")}</Text>
          <Text style={styles.statLabel}>najlepszy dzień</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{streakDays}</Text>
          <Text style={styles.statLabel}>dni serii</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{redeemedOffers.length}</Text>
          <Text style={styles.statLabel}>odebrane nagrody</Text>
        </Card>
      </View>

      <SectionTitle>Zaproś znajomych</SectionTitle>
      <Card style={styles.referral}>
        <Text style={styles.referralCode}>{REFERRAL_CODE}</Text>
        <Text style={styles.referralHint}>
          Ty i osoba z Twoim kodem dostajecie po 50 KROK, gdy zrobi pierwsze
          5 000 kroków. Wspólne wyzwania duo dają dodatkowy mnożnik.
        </Text>
        <PrimaryButton label="Udostępnij kod" onPress={invite} />
      </Card>

      <SectionTitle>Ekosystem CryptoUni</SectionTitle>
      <Card>
        <Text style={styles.ecosystem}>
          Konto Kroko łączy się z platformą CryptoUni: KROK-ami odblokujesz
          kursy, a ukończone kursy dają trwałe mnożniki zarabiania. Chodzisz →
          uczysz się → zarabiasz mądrzej. 🎓
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.sm },
  levelCard: { gap: spacing.sm },
  levelBadge: { color: colors.secondary, fontSize: 20, fontWeight: "900" },
  levelHint: { color: colors.textMuted, fontSize: 12 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  stat: {
    flexBasis: "47%",
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  statValue: { color: colors.text, fontSize: 20, fontWeight: "900" },
  statLabel: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  referral: { gap: spacing.sm, alignItems: "center" },
  referralCode: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  referralHint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
  ecosystem: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
});
