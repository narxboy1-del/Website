"use client";

import { motion } from "framer-motion";

export default function IslamicPattern({
  className = "",
  opacity = 0.03,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Star pattern layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="islamicStar"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star */}
            <g
              fill="none"
              stroke="#1b4332"
              strokeOpacity={opacity}
              strokeWidth="0.5"
            >
              <polygon points="60,10 70,40 100,40 76,58 84,88 60,72 36,88 44,58 20,40 50,40" />
              <circle cx="60" cy="60" r="35" />
              <circle cx="60" cy="60" r="25" />
              <line x1="60" y1="0" x2="60" y2="120" />
              <line x1="0" y1="60" x2="120" y2="60" />
              <line x1="0" y1="0" x2="120" y2="120" />
              <line x1="120" y1="0" x2="0" y2="120" />
            </g>
            {/* Gold accent dots */}
            <g fill="#d4af37" fillOpacity={opacity * 2}>
              <circle cx="60" cy="10" r="1.5" />
              <circle cx="100" cy="40" r="1.5" />
              <circle cx="84" cy="88" r="1.5" />
              <circle cx="36" cy="88" r="1.5" />
              <circle cx="20" cy="40" r="1.5" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStar)" />
      </svg>
    </div>
  );
}

export function IslamicDivider() {
  return (
    <div className="divider-ornate">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <g fill="none" stroke="#d4af37" strokeWidth="1">
            <polygon points="20,2 24,14 36,14 26,22 30,34 20,26 10,34 14,22 4,14 16,14" />
            <circle cx="20" cy="20" r="8" />
          </g>
          <circle cx="20" cy="20" r="2" fill="#d4af37" />
        </svg>
      </motion.div>
    </div>
  );
}