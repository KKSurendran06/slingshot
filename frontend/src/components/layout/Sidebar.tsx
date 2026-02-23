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
    <aside className="hidden md:flex w-60 flex-col border-r border-border bg-background">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Activity className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Slingshot
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/research" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <div className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : ""
                )}>
                  {item.label}
                </div>
                <div className="text-[11px] leading-tight text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <div className="rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/60">Slingshot v0.1</span>
          <br />
          Agentic Research for Indian Markets
        </div>
      </div>
    </aside>
  );
}
