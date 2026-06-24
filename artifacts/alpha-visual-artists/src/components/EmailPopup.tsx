import React, { useEffect, useRef, useState } from "react";
import { X, Copy, Check } from "lucide-react";

const STORAGE_KEY = "ava_popup_dismissed_v2";
const DISCOUNT_CODE = "ALPHACREW15";

let popupShownThisSession = false;

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (armed.current) return;
    armed.current = true;
    if (popupShownThisSession) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => {
      popupShownThisSession = true;
      setOpen(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    popupShownThisSession = true;
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  };

  const onSubmit = (e: React.FormEvent) => {
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
    // No backend on Cloudflare static deploy — reveal code locally (no silent 405).
    setSubmitted(true);
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
      className="modal-overlay flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,212,255,0.25)] p-8 sm:p-10"
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
                Confirm your email to unlock your Alpha Crew Collection code.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                autoComplete="email"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 min-h-11 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
              />
              <input
                type="email"
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm email"
                required
                autoComplete="email"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3.5 min-h-11 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
              />
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              <button
                type="submit"
                className="btn-marketing w-full rounded-lg bg-primary text-black font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition"
              >
                Get My 15% Off
              </button>
              <p className="text-[10px] text-white/40 text-center pt-2">
                Code shown on this device only — join our list via{" "}
                <a
                  href="mailto:hello@alphavisualartists.com?subject=Newsletter"
                  className="underline hover:text-white/60"
                >
                  email
                </a>{" "}
                for updates.
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
              type="button"
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
              type="button"
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
