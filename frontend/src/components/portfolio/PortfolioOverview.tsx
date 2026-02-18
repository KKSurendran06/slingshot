"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatIndianNumber, ANIMATION } from "@/lib/demoUtils";
import type { PortfolioMetrics } from "@/types";

interface PortfolioOverviewProps {
  metrics: PortfolioMetrics | null;
}

/**
 * Animated counter hook - counts from 0 to target.
 */
function useAnimatedNumber(target: number, duration: number = ANIMATION.COUNTER_DURATION) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return current;
}

/**
 * Portfolio overview with 3 animated stat cards.
 */
export default function PortfolioOverview({ metrics }: PortfolioOverviewProps) {
  if (!metrics) return null;

  const animatedValue = useAnimatedNumber(metrics.total_value);
  const animatedReturn = useAnimatedNumber(
    Math.round(metrics.total_return_pct * 10)
  );
  const animatedRisk = useAnimatedNumber(
    Math.round(metrics.risk_score * 10)
  );

  const riskColor =
    metrics.risk_score >= 8
      ? "text-red-400"
      : metrics.risk_score >= 5
        ? "text-amber-400"
        : "text-green-400";

  const riskLabel =
    metrics.risk_score >= 8
      ? "High Risk"
      : metrics.risk_score >= 5
        ? "Medium Risk"
        : "Low Risk";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Total Value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.4 }}
      >
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <IndianRupee className="h-3.5 w-3.5" />
              Total Value
            </div>
            <div className="text-2xl font-bold font-mono">
              {formatIndianNumber(animatedValue)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Invested: {formatIndianNumber(metrics.total_invested)}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Return */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              Total Return
            </div>
            <div
              className={cn(
                "text-2xl font-bold font-mono",
                metrics.total_return_pct >= 0
                  ? "text-green-400"
                  : "text-red-400"
              )}
            >
              {metrics.total_return_pct >= 0 ? "+" : ""}
              {(animatedReturn / 10).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              P&L: {metrics.total_return_pct >= 0 ? "+" : ""}
              {formatIndianNumber(metrics.total_value - metrics.total_invested)}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Score */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Risk Score
            </div>
            <div className={cn("text-2xl font-bold font-mono", riskColor)}>
              {(animatedRisk / 10).toFixed(1)}/10
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Beta: {metrics.portfolio_beta} &middot; {riskLabel}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
