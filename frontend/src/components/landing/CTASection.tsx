"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-40 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
        >
          Ready to see what
          <br />
          <span className="text-muted-foreground">AI research</span> can do?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-lg mb-12 font-light max-w-lg mx-auto"
        >
          Join the next generation of investors who let AI handle the grunt
          work — so they can focus on decisions that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Link href="/research">
            <button
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              aria-label="Start researching"
            >
              <span>Start Researching</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-muted-foreground text-xs mt-8 font-medium tracking-wide"
        >
          No credit card required. Free during beta.
        </motion.p>
      </div>
    </section>
  );
}
