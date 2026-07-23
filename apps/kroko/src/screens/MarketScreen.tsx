import React, { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppState } from "../state/AppState";
import { Card, CoinAmount, PrimaryButton, SectionTitle } from "../components/ui";
import { CATEGORY_LABELS, OFFERS, type Offer, type OfferCategory } from "../data/offers";
import { colors, spacing } from "../theme";

const CATEGORY_ORDER: OfferCategory[] = [
  "edukacja",
  "krypto",
  "partner",
  "charytatywne",
];

export function MarketScreen() {
  const { balance, redeemOffer, redeemedOffers } = useAppState();
  const [lastRedeemed, setLastRedeemed] = useState<string | null>(null);

  const grouped = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        offers: OFFERS.filter((offer) => offer.category === category),
      })),
    [],
  );

  const handleRedeem = (offer: Offer) => {
    const ok = redeemOffer(offer.id, offer.cost);
    if (ok) {
      setLastRedeemed(offer.id);
      Alert.alert("Gotowe! 🎉", `Odebrano: ${offer.title}`);
    } else {
      Alert.alert(
        "Za mało KROK-ów",
        "Przejdź się — brakującą kwotę uzbierasz szybciej, niż myślisz.",
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.balanceBar}>
        <Text style={styles.balanceLabel}>Do wydania:</Text>
        <CoinAmount value={balance} size={20} />
      </Card>

      {grouped.map(({ category, offers }) => (
        <View key={category} style={styles.section}>
          <SectionTitle>{CATEGORY_LABELS[category]}</SectionTitle>
          {offers.map((offer) => {
            const alreadyOwned =
              offer.oneTime === true && redeemedOffers.includes(offer.id);
            return (
              <Card key={offer.id} style={styles.offer}>
                <View style={styles.offerHeader}>
                  <Text style={styles.offerIcon}>{offer.icon}</Text>
                  <View style={styles.offerBody}>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerDescription}>{offer.description}</Text>
                  </View>
                </View>
                <View style={styles.offerFooter}>
                  <CoinAmount value={offer.cost} size={15} />
                  <View style={styles.buyButton}>
                    <PrimaryButton
                      label={
                        alreadyOwned
                          ? "Odblokowane ✓"
                          : lastRedeemed === offer.id
                            ? "Odebrano ✓"
                            : "Wymień"
                      }
                      onPress={() => handleRedeem(offer)}
                      disabled={alreadyOwned || balance < offer.cost}
                    />
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, paddingBottom: spacing.xl },
  balanceBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  balanceLabel: { color: colors.textMuted, fontSize: 14 },
  section: { marginBottom: spacing.md, gap: spacing.sm },
  offer: { gap: spacing.sm },
  offerHeader: { flexDirection: "row", gap: spacing.sm },
  offerIcon: { fontSize: 28 },
  offerBody: { flex: 1 },
  offerTitle: { color: colors.text, fontSize: 15, fontWeight: "800" },
  offerDescription: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 17 },
  offerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buyButton: { minWidth: 140 },
});
