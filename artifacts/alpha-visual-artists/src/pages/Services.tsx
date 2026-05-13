import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Smartphone, Video, Film, Camera, Check, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Social Media Short Form",
    blurb:
      "High-retention vertical video for TikTok, Reels, and Shorts. We handle everything from scripting to editing, designed to maximize reach and engagement.",
    icon: <Smartphone className="w-7 h-7 text-primary" />,
    deliverables: [
      "Scripting & Concept Strategy",
      "4K Vertical Shooting",
      "Dynamic Editing & Captions",
      "Trending Audio Selection",
      "Platform Optimization",
    ],
    turnaround:
      "Every project is unique, but we typically estimate 4 weeks until your first draft and about 8 weeks until your final video. Final turnaround timelines are confirmed during your first production call.",
    investment: "$2,500 – $5,000+",
    why: "Consistency is key. Our short-form packages ensure you stay top-of-mind with high-quality content delivered weekly.",
    cta: "Start Your Growth",
  },
  {
    title: "Events",
    blurb:
      "Capture the energy of your live events. We provide cinematic recaps and full-length documentation for corporate summits, concerts, and brand activations.",
    icon: <Video className="w-7 h-7 text-primary" />,
    deliverables: [
      "Multi-Camera Setup",
      "Same-Day Edit Options",
      "Highlight Reel (60–90s)",
      "Full Keynote/Panel Recording",
      "Social Teasers (15s)",
    ],
    turnaround:
      "Every project is unique, but we typically estimate 4 weeks until your first draft and about 8 weeks until your final video. Final turnaround timelines are confirmed during your first production call.",
    investment: "$3,500 – $5,500",
    why: "Don't let the moment fade. Extend the life of your event with high-energy recap videos that build FOMO for next year.",
    cta: "Book Event Dates",
  },
  {
    title: "Commercial / Brand Video",
    blurb:
      "Premium horizontal content that tells your story. High-end production value for website heroes, YouTube channels, and paid ad campaigns.",
    icon: <Film className="w-7 h-7 text-primary" />,
    deliverables: [
      "Creative Direction & Storyboarding",
      "Professional Lighting & Audio",
      "Cinema-Grade 6K Cameras",
      "Color Grading & Sound Design",
      "Multiple Aspect Ratios",
    ],
    turnaround: "Commercial projects typically have an 8-week turnaround from production to final delivery.",
    investment: "Starting at $5,000",
    why: "First impressions matter. A premium brand film establishes credibility and emotional connection instantly.",
    cta: "Get a Quote",
  },
  {
    title: "Photography",
    blurb:
      "Professional still photography for portraits, events, and brand assets. Crisp, high-resolution images that capture the perfect moment.",
    icon: <Camera className="w-7 h-7 text-primary" />,
    deliverables: [
      "Professional Lighting",
      "High-Res Retouched Images",
      "Online Gallery Delivery",
      "Print Rights",
      "Multiple Looks",
    ],
    turnaround: "Photo projects typically have a 3–4 week turnaround depending on scope and volume.",
    investment: "Starting at $750",
    why: "Great photography elevates your entire brand presence immediately. Essential for professional lookbooks and press kits.",
    cta: "Book a Session",
  },
];

export default function Services() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              Our Services
            </div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-white">
              Built to <span className="text-primary">Convert.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              End-to-end video production tailored for the modern digital landscape — from viral short-form clips to cinematic brand films.
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((s, i) => (
              <motion.section
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(0,230,255,0.4)]">
                    {s.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">{s.title}</h2>
                  <p className="text-white/70 leading-relaxed mb-8">{s.blurb}</p>

                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-mono mb-4">Deliverables Include</h3>
                  <ul className="space-y-2.5 mb-8">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-white/85">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 mb-6">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono mb-2">Turnaround</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{s.turnaround}</p>
                  </div>

                  <div className="rounded-2xl bg-primary/5 border border-primary/30 p-6 mb-8">
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-primary font-mono mb-2">Investment</h4>
                    <p className="text-2xl font-bold text-white">{s.investment}</p>
                  </div>
                </div>

                <div className="lg:sticky lg:top-32">
                  <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-white/5 to-transparent border border-white/10 p-10 h-full">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono mb-6">Why Choose This?</div>
                    <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-10" style={{ fontFamily: "Sora, sans-serif" }}>
                      {s.why}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-black px-8 h-14 text-base font-bold shadow-[0_0_30px_rgba(0,230,255,0.4)] hover:shadow-[0_0_40px_rgba(0,230,255,0.6)] transition-all"
                    >
                      <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                        {s.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center rounded-3xl border border-white/10 bg-black p-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-white">
              Not sure what you <span className="text-primary">need?</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Every brand is different. Let's hop on a quick call to figure out the best content strategy for your goals.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-black px-10 h-14 text-base font-bold shadow-[0_0_30px_rgba(0,230,255,0.4)]"
            >
              <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer">
                Get a Free Consultation
              </a>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
