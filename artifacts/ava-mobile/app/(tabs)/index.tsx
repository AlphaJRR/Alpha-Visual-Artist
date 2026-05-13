import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as ExpoLinking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { WebView, type WebViewNavigation } from "react-native-webview";
import type { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";

const SITE_URL = "https://alphavisualartists.com";
const SITE_HOSTS = ["alphavisualartists.com", "www.alphavisualartists.com"];

// Map deep-link paths from ava:// scheme to website routes.
function resolveInitialUrl(linkUrl: string | null): string {
  if (!linkUrl) return SITE_URL;
  try {
    if (linkUrl.startsWith("https://alphavisualartists.com")) return linkUrl;
    const parsed = ExpoLinking.parse(linkUrl);
    const path = parsed.path ? `/${parsed.path.replace(/^\/+/, "")}` : "/";
    return `${SITE_URL}${path}`;
  } catch {
    return SITE_URL;
  }
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const webRef = useRef<WebView>(null);
  const initialLink = ExpoLinking.useURL();
  const [currentUrl, setCurrentUrl] = useState<string>(SITE_URL);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Resolve deep link on first load.
  useEffect(() => {
    if (initialLink) {
      const resolved = resolveInitialUrl(initialLink);
      if (resolved !== currentUrl) setCurrentUrl(resolved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLink]);

  // Handle deep links while app is running.
  useEffect(() => {
    const sub = ExpoLinking.addEventListener("url", ({ url }) => {
      const resolved = resolveInitialUrl(url);
      webRef.current?.injectJavaScript(
        `window.location.href = ${JSON.stringify(resolved)}; true;`,
      );
    });
    return () => sub.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") return;
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (canGoBack && webRef.current) {
          webRef.current.goBack();
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }, [canGoBack]),
  );

  const onNav = (e: WebViewNavigation) => {
    setCanGoBack(e.canGoBack);
    if (e.url && /^https?:\/\//i.test(e.url)) setCurrentUrl(e.url);
  };

  // External links (mailto, tel, App Store, social, 3rd-party) -> system handler.
  const onShouldStart = (req: ShouldStartLoadRequest): boolean => {
    const url = req.url;
    if (url.startsWith("about:") || url === "about:blank") return true;
    if (!/^https?:\/\//i.test(url)) {
      Linking.openURL(url).catch(() => {});
      return false;
    }
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      const isOurSite = SITE_HOSTS.some(
        (h) => h.replace(/^www\./, "") === host,
      );
      if (!isOurSite) {
        WebBrowser.openBrowserAsync(url).catch(() => Linking.openURL(url));
        return false;
      }
    } catch {}
    return true;
  };

  const reload = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setHasError(false);
    setLoading(true);
    webRef.current?.reload();
  };

  const onShare = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await Share.share({
        message: `Check out Alpha Visual Artists: ${currentUrl}`,
        url: currentUrl,
      });
    } catch {}
  };

  const onBack = () => {
    Haptics.selectionAsync().catch(() => {});
    webRef.current?.goBack();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      {hasError ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Connection Lost</Text>
          <Text style={styles.errorBody}>
            We can't reach Alpha Visual Artists right now. Check your connection
            and try again.
          </Text>
          <Pressable onPress={reload} style={styles.retryBtn}>
            <Text style={styles.retryTxt}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: currentUrl }}
          style={styles.web}
          onNavigationStateChange={onNav}
          onShouldStartLoadWithRequest={onShouldStart}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
          onHttpError={(e) => {
            if (e.nativeEvent.statusCode >= 500) {
              setLoading(false);
              setHasError(true);
            }
          }}
          allowsBackForwardNavigationGestures
          decelerationRate="normal"
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          cacheEnabled
          cacheMode="LOAD_DEFAULT"
          originWhitelist={["*"]}
          setSupportMultipleWindows={false}
          injectedJavaScript={`
            (function() {
              document.addEventListener('click', function(e) {
                var a = e.target.closest && e.target.closest('a');
                if (a && a.target === '_blank' && a.href) {
                  e.preventDefault();
                  window.location.href = a.href;
                }
              }, true);
            })(); true;
          `}
          pullToRefreshEnabled
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          applicationNameForUserAgent={`AVAMobile/1.0 (${Platform.OS} ${Platform.Version})`}
        />
      )}

      {/* Floating native controls — gives the app real native value-add */}
      {!hasError && (
        <View
          style={[styles.fab, { bottom: 24 + insets.bottom }]}
          pointerEvents="box-none"
        >
          {canGoBack && (
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.fabBtn,
                pressed && styles.fabBtnPressed,
              ]}
              hitSlop={8}
              accessibilityLabel="Go back"
            >
              <Text style={styles.fabIcon}>‹</Text>
            </Pressable>
          )}
          <Pressable
            onPress={onShare}
            style={({ pressed }) => [
              styles.fabBtn,
              pressed && styles.fabBtnPressed,
            ]}
            hitSlop={8}
            accessibilityLabel="Share this page"
          >
            <Text style={styles.fabIconSmall}>↗</Text>
          </Pressable>
        </View>
      )}

      {loading && !hasError && (
        <View style={styles.loader} pointerEvents="none">
          <ActivityIndicator size="large" color="#00d4ff" />
          <Text style={styles.loaderTxt}>Loading Alpha Visual Artists…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },
  web: { flex: 1, backgroundColor: "#0a0a0a" },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a",
  },
  loaderTxt: {
    color: "#999",
    marginTop: 16,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  errorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#0a0a0a",
  },
  errorTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  errorBody: {
    color: "#999",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
    maxWidth: 320,
  },
  retryBtn: {
    backgroundColor: "#00d4ff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  retryTxt: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  fab: {
    position: "absolute",
    right: 16,
    flexDirection: "column",
    gap: 12,
  },
  fabBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 212, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00d4ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabBtnPressed: {
    transform: [{ scale: 0.92 }],
    backgroundColor: "rgba(0, 212, 255, 0.7)",
  },
  fabIcon: {
    color: "#000",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 2,
  },
  fabIconSmall: {
    color: "#000",
    fontSize: 22,
    fontWeight: "700",
  },
});
