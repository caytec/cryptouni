import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme";

interface ProgressRingProps {
  /** 0..1 */
  progress: number;
  size: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/** Pierścień postępu — centralny element ekranu głównego. */
export function ProgressRing({
  progress,
  size,
  strokeWidth = 14,
  color = colors.accent,
  children,
  style,
}: ProgressRingProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
