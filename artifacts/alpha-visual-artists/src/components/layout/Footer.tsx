import React from "react";
import logo from "@/assets/logo.png";
import { Instagram, Youtube } from "lucide-react";
import { AppDownloadPill } from "@/components/app/AppDownloadPill";

export function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="Alpha Visual Artists" className="h-10 object-contain opacity-80" />
            <p className="text-white/50 text-sm">Based in Chicago — available for travel worldwide</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <AppDownloadPill />
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Alpha Visual Artists. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
