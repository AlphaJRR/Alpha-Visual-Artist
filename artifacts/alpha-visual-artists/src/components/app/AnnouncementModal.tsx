import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { joinList } from "@/lib/klaviyo";
import { useTeaser } from "@/context/TeaserContext";
import "@/styles/ava-tokens.css";
import "./teaser.css";

export function AnnouncementModal() {
  const { modalOpen, closeModal, openModal, modalShownThisSession, markModalShown } = useTeaser();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (modalShownThisSession) return;
    const t = window.setTimeout(() => {
      openModal();
      markModalShown();
    }, 4000);
    return () => window.clearTimeout(t);
  }, [modalShownThisSession, openModal, markModalShown]);

  if (!modalOpen) return null;

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
    <div className="ava-announcement-modal" role="dialog" aria-modal="true" aria-labelledby="ava-announcement-title">
      <button type="button" className="ava-announcement-modal__backdrop" onClick={closeModal} aria-label="Close" />
      <div className="ava-announcement-modal__panel">
        <button type="button" className="ava-announcement-modal__close" onClick={closeModal} aria-label="Close">
          <X size={18} />
        </button>
        {status === "success" ? (
          <div className="ava-announcement-modal__success">
            <p className="ava-announcement-modal__eyebrow">Confirmed</p>
            <h2 id="ava-announcement-title">YOU&apos;RE IN.</h2>
            <p className="ava-announcement-modal__lede">We&apos;ll see you Sunday.</p>
          </div>
        ) : (
          <>
            <p className="ava-announcement-modal__eyebrow">SOMETHING IS COMING</p>
            <h2 id="ava-announcement-title">THIS SUNDAY</h2>
            <p className="ava-announcement-modal__lede">
              Be first to know when ALPHA Creators goes live. Drop your email — no spam, just the reveal.
            </p>
            <form className="ava-announcement-modal__form" onSubmit={onSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="ava-announcement-modal__input"
                aria-label="Email address"
                disabled={status === "loading"}
              />
              <button type="submit" className="ava-announcement-modal__submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Join the list"}
              </button>
            </form>
            {error ? <p className="ava-announcement-modal__error">{error}</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
