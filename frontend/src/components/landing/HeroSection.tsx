"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="rounded-full bg-[#1a1d23] px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground shadow-lg">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#30d158] mr-2" />
            Launching Tomorrow
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-foreground">Research that</span>
          <br />
          <span className="text-muted-foreground">thinks ahead</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          AI-powered deep research, macro analysis, and portfolio intelligence
          for Indian markets. Real-time reasoning you can watch unfold.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/research">
            <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-primary/20">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </Link>

          <Link href="#preview">
            <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-medium text-muted-foreground bg-[#1a1d23] hover:bg-[#20242c] hover:text-foreground transition-colors duration-200 shadow-lg">
              See it in action
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
