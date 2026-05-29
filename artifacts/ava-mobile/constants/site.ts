/**
 * Marketing site (Replit-hosted). Deployment visibility MUST be **Public** in Replit
 * (Manage → Public → republish). While Private, every route on this host returns
 * HTTP 307 → https://replit.com/__replshield — including /api/storage/public-objects/*.
 *
 * In-app video reels use Cloudflare Stream HLS (see cloudflareHls in index.tsx), not this host.
 */
export const SITE_URL = "https://alphavisualartists.com";

/** Shopify storefront — separate host; not affected by main site Replit visibility. */
export const SHOP_URL = "https://shop.alphavisualartists.com";

/** Object storage paths on the marketing site API. */
export const WALLPAPER_STORAGE_BASE = `${SITE_URL}/api/storage/public-objects/wallpapers`;
export const FEATURED_PHOTO_STORAGE_BASE = `${SITE_URL}/api/storage/public-objects/featured-photos`;

/** @deprecated Use WALLPAPER_STORAGE_BASE + filename (e.g. wallpaper-1.jpg). */
export const WALLPAPER_API_BASE = WALLPAPER_STORAGE_BASE;

export const wallpaperStorageUri = (filename: string) =>
  `${WALLPAPER_STORAGE_BASE}/${filename}`;

export const featuredPhotoStorageUri = (filename: string) =>
  `${FEATURED_PHOTO_STORAGE_BASE}/${filename}`;

export const CLOUDFLARE_STREAM_CUSTOMER =
  "customer-fyh68ijrcuys7ag8.cloudflarestream.com";

export const SITE_HOSTS = new Set([
  "alphavisualartists.com",
  "www.alphavisualartists.com",
]);
