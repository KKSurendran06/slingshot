"use client";

import { useCallback } from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThoughtLog from "@/components/research/ThoughtLog";
import PortfolioReport from "@/components/portfolio/PortfolioReport";
import { usePortfolioStore } from "@/stores/portfolio";
import { simulateStream } from "@/lib/demoUtils";
import {
  portfolioThoughts,
  demoPortfolio,
  demoMetrics,
  demoSectorAllocation,
  demoStressTests,
  portfolioCitations,
  portfolioExecutiveSummary,
  portfolioFullReport,
} from "@/lib/demoData/portfolioDemo";

export default function PortfolioPage() {
  const portfolio = usePortfolioStore();

  const handleAnalyze = useCallback(() => {
    portfolio.reset();
    portfolio.setLoading(true);
    portfolio.setPortfolio(demoPortfolio);

    // Phase 1: Stream thought steps
    simulateStream(
      portfolioThoughts,
      (thought) => {
        portfolio.addThought(thought);
        portfolio.setCurrentStatus(
          thought.step_type as
            | "planning"
            | "researching"
            | "analyzing"
            | "reflecting"
            | "reporting"
        );
      },
      () => {
        // Phase 2: Reveal visual widgets with delays
        setTimeout(() => {
          portfolio.setMetrics(demoMetrics);
        }, 300);

        setTimeout(() => {
          portfolio.setSectorAllocation(demoSectorAllocation);
        }, 600);

        setTimeout(() => {
          portfolio.setStressTests(demoStressTests);
        }, 1000);

        // Phase 3: Reveal written report
        setTimeout(() => {
          portfolio.setReport(
            portfolioExecutiveSummary,
            portfolioFullReport,
            portfolioCitations
          );
          portfolio.setAnalyzed(true);
          portfolio.setLoading(false);
        }, 1400);
      },
      800
    );
  }, [portfolio]);

  return (
    <div className="flex flex-col h-full">
      {/* Action bar */}
      <div className="border-b border-white/[0.06] px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-sm font-semibold">
                {demoPortfolio.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {demoPortfolio.holdings.length} holdings &middot; Pre-loaded
                sample portfolio
              </p>
            </div>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={portfolio.isLoading}
            size="lg"
          >
            {portfolio.isLoading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze Portfolio"
            )}
          </Button>
        </div>
      </div>

      {/* Content area: Thought Log + Report */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Thought Log — left panel */}
        <div className="lg:col-span-2 border-r border-white/[0.06] overflow-hidden p-4">
          <ThoughtLog
            thoughts={portfolio.thoughts}
            status={portfolio.currentStatus}
          />
        </div>

        {/* Portfolio Report — right panel */}
        <div className="lg:col-span-3 overflow-auto p-6">
          <PortfolioReport
            holdings={portfolio.portfolio?.holdings ?? []}
            metrics={portfolio.metrics}
            sectorAllocation={portfolio.sectorAllocation}
            stressTests={portfolio.stressTests}
            executiveSummary={portfolio.executiveSummary}
            fullReport={portfolio.fullReport}
            citations={portfolio.citations}
          />
        </div>
      </div>
    </div>
  );
}
