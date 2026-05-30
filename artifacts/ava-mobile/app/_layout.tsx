import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import * as ExpoLinking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SITE_URL } from "@/constants/site";
import { openSiteLink } from "@/lib/openSiteLink";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

const queryClient = new QueryClient();
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Ignore secure storage errors to avoid crashing app startup.
    }
  },
};
const DEEP_LINK_HOSTS = new Set([
  "alphavisualartists.com",
  "www.alphavisualartists.com",
  "shop.alphavisualartists.com",
]);

// Convert any inbound link (custom scheme or universal link) to a full https
// URL on the marketing site. Preserves path, query, and fragment.
function toSiteUrl(linkUrl: string): string | null {
  try {
    if (linkUrl.startsWith("http://") || linkUrl.startsWith("https://")) {
      return linkUrl;
    }
    const parsed = ExpoLinking.parse(linkUrl);
    // For ava://portal, expo-linking puts "portal" in hostname; for ava:///foo
    // it puts "foo" in path. Combine both so all forms route correctly.
    const segments: string[] = [];
    if (parsed.hostname) segments.push(parsed.hostname);
    if (parsed.path) segments.push(parsed.path.replace(/^\/+/, ""));
    const path = segments.filter(Boolean).join("/");

    let qs = "";
    if (parsed.queryParams) {
      const entries = Object.entries(parsed.queryParams).filter(
        ([, v]) => v !== undefined && v !== null,
      );
      if (entries.length > 0) {
        qs =
          "?" +
          entries
            .map(([k, v]) => {
              const value = Array.isArray(v) ? v.join(",") : String(v);
              return `${encodeURIComponent(k)}=${encodeURIComponent(value)}`;
            })
            .join("&");
      }
    }
    return `${SITE_URL}/${path}${qs}`;
  } catch {
    return null;
  }
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BebasNeue_400Regular,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    DMMono_400Regular,
  });
  const handledInitial = useRef(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Deep links (custom scheme + universal links) open in the system browser for
  // the marketing site so Private Replit deployments don't trap users in
  // expo-web-browser on __replshield.
  useEffect(() => {
    const handle = (linkUrl: string | null | undefined) => {
      if (!linkUrl) return;
      const target = toSiteUrl(linkUrl);
      if (!target) return;
      // Skip the bare site root from cold start — that's the default launch.
      if (target === `${SITE_URL}/` || target === SITE_URL) return;
      // Skip universal links that aren't for our hosts.
      if (linkUrl.startsWith("http")) {
        try {
          const u = new URL(linkUrl);
          if (!DEEP_LINK_HOSTS.has(u.hostname)) return;
        } catch {
          return;
        }
      }
      openSiteLink(target).catch(() => {});
    };

    ExpoLinking.getInitialURL().then((url) => {
      if (handledInitial.current) return;
      handledInitial.current = true;
      handle(url);
    });
    const sub = ExpoLinking.addEventListener("url", (e) => handle(e.url));
    return () => sub.remove();
  }, []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey ?? ""}
      tokenCache={tokenCache}
    >
      <SafeAreaProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
              <KeyboardProvider>
                <RootLayoutNav />
              </KeyboardProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
