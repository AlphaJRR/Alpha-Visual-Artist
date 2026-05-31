import { Link } from "wouter";

export function ClerkUnavailable({
  title = "Sign-in unavailable",
  description = "Authentication is not configured for this deployment. Add VITE_CLERK_PUBLISHABLE_KEY in Cloudflare Pages or GitHub Actions secrets, then redeploy.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-white mb-3">
          {title}
        </h1>
        <p className="text-white/60 text-sm mb-6">{description}</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-primary text-black font-semibold text-sm px-6 py-2.5 hover:bg-primary/90 transition"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
