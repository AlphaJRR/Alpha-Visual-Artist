import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { brandColors, fontFamilies } from "@/constants/brand";

const C = brandColors;
const F = fontFamilies;
import { BETLiveGallery } from "./BETLiveGallery";
import {
  FeaturedPhoto,
  FeaturedPhotosGallery,
} from "./FeaturedPhotosGallery";

type GalleryManagerProps = {
  onPhotoPress?: (photo: FeaturedPhoto) => void;
  onBetLivePress?: () => void;
};

function FeaturedProjectsSection() {
  return (
    <View style={styles.projectsWrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Portfolio</Text>
        <Text style={styles.title}>Featured Projects</Text>
      </View>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
          Project highlights coming soon — JR will add photos here.
        </Text>
      </View>
    </View>
  );
}

export function GalleryManager({
  onPhotoPress,
  onBetLivePress,
}: GalleryManagerProps) {
  return (
    <>
      <FeaturedProjectsSection />
      <BETLiveGallery onPhotoPress={() => onBetLivePress?.()} />
      <FeaturedPhotosGallery onPhotoPress={onPhotoPress} />
    </>
  );
}

const styles = StyleSheet.create({
  projectsWrap: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  header: {
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
  emptyState: {
    minHeight: 72,
    borderRadius: 10,
    backgroundColor: C.graphite,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
    justifyContent: "center",
  },
  emptyText: {
    color: C.secondaryText,
    fontSize: 13,
    fontFamily: F.body,
    lineHeight: 18,
    textAlign: "center",
  },
});
