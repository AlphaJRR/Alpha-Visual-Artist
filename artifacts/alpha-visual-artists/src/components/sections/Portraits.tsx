import React from "react";
import { motion } from "framer-motion";
import pRedGloves from "@/assets/portrait-redgloves.jpeg";
import pBodysuit from "@/assets/portrait-bodysuit.jpg";
import pRedLight from "@/assets/portrait-redlight.jpg";
import pFloral from "@/assets/portrait-floral.jpeg";
import pSuit from "@/assets/portrait-suit.jpeg";
import pWhiteDress from "@/assets/portrait-whitedress.jpeg";
import pTriptych from "@/assets/portrait-triptych.jpeg";
import couple from "@/assets/couple-chicago.jpeg";

const portraits = [
  { src: pRedGloves, label: "Editorial" },
  { src: pBodysuit, label: "Studio" },
  { src: pRedLight, label: "Cinematic" },
  { src: pFloral, label: "Headshot" },
  { src: pSuit, label: "Portrait" },
  { src: pWhiteDress, label: "Lifestyle" },
  { src: pTriptych, label: "Editorial" },
  { src: couple, label: "Engagement" },
];

export function Portraits() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
          Portrait <span className="text-primary">Highlights</span>
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Capturing personalities, energy, and the people behind the moments.
        </p>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
        {portraits.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex-none w-[80vw] md:w-[350px] aspect-[3/4] relative rounded-2xl overflow-hidden snap-center group"
          >
            <img
              src={p.src}
              alt={p.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] font-mono text-white/70 group-hover:text-primary transition-colors">
              {p.label}
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none group-hover:ring-primary/50 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
