import React, { useCallback } from "react";
import { BioStreamEmbed } from "@/components/BioStreamEmbed";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./about.css";

const JR_INTV_2 = "c48302f9ae0cff4019c0519aefdd2ea6";
const JR_INTV_3 = "f8927ec99093a48580e3f6213abf8e2a";

function BioSilentPromo({ src, label }: { src: string; label: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.volume = 0;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const onPlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.muted = true;
    e.currentTarget.volume = 0;
    setPlaying(true);
  }, []);

  const onPause = useCallback(() => setPlaying(false), []);

  return (
    <div className="iphone-mockup">
      <button
        type="button"
        className="bio-silent-promo"
        onClick={togglePlay}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        <div className="iphone-mockup__bezel">
          <div className="iphone-mockup__notch" aria-hidden />
          <div className="iphone-mockup__screen">
            <video
              ref={videoRef}
              src={src}
              muted
              playsInline
              preload="metadata"
              aria-hidden
              onPlay={onPlay}
              onPause={onPause}
            />
          </div>
        </div>
        {!playing && (
          <span className="bio-silent-promo__hint">Tap to play</span>
        )}
      </button>
    </div>
  );
}

export default function About() {
  React.useEffect(() => {
    document.title = 'Joshua "JR" Roberts | Alpha Visual Artists';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Joshua 'JR' Roberts — Founder, Cinematographer & Creative Director at Alpha Visual Artists. Chicago-based cinematic media company.",
      );
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 bio-page">
      <img
        src="/assets/bio/page1.png"
        alt="Joshua JR Roberts — Founder, Cinematographer, Photographer, Creative Director, Alpha Visual Artists"
        loading="eager"
      />
      <div
        className="bio-video-row bio-video-row--phones"
        aria-label="JR Roberts photo edit promos"
      >
        <div className="bio-video-block bio-video-block--phone">
          <BioSilentPromo
            src="/assets/bio/jrr-star.mp4"
            label="JR Roberts — creative edits promo"
          />
        </div>
        <div className="bio-video-block bio-video-block--portrait bio-portrait-center">
          <img
            src="/assets/bio/jr-black-portrait.png"
            alt="Joshua JR Roberts — black shirt portrait"
            loading="lazy"
          />
        </div>
        <div className="bio-video-block bio-video-block--phone">
          <BioSilentPromo
            src="/assets/bio/jrr-solo.mp4"
            label="JR Roberts — solo cutouts promo"
          />
        </div>
      </div>
      <img
        src="/assets/bio/page2.png"
        alt="A Visual Storyteller — JR's roots in music and emotion"
        loading="lazy"
      />
      <div
        className="bio-video-row bio-video-row--stream"
        aria-label="JR Roberts interviews"
      >
        <BioStreamEmbed
          videoId={JR_INTV_2}
          label="JR Roberts — interview clip 2"
        />
        <BioStreamEmbed
          videoId={JR_INTV_3}
          label="JR Roberts — interview clip 3"
        />
      </div>
      <img
        src="/assets/bio/page3.png"
        alt="Alpha Visual Artists — Inspire. Connect. Create Impact."
        loading="lazy"
      />
      <img
        src="/assets/bio/page4.png"
        alt="Creative Portfolio Highlights — BET Experience, WayMaker, Love and Marriage"
        loading="lazy"
      />
      <img
        src="/assets/bio/page5.png"
        alt="Impact — JR's creative philosophy"
        loading="lazy"
      />
      <img
        src="/assets/bio/page6.png"
        alt="Let's Create Together — Contact Alpha Visual Artists"
        loading="lazy"
      />
      </main>
      <Footer />
    </div>
  );
}
