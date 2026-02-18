"use client";

import { useCallback } from "react";
import SearchBar from "@/components/research/SearchBar";
import ThoughtLog from "@/components/research/ThoughtLog";
import MacroReport from "@/components/macro/MacroReport";
import { useMacroStore } from "@/stores/macro";
import { simulateStream } from "@/lib/demoUtils";
import {
  macroThoughts,
  macroCausalChain,
  macroCompanies,
  macroTradeIdeas,
  macroCitations,
  macroExecutiveSummary,
  macroFullReport,
} from "@/lib/demoData/macroDemo";

export default function MacroPage() {
  const macro = useMacroStore();

  const handleSearch = useCallback(
    (query: string) => {
      macro.reset();
      macro.setQuery(query);
      macro.setLoading(true);

      // Phase 1: Stream thought steps
      simulateStream(
        macroThoughts,
        (thought) => {
          macro.addThought(thought);
          macro.setCurrentStatus(
            thought.step_type as "planning" | "researching" | "analyzing" | "reflecting" | "reporting"
          );
        },
        () => {
          // Phase 2: Reveal visual widgets with slight delays
          setTimeout(() => {
            macro.setCausalChain(macroCausalChain);
          }, 300);

          setTimeout(() => {
            macro.setCompanies(macroCompanies);
          }, 800);

          setTimeout(() => {
            macro.setTradeIdeas(macroTradeIdeas);
          }, 1200);

          // Phase 3: Reveal written report
          setTimeout(() => {
            macro.setReport(
              macroExecutiveSummary,
              macroFullReport,
              macroCitations
            );
            macro.setLoading(false);
          }, 1600);
        },
        800
      );
    },
    [macro]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="border-b bg-background px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <SearchBar
            onSearch={handleSearch}
            isLoading={macro.isLoading}
            placeholder='Analyze a macro event... e.g. "How will US sanctions on Russia affect Indian markets?"'
          />
        </div>
      </div>

      {/* Content area: Thought Log + Report */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Thought Log — left panel */}
        <div className="lg:col-span-2 border-r overflow-hidden p-4">
          <ThoughtLog
            thoughts={macro.thoughts}
            status={macro.currentStatus}
          />
        </div>

        {/* Macro Report — right panel */}
        <div className="lg:col-span-3 overflow-auto p-6">
          <MacroReport
            causalChain={macro.causalChain}
            companies={macro.companies}
            tradeIdeas={macro.tradeIdeas}
            executiveSummary={macro.executiveSummary}
            fullReport={macro.fullReport}
            citations={macro.citations}
          />
        </div>
      </div>
    </div>
  );
}
