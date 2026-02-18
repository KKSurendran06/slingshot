"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CompanyExposure } from "@/types";

interface CompanyImpactGridProps {
  companies: CompanyExposure[];
}

const directionConfig = {
  positive: {
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
    label: "Positive",
  },
  negative: {
    icon: TrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
    label: "Negative",
  },
  neutral: {
    icon: Minus,
    color: "text-gray-600",
    bgColor: "bg-gray-50 border-gray-200",
    badgeColor: "bg-gray-100 text-gray-700",
    label: "Neutral",
  },
};

const magnitudeLabels = {
  strong: "Strong",
  moderate: "Moderate",
  mild: "Mild",
};

/**
 * Grid of company impact cards showing how each company is affected.
 * Cards stagger in with framer-motion.
 */
export default function CompanyImpactGrid({
  companies,
}: CompanyImpactGridProps) {
  if (companies.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Building2 className="h-4 w-4" />
          Affected Companies ({companies.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {companies.map((company, i) => {
            const config = directionConfig[company.impact_direction];
            const Icon = config.icon;

            return (
              <motion.div
                key={company.ticker}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <div
                  className={cn(
                    "rounded-lg border p-3 h-full flex flex-col",
                    config.bgColor
                  )}
                >
                  {/* Header: Ticker + Direction */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm">
                      {company.ticker}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon className={cn("h-3.5 w-3.5", config.color)} />
                      <Badge className={cn("text-[10px] px-1.5 py-0", config.badgeColor)}>
                        {magnitudeLabels[company.impact_magnitude]}
                      </Badge>
                    </div>
                  </div>

                  {/* Company name */}
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {company.company_name}
                  </p>

                  {/* Impact description */}
                  <p className="text-xs leading-relaxed flex-1 line-clamp-3">
                    {company.projected_impact.split(".")[0]}.
                  </p>

                  {/* Confidence */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {company.exposure_type.split(" - ")[0]}
                    </span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {Math.round(company.confidence * 100)}%
                    </Badge>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
