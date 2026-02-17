"use client";

import { useState } from "react";
import {
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Newspaper,
  Globe,
  BarChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Citation } from "@/types";

interface ResearchReportProps {
  executiveSummary: string | null;
  fullReport: string | null;
  citations: Citation[];
}

const sourceTypeIcons: Record<string, React.ElementType> = {
  screener: BarChart,
  pdf: FileText,
  news: Newspaper,
  web: Globe,
};

/**
 * Renders a research report with clickable inline citations.
 *
 * The report text uses `[cite-N]` markers which get transformed into
 * interactive popover components.
 */
export default function ResearchReport({
  executiveSummary,
  fullReport,
  citations,
}: ResearchReportProps) {
  const [showFullReport, setShowFullReport] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
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

      {/* Full Report */}
      {fullReport && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Detailed Analysis
              </CardTitle>
              <button
                onClick={() => setShowFullReport(!showFullReport)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {showFullReport ? (
                  <>
                    Collapse <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Expand <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          </CardHeader>
          {showFullReport && (
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReportContent text={fullReport} citations={citations} />
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Sources */}
      {citations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4" />
              Sources ({citations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {citations.map((cite, i) => {
                const Icon = sourceTypeIcons[cite.source_type] || Globe;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border p-3 text-sm"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs">
                          [{cite.citation_key}]
                        </span>
                        <span className="text-sm">{cite.source_name}</span>
                      </div>
                      {cite.content_snippet && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {cite.content_snippet}
                        </p>
                      )}
                    </div>
                    {cite.source_url && (
                      <a
                        href={cite.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/**
 * Renders text with [cite-N] markers converted to interactive popovers.
 */
function ReportContent({
  text,
  citations,
}: {
  text: string;
  citations: Citation[];
}) {
  // Split on [cite-N] patterns
  const parts = text.split(/(\[cite-\d+\])/g);

  const citationMap = new Map(
    citations.map((c) => [c.citation_key, c])
  );

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[cite-(\d+)\]$/);
        if (match) {
          const key = `cite-${match[1]}`;
          const cite = citationMap.get(key);
          if (!cite) {
            return (
              <span key={i} className="text-muted-foreground">
                [{key}]
              </span>
            );
          }
          const Icon = sourceTypeIcons[cite.source_type] || Globe;
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center rounded bg-primary/10 px-1 py-0.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors mx-0.5">
                  [{match[1]}]
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 text-sm" align="start">
                <div className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{cite.source_name}</p>
                    {cite.content_snippet && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cite.content_snippet}
                      </p>
                    )}
                    {cite.source_url && (
                      <a
                        href={cite.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        View source
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        }
        // Render plain text, converting newlines to line breaks
        return (
          <span key={i}>
            {part.split("\n").map((line, j, arr) => (
              <span key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}
