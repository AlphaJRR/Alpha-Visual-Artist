import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabScreenLayout } from "../../components/TabScreenLayout";
import { brandColors } from "@/constants/brand";

export default function TabLayout() {
  return (
    <Tabs
      screenLayout={TabScreenLayout}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brandColors.alphaRed,
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: brandColors.deepBlack,
          borderTopColor: "rgba(255,255,255,0.06)",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.4,
          textTransform: "uppercase",
        },
        sceneStyle: { backgroundColor: brandColors.deepBlack },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Shoot",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: "Edit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cut-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallpapers"
        options={{
          title: "WALLPAPERS",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="image" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
