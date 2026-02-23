"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Search,
  BarChart3,
  MessageSquare,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ThoughtStep, ResearchStatus } from "@/types";

interface ThoughtLogProps {
  thoughts: ThoughtStep[];
  status: ResearchStatus | null;
}

const stepTypeConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  planning: {
    icon: BrainCircuit,
    color: "text-[#bf5af2]",
    label: "Planning",
  },
  researching: { icon: Search, color: "text-[#0a84ff]", label: "Researching" },
  analyzing: {
    icon: BarChart3,
    color: "text-[#ff9f0a]",
    label: "Analyzing",
  },
  reflecting: {
    icon: MessageSquare,
    color: "text-[#64d2ff]",
    label: "Reflecting",
  },
  reporting: {
    icon: FileText,
    color: "text-[#30d158]",
    label: "Reporting",
  },
};

const statusConfig: Record<
  string,
  { icon: React.ElementType; className: string; label: string }
> = {
  planning: { icon: BrainCircuit, className: "bg-[#bf5af2]/10 text-[#bf5af2]", label: "Planning" },
  researching: { icon: Search, className: "bg-[#0a84ff]/10 text-[#0a84ff]", label: "Researching" },
  analyzing: { icon: BarChart3, className: "bg-[#ff9f0a]/10 text-[#ff9f0a]", label: "Analyzing" },
  reflecting: { icon: MessageSquare, className: "bg-[#64d2ff]/10 text-[#64d2ff]", label: "Reflecting" },
  reporting: { icon: FileText, className: "bg-[#30d158]/10 text-[#30d158]", label: "Reporting" },
  complete: { icon: CheckCircle2, className: "bg-[#30d158]/10 text-[#30d158]", label: "Complete" },
  error: { icon: AlertCircle, className: "bg-destructive/10 text-destructive", label: "Error" },
};

export default function ThoughtLog({ thoughts, status }: ThoughtLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new thoughts arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thoughts]);

  const currentStatus = status ? statusConfig[status] : null;

  return (
    <div className="flex flex-col h-full border border-border rounded-xl bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Reasoning Trace</span>
        </div>
        {currentStatus && (
          <Badge
            variant="secondary"
            className={cn("text-xs", currentStatus.className)}
          >
            {status !== "complete" && status !== "error" && (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            )}
            {status === "complete" && (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            )}
            {status === "error" && <AlertCircle className="mr-1 h-3 w-3" />}
            {currentStatus.label}
          </Badge>
        )}
      </div>

      {/* Thought steps */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4">
        {thoughts.length === 0 && !status && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BrainCircuit className="mb-3 h-8 w-8 opacity-20" />
            <p className="text-sm">
              Start a research query to see the reasoning trace here.
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {thoughts.map((step, i) => {
            const config = stepTypeConfig[step.step_type] || {
              icon: BrainCircuit,
              color: "text-muted-foreground",
              label: step.step_type,
            };
            const Icon = config.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-4 last:mb-0"
              >
                {/* Step header */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted",
                      config.color
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {step.title}
                      </span>
                      {step.confidence != null && (
                        <Badge variant="outline" className="text-xs">
                          {Math.round(step.confidence * 100)}%
                        </Badge>
                      )}
                    </div>
                    {step.content && (
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {step.content}
                      </p>
                    )}
                    {/* Tool executions */}
                    {step.tool_executions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.tool_executions.map((exec, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-xs"
                          >
                            {exec.tool_name}
                            {exec.execution_time_ms && (
                              <span className="ml-1 opacity-60">
                                {exec.execution_time_ms}ms
                              </span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector line */}
                {i < thoughts.length - 1 && (
                  <div className="ml-3.5 mt-1 mb-1 h-4 w-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
