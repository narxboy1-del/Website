"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  inverted?: boolean;
}

export default function MouseParallax({
  children,
  strength = 20,
  className = "",
  inverted = false,
}: MouseParallaxProps) {
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const multiplier = inverted ? -1 : 1;

      x.set(((e.clientX - centerX) / centerX) * strength * multiplier);
      y.set(((e.clientY - centerY) / centerY) * strength * multiplier);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, inverted, x, y]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}