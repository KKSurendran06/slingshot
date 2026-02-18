"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CausalLink } from "@/types";

interface CausalChainProps {
  links: CausalLink[];
}

/**
 * Animated causal chain visualization.
 * Shows a horizontal flow of events connected by arrows.
 * Each node fades in sequentially with arrow animation.
 */
export default function CausalChain({ links }: CausalChainProps) {
  if (links.length === 0) return null;

  // Extract unique nodes from the chain
  const nodes: string[] = [];
  links.forEach((link) => {
    if (!nodes.includes(link.from_event)) nodes.push(link.from_event);
    if (!nodes.includes(link.to_event)) nodes.push(link.to_event);
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h4l3-9 4 18 3-9h4" />
          </svg>
          Causal Chain
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Horizontal chain for larger screens */}
        <div className="hidden md:flex items-center justify-center gap-1 overflow-x-auto pb-2">
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-1 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.4, duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-lg border-2 border-primary/20 bg-primary/10 px-3 py-2 text-center min-w-[120px] max-w-[160px]">
                    <span className="text-xs font-medium leading-tight">
                      {node}
                    </span>
                  </div>
                  {/* Confidence badge for the link FROM this node */}
                  {i < links.length && (
                    <Badge
                      variant="outline"
                      className="mt-1 text-[10px] px-1.5 py-0"
                    >
                      {Math.round(links[i].confidence * 100)}%
                    </Badge>
                  )}
                </div>
              </motion.div>
              {i < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.4 + 0.2, duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4 text-primary/40 shrink-0 mx-1" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Vertical chain for mobile */}
        <div className="md:hidden space-y-2">
          {links.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.3 }}
              className="rounded-lg border p-3"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-primary">
                  {link.from_event}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="font-medium text-primary">
                  {link.to_event}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {link.relationship}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
