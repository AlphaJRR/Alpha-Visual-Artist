import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const SHOP_URL = "https://alphavisualartists.com/apparel";

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const webRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const reload = () => {
    Haptics.selectionAsync().catch(() => {});
    setErrored(false);
    setLoading(true);
    webRef.current?.reload();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>Wear The Brand</Text>
          <Text style={styles.h1}>Shop</Text>
        </View>
        <Pressable onPress={reload} hitSlop={10} style={styles.iconBtn}>
          <Ionicons name="refresh" size={20} color="#00d4ff" />
        </Pressable>
      </View>

      <View style={styles.webWrap}>
        {errored ? (
          <View style={styles.errorBox}>
            <Ionicons name="cloud-offline-outline" size={48} color="#555" />
            <Text style={styles.errTitle}>Couldn't load shop</Text>
            <Text style={styles.errSub}>Check your connection and retry.</Text>
            <Pressable onPress={reload} style={styles.retryBtn}>
              <Text style={styles.retryTxt}>Try Again</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <WebView
              ref={webRef}
              source={{ uri: SHOP_URL }}
              style={styles.web}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setErrored(true);
                setLoading(false);
              }}
              onHttpError={() => {
                setErrored(true);
                setLoading(false);
              }}
              startInLoadingState
              sharedCookiesEnabled
              thirdPartyCookiesEnabled
              domStorageEnabled
              javaScriptEnabled
              allowsBackForwardNavigationGestures
              decelerationRate="normal"
              renderLoading={() => <View />}
            />
            {loading && (
              <View style={styles.loadingOverlay} pointerEvents="none">
                <ActivityIndicator color="#00d4ff" size="large" />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  eyebrow: {
    color: "#00d4ff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  h1: { color: "#fff", fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,212,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  webWrap: { flex: 1, backgroundColor: "#0a0a0a" },
  web: { flex: 1, backgroundColor: "#0a0a0a" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a",
  },
  errorBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  errTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  errSub: { color: "#888", fontSize: 14, textAlign: "center" },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#00d4ff",
    borderRadius: 12,
  },
  retryTxt: { color: "#000", fontWeight: "700", fontSize: 14 },
});
