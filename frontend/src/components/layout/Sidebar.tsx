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
    href: "/",
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
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Activity className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight">Slingshot</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <div>
                <div>{item.label}</div>
                <div
                  className={cn(
                    "text-xs",
                    isActive
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground/70"
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
      <div className="border-t border-border p-3">
        <div className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium">Slingshot v0.1</span>
          <br />
          Agentic Research for Indian Markets
        </div>
      </div>
    </aside>
  );
}
