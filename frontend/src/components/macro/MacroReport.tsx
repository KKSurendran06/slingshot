"use client";

import { BookOpen, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportContent from "@/components/shared/ReportContent";
import CollapsibleReport from "@/components/shared/CollapsibleReport";
import CausalChain from "./CausalChain";
import CompanyImpactGrid from "./CompanyImpactGrid";
import TradeIdeasTable from "./TradeIdeasTable";
import type {
  CausalLink,
  CompanyExposure,
  TradeIdea,
  Citation,
} from "@/types";

interface MacroReportProps {
  causalChain: CausalLink[];
  companies: CompanyExposure[];
  tradeIdeas: TradeIdea[];
  executiveSummary: string | null;
  fullReport: string | null;
  citations: Citation[];
}

/**
 * Full macro analysis report.
 * Assembles: CausalChain + CompanyImpactGrid + TradeIdeasTable
 * + Executive Summary + CollapsibleReport (detailed analysis + sources).
 */
export default function MacroReport({
  causalChain,
  companies,
  tradeIdeas,
  executiveSummary,
  fullReport,
  citations,
}: MacroReportProps) {
  const hasAnyContent =
    causalChain.length > 0 ||
    companies.length > 0 ||
    tradeIdeas.length > 0 ||
    executiveSummary ||
    fullReport;

  if (!hasAnyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Globe className="mb-3 h-10 w-10 opacity-30" />
        <p className="text-sm">
          The macro analysis report will appear here when analysis is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Visual widgets */}
      <CausalChain links={causalChain} />
      <CompanyImpactGrid companies={companies} />
      <TradeIdeasTable ideas={tradeIdeas} />

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
