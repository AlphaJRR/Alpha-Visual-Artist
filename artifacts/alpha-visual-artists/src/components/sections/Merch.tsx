import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import merchBg from "@/assets/silhouette-spotlight.jpg";
import { ShoppingBag } from "lucide-react";

export function Merch() {
  return (
    <section id="merch" className="py-24 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl overflow-hidden relative">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={merchBg} 
              alt="Alpha Crew Merch" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 p-12 md:p-20 lg:p-24 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-widest mb-6">
                <ShoppingBag className="w-3 h-3" />
                Apparel
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6 text-white">
                Alpha <br />
                <span className="text-primary">Crew</span>
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Premium streetwear designed for creatives. Dark aesthetics, cinematic cuts, built for the set.
              </p>
              
              <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-8 h-14 text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
                <a href="#contact">
                  Coming Soon
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
