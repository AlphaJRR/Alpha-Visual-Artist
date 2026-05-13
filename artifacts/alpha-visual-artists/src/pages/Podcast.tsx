import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import btsSet from "@/assets/bts-set.jpeg";
import btsMonitor from "@/assets/bts-monitor.jpeg";
import reneeRose from "@/assets/renee-rose.jpeg";

type Episode = {
  id: string;
  title: string;
  guest: string;
  description: string;
  date: string;
};

type Show = {
  name: string;
  tagline: string;
  episodes: Episode[];
  portrait?: string;
};

const shows: Show[] = [
  {
    name: "DHC LIVE Podcast",
    tagline: "Deep conversations with gospel legends and cultural icons.",
    episodes: [
      {
        id: "-msis1gZNCY",
        title: "Kirk Franklin",
        guest: "Kirk Franklin",
        description: "An intimate conversation with gospel legend Kirk Franklin about faith, music, and legacy.",
        date: "2025-01-15",
      },
      {
        id: "wJdtV15QIAo",
        title: "Laura",
        guest: "Laura",
        description: "A heartfelt conversation about faith and purpose.",
        date: "2025-01-08",
      },
      {
        id: "0iv8ZV9-KyQ",
        title: "Bishop Bloomer",
        guest: "Bishop Bloomer",
        description: "Bishop Bloomer shares wisdom on leadership and spiritual growth.",
        date: "2024-12-20",
      },
      {
        id: "IQaM-mZoSA8",
        title: "Travis Malloy",
        guest: "Travis Malloy",
        description: "Travis Malloy on music, ministry, and making an impact.",
        date: "2024-12-10",
      },
    ],
  },
  {
    name: "Second Half Podcast",
    tagline: "Inspiring stories from leaders who are thriving in their second act.",
    episodes: [
      {
        id: "lS9lIszsavo",
        title: "Arne Duncan",
        guest: "Arne Duncan",
        description: "Former U.S. Secretary of Education Arne Duncan on leadership, education reform, and making an impact.",
        date: "2025-01-10",
      },
      {
        id: "q1W0iBBpXDY",
        title: "Jason Wright",
        guest: "Jason Wright",
        description: "NFL team president Jason Wright on breaking barriers and building winning cultures.",
        date: "2024-12-15",
      },
      {
        id: "fWm9G0Sqmio",
        title: "Rob 'Scoop' Jackson",
        guest: "Rob 'Scoop' Jackson",
        description: "Legendary sports journalist Scoop Jackson on storytelling, culture, and the power of words.",
        date: "2024-11-20",
      },
    ],
  },
  {
    name: "Business Breakthrough with Renee Rose",
    tagline: "Empowering entrepreneurs with expert advice and actionable strategies for growth.",
    portrait: reneeRose,
    episodes: [
      {
        id: "T8vl7oT2b08",
        title: "Business Breakthrough Episode",
        guest: "Renee Rose",
        description: "Renee Rose shares powerful insights on building and scaling your business.",
        date: "2025-01-20",
      },
      {
        id: "ZXI4VukWAGY",
        title: "Week 3: Profits",
        guest: "Renee Rose",
        description: "Proven strategies for entrepreneurial success and overcoming challenges.",
        date: "2025-01-12",
      },
      {
        id: "waqL905i8k4",
        title: "Week 2: Policies & Procedures",
        guest: "Renee Rose",
        description: "How to build a memorable brand that connects with your audience.",
        date: "2025-01-05",
      },
      {
        id: "wLYhOvOMgn4",
        title: "Week 1: Establishment",
        guest: "Renee Rose",
        description: "Lay the foundation for a business built to last.",
        date: "2024-12-28",
      },
    ],
  },
];

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Podcast() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              Now Streaming
            </div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-white">
              Pod<span className="text-primary">casts.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Conversations and insights with industry leaders, cultural icons, and visionaries shaping what comes next.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20"
          >
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <img src={btsSet} alt="On set with talent" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] font-mono text-white/80">On Set</div>
            </div>
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <img src={btsMonitor} alt="Behind the monitor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] font-mono text-white/80">Through The Lens</div>
            </div>
          </motion.div>

          <div className="space-y-24">
            {shows.map((show, si) => (
              <motion.section
                key={show.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-10 flex items-start gap-6">
                  {show.portrait && (
                    <div className="hidden md:block flex-shrink-0 w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary/30">
                      <img src={show.portrait} alt={show.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="max-w-2xl">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono mb-3">Show {String(si + 1).padStart(2, "0")}</div>
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-3">{show.name}</h2>
                    <p className="text-white/65 text-lg">{show.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {show.episodes.map((ep, ei) => (
                    <motion.div
                      key={ep.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: ei * 0.05 }}
                      className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-all duration-300 group"
                    >
                      <div className="aspect-video bg-black relative overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${ep.id}`}
                          title={ep.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.25em] font-mono">
                          <span className="text-primary">Episode</span>
                          <span className="text-white/40">{formatDate(ep.date)}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{ep.title}</h3>
                        <p className="text-white/65 text-sm leading-relaxed">{ep.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
