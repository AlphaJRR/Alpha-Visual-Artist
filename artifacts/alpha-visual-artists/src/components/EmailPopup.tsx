import React, { useEffect, useState } from "react";
import { X, Copy, Check } from "lucide-react";

const STORAGE_KEY = "ava_popup_dismissed_v1";
const DISCOUNT_CODE = "ALPHACREW15";

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (email !== confirm) {
      setError("Emails do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        "form-name": "ava-discount",
        email,
        confirm,
      }).toString();
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }).catch(() => {});
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,212,255,0.25)] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
                Exclusive Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2">
                15% <span className="text-primary">OFF</span>
              </h2>
              <p className="text-white/60 text-sm">
                Sign up to unlock your code for the Alpha Crew Collection.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              name="ava-discount"
              data-netlify="true"
              method="POST"
              className="space-y-3"
            >
              <input type="hidden" name="form-name" value="ava-discount" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
              />
              <input
                type="email"
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm email"
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
              />
              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary text-black font-semibold uppercase tracking-wider text-sm py-3 hover:bg-primary/90 transition disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Get My 15% Off"}
              </button>
              <p className="text-[10px] text-white/40 text-center pt-2">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-widest mb-4">
              You're In
            </div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-3">
              Your <span className="text-primary">Code</span>
            </h2>
            <p className="text-white/60 text-sm mb-5">
              Use this at checkout for 15% off the Alpha Crew Collection.
            </p>
            <button
              onClick={copyCode}
              className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-primary/60 bg-primary/5 px-4 py-4 hover:bg-primary/10 transition group"
            >
              <span className="font-mono text-2xl font-bold tracking-[0.3em] text-primary">
                {DISCOUNT_CODE}
              </span>
              {copied ? (
                <Check className="h-5 w-5 text-primary" />
              ) : (
                <Copy className="h-5 w-5 text-white/60 group-hover:text-white transition" />
              )}
            </button>
            <p className="text-[10px] text-white/40 mt-3">
              {copied ? "Copied to clipboard" : "Click to copy"}
            </p>
            <button
              onClick={close}
              className="mt-6 text-xs text-white/60 hover:text-white uppercase tracking-widest"
            >
              Continue browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
