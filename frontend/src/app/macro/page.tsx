"use client";

import { Globe } from "lucide-react";
import SearchBar from "@/components/research/SearchBar";

export default function MacroPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="border-b bg-background px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <SearchBar
            onSearch={(query) => {
              // TODO (Phase 3): Wire up macro analysis
              console.log("Macro query:", query);
            }}
            placeholder='Analyze a macro event... e.g. "How will the Venezuela attack by USA affect Indian markets?"'
          />
        </div>
      </div>

      {/* Placeholder content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
        <Globe className="mb-4 h-16 w-16 opacity-20" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Macro Analyzer
        </h2>
        <p className="max-w-md text-sm">
          Enter a geopolitical or macroeconomic event to see how it affects
          Indian markets. The analyzer will build a causal chain from the event
          to specific stock impacts with trade recommendations.
        </p>
        <p className="mt-4 text-xs text-muted-foreground/60">
          Coming in Phase 3
        </p>
      </div>
    </div>
  );
}
