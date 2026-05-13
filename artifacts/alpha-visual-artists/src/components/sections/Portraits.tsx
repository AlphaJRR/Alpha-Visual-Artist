import React from "react";
import { motion } from "framer-motion";
import p1 from "@/assets/portrait-1.png";
import p2 from "@/assets/portrait-2.png";
import p3 from "@/assets/portrait-3.png";
import p4 from "@/assets/portrait-4.png";

const portraits = [p1, p2, p3, p4];

export function Portraits() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
          The <span className="text-primary">Crew</span>
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          The creative force behind the lens.
        </p>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
        {portraits.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-none w-[80vw] md:w-[350px] aspect-[3/4] relative rounded-2xl overflow-hidden snap-center group"
          >
            <img 
              src={src} 
              alt="Alpha Crew Member" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none group-hover:ring-primary/50 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
