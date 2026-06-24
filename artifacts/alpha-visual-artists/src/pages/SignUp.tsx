import { SignUp } from "@clerk/react";
import { clerkAppearance } from "@/components/ClerkRoot";
import { isClerkConfigured } from "@/lib/clerkConfig";
import { ClerkUnavailable } from "@/components/ClerkUnavailable";
import { getPostAuthRedirectUrl } from "@/lib/api";

export default function SignUpPage() {
  if (!isClerkConfigured) {
    return <ClerkUnavailable title="Sign-up unavailable" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl={getPostAuthRedirectUrl()}
        appearance={clerkAppearance}
      />
    </div>
  );
}
