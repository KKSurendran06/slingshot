"use client";

import { motion } from "framer-motion";
import { Search, Globe, Briefcase, Zap, Brain, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Deep Research",
    description:
      "Multi-step AI agents that decompose complex queries, scrape live data, parse filings, and synthesize institutional-grade analysis in minutes.",
    accent: "from-violet-500/20 to-violet-500/0",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/20",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(139,92,246,0.08)]",
  },
  {
    icon: Globe,
    title: "Macro Analysis",
    description:
      "Trace geopolitical events through causal chains to specific companies. Understand second and third-order effects before the market does.",
    accent: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/20",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(59,130,246,0.08)]",
  },
  {
    icon: Briefcase,
    title: "Portfolio Intelligence",
    description:
      "Stress-test holdings against real scenarios. Sector analysis, risk decomposition, and AI-driven recommendations to optimize your portfolio.",
    accent: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/20",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(6,182,212,0.08)]",
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
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function FeatureCards() {
  return (
    <section className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium mb-4"
        >
          Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Three engines.{" "}
          <span className="text-white/40">One platform.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed font-light"
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
            whileHover={{ y: -4 }}
            className={`group relative rounded-2xl glass border border-white/[0.06] p-8 transition-all duration-500 ${feature.borderHover} ${feature.glowColor} cursor-default`}
          >
            {/* Gradient accent — top edge */}
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <feature.icon className={`h-5 w-5 ${feature.iconColor} transition-colors duration-300`} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/40 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Metrics bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-3xl mx-auto mt-20 glass rounded-2xl border border-white/[0.06] p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.06]">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-3 sm:justify-center sm:px-4">
              <m.icon className="h-4 w-4 text-white/30 shrink-0" />
              <div>
                <p className="text-xs text-white/30 font-medium">{m.label}</p>
                <p className="text-sm text-white/70 font-medium">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
