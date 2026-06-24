import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WorkGalleryCarousel } from "@/components/WorkGalleryCarousel";
import { workPhotoHighlights } from "@/data/workContent";

export function WorkHighlights() {
  return (
    <section id="work-highlights" className="py-24 bg-black relative border-t border-white/5">
      <div className="marketing-wrap">
        <div className="mb-12 section-heading">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-primary">Work</span>
          </h2>
          <p className="section-lead text-white/60">
            A glimpse at the photography and films we deliver for brands, events, and creators.
          </p>
        </div>

        <WorkGalleryCarousel />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {workPhotoHighlights.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-primary/40 transition-all"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary/90 font-mono text-[9px] uppercase tracking-widest">
                  {photo.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-marketing btn-marketing--outline border-white/20 hover:bg-white/5 font-semibold transition-all hover:border-primary/50 group"
          >
            <a href="/work#gallery">
              View Gallery
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
