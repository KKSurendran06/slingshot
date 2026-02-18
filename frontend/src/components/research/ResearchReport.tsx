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
  const bullets: string[] = [];
  // Use a regex that splits after a period+space where the period is NOT preceded by a digit
  // and NOT followed by a digit (to preserve "19.2x" style numbers).
  // Simpler approach: split on `. ` that is followed by an uppercase letter or `[`.
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
        <FileText className="mb-3 h-10 w-10 opacity-30" />
        <p className="text-sm">
          The research report will appear here when analysis is complete.
        </p>
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
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
