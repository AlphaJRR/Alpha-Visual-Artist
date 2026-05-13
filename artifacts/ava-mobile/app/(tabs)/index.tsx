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
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";

const SITE_URL = "https://alphavisualartists.com";

const LOGO = require("../../assets/images/logo.png") as ImageSourcePropType;

type Reel = {
  id: string;
  title: string;
  tag: string;
  cover: ImageSourcePropType;
  url: string;
};

type Photo = {
  id: string;
  src: ImageSourcePropType;
  caption: string;
};

type Tip = {
  id: string;
  title: string;
  body: string;
  cover: ImageSourcePropType;
};

const REELS: Reel[] = [
  {
    id: "r1",
    title: "Dwyane Wade",
    tag: "Waymaker Chicago",
    cover: require("../../assets/images/event-wade.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r2",
    title: "Nick Cannon",
    tag: "Waymaker Chicago",
    cover: require("../../assets/images/event-cannon.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r3",
    title: "Louis Carr",
    tag: "Waymaker Chicago",
    cover: require("../../assets/images/event-jayellis.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r4",
    title: "Live From The Stage",
    tag: "Music · Performance",
    cover: require("../../assets/images/live-singer.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r5",
    title: "Couples Editorial",
    tag: "Portrait · Event",
    cover: require("../../assets/images/couple-kiss.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r6",
    title: "Editorial — B&W",
    tag: "Lookbook",
    cover: require("../../assets/images/portrait-bw.jpg"),
    url: `${SITE_URL}/work`,
  },
];

const PHOTOS: Photo[] = [
  { id: "p1", src: require("../../assets/images/cinema-cam.jpg"), caption: "Cinema package" },
  { id: "p2", src: require("../../assets/images/director-monitor.jpg"), caption: "Director's eye" },
  { id: "p3", src: require("../../assets/images/clapper.jpg"), caption: "Roll sound" },
  { id: "p4", src: require("../../assets/images/lens-lineup.jpg"), caption: "Glass selection" },
  { id: "p5", src: require("../../assets/images/creator-court.jpg"), caption: "On location" },
  { id: "p6", src: require("../../assets/images/dzo-lenses.jpg"), caption: "Prime time" },
  { id: "p7", src: require("../../assets/images/marriage-clapper.jpg"), caption: "Action!" },
  { id: "p8", src: require("../../assets/images/chicago-sunset.jpg"), caption: "Chicago golden hour" },
];

const TIPS: Tip[] = [
  {
    id: "t1",
    title: "Light The Eyes First",
    body: "If your subject's eyes catch a small specular highlight, the whole frame reads alive. Place a soft key 30° off-axis at eye level — adjust until you see a 2 o'clock catchlight.",
    cover: require("../../assets/images/couple-kiss.jpg"),
  },
  {
    id: "t2",
    title: "Audio Is 70% Of Video",
    body: "A blurry shot with crisp audio plays. A sharp shot with bad audio dies in 3 seconds. Lav your subject, set levels at -12dB peaks, and always run a backup recorder.",
    cover: require("../../assets/images/director-monitor.jpg"),
  },
  {
    id: "t3",
    title: "Shoot The Cutaway",
    body: "Every interview needs B-roll. Hands, environment, gear, gestures — anything. It saves your edit when you need to cut a stutter or cover a jump cut.",
    cover: require("../../assets/images/cinema-cam.jpg"),
  },
  {
    id: "t4",
    title: "Frame For The Crop",
    body: "Shooting in 16:9 but delivering 9:16? Compose with the vertical safe area in mind from day one. Place subjects on the center third — never the edges.",
    cover: require("../../assets/images/chicago-sunset.jpg"),
  },
  {
    id: "t5",
    title: "Pick The Right Glass",
    body: "Primes for character, zooms for speed. Cinema lenses for control. Match your lens choice to the story — not the spec sheet.",
    cover: require("../../assets/images/lens-lineup.jpg"),
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const open = (url: string) => {
    Haptics.selectionAsync().catch(() => {});
    WebBrowser.openBrowserAsync(url, {
      toolbarColor: "#0a0a0a",
      controlsColor: "#00d4ff",
    }).catch(() => {});
  };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
          <Image
            source={LOGO}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>ALPHA VISUAL ARTISTS</Text>
          <Text style={styles.tag}>Chicago · Cinematic · Stop The Scroll</Text>

          <View style={styles.heroBtnRow}>
            <Pressable
              onPress={() => open(`${SITE_URL}/portal`)}
              style={styles.primaryBtn}
            >
              <Ionicons name="lock-closed-outline" size={16} color="#000" />
              <Text style={styles.primaryBtnTxt}>Client Portal</Text>
            </Pressable>
            <Pressable
              onPress={() => open(SITE_URL)}
              style={styles.secondaryBtn}
            >
              <Text style={styles.secondaryBtnTxt}>Visit Site</Text>
              <Ionicons name="arrow-forward" size={14} color="#00d4ff" />
            </Pressable>
          </View>
        </View>

        {/* RECENT WORK */}
        <SectionHeader
          eyebrow="Latest"
          title="Recent Work"
          action="See All"
          onAction={() => open(`${SITE_URL}/work`)}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reelRow}
        >
          {REELS.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => open(r.url)}
              style={styles.reelCard}
            >
              <Image source={r.cover} style={styles.reelCover} />
              <View style={styles.reelOverlay}>
                <View style={styles.playBadge}>
                  <Ionicons name="play" size={18} color="#000" />
                </View>
              </View>
              <View style={styles.reelMeta}>
                <Text style={styles.reelTag}>{r.tag}</Text>
                <Text style={styles.reelTitle} numberOfLines={2}>
                  {r.title}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* BTS GRID */}
        <SectionHeader
          eyebrow="Behind The Scenes"
          title="From The Set"
        />
        <View style={styles.grid}>
          {PHOTOS.map((p) => (
            <Pressable
              key={p.id}
              style={styles.gridItem}
              onPress={() => open(`${SITE_URL}/work`)}
            >
              <Image source={p.src} style={styles.gridImg} />
              <View style={styles.gridGradient} />
              <Text style={styles.gridCaption}>{p.caption}</Text>
            </Pressable>
          ))}
        </View>

        {/* TEACHING TIPS */}
        <SectionHeader
          eyebrow="From The Mentor"
          title="Tips From The Set"
        />
        <View style={styles.tipsList}>
          {TIPS.map((t) => (
            <View key={t.id} style={styles.tipCard}>
              <Image source={t.cover} style={styles.tipCover} />
              <View style={styles.tipBody}>
                <Text style={styles.tipTitle}>{t.title}</Text>
                <Text style={styles.tipText}>{t.body}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER CTA */}
        <View style={styles.footerCta}>
          <Text style={styles.footerEyebrow}>Ready to shoot?</Text>
          <Text style={styles.footerH}>Book a session.</Text>
          <Pressable
            onPress={() => open(`${SITE_URL}/contact`)}
            style={styles.bigBtn}
          >
            <Text style={styles.bigBtnTxt}>Get In Touch</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHead}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action && (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={styles.sectionAction}>{action} →</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a" },

  // HERO
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  logo: { width: 110, height: 110, marginBottom: 4 },
  brand: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 3,
    textAlign: "center",
  },
  tag: {
    color: "#00d4ff",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 6,
    marginBottom: 20,
  },
  heroBtnRow: { flexDirection: "row", gap: 10 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#00d4ff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  primaryBtnTxt: {
    color: "#000",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.4)",
  },
  secondaryBtnTxt: {
    color: "#00d4ff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // SECTION HEADERS
  sectionHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 14,
  },
  sectionEyebrow: {
    color: "#00d4ff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sectionAction: {
    color: "#00d4ff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // REELS
  reelRow: { paddingHorizontal: 20, gap: 12 },
  reelCard: {
    width: 220,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  reelCover: { width: "100%", height: 280, backgroundColor: "#111" },
  reelOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    height: 280,
  },
  playBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#00d4ff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4,
    shadowColor: "#00d4ff",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  reelMeta: { padding: 12 },
  reelTag: {
    color: "#00d4ff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  reelTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },

  // GRID
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 8,
  },
  gridItem: {
    width: "48.5%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  gridImg: { width: "100%", height: "100%" },
  gridGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  gridCaption: {
    position: "absolute",
    left: 10,
    bottom: 8,
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // TIPS
  tipsList: { paddingHorizontal: 20, gap: 12 },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  tipCover: { width: 100, height: 130, backgroundColor: "#111" },
  tipBody: { flex: 1, padding: 14 },
  tipTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },
  tipText: { color: "#aaa", fontSize: 12, lineHeight: 18 },

  // FOOTER CTA
  footerCta: {
    margin: 20,
    marginTop: 32,
    padding: 24,
    backgroundColor: "rgba(0,212,255,0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.25)",
    alignItems: "center",
  },
  footerEyebrow: {
    color: "#00d4ff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  footerH: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 18,
  },
  bigBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#00d4ff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
  },
  bigBtnTxt: {
    color: "#000",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
