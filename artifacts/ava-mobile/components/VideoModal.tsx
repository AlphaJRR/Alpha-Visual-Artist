import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any | null;
  onClose: () => void;
};

/**
 * Fullscreen modal video player. NOTE: lifecycle is currently implicit —
 * playback stops when VideoView unmounts. Harden by calling `player.pause()`
 * explicitly on close, and pause any background reel preview players while
 * this modal is open.
 */
export function VideoModal({ source, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const player = useVideoPlayer(source ?? null, (p) => {
    p.loop = false;
    if (source) p.play();
  });

  return (
    <Modal
      visible={!!source}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <StatusBar style="light" />
        {source && (
          <VideoView
            player={player}
            style={styles.player}
            contentFit="contain"
            allowsFullscreen
            allowsPictureInPicture
            nativeControls
          />
        )}
        <Pressable
          onPress={onClose}
          style={[styles.closeBtn, { top: insets.top + 12 }]}
          hitSlop={12}
        >
          <Ionicons name="close" size={22} color="#fff" />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  player: { width: "100%", height: "100%" },
  closeBtn: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});
