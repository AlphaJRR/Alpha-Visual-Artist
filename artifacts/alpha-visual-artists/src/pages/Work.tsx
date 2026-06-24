import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { Showreel } from "@/components/sections/Showreel";

export default function Work() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28">
        <div className="marketing-wrap text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              Selected Projects
            </div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-white">
              Our <span className="text-primary">Work.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Films, recaps, commercials, and short-form content shot across Chicago and beyond.
            </p>
          </motion.div>
        </div>
        <Showreel />
        <WorkGallery />
      </main>
      <Footer />
    </div>
  );
}
