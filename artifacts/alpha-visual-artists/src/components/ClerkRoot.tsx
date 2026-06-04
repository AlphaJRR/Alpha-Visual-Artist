import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";
import { clerkPublishableKey, isClerkConfigured } from "@/lib/clerkConfig";

/** Shared Clerk theme — applied via ClerkProvider (SignIn/SignUp inherit). */
export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#00E6FF",
    colorBackground: "#0D0D0D",
    colorText: "#FFFFFF",
    colorInputBackground: "#171717",
    colorInputText: "#FFFFFF",
    colorNeutral: "#A3A3A3",
    colorDanger: "#FF4D4D",
    borderRadius: "12px",
    fontFamily: "Inter, sans-serif",
  },
  elements: {
    rootBox: {
      width: "100%",
    },
    card: {
      backgroundColor: "#0D0D0D",
      border: "1px solid rgba(0, 230, 255, 0.15)",
      boxShadow: "none",
    },
    headerTitle: {
      color: "#FFFFFF",
    },
    headerSubtitle: {
      color: "#A3A3A3",
    },
    socialButtonsBlockButton: {
      backgroundColor: "#171717",
      border: "1px solid rgba(255, 255, 255, 0.14)",
      color: "#FFFFFF",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#262626",
        borderColor: "rgba(0, 230, 255, 0.35)",
      },
    },
    socialButtonsBlockButtonText: {
      color: "#FFFFFF",
      fontWeight: "500",
    },
    socialButtonsProviderIcon: {
      filter: "none",
      opacity: 1,
    },
    socialButtonsIconButton: {
      backgroundColor: "#171717",
      border: "1px solid rgba(255, 255, 255, 0.14)",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#262626",
      },
    },
    dividerLine: {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    dividerText: {
      color: "#A3A3A3",
    },
    formButtonPrimary: {
      backgroundColor: "#00E6FF",
      color: "#0D0D0D",
      fontWeight: "600",
      "&:hover": {
        backgroundColor: "#33EBFF",
      },
    },
    formFieldInput: {
      backgroundColor: "#171717",
      borderColor: "rgba(255, 255, 255, 0.14)",
      color: "#FFFFFF",
    },
    formFieldLabel: {
      color: "#E5E5E5",
    },
    footerActionLink: {
      color: "#00E6FF",
    },
    identityPreviewEditButton: {
      color: "#00E6FF",
    },
    alternativeMethodsBlockButton: {
      color: "#00E6FF",
    },
    otpCodeFieldInput: {
      backgroundColor: "#171717",
      borderColor: "rgba(255, 255, 255, 0.14)",
      color: "#FFFFFF",
    },
  },
} as const;

const clerkLocalization = {
  signIn: {
    start: {
      title: "Sign in to Alpha Visual Artists",
      subtitle: "Welcome back to Alpha Visual Artists",
    },
    socialButtonsBlockButton: "Continue with {{provider|titleize}}",
  },
  signUp: {
    start: {
      title: "Join Alpha Visual Artists",
      subtitle: "Create your Alpha Visual Artists account",
    },
    socialButtonsBlockButton: "Continue with {{provider|titleize}}",
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
      localization={clerkLocalization}
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
