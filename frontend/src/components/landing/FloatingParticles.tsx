"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgba(124, 58, 237, 0.25)",
  "rgba(99, 102, 241, 0.2)",
  "rgba(59, 130, 246, 0.2)",
  "rgba(6, 182, 212, 0.15)",
  "rgba(167, 139, 250, 0.2)",
];

export default function FloatingParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 15 + 18,
      delay: Math.random() * 8,
      color: COLORS[i % COLORS.length],
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 8}px ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger ambient orbs — very soft */}
      {[
        { x: "15%", y: "25%", size: 200, color: "rgba(124, 58, 237, 0.04)" },
        { x: "75%", y: "60%", size: 250, color: "rgba(59, 130, 246, 0.035)" },
        { x: "50%", y: "80%", size: 180, color: "rgba(6, 182, 212, 0.03)" },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
