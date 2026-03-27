"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #1b4332, #d4af37, #40916c)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] z-[59] origin-left blur-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #1b4332, #d4af37, #40916c)",
          opacity: 0.5,
        }}
      />
    </>
  );
}