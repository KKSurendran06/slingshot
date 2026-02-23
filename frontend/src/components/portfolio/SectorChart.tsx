"use client";

import { PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { SectorAllocation } from "@/types";

interface SectorChartProps {
  allocation: SectorAllocation[];
}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
  "#f43f5e",
  "#78716c",
];

/**
 * Recharts donut chart for sector allocation with animated segments.
 */
export default function SectorChart({ allocation }: SectorChartProps) {
  if (allocation.length === 0) return null;

  const data = allocation.map((s) => ({
    name: s.sector,
    value: s.weight,
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <PieChartIcon className="h-4 w-4" />
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value != null ? `${value.toFixed(1)}%` : ""}
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#1a1d23",
                  color: "#e4e4e7",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 w-full">
            {allocation.map((sector, i) => (
              <div key={sector.sector} className="flex items-center gap-2 text-xs">
                <div
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-muted-foreground truncate">
                  {sector.sector}
                </span>
                <span className="font-mono font-medium ml-auto">
                  {sector.weight.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
