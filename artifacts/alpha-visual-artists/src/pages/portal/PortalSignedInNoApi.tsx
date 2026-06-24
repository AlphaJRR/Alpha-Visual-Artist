import { Link } from "wouter";
import { UserButton, useUser } from "@clerk/react";

/** Shown when Clerk works but static Pages has no portal API yet. */
export default function PortalSignedInNoApi() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-white/5 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            Alpha <span className="text-primary">Visual Artists</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-white/50">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
            <UserButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16 max-w-lg text-center">
        <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
          Signed in
        </p>
        <h1 className="font-display text-3xl font-bold mb-3">You&apos;re all set</h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          Your AVA account is active. When your producer assigns project
          deliverables, they will appear here. Need help now? Reach out anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-full bg-primary text-black font-semibold text-sm px-6 py-2.5 hover:bg-primary/90 transition"
          >
            Back to site
          </Link>
          <a
            href="mailto:hello@alphavisualartists.com?subject=Project%20access"
            className="inline-flex justify-center rounded-full border border-white/20 text-white/90 font-semibold text-sm px-6 py-2.5 hover:bg-white/5 transition"
          >
            Contact the team
          </a>
        </div>
      </main>
    </div>
  );
}
