"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TradeIdea } from "@/types";

interface TradeIdeasTableProps {
  ideas: TradeIdea[];
}

const actionConfig = {
  LONG: {
    color: "bg-[#22c55e]/10 text-[#22c55e]",
  },
  SHORT: {
    color: "bg-[#ef4444]/10 text-[#ef4444]",
  },
};

const convictionConfig = {
  high: { color: "bg-[#f59e0b]/10 text-[#f59e0b]", label: "HIGH" },
  medium: { color: "bg-[#3b82f6]/10 text-[#3b82f6]", label: "MED" },
  low: { color: "bg-secondary text-muted-foreground", label: "LOW" },
};

/**
 * Trade ideas table with animated row reveals.
 * Shows actionable trade recommendations with entry, target, stop-loss.
 */
export default function TradeIdeasTable({ ideas }: TradeIdeasTableProps) {
  if (ideas.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4" />
          Trade Ideas ({ideas.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="text-left py-2 pr-3 font-medium">Action</th>
                <th className="text-left py-2 pr-3 font-medium">Ticker</th>
                <th className="text-right py-2 pr-3 font-medium">Entry</th>
                <th className="text-right py-2 pr-3 font-medium">Target</th>
                <th className="text-right py-2 pr-3 font-medium">Stop Loss</th>
                <th className="text-center py-2 pr-3 font-medium">
                  Conviction
                </th>
                <th className="text-left py-2 font-medium">Rationale</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea, i) => {
                const action = actionConfig[idea.action];
                const conviction = convictionConfig[idea.conviction];
                const returnPct = idea.entry_price && idea.target_price
                  ? (
                      ((idea.target_price - idea.entry_price) /
                        idea.entry_price) *
                      100 *
                      (idea.action === "SHORT" ? -1 : 1)
                    ).toFixed(1)
                  : null;

                return (
                  <motion.tr
                    key={idea.ticker}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.2 }}
                    className="border-b border-[rgba(255,255,255,0.04)] last:border-0"
                  >
                    <td className="py-3 pr-3">
                      <Badge
                        className={cn(
                          "text-xs font-bold border-0 rounded-lg",
                          action.color
                        )}
                      >
                        {idea.action}
                      </Badge>
                    </td>
                    <td className="py-3 pr-3 font-bold">{idea.ticker}</td>
                    <td className="py-3 pr-3 text-right font-mono text-xs">
                      {idea.entry_price?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 pr-3 text-right font-mono text-xs">
                      <span className={idea.action === "LONG" ? "text-[#22c55e]" : "text-[#ef4444]"}>
                        {idea.target_price?.toLocaleString("en-IN")}
                      </span>
                      {returnPct && (
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          ({returnPct}%)
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-right font-mono text-xs text-muted-foreground">
                      {idea.stop_loss?.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 pr-3 text-center">
                      <Badge className={cn("text-[10px] border-0 rounded-lg", conviction.color)}>
                        {conviction.label}
                      </Badge>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground max-w-[200px]">
                      <p className="line-clamp-2">{idea.rationale}</p>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
