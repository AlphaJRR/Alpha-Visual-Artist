import React from "react";
import { Link } from "wouter";
import teaserImage from "@/assets/ava-tee-trees.jpg";
import { ArrowRight } from "lucide-react";

export function ApparelTeaser() {
  return (
    <section className="relative overflow-hidden bg-background border-t border-white/5">
      <div className="relative grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative h-[55vh] md:h-auto overflow-hidden">
          <img
            src={teaserImage}
            alt="Alpha Crew Collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 md:to-background" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        </div>

        <div className="relative flex items-center justify-center px-6 md:px-16 py-16 md:py-24">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-widest mb-6">
              New Drop
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05] mb-6">
              The Apparel Collection is{" "}
              <span className="text-primary">Now Available</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
              Built for the crew, the creators, and everyone behind the lens.
              Limited run, premium fabric, signature Alpha details.
            </p>
            <Link
              href="/apparel"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-black font-semibold uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
