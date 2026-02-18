"use client";

import { motion } from "framer-motion";
import { List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatIndianNumber } from "@/lib/demoUtils";
import type { Holding } from "@/types";

interface HoldingsTableProps {
  holdings: Holding[];
}

/**
 * Holdings table with P&L colors and staggered row animation.
 */
export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  if (holdings.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <List className="h-4 w-4" />
          Holdings ({holdings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left py-2 pr-3 font-medium">Ticker</th>
                <th className="text-right py-2 pr-3 font-medium">Qty</th>
                <th className="text-right py-2 pr-3 font-medium">Avg Cost</th>
                <th className="text-right py-2 pr-3 font-medium">CMP</th>
                <th className="text-right py-2 pr-3 font-medium">Value</th>
                <th className="text-right py-2 font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, i) => {
                const currentPrice = holding.current_price ?? holding.avg_buy_price;
                const value = holding.quantity * currentPrice;
                const invested = holding.quantity * holding.avg_buy_price;
                const pnl = value - invested;
                const pnlPct = ((pnl / invested) * 100).toFixed(1);
                const isPositive = pnl >= 0;

                return (
                  <motion.tr
                    key={holding.ticker}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="border-b last:border-0"
                  >
                    <td className="py-2.5 pr-3">
                      <div>
                        <span className="font-bold text-xs">
                          {holding.ticker}
                        </span>
                        {holding.sector && (
                          <span className="ml-1.5 text-[10px] text-muted-foreground">
                            {holding.sector}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs">
                      {holding.quantity}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs text-muted-foreground">
                      {formatIndianNumber(holding.avg_buy_price)}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs">
                      {formatIndianNumber(currentPrice)}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs">
                      {formatIndianNumber(value)}
                    </td>
                    <td className="py-2.5 text-right">
                      <Badge
                        className={cn(
                          "text-[10px] font-mono px-1.5 py-0",
                          isPositive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {isPositive ? "+" : ""}
                        {pnlPct}%
                      </Badge>
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
