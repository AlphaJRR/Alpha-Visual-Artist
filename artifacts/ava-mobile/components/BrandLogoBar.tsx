import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BRAND_LOGO = require("../assets/images/ava-app-logo-2026.png");

type BrandLogoBarProps = {
  size?: "compact" | "standard";
};

export function BrandLogoBar({ size = "compact" }: BrandLogoBarProps) {
  const insets = useSafeAreaInsets();
  const logoDim = size === "standard" ? 100 : 100;

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      accessibilityRole="image"
      accessibilityLabel="Alpha Visual Artists logo"
    >
      <Image
        source={BRAND_LOGO}
        style={[styles.logo, { width: logoDim, height: logoDim }]}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    backgroundColor: "transparent",
  },
});
