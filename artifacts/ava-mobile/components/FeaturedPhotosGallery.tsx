import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import {
  FEATURED_PHOTOS,
  type FeaturedPhotoItem,
} from "@/data/mediaStorage";
import { brandColors, fontFamilies } from "@/constants/brand";

const C = brandColors;
const F = fontFamilies;

export type FeaturedPhoto = FeaturedPhotoItem;

const COLS = 3;
const H_PADDING = 16;
const GAP = 6;

type FeaturedPhotosGalleryProps = {
  onPhotoPress?: (photo: FeaturedPhoto) => void;
};

export function FeaturedPhotosGallery({ onPhotoPress }: FeaturedPhotosGalleryProps) {
  const { width } = useWindowDimensions();
  const [loadFailed, setLoadFailed] = useState(false);

  const itemSize = useMemo(() => {
    const inner = width - H_PADDING * 2 - GAP * (COLS - 1);
    return Math.floor(inner / COLS);
  }, [width]);

  const handlePress = (photo: FeaturedPhoto) => {
    Haptics.selectionAsync().catch(() => {});
    onPhotoPress?.(photo);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Spotlight</Text>
        <Text style={styles.title}>Featured Photos</Text>
      </View>
      {loadFailed ? (
        <Text style={styles.warn}>
          Photos load from alphavisualartists.com storage. Ensure the site is
          publicly deployed.
        </Text>
      ) : null}
      <View style={[styles.grid, { paddingHorizontal: H_PADDING }]}>
        {FEATURED_PHOTOS.map((photo, index) => (
          <Pressable
            key={photo.id}
            onPress={() => handlePress(photo)}
            style={({ pressed }) => [
              styles.card,
              {
                width: itemSize,
                height: itemSize,
                marginRight: (index + 1) % COLS === 0 ? 0 : GAP,
                marginBottom: GAP,
                opacity: pressed ? 0.88 : 1,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={photo.title}
          >
            <Image
              source={{ uri: photo.uri }}
              style={styles.image}
              contentFit="cover"
              transition={200}
              recyclingKey={photo.id}
              onError={() => setLoadFailed(true)}
            />
            <View style={styles.overlay} />
            <Text style={styles.cardTitle} numberOfLines={2}>
              {photo.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    overflow: "hidden",
    marginTop: 8,
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingTop: 28,
    paddingBottom: 14,
  },
  eyebrow: {
    color: C.pureWhite,
    fontSize: 10,
    fontFamily: F.mono,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.55,
    marginBottom: 4,
  },
  title: {
    color: C.pureWhite,
    fontSize: 22,
    fontFamily: F.display,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  warn: {
    color: "#ffb347",
    fontSize: 12,
    lineHeight: 17,
    marginHorizontal: H_PADDING,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: C.graphite,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 13, 13, 0.42)",
  },
  cardTitle: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 8,
    color: C.pureWhite,
    fontSize: 10,
    fontFamily: F.mono,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    lineHeight: 13,
  },
});
