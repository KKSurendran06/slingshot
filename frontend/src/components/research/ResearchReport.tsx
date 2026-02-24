"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, TrendingUp, BarChart3, Percent } from "lucide-react";
import CollapsibleReport from "@/components/shared/CollapsibleReport";
import InsightSummary from "@/components/shared/InsightSummary";
import type { Citation } from "@/types";

interface ResearchReportProps {
  executiveSummary: string | null;
  fullReport: string | null;
  citations: Citation[];
}

// ---------------------------------------------------------------------------
// Metric extraction — parse P/E, ROE, NIM from report text dynamically
// ---------------------------------------------------------------------------

interface ExtractedMetric {
  label: string;
  value: string;
  color: string;
  icon: typeof TrendingUp;
}

/**
 * Attempts to extract P/E, ROE, and NIM values from the combined
 * executive summary + full report text.  Returns only the metrics
 * that were actually found — never hardcoded fallback values.
 */
function extractMetrics(
  summary: string | null,
  report: string | null
): ExtractedMetric[] {
  const combined = [summary ?? "", report ?? ""].join(" ");
  if (!combined.trim()) return [];

  const metrics: ExtractedMetric[] = [];

  // P/E — matches patterns like "P/E of 19.2x", "P/E: 19.2x", "P/E 19.2x", "19.2x P/E"
  const peMatch = combined.match(
    /P\/E(?:\s+(?:of|ratio|at))?\s*[:=]?\s*(\d+\.?\d*x?)/i
  ) ?? combined.match(/(\d+\.?\d*x)\s*P\/E/i);
  if (peMatch) {
    let val = peMatch[1];
    if (!val.endsWith("x")) val += "x";
    metrics.push({
      label: "P/E Ratio",
      value: val,
      color: "text-[#30d158]",
      icon: TrendingUp,
    });
  }

  // ROE — matches "ROE: 16.5%", "ROE of 16.5%", etc.
  const roeMatch = combined.match(
    /ROE(?:\s+(?:of|at))?\s*[:=]?\s*(\d+\.?\d*%?)/i
  );
  if (roeMatch) {
    let val = roeMatch[1];
    if (!val.endsWith("%")) val += "%";
    metrics.push({
      label: "ROE",
      value: val,
      color: "text-[#0a84ff]",
      icon: BarChart3,
    });
  }

  // NIM — matches "NIM: 3.65%", "Net Interest Margin (NIM) stands at 3.65%", etc.
  const nimMatch = combined.match(
    /NIM(?:\))?(?:\s+(?:of|at|stands?\s+at))?\s*[:=]?\s*(\d+\.?\d*%?)/i
  ) ?? combined.match(
    /Net\s+Interest\s+Margin[^.]*?(\d+\.?\d*%)/i
  );
  if (nimMatch) {
    let val = nimMatch[1];
    if (!val.endsWith("%")) val += "%";
    metrics.push({
      label: "NIM",
      value: val,
      color: "text-[#ff9f0a]",
      icon: Percent,
    });
  }

  return metrics;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Renders a research report with:
 *  - Structured insight summary (via shared InsightSummary)
 *  - Metric cards (P/E, ROE, NIM) extracted dynamically from report text
 *  - Detailed analysis + sources in a collapsible section
 */
export default function ResearchReport({
  executiveSummary,
  fullReport,
  citations,
}: ResearchReportProps) {
  // Extract metrics dynamically from text
  const metrics = useMemo(
    () => extractMetrics(executiveSummary, fullReport),
    [executiveSummary, fullReport]
  );

  // ---- Empty state (no data yet) ----
  if (!executiveSummary && !fullReport) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <div className="rounded-2xl bg-[#1a1d23] p-6 mb-6">
          <FileText className="h-10 w-10 opacity-30" />
        </div>
        <p className="text-sm font-medium text-foreground mb-2">Analysis Report</p>
        <p className="text-xs max-w-[260px]">
          The research report will appear here when analysis is complete.
        </p>

        {/* Skeleton loader bars */}
        <div className="mt-8 w-full max-w-md space-y-3">
          <div className="h-3 w-3/5 rounded-md bg-[#1a1d23] skeleton-bar" />
          <div className="h-3 w-full rounded-md bg-[#3b82f6]/20 skeleton-bar" style={{ animationDelay: '0.2s' }} />
          <div className="h-3 w-4/5 rounded-md bg-[#3b82f6]/20 skeleton-bar" style={{ animationDelay: '0.4s' }} />
          <div className="h-3 w-full rounded-md bg-[#1a1d23] skeleton-bar" style={{ animationDelay: '0.6s' }} />
          <div className="h-3 w-2/3 rounded-md bg-[#3b82f6]/20 skeleton-bar" style={{ animationDelay: '0.8s' }} />
          <div className="h-3 w-full rounded-md bg-[#3b82f6]/20 skeleton-bar" style={{ animationDelay: '1s' }} />
          <div className="h-3 w-3/4 rounded-md bg-[#f59e0b]/15 skeleton-bar" style={{ animationDelay: '1.2s' }} />
          <div className="h-3 w-full rounded-md bg-[#1a1d23] skeleton-bar" style={{ animationDelay: '1.4s' }} />
          <div className="h-3 w-4/5 rounded-md bg-[#1a1d23] skeleton-bar" style={{ animationDelay: '1.6s' }} />
          <div className="h-3 w-2/5 rounded-md bg-[#1a1d23] skeleton-bar" style={{ animationDelay: '1.8s' }} />
        </div>

        {/* Metric card skeletons */}
        <div className="mt-8 grid grid-cols-3 gap-6 w-full max-w-md">
          <div className="rounded-xl bg-[#1a1d23] p-4 text-center shadow-inner shadow-black/10">
            <div className="h-3 w-8 mx-auto rounded bg-[#20242c] mb-2 skeleton-bar" />
            <div className="h-5 w-14 mx-auto rounded bg-[#20242c] skeleton-bar" style={{ animationDelay: '0.3s' }} />
          </div>
          <div className="rounded-xl bg-[#1a1d23] p-4 text-center shadow-inner shadow-black/10">
            <div className="h-3 w-10 mx-auto rounded bg-[#20242c] mb-2 skeleton-bar" style={{ animationDelay: '0.1s' }} />
            <div className="h-5 w-14 mx-auto rounded bg-[#20242c] skeleton-bar" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="rounded-xl bg-[#1a1d23] p-4 text-center shadow-inner shadow-black/10">
            <div className="h-3 w-8 mx-auto rounded bg-[#20242c] mb-2 skeleton-bar" style={{ animationDelay: '0.2s' }} />
            <div className="h-5 w-14 mx-auto rounded bg-[#20242c] skeleton-bar" style={{ animationDelay: '0.7s' }} />
          </div>
        </div>
      </div>
    );
  }

  // ---- Populated state ----
  return (
    <div className="space-y-6">
      {/* Executive Summary — structured insight rows */}
      {executiveSummary && (
        <InsightSummary text={executiveSummary} citations={citations} />
      )}

      {/* Metric Cards — dynamic, only shown when metrics are found */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="group rounded-xl bg-[#1a1d23] p-5 text-center shadow-sm shadow-black/10 transition-shadow duration-200 hover:shadow-md hover:shadow-black/20"
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {metric.label}
                  </p>
                </div>
                <p
                  className={`text-2xl font-bold font-mono ${metric.color}`}
                >
                  {metric.value}
                </p>
              </motion.div>
            );
          })}
        </div>
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
