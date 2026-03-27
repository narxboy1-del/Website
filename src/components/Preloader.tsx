"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-forest-800"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="preloaderPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <g fill="none" stroke="#d4af37" strokeWidth="0.5">
                    <polygon points="40,5 47,25 68,25 52,38 58,58 40,46 22,58 28,38 12,25 33,25" />
                    <circle cx="40" cy="40" r="20" />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#preloaderPattern)" />
            </svg>
          </div>

          <div className="relative text-center">
            <motion.div
              className="w-24 h-24 mx-auto mb-8 relative"
            >
              <motion.svg
                viewBox="0 0 100 100"
                fill="none"
                className="w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeOpacity="0.2" strokeWidth="1" />
                <circle cx="50" cy="50" r="35" stroke="#d4af37" strokeOpacity="0.3" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" stroke="#d4af37" strokeOpacity="0.4" strokeWidth="1" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <motion.circle
                    key={angle}
                    cx={50 + 45 * Math.cos((angle * Math.PI) / 180)}
                    cy={50 + 45 * Math.sin((angle * Math.PI) / 180)}
                    r="2"
                    fill="#d4af37"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: angle / 360,
                    }}
                  />
                ))}
              </motion.svg>

              <motion.svg
                viewBox="0 0 100 100"
                fill="none"
                className="w-full h-full absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <polygon
                  points="50,10 61,35 88,35 67,52 73,78 50,63 27,78 33,52 12,35 39,35"
                  stroke="#d4af37"
                  strokeOpacity="0.15"
                  strokeWidth="0.5"
                  fill="none"
                />
              </motion.svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-display text-3xl font-bold text-white mb-1">
                QurbanElite
              </h1>
              <p className="text-gold-400/60 text-xs tracking-[0.3em] uppercase">
                Premium Livestock
              </p>
            </motion.div>

            <div className="mt-8 w-48 mx-auto">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-white/30 text-xs mt-2 font-mono">
                {Math.min(Math.floor(progress), 100)}%
              </p>
            </div>

            <motion.p
              className="font-arabic text-gold-400/30 text-sm mt-6"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              بِسْمِ اللَّهِ
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}