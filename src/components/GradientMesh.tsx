"use client";

import { motion } from "framer-motion";

export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(27,67,50,0.15) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          top: "40%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(64,145,108,0.1) 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}