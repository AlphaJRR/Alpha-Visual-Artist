import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ApparelSection } from "@/components/sections/ApparelSection";

export default function Apparel() {
  React.useEffect(() => {
    document.title = "Alpha Apparel Crew & Creative Collection";
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <ApparelSection />
      </main>
      <Footer />
    </div>
  );
}
