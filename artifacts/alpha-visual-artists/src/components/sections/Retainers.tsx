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
      <div className="marketing-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-16 max-w-2xl mx-auto"
        >
          <span className="section-eyebrow">Monthly Retainers</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Production <span className="text-primary">Retainers</span>
          </h2>
          <p className="section-lead text-white/60">
            Consistent content, predictable budget. Lock in monthly capacity and skip chasing projects one at a time.
          </p>
        </motion.div>

        <div className="pricing-cards">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`pricing-card relative p-8 transition-all duration-300 marketing-card ${
                tier.featured
                  ? "marketing-card--featured bg-primary/5"
                  : "bg-white/5 hover:border-white/20"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <div className="flex items-baseline gap-1 min-h-[2.75rem]">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/50 text-sm">{tier.cadence}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{tier.description}</p>
              <ul className="pricing-card__features space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className={`pricing-card__cta btn-marketing w-full font-semibold ${
                  tier.featured
                    ? "bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(0,230,255,0.4)]"
                    : "bg-white/10 hover:bg-white/20 text-white border-2 border-white/20"
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
