import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { WebView, type WebViewNavigation } from "react-native-webview";
import type { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";

const SITE_URL = "https://alphavisualartists.com";
const SITE_HOSTS = ["alphavisualartists.com", "www.alphavisualartists.com"];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const webRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  const onNav = (e: WebViewNavigation) => setCanGoBack(e.canGoBack);

  // Open external links (mailto, tel, App Store, social, third-party domains)
  // in the system handler instead of trapping users inside the WebView.
  const onShouldStart = (req: ShouldStartLoadRequest): boolean => {
    const url = req.url;
    if (url.startsWith("about:") || url === "about:blank") return true;

    // Non-http schemes -> hand off to OS
    if (!/^https?:\/\//i.test(url)) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      const isOurSite = SITE_HOSTS.some((h) => h.replace(/^www\./, "") === host);
      if (!isOurSite) {
        WebBrowser.openBrowserAsync(url).catch(() => Linking.openURL(url));
        return false;
      }
    } catch {
      // ignore URL parse errors
    }
    return true;
  };

  const reload = () => {
    setHasError(false);
    setLoading(true);
    webRef.current?.reload();
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
          source={{ uri: SITE_URL }}
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
            const status = e.nativeEvent.statusCode;
            if (status >= 500) {
              setLoading(false);
              setHasError(true);
            }
          }}
          allowsBackForwardNavigationGestures
          decelerationRate="normal"
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={["*"]}
          setSupportMultipleWindows={false}
          pullToRefreshEnabled
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          applicationNameForUserAgent="AVAMobile/1.0"
        />
      )}
      {loading && !hasError && (
        <View style={styles.loader} pointerEvents="none">
          <ActivityIndicator size="large" color="#00d4ff" />
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
});
