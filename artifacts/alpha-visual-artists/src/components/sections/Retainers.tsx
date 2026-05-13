import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$2,500",
    cadence: "/month",
    description: "For brands and creators ready to show up consistently.",
    features: [
      "4 short-form reels per month",
      "1 round of revisions per edit",
      "Priority scheduling",
      "Monthly content strategy call",
    ],
  },
  {
    name: "Growth",
    price: "$4,800",
    cadence: "/month",
    description: "Built for momentum — more output, deeper creative.",
    features: [
      "8 short-form reels per month",
      "1 long-form / event recap",
      "Trend & hook strategy",
      "Same-week turnaround",
    ],
    featured: true,
  },
  {
    name: "Studio",
    price: "Custom",
    cadence: "",
    description: "Full content engine — campaigns, events, broadcast-grade work.",
    features: [
      "Unlimited briefs",
      "Dedicated production days",
      "Multi-platform delivery",
      "Direct line to creative director",
    ],
  },
];

export function Retainers() {
  return (
    <section id="retainers" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            Monthly Retainers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Tiered <span className="text-primary">Retainers</span>
          </h2>
          <p className="text-white/60">
            Consistent content, predictable budget. Lock in monthly capacity and skip the project-by-project chase.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                tier.featured
                  ? "bg-primary/5 border-primary/40 shadow-[0_0_40px_-10px_rgba(0,230,255,0.4)]"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/50 text-sm">{tier.cadence}</span>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`w-full rounded-full ${
                  tier.featured
                    ? "bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(0,230,255,0.4)]"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer">
                  Start {tier.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
