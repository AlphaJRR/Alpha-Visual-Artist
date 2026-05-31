import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";
import { clerkPublishableKey, isClerkConfigured } from "@/lib/clerkConfig";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#00E6FF",
    colorBackground: "#0D0D0D",
    colorText: "#FFFFFF",
    colorInputBackground: "#171717",
    colorInputText: "#FFFFFF",
    borderRadius: "12px",
    fontFamily: "Inter, sans-serif",
  },
} as const;

export function ClerkRoot({ children }: { children: ReactNode }) {
  if (!isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={clerkAppearance}
      signInFallbackRedirectUrl="/portal"
      signUpFallbackRedirectUrl="/portal"
    >
      {children}
    </ClerkProvider>
  );
}

export function ClerkConfigBanner() {
  if (isClerkConfigured) return null;

  return (
    <div
      role="status"
      className="bg-amber-950/90 border-b border-amber-500/30 text-amber-100 text-center text-xs sm:text-sm px-4 py-2"
    >
      Client sign-in is temporarily unavailable (auth not configured for this
      deployment). Public pages work normally — contact{" "}
      <a
        href="mailto:hello@alphavisualartists.com"
        className="underline hover:text-white"
      >
        hello@alphavisualartists.com
      </a>{" "}
      for portal access.
    </div>
  );
}
