import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 uppercase">
            Cinematic <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 drop-shadow-[0_0_15px_rgba(0,230,255,0.5)]">
              Content That Sells.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          Short-form content, commercials, and event coverage designed to stop the scroll and convert. Based in Chicago — available worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-black px-8 h-14 text-lg font-semibold shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(0,230,255,0.6)] hover:scale-105">
            <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer">
              Book a Call
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-white/20 hover:bg-white/5 px-8 h-14 text-lg font-semibold transition-all hover:border-primary/50">
            <a href="/work">
              View Work
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
