import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import bts from "@/assets/bts-cameras.jpeg";
import family from "@/assets/family-bw.jpeg";
import roses from "@/assets/roses-sunset.jpg";

export function BehindTheLens() {
  return (
    <section id="about" className="py-24 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[560px]">
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl group">
                <img
                  src={bts}
                  alt="Behind the camera"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] font-mono text-white/70">
                  On Set / Chicago
                </div>
              </div>
              <div className="col-span-2 row-span-3 relative overflow-hidden rounded-2xl group">
                <img
                  src={family}
                  alt="Studio session with family"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>
              <div className="col-span-2 row-span-3 relative overflow-hidden rounded-2xl group">
                <img
                  src={roses}
                  alt="Atmospheric still"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              Behind The Lens
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.05]">
              We don't just shoot. <span className="text-primary">We see.</span>
            </h2>
            <p className="text-white/70 leading-relaxed text-lg mb-6">
              Alpha Visual Artists is a Chicago-rooted production studio with a national footprint. Years on set with major networks like
              <span className="text-white"> OWN, ESPN, HBO Max, and BET</span>, plus countless brand activations, conferences, and live events.
            </p>
            <p className="text-white/60 leading-relaxed mb-10">
              Every frame is a decision. Every cut earns its place. We bring documentary instinct, commercial polish, and a
              creator's eye for what actually moves people.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-black px-8 h-14 text-base font-bold shadow-[0_0_25px_rgba(0,230,255,0.4)] hover:shadow-[0_0_35px_rgba(0,230,255,0.6)] transition-all"
            >
              <a href="https://calendly.com/alphavisualartists/booking" target="_blank" rel="noreferrer">
                Work With Us
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
