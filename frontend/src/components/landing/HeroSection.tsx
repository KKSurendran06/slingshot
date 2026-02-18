"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import MeshGradient from "./MeshGradient";
import FloatingParticles from "./FloatingParticles";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <MeshGradient />
      <FloatingParticles />

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(10, 10, 11, 0.4) 70%, rgba(10, 10, 11, 0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="glass rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-glow-pulse" />
            Launching Tomorrow
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-white">Research that</span>
          <br />
          <span className="text-gradient">thinks ahead</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          AI-powered deep research, macro analysis, and portfolio intelligence
          for Indian markets. Real-time reasoning you can watch unfold.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/research">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #3b82f6 100%)",
              }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              <span className="relative">Get Started</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.button>
          </Link>

          <Link href="#preview">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-medium text-white/70 glass glass-hover transition-all duration-300 hover:text-white"
            >
              <Play className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
              See it in action
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <div className="w-0.5 h-2 rounded-full bg-white/30 animate-scroll-hint" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
