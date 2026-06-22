import React from "react";
import { useRoute } from "wouter";
import { APP_STORE_URL } from "@/config/app";
const STORAGE_KEY = "ava_pending_redeem_code";

function normalizeCode(raw: string | undefined): string | null {
  const cleaned = (raw ?? "").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 8);
  return cleaned.length >= 3 ? cleaned : null;
}

export default function RedeemLanding() {
  const [, params] = useRoute("/r/:code");
  const code = normalizeCode(params?.code);

  React.useEffect(() => {
    document.title = code
      ? "Your event photos · Alpha Visual Artists"
      : "Invalid code · Alpha Visual Artists";
    if (code) {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // non-blocking
      }
    }
  }, [code]);

  return (
    <div className="min-h-[100dvh] bg-[#060606] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141414] px-7 py-8 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8000A]">
          Alpha Visual Artists
        </p>
        <h1 className="mb-3 text-3xl font-extrabold uppercase tracking-wide leading-tight">
          Your event photos
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed text-white/50">
          {code
            ? "Download AVA to unlock your private gallery. Keep this code — you'll enter it after signing in."
            : "This link is missing a valid event code. Ask your photographer for a new card."}
        </p>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
          Your code
        </p>
        <div className="mb-7 rounded-xl border border-[#E8000A]/35 bg-white/[0.04] px-3 py-5 font-mono text-4xl font-bold tracking-[0.35em]">
          {code ?? "INVALID"}
        </div>

        <a
          href={APP_STORE_URL}
          rel="noopener noreferrer"
          className="mb-4 inline-block w-full rounded-xl bg-[#E8000A] px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-white no-underline"
        >
          Download on the App Store
        </a>

        <p className="text-xs leading-relaxed text-white/50">
          Already have AVA installed? Open this same link on your phone — the app will open with
          your code ready.
        </p>
      </div>
    </div>
  );
}
