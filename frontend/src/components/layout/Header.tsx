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
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 md:hidden">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Mobile logo */}
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <span className="text-lg font-bold tracking-tight">Slingshot</span>
      </div>
    </header>
  );
}
