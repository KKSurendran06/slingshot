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
  { icon: React.ElementType; color: string; bgColor: string; label: string }
> = {
  planning: {
    icon: BrainCircuit,
    color: "text-[#a855f7]",
    bgColor: "bg-[#a855f7]/10",
    label: "Planning",
  },
  researching: {
    icon: Search,
    color: "text-[#3b82f6]",
    bgColor: "bg-[#3b82f6]/10",
    label: "Researching",
  },
  analyzing: {
    icon: BarChart3,
    color: "text-[#f59e0b]",
    bgColor: "bg-[#f59e0b]/10",
    label: "Analyzing",
  },
  reflecting: {
    icon: MessageSquare,
    color: "text-[#06b6d4]",
    bgColor: "bg-[#06b6d4]/10",
    label: "Reflecting",
  },
  reporting: {
    icon: FileText,
    color: "text-[#22c55e]",
    bgColor: "bg-[#22c55e]/10",
    label: "Reporting",
  },
};

const statusConfig: Record<
  string,
  { icon: React.ElementType; className: string; label: string }
> = {
  planning: { icon: BrainCircuit, className: "bg-[#a855f7]/10 text-[#a855f7]", label: "Planning" },
  researching: { icon: Search, className: "bg-[#3b82f6]/10 text-[#3b82f6]", label: "Researching" },
  analyzing: { icon: BarChart3, className: "bg-[#f59e0b]/10 text-[#f59e0b]", label: "Analyzing" },
  reflecting: { icon: MessageSquare, className: "bg-[#06b6d4]/10 text-[#06b6d4]", label: "Reflecting" },
  reporting: { icon: FileText, className: "bg-[#22c55e]/10 text-[#22c55e]", label: "Reporting" },
  complete: { icon: CheckCircle2, className: "bg-[#22c55e]/10 text-[#22c55e]", label: "Complete" },
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
    <div className="flex flex-col h-full rounded-2xl bg-[#1a1d23] shadow-lg shadow-black/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <BrainCircuit className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">Reasoning</span>
        </div>
        {currentStatus && (
          <Badge
            variant="secondary"
            className={cn("text-[10px] rounded-lg border-0 shrink-0 whitespace-nowrap", currentStatus.className)}
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
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 pb-4">
        {thoughts.length === 0 && !status && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BrainCircuit className="mb-3 h-8 w-8 opacity-20" />
            <p className="text-xs leading-relaxed">
              Start a research query to see the reasoning trace here.
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {thoughts.map((step, i) => {
            const config = stepTypeConfig[step.step_type] || {
              icon: BrainCircuit,
              color: "text-muted-foreground",
              bgColor: "bg-muted",
              label: step.step_type,
            };
            const Icon = config.icon;
            const isActive = status !== "complete" && i === thoughts.length - 1;
            const isDisabled = status === "complete" && i < thoughts.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("mb-4 last:mb-0", isDisabled && "opacity-50")}
              >
                {/* Step header */}
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      config.bgColor,
                      config.color
                    )}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "text-xs font-medium truncate",
                        isActive ? "text-foreground" : "text-foreground/80"
                      )}>
                        {step.title}
                      </span>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                      )}
                    </div>
                    {step.content && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {step.content}
                      </p>
                    )}
                    {/* Tool executions */}
                    {step.tool_executions.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {step.tool_executions.map((exec, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-[10px] rounded-md border-0 px-1.5 py-0"
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
                  <div className="ml-3 mt-1 mb-1 h-3 w-px bg-[#20242c]" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
