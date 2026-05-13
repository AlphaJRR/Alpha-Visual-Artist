import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  style?: ViewStyle;
};

/**
 * Renders a muted, looping, autoplay video preview suitable for use as a
 * reel cover. NOTE: currently every instance starts playing on mount; when
 * this is moved to a virtualized list, gate playback on an `isActive` prop.
 */
export function ReelVideoCover({ source, style }: Props) {
  const player = useVideoPlayer(source, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  return (
    <VideoView
      player={player}
      style={[styles.cover, style]}
      contentFit="cover"
      nativeControls={false}
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  cover: { width: "100%", height: 280, backgroundColor: "#111" },
});
