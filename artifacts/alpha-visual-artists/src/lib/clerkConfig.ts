/** Publishable key injected at build time (Cloudflare Pages / CI / Replit). */
export const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? "";

export const isClerkConfigured =
  clerkPublishableKey.length > 0 &&
  (clerkPublishableKey.startsWith("pk_live_") ||
    clerkPublishableKey.startsWith("pk_test_"));
