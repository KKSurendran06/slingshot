"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StressTestResult } from "@/types";

interface StressTestResultsProps {
  tests: StressTestResult[];
}

const severityConfig = {
  low: { barColor: "bg-[#30d158]", textColor: "text-[#30d158]" },
  moderate: { barColor: "bg-[#ff9f0a]", textColor: "text-[#ff9f0a]" },
  high: { barColor: "bg-[#ff6723]", textColor: "text-[#ff6723]" },
  severe: { barColor: "bg-[#ff453a]", textColor: "text-[#ff453a]" },
};

/**
 * Stress test results with animated horizontal impact bars.
 * Bars fill from 0 to final width, color-coded by severity.
 */
export default function StressTestResults({
  tests,
}: StressTestResultsProps) {
  if (tests.length === 0) return null;

  // Calculate max absolute impact for scaling
  const maxAbsImpact = Math.max(
    ...tests.map((t) => Math.abs(t.impact_percentage))
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FlaskConical className="h-4 w-4" />
          Stress Test Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test, i) => {
            const config = severityConfig[test.severity];
            const barWidth = Math.abs(test.impact_percentage) / maxAbsImpact * 100;
            const isPositive = test.impact_percentage >= 0;

            return (
              <motion.div
                key={test.scenario_name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.2 }}
              >
                {/* Label row */}
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-sm font-medium">
                      {test.scenario_name}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {test.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold font-mono",
                      isPositive ? "text-[#30d158]" : config.textColor
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {test.impact_percentage.toFixed(1)}%
                  </span>
                </div>

                {/* Animated bar */}
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isPositive ? "bg-[#30d158]" : config.barColor
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{
                      delay: i * 0.08 + 0.2,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
