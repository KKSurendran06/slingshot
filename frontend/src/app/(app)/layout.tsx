"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import { Search, Globe, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Research", href: "/research", icon: Search },
  { label: "Macro", href: "/macro", icon: Globe },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
];

function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
    </div>
  );
}

function URLPill({ pathname }: { pathname: string }) {
  const route = pathname === "/" ? "/research" : pathname;
  return (
    <div className="ml-50 flex items-center justify-center rounded-lg bg-[#0f1115] px-6 py-2 shadow-inner">
      <span className="text-xs text-[#71717a] font-mono tracking-wide">
        slingshot.ai{route}
      </span>
    </div>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/research" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
              isActive
                ? "text-foreground bg-[#20242c]"
                : "text-muted-foreground hover:text-foreground hover:bg-[#20242c]/50"
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="dark bg-[#0f1115]">
      <TooltipProvider>
        {/* Mobile header */}
        <div className="md:hidden">
          <Header />
        </div>

        {/* Full viewport background */}
        <div className="min-h-screen flex items-start justify-center p-4 md:p-6">
          {/* macOS-style floating window */}
          <div className="w-full max-w-[1400px] bg-[#151821] rounded-3xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 48px)' }}>
            {/* Top header bar */}
            <div className="hidden md:flex items-center justify-between h-16 px-6 shrink-0">
              <TrafficLights />
              <URLPill pathname={pathname} />
              <DesktopNav pathname={pathname} />
            </div>

            {/* Main content */}
            <main className="flex-1 min-h-0 overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
