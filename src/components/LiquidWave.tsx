"use client";

import { motion } from "framer-motion";

export default function LiquidWave({
  color = "#1b4332",
  opacity = 0.05,
  className = "",
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.svg
        className="absolute bottom-0 w-[200%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "200px" }}
        animate={{ x: [0, -720] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill={color}
          fillOpacity={opacity}
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-0 w-[200%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "150px" }}
        animate={{ x: [-720, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill={color}
          fillOpacity={opacity * 1.5}
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-0 w-[200%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "100px" }}
        animate={{ x: [0, -720] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill={color}
          fillOpacity={opacity * 2}
          d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,245.3C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>
    </div>
  );
}