import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppState } from "../state/AppState";
import { Card, PrimaryButton, ProgressBar, SectionTitle } from "../components/ui";
import { colors, spacing } from "../theme";
import type { ChallengeProgress } from "@cryptouni/move-core";

export function ChallengesScreen() {
  const { challenges, claimedChallenges, claimChallenge, streakDays } =
    useAppState();

  const daily = challenges.filter((c) => c.definition.period === "daily");
  const weekly = challenges.filter((c) => c.definition.period === "weekly");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.streakCard}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <View style={styles.streakBody}>
          <Text style={styles.streakTitle}>
            {streakDays > 0
              ? `Seria: ${streakDays} ${dayWord(streakDays)}`
              : "Zacznij serię już dziś"}
          </Text>
          <Text style={styles.streakHint}>
            Min. 1 000 kroków dziennie podtrzymuje serię. Progi bonusu: 3 dni
            +5%, 7 dni +10%, 14 dni +20%, 30 dni +35%.
          </Text>
        </View>
      </Card>

      <SectionTitle>Dzienne</SectionTitle>
      {daily.map((challenge) => (
        <ChallengeCard
          key={challenge.definition.id}
          challenge={challenge}
          claimed={claimedChallenges.includes(challenge.definition.id)}
          onClaim={() => claimChallenge(challenge.definition.id)}
        />
      ))}

      <SectionTitle>Tygodniowe</SectionTitle>
      {weekly.map((challenge) => (
        <ChallengeCard
          key={challenge.definition.id}
          challenge={challenge}
          claimed={claimedChallenges.includes(challenge.definition.id)}
          onClaim={() => claimChallenge(challenge.definition.id)}
        />
      ))}
    </ScrollView>
  );
}

function ChallengeCard({
  challenge,
  claimed,
  onClaim,
}: {
  challenge: ChallengeProgress;
  claimed: boolean;
  onClaim: () => void;
}) {
  const { definition, ratio, currentSteps, completed } = challenge;
  return (
    <Card style={styles.challenge}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeIcon}>{definition.icon}</Text>
        <View style={styles.challengeBody}>
          <Text style={styles.challengeTitle}>{definition.title}</Text>
          <Text style={styles.challengeDescription}>{definition.description}</Text>
        </View>
        <Text style={styles.reward}>
          +{definition.rewardCoins} KROK{"\n"}
          <Text style={styles.rewardXp}>+{definition.rewardXp} XP</Text>
        </Text>
      </View>
      <ProgressBar ratio={ratio} color={completed ? colors.success : colors.accent} />
      <Text style={styles.progressLabel}>
        {Math.min(currentSteps, definition.targetSteps).toLocaleString("pl-PL")} /{" "}
        {definition.targetSteps.toLocaleString("pl-PL")} kroków
      </Text>
      {completed && (
        <PrimaryButton
          label={claimed ? "Odebrano ✓" : "Odbierz nagrodę"}
          onPress={onClaim}
          disabled={claimed}
        />
      )}
    </Card>
  );
}

function dayWord(days: number): string {
  return days === 1 ? "dzień" : "dni";
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.sm },
  streakCard: { flexDirection: "row", gap: spacing.md, alignItems: "center" },
  streakEmoji: { fontSize: 34 },
  streakBody: { flex: 1 },
  streakTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  streakHint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  challenge: { gap: spacing.sm },
  challengeHeader: { flexDirection: "row", gap: spacing.sm },
  challengeIcon: { fontSize: 26 },
  challengeBody: { flex: 1 },
  challengeTitle: { color: colors.text, fontSize: 15, fontWeight: "800" },
  challengeDescription: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  reward: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
  },
  rewardXp: { color: colors.secondary, fontWeight: "700" },
  progressLabel: { color: colors.textFaint, fontSize: 11 },
});
