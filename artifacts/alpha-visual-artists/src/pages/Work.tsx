import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { Showreel } from "@/components/sections/Showreel";

function getInitialTab(): "videos" | "gallery" {
  if (typeof window === "undefined") return "videos";
  const hash = window.location.hash.replace("#", "");
  return hash === "gallery" || hash === "photos" ? "gallery" : "videos";
}

export default function Work() {
  const [defaultTab] = useState<"videos" | "gallery">(() => getInitialTab());

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "gallery" || hash === "photos") {
      const el = document.getElementById("work");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-[calc(var(--header-height)+2rem)]">
        <div className="marketing-wrap text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl section-heading"
          >
            <span className="section-eyebrow">Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-white">
              Our <span className="text-primary">Work.</span>
            </h1>
            <p className="section-lead text-white/70 text-lg leading-relaxed">
              Films, recaps, commercials, and short-form content shot across Chicago and beyond.
            </p>
          </motion.div>
        </div>
        <Showreel />
        <WorkGallery defaultTab={defaultTab} />
      </main>
      <Footer />
    </div>
  );
}
