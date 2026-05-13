import React from "react";
import { motion } from "framer-motion";

const networks = ["OWN", "ESPN", "HBO Max", "BET"];

const credits = [
  "National TV network productions",
  "Major sports & entertainment events",
  "Brand activations & launches",
  "Conferences, summits & galas",
];

export function Clients() {
  return (
    <section id="clients" className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,230,255,0.08),transparent_60%)]" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-xs uppercase tracking-widest mb-6">
            Trusted By
          </div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-white">
            Production credits with <span className="text-primary">major networks</span>
          </h2>
          <p className="text-white/60">
            Years of work alongside top-tier television, sports, and entertainment brands — plus a long list of major events and conferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14"
        >
          {networks.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="aspect-[5/2] rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <span className="font-bold text-xl md:text-2xl tracking-[0.2em] text-white/70 group-hover:text-primary transition-colors uppercase" style={{ fontFamily: "Sora, sans-serif" }}>
                {n}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {credits.map((c) => (
            <div
              key={c}
              className="border-l-2 border-primary/60 pl-4 py-2 text-white/80 text-sm md:text-base"
            >
              {c}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
