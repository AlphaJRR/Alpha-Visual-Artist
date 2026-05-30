import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { brandColors, fontFamilies } from "@/constants/brand";

const C = brandColors;
const F = fontFamilies;

type CollabSlide = {
  id: string;
  name: string;
  source: ImageSourcePropType;
};

const SLIDES: CollabSlide[] = [
  {
    id: "cannon",
    name: "Nick Cannon",
    source: require("../assets/images/event-cannon.jpg"),
  },
  {
    id: "rose",
    name: "Derrick Rose",
    source: require("../assets/images/event-drose.jpg"),
  },
  {
    id: "jayellis",
    name: "Jay Ellis",
    source: require("../assets/images/event-jayellis.jpg"),
  },
];

type WaymakersBETCollabHighlightProps = {
  onPress?: () => void;
};

export function WaymakersBETCollabHighlight({
  onPress,
}: WaymakersBETCollabHighlightProps) {
  const handlePress = () => {
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Waymakers × BET</Text>
        <Text style={styles.title}>Collab Highlight</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SLIDES.map((slide) => (
          <Pressable
            key={slide.id}
            onPress={handlePress}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <Image source={slide.source} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay} />
            <Text style={styles.name}>{slide.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const CARD_W = 168;
const CARD_H = 220;

const styles = StyleSheet.create({
  wrap: {
    marginTop: 20,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  row: {
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: C.graphite,
  },
  cardPressed: {
    opacity: 0.9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 13, 13, 0.35)",
  },
  name: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    color: C.pureWhite,
    fontSize: 13,
    fontFamily: F.bodySemiBold,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
