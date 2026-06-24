import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { workVideos, workPhotos } from "@/data/workContent";

type WorkGalleryProps = {
  defaultTab?: "videos" | "gallery";
};

export function WorkGallery({ defaultTab = "videos" }: WorkGalleryProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "gallery">(defaultTab);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "gallery" || hash === "photos") {
        setActiveTab("gallery");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const featured = workVideos[0];
  const gridWorks = workVideos.slice(1);

  return (
    <section id="work" className="py-24 bg-background relative border-t border-white/5">
      <div className="marketing-wrap">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
            Our <span className="text-primary">Work</span>
          </h2>

          <div className="inline-flex rounded-full bg-white/5 border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === "videos"
                  ? "bg-primary text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Videos
            </button>
            <button
              type="button"
              id="gallery"
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === "gallery"
                  ? "bg-primary text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Gallery
            </button>
          </div>
        </div>

        {activeTab === "videos" ? (
          <>
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
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {workPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-primary/40 transition-all"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="text-primary font-mono text-[9px] uppercase tracking-widest">{photo.category}</span>
                  <p className="text-white text-xs mt-1 line-clamp-2">{photo.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
