import { Link } from "wouter";

export default function PortalUnavailable() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full rounded-2xl border border-primary/20 bg-white/5 p-10 text-center">
        <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
          Client portal
        </p>
        <h1 className="font-display text-3xl font-bold mb-3">Coming soon</h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          The client portal and API still run on Replit during migration. This
          static site is live; project review and uploads will return once the
          API is connected to production hosting.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-full bg-primary text-black font-semibold text-sm px-6 py-2.5 hover:bg-primary/90 transition"
          >
            Back to site
          </Link>
          <a
            href="mailto:hello@alphavisualartists.com?subject=Portal%20access"
            className="inline-flex justify-center rounded-full border border-white/20 text-white/90 font-semibold text-sm px-6 py-2.5 hover:bg-white/5 transition"
          >
            Email the team
          </a>
        </div>
      </div>
    </div>
  );
}
