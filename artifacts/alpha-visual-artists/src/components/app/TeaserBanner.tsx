import { useTeaser } from "@/context/TeaserContext";
import { APP_LAUNCH_LIVE } from "@/config/app";
import "@/styles/ava-tokens.css";
import "./teaser.css";

export function TeaserBanner() {
  const { bannerDismissed, dismissBanner, openModal } = useTeaser();

  if (APP_LAUNCH_LIVE || bannerDismissed) return null;

  return (
    <div id="ava-banner" className="ava-teaser-banner" role="region" aria-label="Launch announcement teaser">
      <div className="spec-line" aria-hidden />
      <div className="bin">
        <span className="dot" aria-hidden />
        <span className="msg">
          <b>COMING SOON!</b>
          &nbsp;Be the first to see it.
        </span>
        <button type="button" className="blink" onClick={openModal}>
          Join the list →
        </button>
        <button type="button" className="x" aria-label="Dismiss" onClick={dismissBanner}>
          ×
        </button>
      </div>
    </div>
  );
}
