"use client";

import { useEffect, useRef } from "react";

export default function MeshGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.002;
      const x1 = 20 + Math.sin(t * 0.7) * 15;
      const y1 = 50 + Math.cos(t * 0.5) * 20;
      const x2 = 80 + Math.cos(t * 0.6) * 15;
      const y2 = 20 + Math.sin(t * 0.8) * 20;
      const x3 = 40 + Math.sin(t * 0.9) * 20;
      const y3 = 80 + Math.cos(t * 0.4) * 15;

      el.style.background = `
        radial-gradient(ellipse at ${x1}% ${y1}%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at ${x2}% ${y2}%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
        radial-gradient(ellipse at ${x3}% ${y3}%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 60% 40%, rgba(167, 139, 250, 0.06) 0%, transparent 60%)
      `;

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 mesh-gradient"
      aria-hidden="true"
    />
  );
}
