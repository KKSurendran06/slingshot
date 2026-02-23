"use client";

import { Activity } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Slingshot
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {["Research", "Macro", "Portfolio"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground font-light">
            Built for Indian Markets
          </p>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Slingshot. Agentic research for the modern investor.
          </p>
        </div>
      </div>
    </footer>
  );
}
