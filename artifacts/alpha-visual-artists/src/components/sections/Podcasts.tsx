import React from "react";
import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";
import { StreamEmbed } from "@/components/StreamEmbed";
import { PodcastCoverCarousel } from "@/components/PodcastCoverCarousel";
import { DHC_LIVE_KIRK_FRANKLIN_ID } from "@/config/streamVideos";

const DHC_LIVE_LABEL =
  "DHC LIVE! Hosted By Dr. Holly Carter (Kirk Franklin Ep)";

export function Podcasts() {
  return (
    <section id="podcasts" className="py-24 bg-background relative overflow-hidden border-t border-white/5">
      <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="marketing-wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              <Mic2 className="w-3 h-3" />
              Original Productions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
              Culture-Shaping <br />
              <span className="text-white/50 text-3xl md:text-4xl">Conversations</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              We produce high-fidelity podcast experiences that capture the authenticity of cultural icons and leaders. Multi-camera setups, pristine audio, and cinematic lighting tailored for YouTube and Spotify.
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold text-white mb-1">DHC LIVE</h4>
                <p className="text-white/50 text-sm">Featuring Kirk Franklin</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold text-white mb-1">Second Half Podcast</h4>
                <p className="text-white/50 text-sm">Featuring Arne Duncan</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                <h4 className="text-xl font-bold text-white mb-1">Business Breakthrough</h4>
                <p className="text-primary text-sm font-medium">With Renee Rose — Coming Soon</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
              <div className="px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <div className="text-primary font-mono text-[10px] uppercase tracking-widest mb-1">On Air</div>
                <div className="text-lg font-bold text-white leading-snug">{DHC_LIVE_LABEL}</div>
              </div>
              <StreamEmbed
                videoId={DHC_LIVE_KIRK_FRANKLIN_ID}
                label={DHC_LIVE_LABEL}
                className="rounded-none ring-0"
              />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-white/50 mb-3">
                Show Covers
              </div>
              <PodcastCoverCarousel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
