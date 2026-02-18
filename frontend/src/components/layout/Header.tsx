"use client";

import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-white/[0.06] bg-[#0a0a0b] px-4 md:hidden">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white/80 hover:bg-white/[0.06]">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[#0a0a0b] border-white/[0.06]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Mobile logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
          <Activity className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-white/90">
          Slingshot
        </span>
      </div>
    </header>
  );
}
