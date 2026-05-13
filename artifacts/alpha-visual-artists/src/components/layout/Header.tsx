import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Show, UserButton } from "@clerk/react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/podcast", label: "Podcast" },
  { href: "/digital-downloads", label: "Downloads" },
  { href: "/apparel", label: "Shop" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo} alt="Alpha Visual Artists" className="h-8 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-white/70 hover:text-primary transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
            >
              Client Login
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/portal"
              className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
            >
              My Portal
            </Link>
            <UserButton />
          </Show>
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(0,230,255,0.6)]"
          >
            <a href="https://cal.com/alphavisualartists/video-call" target="_blank" rel="noreferrer">
              Book a Call
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-3 rounded-lg text-white/80 hover:text-primary hover:bg-white/5 text-base font-medium transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="px-3 py-3 rounded-lg text-white/80 hover:text-primary hover:bg-white/5 text-base font-medium transition-colors"
              >
                Client Login
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/portal"
                className="px-3 py-3 rounded-lg text-white/80 hover:text-primary hover:bg-white/5 text-base font-medium transition-colors"
              >
                My Portal
              </Link>
            </Show>
            <a
              href="https://cal.com/alphavisualartists/video-call"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-black font-semibold uppercase tracking-wider text-sm py-3 shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
