import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./about.css";

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
      <img
        src="/assets/bio/page2.png"
        alt="A Visual Storyteller — JR's roots in music and emotion"
        loading="lazy"
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
