"use client";

import { motion } from "framer-motion";
import { Search, Globe, Briefcase, Zap, Brain, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Deep Research",
    description:
      "Multi-step AI agents that decompose complex queries, scrape live data, parse filings, and synthesize institutional-grade analysis in minutes.",
    iconColor: "text-[#0a84ff]",
  },
  {
    icon: Globe,
    title: "Macro Analysis",
    description:
      "Trace geopolitical events through causal chains to specific companies. Understand second and third-order effects before the market does.",
    iconColor: "text-[#30d158]",
  },
  {
    icon: Briefcase,
    title: "Portfolio Intelligence",
    description:
      "Stress-test holdings against real scenarios. Sector analysis, risk decomposition, and AI-driven recommendations to optimize your portfolio.",
    iconColor: "text-[#ff9f0a]",
  },
];

const metrics = [
  { icon: Zap, label: "Real-time reasoning", value: "Watch AI think" },
  { icon: Brain, label: "Multi-agent system", value: "7 specialized agents" },
  { icon: Shield, label: "Source verified", value: "Every claim cited" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function FeatureCards() {
  return (
    <section className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4"
        >
          Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
        >
          Three engines.{" "}
          <span className="text-muted-foreground">One platform.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed font-light"
        >
          Each module is a specialized AI system designed to deliver
          actionable intelligence for Indian markets.
        </motion.p>
      </div>

      {/* Feature cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            className="group relative rounded-2xl bg-[#1a1d23] p-8 transition-colors duration-200 hover:bg-[#20242c] cursor-default shadow-lg"
          >
            {/* Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#20242c] shadow-md">
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Metrics bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="max-w-3xl mx-auto mt-20 rounded-2xl bg-[#1a1d23] p-6 shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-[rgba(255,255,255,0.06)]">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-3 sm:justify-center sm:px-4">
              <m.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
                <p className="text-sm text-foreground font-medium">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
