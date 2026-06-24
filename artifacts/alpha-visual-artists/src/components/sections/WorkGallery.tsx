import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const works = [
  { id: "z8KhuI-PJ1A", title: "BIG DREAMS Take Time", category: "Featured Work", featured: true },
  { id: "SfcrH9vAKl4", title: "BET LIVE RECAP 2025", category: "Events" },
  { id: "UPbCsfAojts", title: "BET Anniversary Dinner Recap", category: "Events" },
  { id: "fj_QuQBB_EU", title: "A Winter Night Downtown Chicago", category: "Short-Form" },
  { id: "PH0hlbI9ML0", title: "Steezy Press Kit 2025", category: "Commercials" },
  { id: "pBN54Toj2Jg", title: "MBK Alliance Chicago 2025 Recap", category: "Events" },
  { id: "mlimVQOtW2I", title: "Triple Crown Ribbon Cutting Ceremony 2025", category: "Commercials" },
  { id: "mRrkokMD8Xc", title: "Waymaker Recap Video 2024", category: "Events" },
];

export function WorkGallery() {
  const featured = works[0];
  const gridWorks = works.slice(1);

  return (
    <section id="work" className="py-24 bg-background relative border-t border-white/5">
      <div className="marketing-wrap">
        <div className="mb-16 text-center">
          <div className="mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Selected <span className="text-primary">Work</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              From high-energy vertical shorts to premium cinematic commercials.
            </p>
          </div>
        </div>

        {/* Featured Video */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 group cursor-pointer"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_rgba(0,230,255,0.2)]">
            <img 
              src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`} 
              alt={featured.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 text-primary shadow-[0_0_30px_rgba(0,230,255,0.5)]">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-primary font-mono text-sm uppercase tracking-widest mb-2">{featured.category}</div>
              <h3 className="text-3xl font-bold text-white">{featured.title}</h3>
            </div>
            <a href={`https://youtube.com/watch?v=${featured.id}`} target="_blank" rel="noreferrer" className="absolute inset-0 z-10">
              <span className="sr-only">Watch {featured.title}</span>
            </a>
          </div>
        </motion.div>

        {/* Grid Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridWorks.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10 group-hover:ring-primary/30 transition-all duration-500 mb-4">
                <img 
                  src={`https://img.youtube.com/vi/${work.id}/maxresdefault.jpg`} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/50 text-primary shadow-[0_0_20px_rgba(0,230,255,0.4)]">
                    <Play className="w-5 h-5 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="text-primary/80 font-mono text-[10px] uppercase tracking-widest mb-1">{work.category}</div>
                </div>
                <a href={`https://youtube.com/watch?v=${work.id}`} target="_blank" rel="noreferrer" className="absolute inset-0 z-10">
                  <span className="sr-only">Watch {work.title}</span>
                </a>
              </div>
              <h4 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">{work.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
