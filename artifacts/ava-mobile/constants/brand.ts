/**
 * Alpha Visual Artists — design tokens (source: BRAND-IDENTITY.md)
 */

export const brandColors = {
  avaBlack: "#080808",
  deepBlack: "#0D0D0D",
  graphite: "#111111",
  borderGray: "#1C1C1C",
  borderGrayLight: "#1E1E1E",
  alphaRed: "#E8000A",
  pureWhite: "#FFFFFF",
  mutedText: "#999999",
  secondaryText: "#CCCCCC",
  subtleText: "#888888",
} as const;

/** Film / social toolkit accents — not for primary CTAs */
export const filmAccents = {
  teal: "#06d6a0",
  blue: "#3a86ff",
  purple: "#8338ec",
  magenta: "#ff006e",
  orange: "#fb5607",
  yellow: "#ffbe0b",
  red: "#E8000A",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 32,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export type BrandFontFamily = {
  display: string;
  displayRegular: string;
  body: string;
  bodyMedium: string;
  bodySemiBold: string;
  mono: string;
};

/** Populated after expo-font loads in app/_layout.tsx */
export const fontFamilies: BrandFontFamily = {
  display: "BebasNeue_400Regular",
  displayRegular: "BebasNeue_400Regular",
  body: "SpaceGrotesk_400Regular",
  bodyMedium: "SpaceGrotesk_500Medium",
  bodySemiBold: "SpaceGrotesk_600SemiBold",
  mono: "DMMono_400Regular",
};

export const typography = {
  displayXL: {
    fontFamily: fontFamilies.display,
    fontSize: 44,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
  },
  display: {
    fontFamily: fontFamilies.display,
    fontSize: 36,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
  headline: {
    fontFamily: fontFamilies.display,
    fontSize: 28,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
  subhead: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 16,
    fontWeight: "600" as const,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 18,
  },
  meta: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },
} as const;

export const brand = {
  colors: brandColors,
  filmAccents,
  spacing,
  radius,
  fonts: fontFamilies,
  typography,
} as const;

export default brand;
