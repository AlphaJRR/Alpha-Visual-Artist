import { useEffect, useRef, useState } from "react";
import { joinList } from "@/lib/klaviyo";
import { useTeaser } from "@/context/TeaserContext";
import { APP_LAUNCH_LIVE } from "@/config/app";
import logo from "@/assets/logo.png";
import "@/styles/ava-tokens.css";
import "./teaser.css";

export function AnnouncementModal() {
  const { modalOpen, closeModal, openModal, modalShownThisSession, markModalShown } = useTeaser();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (APP_LAUNCH_LIVE || modalShownThisSession) return;
    const timer = window.setTimeout(() => {
      openModal();
      markModalShown();
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [modalShownThisSession, openModal, markModalShown]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen) return;
    const timer = window.setTimeout(() => emailRef.current?.focus(), 300);
    return () => window.clearTimeout(timer);
  }, [modalOpen]);

  if (APP_LAUNCH_LIVE || !modalOpen) return null;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      emailRef.current?.focus();
      return;
    }

    setStatus("loading");
    const result = await joinList(trimmed);
    if (result.ok) {
      setStatus("success");
      return;
    }
    setStatus("error");
    setError(result.message);
  };

  return (
    <div
      id="ava-modal"
      className="ava-announcement-modal open"
      role="dialog"
      aria-modal="true"
      aria-label="Announcement signup"
    >
      <div className="reveal">
        <div className="halo" aria-hidden />
        <button type="button" className="close-x" aria-label="Close" onClick={closeModal}>
          ×
        </button>
        <img src={logo} alt="" className="iris" aria-hidden />
        <span className="eyebrow">Alpha Visual Artists</span>

        {status === "success" ? (
          <div className="success show">
            <h2>YOU&apos;RE IN.</h2>
            <div className="chk">✓</div>
            <p>You&apos;re on the list. Watch your inbox Sunday — you&apos;ll see it before anyone.</p>
          </div>
        ) : (
          <div id="ava-form-wrap">
            <h2>
              SOMETHING
              <br />
              IS COMING.
            </h2>
            <div className="when">— COMING SOON —</div>
            <p>A new chapter for AVA. Be the first to see it the moment it drops.</p>
            <form className="form" onSubmit={onSubmit}>
              <input
                ref={emailRef}
                id="ava-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "…" : "Notify me"}
              </button>
            </form>
            {error ? <p className="ava-announcement-modal__error">{error}</p> : null}
            <div className="note">No spam. One reveal. You&apos;ll know first.</div>
          </div>
        )}
      </div>
    </div>
  );
}
