import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StreamEmbed } from "@/components/StreamEmbed";
import { MAMA_CONNIE_HAMPTONS_PT1_ID } from "@/config/streamVideos";
import heroBg from "@/assets/hero-bg.png";

const MAMA_CONNIE_LABEL = "Mama Connie — The Hamptons Pt 1";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      <div className="marketing-wrap relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 uppercase text-center">
              Cinematic <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 drop-shadow-[0_0_15px_rgba(0,230,255,0.5)]"
                style={{
                  WebkitTextStroke: "0.5px rgba(0, 230, 255, 0.25)",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
                }}
              >
                Content That Sells.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mb-8"
          >
            {MAMA_CONNIE_HAMPTONS_PT1_ID ? (
              <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <StreamEmbed
                  videoId={MAMA_CONNIE_HAMPTONS_PT1_ID}
                  label={MAMA_CONNIE_LABEL}
                  autoplay
                  muted
                />
              </div>
            ) : (
              <div
                className="stream-embed stream-embed--placeholder flex items-center justify-center ring-1 ring-white/10 rounded-xl"
                aria-label={`${MAMA_CONNIE_LABEL} — video coming soon`}
              >
                <div className="text-center px-6 py-12">
                  <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">Featured Film</p>
                  <p className="text-xl font-bold text-white mb-2">{MAMA_CONNIE_LABEL}</p>
                  <p className="text-white/50 text-sm">Stream ID pending — JR to provide Cloudflare UID</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="section-lead text-lg md:text-xl text-white/70 mb-10 w-full"
          >
            Inspire. Connect. Create Impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Button asChild size="lg" className="btn-marketing w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(0,230,255,0.6)] hover:scale-105">
              <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer">
                Book a Call
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-marketing btn-marketing--outline w-full sm:w-auto hover:bg-white/5 font-semibold transition-all hover:border-primary/50">
              <a href="/work">
                View Work
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="btn-marketing w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/5 font-semibold group">
              <a href="/work#gallery">
                See more work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-full h-1/2 bg-primary shadow-[0_0_10px_rgba(0,230,255,0.8)]"
          animate={{ y: [0, 64] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
