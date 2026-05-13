import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const lifestyleImages = [
  {
    src: "https://cdn.shopify.com/s/files/1/0813/1166/2300/files/eden_solo2_79c9e55f-4f71-4396-bc06-e3c7d8b15b2b.jpg?v=1778629300",
    alt: "Eden solo green tee Chicago el tracks",
    label: "Forest Green Tee",
    position: "top" as const,
    objectPosition: "center 40%",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0813/1166/2300/files/ava_ashie_eden_grade1_8bb1ab5a-92df-4e85-83a5-d37a4402a0d8.jpg?v=1778629299",
    alt: "AVA crew laughing blue garage",
    label: "The Crew",
    position: "top" as const,
    objectPosition: "center 30%",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0813/1166/2300/files/SOLO_SIT_KOIBE_WALL_061ff942-5535-46d9-9316-cea0c38ba9da.jpg?v=1778629241",
    alt: "Alpha Crew hoodie PEACE mural",
    label: "Alpha Hoodie",
    position: "top" as const,
    objectPosition: "center 70%",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0813/1166/2300/files/PAPI_W__FOOTBALL_bd7ec3b7-0e3e-4400-b85b-137844bfe637.jpg?v=1778629271",
    alt: "Girl golden hour green AVA tee",
    label: "Golden Hour",
    position: "bottom-left" as const,
    objectPosition: "center 35%",
  },
  {
    src: "https://shopify-staged-uploads.storage.googleapis.com/tmp/81311662300/products/b97df512-2715-414c-bc97-487fb9c370ae/justice_tree_flex.jpg",
    alt: "Justice flexing tree pink tee golden hour",
    label: "Justice",
    position: "bottom-right" as const,
    objectPosition: "center 45%",
  },
];

export default function ApparelSection() {
  return (
    <section className="bg-[#080808] py-20 px-6 md:px-12 border-t border-white/5">
      {/* Cinematic hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-[420px] md:h-[520px] overflow-hidden mb-14 group"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0813/1166/2300/files/hero_banner.jpg?v=1778629213"
          alt="Alpha Visual Artists — Concrete Vision"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-8 md:bottom-10 left-6 md:left-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-light mb-2.5">
            Alpha Visual Artists
          </p>
          <h2 className="font-bold leading-none tracking-tight text-white" style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "-0.02em", fontWeight: 800 }}>
            Crew &amp; Creative
            <br />
            Collection
          </h2>
        </div>
      </motion.div>

      {/* 5-image lifestyle grid: 3 on top, 2 on bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-13" style={{ marginBottom: "52px" }}>
        {lifestyleImages.map((img, i) => {
          const aspectClass = img.position === "top" ? "aspect-[3/4]" : "aspect-[16/9]";
          const colSpanClass =
            img.position === "bottom-right" ? "md:col-span-2" : img.position === "bottom-left" ? "md:col-span-1" : "";
          return (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden cursor-pointer group ${aspectClass} ${colSpanClass}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                style={{ objectPosition: img.objectPosition }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-end p-3.5">
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/0 group-hover:text-white/85 transition-colors duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Copy block + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12"
      >
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-light mb-4">
            Concrete Vision
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/65 font-light">
            Wearable documentation. Shot on location across Chicago — garments built for creators who move through the world with intention.
          </p>
        </div>
        <a
          href="https://shop.alphavisualartists.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 border border-white/25 text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
        >
          Shop the Collection
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
        </a>
      </motion.div>
    </section>
  );
}
