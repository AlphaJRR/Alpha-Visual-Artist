import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ApparelTeaser } from "@/components/sections/ApparelTeaser";
import { Services } from "@/components/sections/Services";
import { Retainers } from "@/components/sections/Retainers";
import { Podcasts } from "@/components/sections/Podcasts";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ApparelTeaser />
        <Podcasts />
        <Services />
        <Retainers />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
