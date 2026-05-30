import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { brandColors, fontFamilies } from "@/constants/brand";

const C = brandColors;
const F = fontFamilies;

const COLS = 2;
const H_PADDING = 16;
const GAP = 8;

type BETLivePhoto = {
  id: string;
  title: string;
  source: ImageSourcePropType;
};

const BET_LIVE_PHOTOS: BETLivePhoto[] = [
  {
    id: "bet1",
    title: "Festival Headliner",
    source: require("../assets/images/stage-performer.jpg"),
  },
  {
    id: "bet2",
    title: "Red Lights, Big Stage",
    source: require("../assets/images/red-stage-mic.jpg"),
  },
  {
    id: "bet3",
    title: "Live From The Stage",
    source: require("../assets/images/live-singer.jpg"),
  },
  {
    id: "bet4",
    title: "Rap Legends",
    source: require("../assets/images/rap-legends.jpg"),
  },
  {
    id: "bet5",
    title: "Spotlight Performance",
    source: require("../assets/images/silhouette-spotlight.jpg"),
  },
  {
    id: "bet6",
    title: "Concert Energy",
    source: require("../assets/images/portrait-redlight.jpg"),
  },
];

type BETLiveGalleryProps = {
  onPhotoPress?: (photo: BETLivePhoto) => void;
};

export function BETLiveGallery({ onPhotoPress }: BETLiveGalleryProps) {
  const { width } = useWindowDimensions();

  const itemHeight = useMemo(() => {
    const inner = width - H_PADDING * 2 - GAP * (COLS - 1);
    const itemWidth = Math.floor(inner / COLS);
    return Math.floor(itemWidth * 1.15);
  }, [width]);

  const itemWidth = useMemo(() => {
    const inner = width - H_PADDING * 2 - GAP * (COLS - 1);
    return Math.floor(inner / COLS);
  }, [width]);

  const handlePress = (photo: BETLivePhoto) => {
    Haptics.selectionAsync().catch(() => {});
    onPhotoPress?.(photo);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>BET Live</Text>
        <Text style={styles.title}>Concert & Big Stage</Text>
      </View>
      <View style={[styles.grid, { paddingHorizontal: H_PADDING }]}>
        {BET_LIVE_PHOTOS.map((photo, index) => (
          <Pressable
            key={photo.id}
            onPress={() => handlePress(photo)}
            style={({ pressed }) => [
              styles.card,
              {
                width: itemWidth,
                height: itemHeight,
                marginRight: (index + 1) % COLS === 0 ? 0 : GAP,
                marginBottom: GAP,
                opacity: pressed ? 0.88 : 1,
              },
            ]}
          >
            <Image source={photo.source} style={styles.image} resizeMode="cover" />
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
