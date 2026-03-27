"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeightSimulator({
  currentWeight,
  type,
}: {
  currentWeight: number;
  type: "cow" | "goat" | "sheep";
}) {
  const [weight, setWeight] = useState(currentWeight);

  const config = {
    cow: { min: 200, max: 600, emoji: "🐄", unit: 10 },
    goat: { min: 20, max: 70, emoji: "🐐", unit: 1 },
    sheep: { min: 25, max: 70, emoji: "🐑", unit: 1 },
  };

  const c = config[type];
  const normalizedScale = 0.5 + ((weight - c.min) / (c.max - c.min)) * 0.8;
  const meatEstimate = weight * 0.55;

  return (
    <div className="bg-white rounded-2xl p-6 border border-earth-100 shadow-glass">
      <h4 className="font-display text-lg font-bold text-forest-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center text-sm">
          ⚖️
        </span>
        Weight Simulator
      </h4>

      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: normalizedScale }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-7xl inline-block"
        >
          {c.emoji}
        </motion.div>
      </div>

      <div className="text-center mb-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={weight}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-3xl font-display font-bold text-forest-700"
          >
            {weight} kg
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Weight bar */}
      <div className="relative h-3 bg-earth-100 rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-forest-400 via-forest-500 to-gold-400"
          animate={{
            width: `${((weight - c.min) / (c.max - c.min)) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      <input
        type="range"
        min={c.min}
        max={c.max}
        step={c.unit}
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
        className="w-full accent-forest-500 cursor-pointer"
      />

      <div className="flex justify-between text-xs text-earth-400">
        <span>{c.min} kg</span>
        <span>{c.max} kg</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-forest-50 rounded-xl p-3 text-center">
          <p className="text-xs text-forest-500">Est. Meat</p>
          <p className="text-lg font-bold text-forest-700">
            {meatEstimate.toFixed(0)} kg
          </p>
        </div>
        <div className="bg-gold-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gold-600">Meat Ratio</p>
          <p className="text-lg font-bold text-gold-700">55%</p>
        </div>
      </div>
    </div>
  );
}