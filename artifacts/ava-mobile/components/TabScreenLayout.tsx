import React from "react";
import { brandColors } from "@/constants/brand";
import { StyleSheet, View } from "react-native";
import { BrandLogoBar } from "./BrandLogoBar";

/** Wraps every tab screen so the AVA logo appears on all main pages. */
export function TabScreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <BrandLogoBar />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: brandColors.deepBlack },
  body: { flex: 1 },
});
