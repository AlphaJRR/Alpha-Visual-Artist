import React from "react";
import { motion } from "framer-motion";

export function Showreel() {
  return (
    <section id="showreel" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            The <span className="text-primary">Showreel</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            A glimpse into the cinematic worlds we've built.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,230,255,0.1)] ring-1 ring-white/10 aspect-video relative"
        >
          <iframe 
            src="https://www.youtube.com/embed/Lck1ly1VX8Y?autoplay=0&rel=0&modestbranding=1" 
            title="Alpha Visual Artists Showreel"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
