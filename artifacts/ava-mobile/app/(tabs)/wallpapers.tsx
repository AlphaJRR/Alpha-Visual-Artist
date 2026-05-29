import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { SITE_URL } from "@/constants/site";
import { WALLPAPERS, WALLPAPER_COUNT, type WallpaperItem } from "@/data/mediaStorage";
import { openSiteLink } from "@/lib/openSiteLink";

const DONATE_URL = `${SITE_URL}/donate`;

const PURPLE = "#2D1B4E";
const BG = "#0D0D0D";
const CARD = "#1A1A1A";
const TEXT = "#FFFFFF";

const H_PADDING = 16;
const GAP = 10;
const COLS = 2;

export default function WallpapersScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const cardWidth = useMemo(() => {
    const inner = width - H_PADDING * 2 - GAP * (COLS - 1);
    return Math.floor(inner / COLS);
  }, [width]);

  const cardHeight = useMemo(() => Math.round(cardWidth * 1.78), [cardWidth]);

  const openDonate = useCallback(() => {
    Haptics.selectionAsync().catch(() => {});
    openSiteLink(DONATE_URL).catch(() => {});
  }, []);

  const downloadWallpaper = useCallback(async (item: WallpaperItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setDownloadingId(item.id);
    try {
      await Share.share({
        message:
          "AVA Wallpaper — save from the Wallpapers tab once alphavisualartists.com is publicly deployed.",
      });
    } catch {
      if (loadFailed) {
        Alert.alert(
          "Wallpapers unavailable",
          "Images are served from alphavisualartists.com. Set the Replit deployment to Public and republish, then update the app.",
        );
      }
    } finally {
      setDownloadingId(null);
    }
  }, [loadFailed]);

  const onImageError = useCallback(() => {
    setLoadFailed(true);
  }, []);

  const renderItem: ListRenderItem<WallpaperItem> = useCallback(
    ({ item }) => {
      const busy = downloadingId === item.id;
      return (
        <View
          style={[
            styles.card,
            {
              width: cardWidth,
              height: cardHeight,
              marginBottom: GAP,
            },
          ]}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.cardImage}
            contentFit="cover"
            transition={200}
            recyclingKey={item.id}
            onError={onImageError}
          />
          <Pressable
            onPress={() => downloadWallpaper(item)}
            style={styles.downloadBtn}
            accessibilityRole="button"
            accessibilityLabel={`Download ${item.name}`}
            disabled={busy}
          >
            {busy ? (
              <ActivityIndicator size="small" color={TEXT} />
            ) : (
              <Ionicons name="download-outline" size={18} color={TEXT} />
            )}
          </Pressable>
        </View>
      );
    },
    [cardWidth, cardHeight, downloadWallpaper, downloadingId, onImageError],
  );

  const listHeader = useMemo(
    () => (
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.eyebrow}>AVA Mobile</Text>
        <Text style={styles.h1}>Wallpapers</Text>
        <Text style={styles.sub}>
          {WALLPAPER_COUNT}+ cinematic frames from Alpha Visual Artists — save to
          your device and set as your lock screen.
        </Text>
        {loadFailed ? (
          <Text style={styles.warn}>
            Previews are offline until alphavisualartists.com is a Public Replit
            deployment (storage API returns Replit shield while Private).
          </Text>
        ) : null}
        <Pressable
          onPress={openDonate}
          style={({ pressed }) => [styles.donateBtn, pressed && styles.donateBtnPressed]}
          accessibilityRole="button"
          accessibilityLabel="Support and donate"
        >
          <Ionicons name="heart" size={16} color={TEXT} />
          <Text style={styles.donateTxt}>SUPPORT & DONATE</Text>
        </Pressable>
      </View>
    ),
    [insets.top, openDonate, loadFailed],
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={WALLPAPERS}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
    overflow: "hidden",
  },
  listContent: {
    paddingHorizontal: H_PADDING,
  },
  header: {
    paddingBottom: 20,
  },
  eyebrow: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.5,
    marginBottom: 6,
  },
  h1: {
    color: TEXT,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  sub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  warn: {
    color: "#ffb347",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  donateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "stretch",
    backgroundColor: PURPLE,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  donateBtnPressed: {
    opacity: 0.9,
  },
  donateTxt: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  row: {
    justifyContent: "space-between",
    gap: GAP,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: CARD,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  downloadBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(13, 13, 13, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
});
