import React from "react";
import { Link } from "wouter";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo} alt="Alpha Visual Artists" className="h-8 object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#work" className="text-white/70 hover:text-primary transition-colors">Work</a>
          <a href="#services" className="text-white/70 hover:text-primary transition-colors">Services</a>
          <a href="#podcasts" className="text-white/70 hover:text-primary transition-colors">Podcasts</a>
          <a href="#merch" className="text-white/70 hover:text-primary transition-colors">Shop the Collection</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(0,230,255,0.6)]">
            <a href="https://calendly.com/alphavisualartists/booking" target="_blank" rel="noreferrer">
              Book a Call
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
