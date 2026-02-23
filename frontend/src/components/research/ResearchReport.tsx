"use client";

import { FileText, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportContent from "@/components/shared/ReportContent";
import CollapsibleReport from "@/components/shared/CollapsibleReport";
import type { Citation } from "@/types";

interface ResearchReportProps {
  executiveSummary: string | null;
  fullReport: string | null;
  citations: Citation[];
}

/**
 * Split the executive summary into bullet points.
 * Each sentence (delimited by `. ` or `.\n` or end-of-string after a period)
 * becomes a separate bullet, preserving [cite-N] markers.
 */
function splitIntoBullets(text: string): string[] {
  // Split on period followed by whitespace (but keep the period with the preceding text).
  // We look for ". " or ".\n" boundaries while avoiding splitting on decimals like "19.2x".
  // Simpler approach: split on `. ` that is followed by an uppercase letter or `[`.
  const bullets: string[] = [];
  const parts = text.split(/(?<=\.)\s+(?=[A-Z\[])/g);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed) bullets.push(trimmed);
  }
  return bullets.length > 0 ? bullets : [text];
}

/**
 * Renders a research report with executive summary as bullet points
 * and detailed analysis + sources in a collapsible section.
 */
export default function ResearchReport({
  executiveSummary,
  fullReport,
  citations,
}: ResearchReportProps) {
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
            <p className="text-xs text-muted-foreground mb-1">P/E</p>
            <p className="text-lg font-bold text-[#3b82f6]">19.2x</p>
          </div>
          <div className="rounded-xl bg-[#1a1d23] p-4 text-center shadow-inner shadow-black/10">
            <p className="text-xs text-muted-foreground mb-1">ROE</p>
            <p className="text-lg font-bold text-[#22c55e]">16.5%</p>
          </div>
          <div className="rounded-xl bg-[#1a1d23] p-4 text-center shadow-inner shadow-black/10">
            <p className="text-xs text-muted-foreground mb-1">NIM</p>
            <p className="text-lg font-bold text-[#f59e0b]">3.65%</p>
          </div>
        </div>
      </div>
    );
  }

  const bullets = executiveSummary ? splitIntoBullets(executiveSummary) : [];

  return (
    <div className="space-y-6">
      {/* Executive Summary — always visible, rendered as bullet points */}
      {executiveSummary && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b82f6]" />
                  <span className="prose prose-sm max-w-none dark:prose-invert">
                    <ReportContent text={bullet} citations={citations} />
                  </span>
                </li>
              ))}
            </ul>
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
