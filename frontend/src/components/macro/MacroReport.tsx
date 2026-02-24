"use client";

import { Globe } from "lucide-react";
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
        <div className="rounded-2xl bg-[#1a1d23] p-6 mb-6">
          <Globe className="h-10 w-10 opacity-30" />
        </div>
        <p className="text-sm font-medium text-foreground mb-2">Macro Analysis</p>
        <p className="text-xs max-w-[260px]">
          The macro analysis report will appear here when analysis is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual widgets */}
      <CausalChain links={causalChain} />
      <CompanyImpactGrid companies={companies} />
      <TradeIdeasTable ideas={tradeIdeas} />


      {/* Detailed Analysis + Sources — collapsible */}
      <CollapsibleReport
        fullReport={fullReport}
        citations={citations}
        isVisible={!!(fullReport || citations.length > 0)}
      />
    </div>
  );
}
