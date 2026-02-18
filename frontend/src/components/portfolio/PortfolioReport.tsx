"use client";

import { Briefcase, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportContent from "@/components/shared/ReportContent";
import CollapsibleReport from "@/components/shared/CollapsibleReport";
import PortfolioOverview from "./PortfolioOverview";
import HoldingsTable from "./HoldingsTable";
import SectorChart from "./SectorChart";
import StressTestResults from "./StressTestResults";
import type {
  Holding,
  PortfolioMetrics,
  SectorAllocation,
  StressTestResult,
  Citation,
} from "@/types";

interface PortfolioReportProps {
  holdings: Holding[];
  metrics: PortfolioMetrics | null;
  sectorAllocation: SectorAllocation[];
  stressTests: StressTestResult[];
  executiveSummary: string | null;
  fullReport: string | null;
  citations: Citation[];
}

/**
 * Full portfolio analysis report.
 * Assembles: PortfolioOverview + (HoldingsTable + SectorChart) + StressTestResults
 * + Executive Summary + CollapsibleReport (detailed analysis + sources).
 */
export default function PortfolioReport({
  holdings,
  metrics,
  sectorAllocation,
  stressTests,
  executiveSummary,
  fullReport,
  citations,
}: PortfolioReportProps) {
  const hasAnyContent =
    metrics ||
    holdings.length > 0 ||
    stressTests.length > 0 ||
    executiveSummary ||
    fullReport;

  if (!hasAnyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Briefcase className="mb-3 h-10 w-10 opacity-30" />
        <p className="text-sm">
          Click &quot;Analyze Portfolio&quot; to see the AI-powered audit,
          stress testing, and rebalancing recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overview stat cards */}
      <PortfolioOverview metrics={metrics} />

      {/* Holdings table + Sector chart side by side */}
      {(holdings.length > 0 || sectorAllocation.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <HoldingsTable holdings={holdings} />
          </div>
          <div className="lg:col-span-2">
            <SectorChart allocation={sectorAllocation} />
          </div>
        </div>
      )}

      {/* Stress tests */}
      <StressTestResults tests={stressTests} />

      {/* Executive Summary — always visible */}
      {executiveSummary && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReportContent text={executiveSummary} citations={citations} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Analysis + Sources — collapsible */}
      <CollapsibleReport
        fullReport={fullReport}
        citations={citations}
        isVisible={!!(fullReport || citations.length > 0)}
      />
    </div>
  );
}
