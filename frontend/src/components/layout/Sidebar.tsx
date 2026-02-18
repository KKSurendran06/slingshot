"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Globe,
  Briefcase,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Deep Research",
    href: "/research",
    icon: Search,
    description: "Analyze stocks in depth",
  },
  {
    label: "Macro Analyzer",
    href: "/macro",
    icon: Globe,
    description: "Geopolitical impact analysis",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: Briefcase,
    description: "Portfolio audit & stress test",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-white/[0.06] bg-white/[0.02]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
          <Activity className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-white/90">
          Slingshot
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/research" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-white shadow-[0_0_20px_rgba(167,139,250,0.06)]"
                  : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-violet-500/15 text-violet-400"
                    : "bg-white/[0.04] text-white/30"
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <div className={isActive ? "text-white" : ""}>{item.label}</div>
                <div
                  className={cn(
                    "text-[11px] leading-tight",
                    isActive ? "text-white/40" : "text-white/20"
                  )}
                >
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2.5 text-xs text-white/25">
          <span className="font-medium text-white/40">Slingshot v0.1</span>
          <br />
          Agentic Research for Indian Markets
        </div>
      </div>
    </aside>
  );
}
