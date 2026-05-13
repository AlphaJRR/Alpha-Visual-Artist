import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";
import App from "./App";
import "./index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not set");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={publishableKey}
    appearance={{
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
    }}
    signInFallbackRedirectUrl="/portal"
    signUpFallbackRedirectUrl="/portal"
  >
    <App />
  </ClerkProvider>,
);
