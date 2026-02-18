"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  FileText,
  ExternalLink,
  Globe,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReportContent, { sourceTypeIcons } from "./ReportContent";
import type { Citation } from "@/types";

interface CollapsibleReportProps {
  fullReport: string | null;
  citations: Citation[];
  isVisible: boolean;
}

/**
 * A collapsible bar at the bottom of any report panel.
 * When collapsed: shows "View Full Analysis Report" with source count.
 * When expanded: reveals Detailed Analysis + Sources.
 */
export default function CollapsibleReport({
  fullReport,
  citations,
  isVisible,
}: CollapsibleReportProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  if (!isVisible || (!fullReport && citations.length === 0)) return null;

  return (
    <div className="mt-6">
      {/* Collapse toggle bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors",
          "bg-muted/30 hover:bg-muted/50",
          isExpanded && "rounded-b-none border-b-0"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-muted-foreground" />
          {isExpanded ? "Hide Full Analysis" : "View Full Analysis Report"}
        </div>
        <div className="flex items-center gap-2">
          {citations.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {citations.length} source{citations.length !== 1 ? "s" : ""}
            </span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border border-t-0 rounded-b-lg"
          >
            <div className="p-4 space-y-4">
              {/* Detailed Analysis */}
              {fullReport && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BookOpen className="h-4 w-4" />
                        Detailed Analysis
                      </CardTitle>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetailedAnalysis(!showDetailedAnalysis);
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showDetailedAnalysis ? "Collapse" : "Expand"}
                        <motion.div
                          animate={{
                            rotate: showDetailedAnalysis ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </motion.div>
                      </button>
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {showDetailedAnalysis && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <CardContent>
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <ReportContent
                              text={fullReport}
                              citations={citations}
                            />
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                        const Icon =
                          sourceTypeIcons[cite.source_type] || Globe;
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
                                <span className="text-sm">
                                  {cite.source_name}
                                </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
