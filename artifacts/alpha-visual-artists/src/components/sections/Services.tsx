import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Video, Film } from "lucide-react";

const services = [
  {
    title: "Short-Form Reels",
    price: "Starting at $2,500",
    description: "High-energy vertical video optimized for Instagram Reels, TikTok, and YouTube Shorts. We build content that stops the scroll.",
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    features: ["Trend-driven editing", "Platform-native hooks", "Rapid turnaround", "Custom motion graphics"]
  },
  {
    title: "Events & Live Coverage",
    price: "Starting at $3,500",
    description: "Cinematic recaps of launches, concerts, and corporate events. We don't just document; we capture the energy of the room.",
    icon: <Video className="w-8 h-8 text-primary" />,
    features: ["Multi-cam setups", "Same-day/Next-day edits", "Audio & lighting support", "Highlight reels"]
  },
  {
    title: "Commercials & Brand Films",
    price: "Custom Quotes",
    description: "Premium horizontal content for websites, YouTube, and ad campaigns. Narrative-driven storytelling with cinema-grade production.",
    icon: <Film className="w-8 h-8 text-primary" />,
    features: ["Creative direction", "Full crew & casting", "Color grading & sound design", "Broadcast ready"]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            From quick-hit social content to full-scale commercial productions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center border border-white/10 mb-8 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,230,255,0.2)] transition-all">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
              <div className="text-primary font-mono text-sm mb-6">{service.price}</div>
              <p className="text-white/60 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shadow-[0_0_5px_rgba(0,230,255,0.8)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
