"use client";

import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
      <Briefcase className="mb-4 h-16 w-16 opacity-20" />
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Portfolio Manager
      </h2>
      <p className="max-w-md text-sm mb-6">
        Upload your portfolio as a CSV or PDF to get an AI-powered audit,
        stress testing, and rebalancing recommendations. Sensitive data is
        processed locally using on-device AI.
      </p>
      <Button variant="outline" disabled>
        Upload Portfolio (Coming in Phase 4)
      </Button>
    </div>
  );
}
