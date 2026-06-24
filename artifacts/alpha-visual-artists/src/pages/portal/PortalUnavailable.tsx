import { Link } from "wouter";
import { isClerkConfigured } from "@/lib/clerkConfig";

export default function PortalUnavailable() {
  if (isClerkConfigured) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full rounded-2xl border border-primary/20 bg-white/5 p-10 text-center">
          <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
            Client sign-in
          </p>
          <h1 className="font-display text-3xl font-bold mb-3">
            Sign in to Alpha Visual Artists
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Use your AVA account to sign in with Apple, Google, or email. Project
            deliverables and review tools appear in your portal when your producer
            assigns them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/sign-in"
              className="inline-flex justify-center rounded-full bg-primary text-black font-semibold text-sm px-6 py-2.5 hover:bg-primary/90 transition"
            >
              Sign in
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border border-white/20 text-white/90 font-semibold text-sm px-6 py-2.5 hover:bg-white/5 transition"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full rounded-2xl border border-primary/20 bg-white/5 p-10 text-center">
        <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
          Client sign-in
        </p>
        <h1 className="font-display text-3xl font-bold mb-3">
          Sign-in temporarily unavailable
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          This deployment does not have client authentication configured. Email
          the team and we will help you access your project materials.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-full bg-primary text-black font-semibold text-sm px-6 py-2.5 hover:bg-primary/90 transition"
          >
            Back to site
          </Link>
          <a
            href="mailto:hello@alphavisualartists.com?subject=Client%20sign-in"
            className="inline-flex justify-center rounded-full border border-white/20 text-white/90 font-semibold text-sm px-6 py-2.5 hover:bg-white/5 transition"
          >
            Email the team
          </a>
        </div>
      </div>
    </div>
  );
}
