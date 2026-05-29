import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import { GalleryManager } from "@/components/GalleryManager";
import { WaymakersBETCollabHighlight } from "@/components/WaymakersBETCollabHighlight";
import {
  CLOUDFLARE_STREAM_CUSTOMER,
  SITE_URL,
} from "@/constants/site";
import { openSiteLink } from "@/lib/openSiteLink";
import { ReelVideoCover } from "../../components/ReelVideoCover";
import { VideoModal } from "../../components/VideoModal";

type Reel = {
  id: string;
  title: string;
  tag: string;
  cover: ImageSourcePropType;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video?: any;
};

const cloudflareHls = (uid: string) => ({
  uri: `https://${CLOUDFLARE_STREAM_CUSTOMER}/${uid}/manifest/video.m3u8`,
});

const FEATURED_VIDEOS = [
  {
    id: "9d3d0efed36b71e5f75c7b5e218809d7",
    title: 'ARGUABLY THE BEST "BURGERS"',
    subtitle: "Joshua Argue & Black Awesomeness Filmworks",
    cloudflareUID: "9d3d0efed36b71e5f75c7b5e218809d7",
  },
  {
    id: "106e0a1004f97de68d31ba317010425d",
    title: "BET ANNIVERSARY DINNER RECAP 2025",
    subtitle: "Los Angeles Ca Partnership with BAF",
    cloudflareUID: "106e0a1004f97de68d31ba317010425d",
  },
  {
    id: "c861d85f92202939bb33ebb87bb3a089",
    title: "CCHS GROUND BREAKING CEREMONY",
    subtitle: "And Alumni Event",
    cloudflareUID: "c861d85f92202939bb33ebb87bb3a089",
  },
  {
    id: "c28e7aee6bd7b9d9c9f44f277d2d11fa",
    title: "FEATURED REEL 828 COLLECTION",
    subtitle: "Fashion Show Maheem Susie Opera",
    cloudflareUID: "c28e7aee6bd7b9d9c9f44f277d2d11fa",
  },
  {
    id: "extra-2",
    title: "WINTER NIGHTS CHICAGO LIGHTS 2025",
    subtitle: "Additional Reel 2",
    cloudflareUID: "793c5fad3fa152369bdaacf731049663",
  },
  {
    id: "extra-3",
    title: "DEEP HEALING CONVERSATIONS",
    subtitle: "Hosted By Dr. Holly Carter (CLOAQ Production)",
    cloudflareUID: "25d31f0e020a4759d7e1c2fa0d1945d3",
  },
] as const;

const FEATURED_REEL_COVERS: ImageSourcePropType[] = [
  require("../../assets/images/creator-court.jpg"),
  require("../../assets/images/cinema-cam.jpg"),
  require("../../assets/images/director-monitor.jpg"),
  require("../../assets/images/event-wade.jpg"),
  require("../../assets/images/chicago-night.jpg"),
  require("../../assets/images/peace-suit.jpg"),
];

