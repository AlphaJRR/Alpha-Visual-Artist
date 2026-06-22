import React, { useState } from "react";
import { X } from "lucide-react";
import { joinList } from "@/lib/klaviyo";
import { useTeaser } from "@/context/TeaserContext";
import "@/styles/ava-tokens.css";
import "./teaser.css";

export function TeaserBanner() {
  const { bannerDismissed, dismissBanner, openModal } = useTeaser();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  if (bannerDismissed) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setStatus("loading");
    const result = await joinList(email);
    if (result.ok) {
      setStatus("success");
      return;
    }
    setStatus("error");
    setError(result.message);
  };

  return (
    <div className="ava-teaser-banner" role="region" aria-label="Launch announcement teaser">
      <div className="ava-teaser-banner__inner">
        <p className="ava-teaser-banner__copy">
          Big announcement coming — <button type="button" className="ava-teaser-banner__link" onClick={openModal}>join the list</button> to hear it first.
        </p>
        {status === "success" ? (
          <span className="ava-teaser-banner__success">YOU&apos;RE IN.</span>
        ) : (
          <form className="ava-teaser-banner__form" onSubmit={onSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="ava-teaser-banner__input"
              aria-label="Email address"
              disabled={status === "loading"}
            />
            <button type="submit" className="ava-teaser-banner__submit" disabled={status === "loading"}>
              {status === "loading" ? "…" : "Join"}
            </button>
          </form>
        )}
        {error ? <span className="ava-teaser-banner__error">{error}</span> : null}
        <button type="button" className="ava-teaser-banner__dismiss" onClick={dismissBanner} aria-label="Dismiss banner">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
