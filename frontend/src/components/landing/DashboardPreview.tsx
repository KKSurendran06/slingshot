"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Brain,
  FileText,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Globe,
} from "lucide-react";

/* ── Thought steps mockup ──────────────────────── */
const thoughts = [
  { icon: Search, label: "Decomposing query", status: "done" as const },
  { icon: Globe, label: "Fetching live financials", status: "done" as const },
  { icon: FileText, label: "Parsing Q3 investor deck", status: "done" as const },
  { icon: Brain, label: "Synthesizing analysis", status: "active" as const },
  { icon: CheckCircle2, label: "Quality check", status: "pending" as const },
];

/* ── Report lines mockup ───────────────────────── */
const reportLines = [
  { width: "100%", highlight: true },
  { width: "85%", highlight: false },
  { width: "92%", highlight: false },
  { width: "60%", highlight: false },
  { width: "100%", highlight: true },
  { width: "78%", highlight: false },
  { width: "88%", highlight: false },
  { width: "45%", highlight: false },
];

/* ── Holdings mockup ───────────────────────────── */
const holdings = [
  { name: "HDFC Bank", change: "+2.4%", positive: true },
  { name: "Reliance", change: "+1.8%", positive: true },
  { name: "Infosys", change: "-0.6%", positive: false },
  { name: "TCS", change: "+0.9%", positive: true },
];

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="preview"
      className="relative py-32 px-6"
    >
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium mb-4"
        >
          Product Preview
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          See the engine{" "}
          <span className="text-white/40">at work</span>
        </motion.h2>
      </div>

      {/* Dashboard card */}
      <motion.div
        style={{ y, opacity }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative">
          {/* Ambient glow behind dashboard */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Dashboard container */}
          <div className="relative glass rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="glass rounded-md px-24 py-1">
                  <span className="text-[10px] text-white/25 font-mono">
                    slingshot.ai/research
                  </span>
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Dashboard content — 3-column layout */}
            <div className="grid grid-cols-12 min-h-[420px]">
              {/* Left: Thought log */}
              <div className="col-span-3 border-r border-white/[0.06] p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-3.5 w-3.5 text-violet-400/70" />
                  <span className="text-[11px] font-medium text-white/50">
                    Reasoning
                  </span>
                </div>

                <div className="space-y-2">
                  {thoughts.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          t.status === "done"
                            ? "bg-emerald-500/10"
                            : t.status === "active"
                            ? "bg-violet-500/15"
                            : "bg-white/[0.04]"
                        }`}
                      >
                        <t.icon
                          className={`h-2.5 w-2.5 ${
                            t.status === "done"
                              ? "text-emerald-400/70"
                              : t.status === "active"
                              ? "text-violet-400/70"
                              : "text-white/20"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[11px] ${
                          t.status === "done"
                            ? "text-white/50"
                            : t.status === "active"
                            ? "text-white/70 font-medium"
                            : "text-white/20"
                        }`}
                      >
                        {t.label}
                      </span>
                      {t.status === "active" && (
                        <motion.div
                          className="w-1 h-1 rounded-full bg-violet-400/70 ml-auto"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Center: Report */}
              <div className="col-span-5 border-r border-white/[0.06] p-5">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="h-3.5 w-3.5 text-blue-400/70" />
                  <span className="text-[11px] font-medium text-white/50">
                    Analysis Report
                  </span>
                </div>

                {/* Stylized report content */}
                <div className="space-y-4">
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="h-4 w-48 rounded bg-white/[0.08] mb-3"
                    />
                    <div className="space-y-2">
                      {reportLines.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scaleX: 0 }}
                          whileInView={{ opacity: 1, scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 1.4 + i * 0.08,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          className="origin-left"
                        >
                          <div
                            className={`h-2 rounded-full ${
                              line.highlight
                                ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10"
                                : "bg-white/[0.04]"
                            }`}
                            style={{ width: line.width }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="grid grid-cols-3 gap-2 mt-4"
                  >
                    {[
                      { label: "P/E", value: "19.2x", color: "text-emerald-400/70" },
                      { label: "ROE", value: "16.5%", color: "text-blue-400/70" },
                      { label: "NIM", value: "3.65%", color: "text-violet-400/70" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5 text-center"
                      >
                        <p className="text-[10px] text-white/30 mb-0.5">{m.label}</p>
                        <p className={`text-sm font-semibold ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Right: Chat + Portfolio mini */}
              <div className="col-span-4 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400/70" />
                  <span className="text-[11px] font-medium text-white/50">
                    Agent Chat
                  </span>
                </div>

                {/* Chat messages */}
                <div className="space-y-3 mb-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="ml-auto max-w-[80%]"
                  >
                    <div className="rounded-xl rounded-br-sm bg-violet-500/15 border border-violet-500/10 px-3 py-2">
                      <p className="text-[11px] text-white/60">
                        How does HDFC compare to ICICI on asset quality?
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="max-w-[85%]"
                  >
                    <div className="rounded-xl rounded-bl-sm bg-white/[0.04] border border-white/[0.06] px-3 py-2">
                      <p className="text-[11px] text-white/50">
                        HDFC&apos;s GNPA at 1.24% edges out ICICI&apos;s 2.30%.
                        Net NPA gap is even wider at 0.33% vs 0.44%...
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Mini portfolio widget */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="mt-4 rounded-xl bg-white/[0.02] border border-white/[0.05] p-3"
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <BarChart3 className="h-3 w-3 text-white/30" />
                    <span className="text-[10px] text-white/30 font-medium">
                      Portfolio
                    </span>
                    <TrendingUp className="h-3 w-3 text-emerald-400/50 ml-auto" />
                    <span className="text-[10px] text-emerald-400/60 font-medium">
                      +12.4%
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {holdings.map((h) => (
                      <div key={h.name} className="flex justify-between items-center">
                        <span className="text-[10px] text-white/40">
                          {h.name}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            h.positive ? "text-emerald-400/60" : "text-red-400/60"
                          }`}
                        >
                          {h.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