const FEATURED_REELS: Reel[] = FEATURED_VIDEOS.map((video, index) => ({
  id: video.id,
  title: video.title,
  tag: video.subtitle,
  cover: FEATURED_REEL_COVERS[index % FEATURED_REEL_COVERS.length],
  url: `${SITE_URL}/work`,
  video: cloudflareHls(video.cloudflareUID),
}));

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
    id: "cf-9d3d0efed36b71e5f75c7b5e218809d7",
    title: "Featured Video #1",
    tag: "Featured · Reel",
    cover: require("../../assets/images/creator-court.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("9d3d0efed36b71e5f75c7b5e218809d7"),
  },
  {
    id: "cf-106e0a1004f97de68d31ba317010425d",
    title: "BET Video",
    tag: "Featured · BET",
    cover: require("../../assets/images/cinema-cam.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("106e0a1004f97de68d31ba317010425d"),
  },
  {
    id: "cf-c861d85f92202939bb33ebb87bb3a089",
    title: "Featured Video #3",
    tag: "Featured · Reel",
    cover: require("../../assets/images/director-monitor.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("c861d85f92202939bb33ebb87bb3a089"),
  },
  {
    id: "cf-c28e7aee6bd7b9d9c9f44f277d2d11fa",
    title: "Fashion Show Promo",
    tag: "Featured · Promo",
    cover: require("../../assets/images/event-wade.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("c28e7aee6bd7b9d9c9f44f277d2d11fa"),
  },
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
    id: "rdrose",
    title: "Derrick Rose",
    tag: "Waymaker Kid's Summit",
    cover: require("../../assets/images/event-drose.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "cf-793c5fad3fa152369bdaacf731049663",
    title: "Additional Reel #1",
    tag: "Cloudflare · Extra",
    cover: require("../../assets/images/portrait-dada.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("793c5fad3fa152369bdaacf731049663"),
  },
  {
    id: "cf-25d31f0e020a4759d7e1c2fa0d1945d3",
    title: "Additional Reel #2",
    tag: "Cloudflare · Extra",
    cover: require("../../assets/images/peace-suit.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("25d31f0e020a4759d7e1c2fa0d1945d3"),
  },
  {
    id: "cf-29424a48ea60434f3feb6e6cfd12fff4",
    title: "Additional Reel #3",
    tag: "Cloudflare · Extra",
    cover: require("../../assets/images/kids-plaid.jpg"),
    url: `${SITE_URL}/work`,
    video: cloudflareHls("29424a48ea60434f3feb6e6cfd12fff4"),
  },
  {
    id: "rkids",
    title: "Cozy Plaid — Kids Editorial",
    tag: "Editorial · Family",
    cover: require("../../assets/images/kids-plaid.jpg"),
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
    id: "rconcert1",
    title: "Festival Headliner",
    tag: "Concert · Live",
    cover: require("../../assets/images/stage-performer.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "rconcert2",
    title: "Red Lights, Big Stage",
    tag: "Concert · Live",
    cover: require("../../assets/images/red-stage-mic.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "rlegends",
    title: "Rap Legends",
    tag: "Music · Tour",
    cover: require("../../assets/images/rap-legends.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r5",
    title: "Lakefront Engagement",
    tag: "Couples · Chicago",
    cover: require("../../assets/images/couple-skyline.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r6",
    title: "Garden Editorial",
    tag: "B&W · Lookbook",
    cover: require("../../assets/images/editorial-flowers.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r7",
    title: "Red Room Series",
    tag: "Studio · Portrait",
    cover: require("../../assets/images/portrait-dada.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r8",
    title: "Peace & Tailoring",
    tag: "Editorial · Studio",
    cover: require("../../assets/images/peace-suit.jpg"),
    url: `${SITE_URL}/work`,
  },
  {
    id: "r9",
    title: "Nail Tech Campaign",
    tag: "Beauty · Brand",
    cover: require("../../assets/images/nail-tech.jpg"),
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
  { id: "p9", src: require("../../assets/images/chicago-highway.jpg"), caption: "Sears tower commute" },
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
  const clerk = useClerk();
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  // NEW: Track which reel IDs are currently visible
  const [visibleReelIds, setVisibleReelIds] = useState<Set<string>>(new Set());

  const open = (url: string) => {
    Haptics.selectionAsync().catch(() => {});
    openSiteLink(url).catch(() => {});
  };

  const handleReel = (r: Reel) => {
    Haptics.selectionAsync().catch(() => {});
    if (r.video) {
      setActiveVideo(r.video);
    } else {
      open(r.url);
    }
  };

  // NEW: Callback for FlatList viewability changes
  const handleViewableItemsChanged = (info: { viewableItems: ViewToken[] }) => {
    const visibleIds = new Set(
      info.viewableItems.map((item) => item.key as string)
    );
    setVisibleReelIds(visibleIds);
  };

  // Reel card component (extracted for clarity)
  const renderReelCard = ({ item: r }: { item: Reel }) => (
    <Pressable
      onPress={() => handleReel(r)}
      style={styles.reelCard}
      key={r.id}
    >
      {r.video ? (
        <>
          <ReelVideoCover
            source={r.video}
            isVisible={visibleReelIds.has(r.id)} // NEW: gate playback
          />
          <View style={styles.reelOverlay}>
            <View style={[styles.playBadge, styles.playBadgeVideo]}>
              <Ionicons name="play" size={24} color="#00d4ff" />
            </View>
          </View>
          <View style={styles.videoBadge}>
            <Text style={styles.videoBadgeTxt}>VIDEO</Text>
          </View>
        </>
      ) : (
        <>
          <Image source={r.cover} style={styles.reelCover} />
          <View style={styles.reelOverlay}>
            <View style={styles.playBadge}>
              <Ionicons name="arrow-forward" size={24} color="#000" />
            </View>
          </View>
        </>
      )}
      <View style={styles.reelMeta}>
        <Text style={styles.reelTag}>{r.tag}</Text>
        <Text style={styles.reelTitle}>{r.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={[styles.hero, { paddingTop: 12 }]}>
          <Text style={styles.brand}>ALPHA VISUAL ARTISTS</Text>
          <Text style={styles.tag}>Chicago · Cinematic · Stop The Scroll</Text>

          <View style={styles.authRow}>
            <SignedOut>
              <Pressable
                style={styles.secondaryBtn}
                onPress={() => clerk.redirectToSignIn()}
              >
                <Text style={styles.secondaryBtnTxt}>Sign In</Text>
              </Pressable>
              <Pressable
                style={styles.primaryBtn}
                onPress={() => clerk.redirectToSignUp()}
              >
                <Text style={styles.primaryBtnTxt}>Sign Up</Text>
              </Pressable>
            </SignedOut>
            <SignedIn>
              <View style={styles.userRow}>
                <Text style={styles.userLabel}>
                  {user?.primaryEmailAddress?.emailAddress ?? "Signed In"}
                </Text>
                <Pressable
                  style={styles.secondaryBtn}
                  onPress={() => clerk.signOut()}
                >
                  <Text style={styles.secondaryBtnTxt}>Sign Out</Text>
                </Pressable>
              </View>
            </SignedIn>
          </View>

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

        {/* FEATURED VIDEOS */}
        <SectionHeader
          eyebrow="Featured"
          title="Featured Reels"
          action="See All"
          onAction={() => open(`${SITE_URL}/work`)}
        />
        <FlatList
          data={FEATURED_REELS}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reelRow}
          renderItem={renderReelCard}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // Show as visible when 50%+ on screen
          }}
          scrollEventThrottle={16}
          decelerationRate="fast"
        />

        <WaymakersBETCollabHighlight onPress={() => open(`${SITE_URL}/work`)} />

        {/* GALLERY */}
        <SectionHeader eyebrow="Craft" title="Behind The Lens" />
        <View style={styles.grid}>
          {PHOTOS.map((p) => (
            <View key={p.id} style={styles.gridItem}>
              <Image source={p.src} style={styles.gridImg} />
              <View style={styles.gridGradient} />
              <Text style={styles.gridCaption}>{p.caption}</Text>
            </View>
          ))}
        </View>

        {/* TIPS */}
        <SectionHeader eyebrow="Knowledge" title="Production Tips" />
        <View style={styles.tipsList}>
          {TIPS.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <Image source={tip.cover} style={styles.tipCover} />
              <View style={styles.tipBody}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <GalleryManager
          onPhotoPress={() => open(`${SITE_URL}/work`)}
          onBetLivePress={() => open(`${SITE_URL}/work`)}
        />

        {/* FOOTER CTA */}
        <View style={styles.footerCta}>
          <Text style={styles.footerEyebrow}>Ready To Create</Text>
          <Text style={styles.footerH}>Let's Make Magic</Text>
          <Pressable
            onPress={() => open(`${SITE_URL}/contact`)}
            style={styles.bigBtn}
          >
            <Text style={styles.bigBtnTxt}>Get In Touch</Text>
            <Ionicons name="arrow-forward" size={16} color="#000" />
          </Pressable>
        </View>
      </ScrollView>

      <VideoModal
        source={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
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
  authRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 14,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.4)",
    backgroundColor: "rgba(0,212,255,0.08)",
  },
  userLabel: {
    color: "#00d4ff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
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
  playBadgeVideo: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 2,
    borderColor: "#00d4ff",
  },
  videoBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#00d4ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoBadgeTxt: {
    color: "#000",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
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
