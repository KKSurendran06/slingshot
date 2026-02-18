"use client";

import { Activity } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-white/30" />
            <span className="text-sm font-semibold text-white/50 tracking-tight">
              Slingshot
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {["Research", "Macro", "Portfolio"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-xs text-white/25 hover:text-white/50 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Tagline */}
          <p className="text-xs text-white/20 font-light">
            Built for Indian Markets
          </p>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} Slingshot. Agentic research for the modern investor.
          </p>
        </div>
      </div>
    </footer>
  );
}
