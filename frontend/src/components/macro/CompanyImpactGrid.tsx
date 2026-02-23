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
    color: "text-[#30d158]",
    borderColor: "border-l-[#30d158]",
    badgeColor: "bg-[#30d158]/10 text-[#30d158]",
    label: "Positive",
  },
  negative: {
    icon: TrendingDown,
    color: "text-[#ff453a]",
    borderColor: "border-l-[#ff453a]",
    badgeColor: "bg-[#ff453a]/10 text-[#ff453a]",
    label: "Negative",
  },
  neutral: {
    icon: Minus,
    color: "text-muted-foreground",
    borderColor: "border-l-border",
    badgeColor: "bg-secondary text-muted-foreground",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {companies.map((company, i) => {
            const config = directionConfig[company.impact_direction];
            const Icon = config.icon;

            return (
              <motion.div
                key={company.ticker}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <div
                  className={cn(
                    "rounded-lg border border-border border-l-2 bg-card p-3 h-full flex flex-col min-w-0",
                    config.borderColor
                  )}
                >
                  {/* Header: Ticker + Magnitude badge */}
                  <div className="flex items-center gap-2 mb-1.5 min-w-0">
                    <span className="font-bold text-sm truncate shrink min-w-0">
                      {company.ticker}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 ml-auto">
                      <Icon className={cn("h-3.5 w-3.5", config.color)} />
                      <Badge className={cn("text-[10px] px-1.5 py-0 whitespace-nowrap", config.badgeColor)}>
                        {magnitudeLabels[company.impact_magnitude]}
                      </Badge>
                    </div>
                  </div>

                  {/* Company name */}
                  <p className="text-xs text-muted-foreground mb-2 truncate">
                    {company.company_name}
                  </p>

                  {/* Impact description */}
                  <p className="text-xs leading-relaxed text-muted-foreground flex-1 line-clamp-2">
                    {company.projected_impact.split(".")[0]}.
                  </p>

                  {/* Confidence */}
                  <div className="mt-2 pt-2 border-t border-border flex items-center justify-between gap-2 min-w-0">
                    <span className="text-[10px] text-muted-foreground truncate min-w-0">
                      {company.exposure_type.split(" - ")[0]}
                    </span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
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
