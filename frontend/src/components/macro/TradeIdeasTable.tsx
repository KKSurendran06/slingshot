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
    color: "bg-green-100 text-green-700 border-green-300",
    glow: "shadow-green-200/50",
  },
  SHORT: {
    color: "bg-red-100 text-red-700 border-red-300",
    glow: "shadow-red-200/50",
  },
};

const convictionConfig = {
  high: { color: "bg-amber-100 text-amber-700", label: "HIGH" },
  medium: { color: "bg-blue-100 text-blue-700", label: "MED" },
  low: { color: "bg-gray-100 text-gray-700", label: "LOW" },
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
              <tr className="border-b text-xs text-muted-foreground">
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="border-b last:border-0"
                  >
                    <td className="py-3 pr-3">
                      <Badge
                        className={cn(
                          "text-xs font-bold shadow-sm",
                          action.color,
                          action.glow
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
                      <span className={idea.action === "LONG" ? "text-green-600" : "text-red-600"}>
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
                      <Badge className={cn("text-[10px]", conviction.color)}>
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
