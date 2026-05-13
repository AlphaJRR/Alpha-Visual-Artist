import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-32 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-8">
            Ready to <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Shoot?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
            Let's discuss your next project. Book a discovery call to see if we're the right fit for your brand.
          </p>

          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-black px-12 h-16 text-xl font-bold shadow-[0_0_30px_rgba(0,230,255,0.3)] transition-all hover:shadow-[0_0_50px_rgba(0,230,255,0.5)] hover:scale-105 group">
            <a href="https://calendly.com/alphavisualartists/booking" target="_blank" rel="noreferrer">
              Book a Call 
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
