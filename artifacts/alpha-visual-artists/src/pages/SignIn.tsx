import { SignIn } from "@clerk/react";
import { clerkAppearance } from "@/components/ClerkRoot";
import { isClerkConfigured } from "@/lib/clerkConfig";
import { ClerkUnavailable } from "@/components/ClerkUnavailable";
import { getPostAuthRedirectUrl } from "@/lib/api";

export default function SignInPage() {
  if (!isClerkConfigured) {
    return <ClerkUnavailable title="Sign-in unavailable" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={getPostAuthRedirectUrl()}
        appearance={clerkAppearance}
      />
    </div>
  );
}
