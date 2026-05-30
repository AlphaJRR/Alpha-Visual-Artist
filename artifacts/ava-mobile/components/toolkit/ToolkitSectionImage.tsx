import React, { useState } from "react";
import { View, type ImageStyle, type StyleProp } from "react-native";
import { Image } from "expo-image";

import { SITE_URL } from "@/constants/site";

/** Filenames under `public/assets/toolkit/` (website) — same names in mobile bundle when added. */
export type ToolkitSectionAsset =
  | "creator-training.png"
  | "creator-training.jpg"
  | "invoice-builder.png"
  | "invoice-builder.jpg"
  | "production-checklists.png"
  | "production-checklists.jpg";

const PLACEHOLDER = "#111111";

type Props = {
  filename: ToolkitSectionAsset;
  style?: StyleProp<ImageStyle>;
};

export function ToolkitSectionImage({ filename, style }: Props) {
  const [failed, setFailed] = useState(false);
  const uri = `${SITE_URL}/assets/toolkit/${filename}`;

  if (failed) {
    return <View style={[style, { backgroundColor: PLACEHOLDER }]} />;
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      contentFit="cover"
      onError={() => setFailed(true)}
    />
  );
}

export const toolkitSectionImageStyle = {
  width: "100%" as const,
  height: 160,
  borderRadius: 12,
  marginBottom: 16,
  backgroundColor: PLACEHOLDER,
};
