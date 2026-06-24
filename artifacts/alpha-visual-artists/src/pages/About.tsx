import React, { useCallback } from "react";
import { BioStreamEmbed } from "@/components/BioStreamEmbed";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./about.css";

const JR_INTV_2 = "c48302f9ae0cff4019c0519aefdd2ea6";
const JR_INTV_3 = "f8927ec99093a48580e3f6213abf8e2a";

function BioVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const enforceMuted = useCallback((el: HTMLVideoElement | null) => {
    if (el) el.muted = true;
  }, []);

  const onVideoEvent = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.muted = true;
    e.currentTarget.volume = 0;
  }, []);

  return (
    <video
      ref={enforceMuted}
      src={src}
      controls
      muted
      defaultMuted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      onPlay={onVideoEvent}
      onVolumeChange={onVideoEvent}
    />
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
      <div className="bio-video-block" aria-label="JR Roberts creative edits promo">
        <BioVideo
          src="/assets/bio/jrr-star.mp4"
          poster="/assets/bio/page1.png"
          label="JR Roberts — creative edits promo"
        />
      </div>
      <img
        src="/assets/bio/page2.png"
        alt="A Visual Storyteller — JR's roots in music and emotion"
        loading="lazy"
      />
      <BioStreamEmbed
        videoId={JR_INTV_2}
        label="JR Roberts — interview clip 2"
      />
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
      <div className="bio-video-block" aria-label="JR Roberts solo cutouts promo">
        <BioVideo
          src="/assets/bio/jrr-solo.mp4"
          poster="/assets/bio/page5.png"
          label="JR Roberts — solo cutouts promo"
        />
      </div>
      <BioStreamEmbed
        videoId={JR_INTV_3}
        label="JR Roberts — interview clip 3"
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
