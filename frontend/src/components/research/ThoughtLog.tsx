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
import { ScrollArea } from "@/components/ui/scroll-area";
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
    color: "text-purple-500",
    label: "Planning",
  },
  researching: { icon: Search, color: "text-blue-500", label: "Researching" },
  analyzing: {
    icon: BarChart3,
    color: "text-amber-500",
    label: "Analyzing",
  },
  reflecting: {
    icon: MessageSquare,
    color: "text-teal-500",
    label: "Reflecting",
  },
  reporting: {
    icon: FileText,
    color: "text-green-500",
    label: "Reporting",
  },
};

const statusConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  planning: { icon: BrainCircuit, color: "bg-purple-100 text-purple-700", label: "Planning" },
  researching: { icon: Search, color: "bg-blue-100 text-blue-700", label: "Researching" },
  analyzing: { icon: BarChart3, color: "bg-amber-100 text-amber-700", label: "Analyzing" },
  reflecting: { icon: MessageSquare, color: "bg-teal-100 text-teal-700", label: "Reflecting" },
  reporting: { icon: FileText, color: "bg-green-100 text-green-700", label: "Reporting" },
  complete: { icon: CheckCircle2, color: "bg-green-100 text-green-700", label: "Complete" },
  error: { icon: AlertCircle, color: "bg-red-100 text-red-700", label: "Error" },
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
    <div className="flex flex-col h-full border rounded-lg bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Reasoning Trace</span>
        </div>
        {currentStatus && (
          <Badge
            variant="secondary"
            className={cn("text-xs", currentStatus.color)}
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
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {thoughts.length === 0 && !status && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BrainCircuit className="mb-3 h-10 w-10 opacity-30" />
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 last:mb-0"
              >
                {/* Step header */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted",
                      config.color
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
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
                      <div className="mt-2 flex flex-wrap gap-1">
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
      </ScrollArea>
    </div>
  );
}
