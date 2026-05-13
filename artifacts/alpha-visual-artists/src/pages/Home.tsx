import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { Services } from "@/components/sections/Services";
import { Podcasts } from "@/components/sections/Podcasts";
import { Portraits } from "@/components/sections/Portraits";
import { Merch } from "@/components/sections/Merch";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Showreel />
        <WorkGallery />
        <Services />
        <Podcasts />
        <Portraits />
        <Merch />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
