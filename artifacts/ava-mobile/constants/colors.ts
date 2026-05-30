import { brandColors, radius as brandRadius } from "./brand";

const palette = {
  text: brandColors.pureWhite,
  tint: brandColors.alphaRed,
  background: brandColors.deepBlack,
  foreground: brandColors.pureWhite,
  card: brandColors.graphite,
  cardForeground: brandColors.pureWhite,
  primary: brandColors.alphaRed,
  primaryForeground: brandColors.pureWhite,
  secondary: brandColors.borderGray,
  secondaryForeground: brandColors.pureWhite,
  muted: brandColors.borderGray,
  mutedForeground: brandColors.mutedText,
  accent: brandColors.alphaRed,
  accentForeground: brandColors.pureWhite,
  destructive: brandColors.alphaRed,
  destructiveForeground: brandColors.pureWhite,
  border: brandColors.borderGray,
  input: brandColors.borderGrayLight,
};

const colors = {
  light: palette,
  radius: brandRadius.md,
};

export default colors;
