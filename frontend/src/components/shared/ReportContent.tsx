"use client";

import type { ElementType } from "react";
import {
  ExternalLink,
  FileText,
  Globe,
  Newspaper,
  BarChart,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Citation } from "@/types";

const sourceTypeIcons: Record<string, ElementType> = {
  screener: BarChart,
  pdf: FileText,
  news: Newspaper,
  web: Globe,
};

/**
 * Renders text with [cite-N] markers converted to interactive popovers.
 * Extracted as a shared component used by ResearchReport, MacroReport, and PortfolioReport.
 */
export default function ReportContent({
  text,
  citations,
}: {
  text: string;
  citations: Citation[];
}) {
  // Split on [cite-N] patterns
  const parts = text.split(/(\[cite-\d+\])/g);

  const citationMap = new Map(citations.map((c) => [c.citation_key, c]));

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

export { sourceTypeIcons };
