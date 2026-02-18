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
  low: { barColor: "bg-green-500", textColor: "text-green-600" },
  moderate: { barColor: "bg-amber-500", textColor: "text-amber-600" },
  high: { barColor: "bg-orange-500", textColor: "text-orange-600" },
  severe: { barColor: "bg-red-500", textColor: "text-red-600" },
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
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
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
                      isPositive ? "text-green-600" : config.textColor
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {test.impact_percentage.toFixed(1)}%
                  </span>
                </div>

                {/* Animated bar */}
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isPositive ? "bg-green-500" : config.barColor
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{
                      delay: i * 0.15 + 0.3,
                      duration: 0.8,
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
