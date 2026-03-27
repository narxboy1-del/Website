"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export default function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front */}
      <motion.div
        className="w-full h-full absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      >
        {front}
      </motion.div>

      {/* Back */}
      <motion.div
        className="w-full h-full absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
        initial={{ rotateY: -180 }}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ backfaceVisibility: "hidden" }}
      >
        {back}
      </motion.div>
    </div>
  );
}