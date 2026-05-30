import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { brandColors } from "@/constants/brand";
import { SITE_HOSTS } from "@/constants/site";

const WEB_BROWSER_OPTS = {
  toolbarColor: brandColors.deepBlack,
  controlsColor: brandColors.alphaRed,
} as const;

/** True for alphavisualartists.com (and www); those routes 307 to Replit __replshield when deployment is Private. */
export function isMainSiteUrl(url: string): boolean {
  try {
    return SITE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

/**
 * Opens links on the marketing site in the system browser (Safari) instead of
 * expo-web-browser, so users are not trapped in an in-app sheet showing __replshield.
 * Shop and other hosts still use the in-app browser when appropriate.
 */
export async function openSiteLink(url: string): Promise<void> {
  if (isMainSiteUrl(url)) {
    await Linking.openURL(url).catch(() => {});
    return;
  }
  await WebBrowser.openBrowserAsync(url, WEB_BROWSER_OPTS).catch(() => {
    Linking.openURL(url).catch(() => {});
  });
}
