import React, { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { colors, radius, spacing } from "../theme";

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

/** Kwota w KROK z jednolitym formatowaniem w całej aplikacji. */
export function CoinAmount({
  value,
  size = 16,
  color = colors.gold,
}: {
  value: number;
  size?: number;
  color?: string;
}) {
  return (
    <Text style={{ color, fontSize: size, fontWeight: "800" }}>
      {value.toLocaleString("pl-PL", { maximumFractionDigits: 2 })}{" "}
      <Text style={{ fontSize: size * 0.75 }}>KROK</Text>
    </Text>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonLabel, disabled && styles.buttonLabelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ProgressBar({
  ratio,
  color = colors.accent,
}: {
  ratio: number;
  color?: string;
}) {
  return (
    <View style={styles.barTrack}>
      <View
        style={[
          styles.barFill,
          { width: `${Math.min(100, Math.max(0, ratio * 100))}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { backgroundColor: colors.border },
  buttonLabel: { color: "#0b1020", fontWeight: "800", fontSize: 15 },
  buttonLabelDisabled: { color: colors.textFaint },
  barTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: radius.pill },
});
