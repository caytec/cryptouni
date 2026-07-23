import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider, useAppState } from "./src/state/AppState";
import { startPedometer, type PedometerMode } from "./src/services/pedometer";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ChallengesScreen } from "./src/screens/ChallengesScreen";
import { WalletScreen } from "./src/screens/WalletScreen";
import { MarketScreen } from "./src/screens/MarketScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { colors } from "./src/theme";

type TabKey = "home" | "challenges" | "wallet" | "market" | "profile";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "home", label: "Dziś", icon: "🚶" },
  { key: "challenges", label: "Wyzwania", icon: "🎯" },
  { key: "wallet", label: "Portfel", icon: "👛" },
  { key: "market", label: "Nagrody", icon: "🎁" },
  { key: "profile", label: "Profil", icon: "⭐" },
];

function Root() {
  const { ready, addSteps } = useAppState();
  const [tab, setTab] = useState<TabKey>("home");
  const [mode, setMode] = useState<PedometerMode>("unavailable");

  useEffect(() => {
    if (!ready) return;
    let stopped = false;
    let cleanup: (() => void) | null = null;
    startPedometer((delta) => addSteps(delta.steps, delta.flagged)).then(
      (handle) => {
        if (stopped) {
          handle.stop();
          return;
        }
        cleanup = handle.stop;
        setMode(handle.mode);
      },
    );
    return () => {
      stopped = true;
      cleanup?.();
    };
  }, [ready, addSteps]);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Kroko…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {tab === "home" && <HomeScreen mode={mode} />}
        {tab === "challenges" && <ChallengesScreen />}
        {tab === "wallet" && <WalletScreen />}
        {tab === "market" && <MarketScreen />}
        {tab === "profile" && <ProfileScreen />}
      </View>
      <View style={styles.tabBar}>
        {TABS.map((item) => {
          const active = item.key === tab;
          return (
            <Pressable
              key={item.key}
              style={styles.tab}
              onPress={() => setTab(item.key)}
            >
              <Text style={[styles.tabIcon, !active && styles.tabIconInactive]}>
                {item.icon}
              </Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <Root />
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1 },
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { color: colors.accent, fontSize: 28, fontWeight: "900" },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingBottom: 4,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 8, gap: 2 },
  tabIcon: { fontSize: 20 },
  tabIconInactive: { opacity: 0.45 },
  tabLabel: { color: colors.textFaint, fontSize: 10, fontWeight: "700" },
  tabLabelActive: { color: colors.accent },
});
