import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Palette, Layers, SlidersHorizontal, FileText } from "lucide-react";

type Product = {
  title: string;
  description: string;
  price: string;
  status: "Coming Soon" | "Available";
};

type Category = {
  name: string;
  blurb: string;
  icon: React.ReactNode;
  products: Product[];
};

const categories: Category[] = [
  {
    name: "LUT Packs",
    blurb: "Professional color grading LUTs for cinematic looks.",
    icon: <Palette className="w-6 h-6 text-primary" />,
    products: [
      {
        title: "Cinematic LUT Pack Vol. 1",
        description: "10 high-quality LUTs for Log footage. Get that film look instantly.",
        price: "$25.00",
        status: "Coming Soon",
      },
    ],
  },
  {
    name: "Video Templates",
    blurb: "Ready-to-use templates for social media and branded content.",
    icon: <Layers className="w-6 h-6 text-primary" />,
    products: [
      {
        title: "Social Media Overlay Pack",
        description: "Clean, modern overlays for Reels and TikTok. Drag and drop assets.",
        price: "$15.00",
        status: "Coming Soon",
      },
    ],
  },
  {
    name: "Preset Bundles",
    blurb: "Editing presets for Premiere Pro and DaVinci Resolve.",
    icon: <SlidersHorizontal className="w-6 h-6 text-primary" />,
    products: [],
  },
  {
    name: "Business Tools",
    blurb: "Templates and resources for creative professionals.",
    icon: <FileText className="w-6 h-6 text-primary" />,
    products: [
      {
        title: "Production Contract Template",
        description: "Professional service agreement template for videographers.",
        price: "$45.00",
        status: "Coming Soon",
      },
    ],
  },
];

export default function DigitalDownloads() {
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
              Creator Shop
            </div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-white">
              Digital <span className="text-primary">Downloads.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Enhance your workflow with our signature LUT packs, templates, presets, and creative assets.
            </p>
          </motion.div>

          <div className="space-y-16">
            {categories.map((cat, ci) => (
              <motion.section
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">{cat.name}</h2>
                    <p className="text-white/55 text-sm">{cat.blurb}</p>
                  </div>
                </div>

                {cat.products.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center text-white/50 italic">
                    Coming soon...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cat.products.map((p, pi) => (
                      <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: pi * 0.08 }}
                        className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-primary/40 hover:bg-white/[0.05] transition-all group"
                      >
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                        <p className="text-white/65 text-sm leading-relaxed mb-6 min-h-[3rem]">{p.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-2xl font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                            {p.price}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/60">
                            {p.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center text-white/40 text-sm font-mono uppercase tracking-[0.2em]"
          >
            You'll be redirected to our secure payment portal for all purchases.
          </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
