"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ReportContent from "./ReportContent";
import type { Citation } from "@/types";

// ---------------------------------------------------------------------------
// Insight splitting
// ---------------------------------------------------------------------------

interface Insight {
  text: string;
  index: number;
}

/**
 * Splits paragraph text into sentence-level insight statements.
 * Each sentence (ending with `. ` before an uppercase letter or `[cite-N]`)
 * becomes its own insight row.
 */
function splitIntoInsights(text: string): Insight[] {
  const parts = text.split(/(?<=\.)\s+(?=[A-Z\[])/g);
  const insights: Insight[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed) {
      insights.push({ text: trimmed, index: insights.length });
    }
  }
  return insights.length > 0 ? insights : [{ text, index: 0 }];
}

/**
 * Extract a source badge from the first citation reference in text.
 */
function getSourceBadge(
  text: string,
  citations: Citation[]
): string | null {
  const match = text.match(/\[cite-(\d+)\]/);
  if (!match) return null;
  const key = `cite-${match[1]}`;
  const cite = citations.find((c) => c.citation_key === key);
  if (!cite) return null;
  const labelMap: Record<string, string> = {
    screener: "Screener",
    pdf: "Filing",
    news: "News",
    web: "Web",
  };
  return labelMap[cite.source_type] ?? cite.source_type;
}

// Accent stripe colors — one per insight row, rotating
const stripeColors = [
  "bg-[#3b82f6]",
  "bg-[#30d158]",
  "bg-[#ff9f0a]",
  "bg-[#a855f7]",
  "bg-[#06b6d4]",
  "bg-[#ef4444]",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface InsightSummaryProps {
  /** The raw executive summary text (may contain [cite-N] markers). */
  text: string;
  /** Available citations for popover resolution. */
  citations: Citation[];
  /** Optional override for the section label. Defaults to "Key Insights". */
  label?: string;
}

/**
 * Converts a paragraph executive summary into a structured list of
 * insight rows.  Each row has a colored left accent stripe, the
 * insight statement (with citation popovers), and an optional source badge.
 *
 * Designed to replace the old "Executive Summary" card with a cleaner,
 * terminal-style layout that avoids text-heavy paragraph blocks.
 */
export default function InsightSummary({
  text,
  citations,
  label = "Key Insights",
}: InsightSummaryProps) {
  const insights = useMemo(() => splitIntoInsights(text), [text]);

  return (
    <div>
      {/* Subtle inline section label — no Card wrapper, no heavy header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.04)]" />
      </div>

      {/* Insight rows */}
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const badge = getSourceBadge(insight.text, citations);
          const stripe = stripeColors[insight.index % stripeColors.length];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="group relative flex items-start gap-0 rounded-xl bg-[#151821] overflow-hidden transition-colors duration-200 hover:bg-[#1a1d23]"
            >
              {/* Left accent stripe */}
              <div
                className={`w-1 shrink-0 self-stretch rounded-l-xl ${stripe}`}
              />

              {/* Content area */}
              <div className="flex-1 flex items-start gap-3 px-4 py-3 min-w-0">
                {/* Insight text */}
                <span className="flex-1 text-sm leading-relaxed max-w-prose text-foreground/80">
                  <ReportContent text={insight.text} citations={citations} />
                </span>

                {/* Source badge */}
                {badge && (
                  <span className="mt-0.5 shrink-0 rounded-md bg-[#20242c] px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-[#71717a]">
                    {badge}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
