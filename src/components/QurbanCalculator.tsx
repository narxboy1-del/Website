"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, Beef, Info } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";

export default function QurbanCalculator() {
  const [animalType, setAnimalType] = useState<"cow" | "goat" | "sheep">(
    "cow"
  );
  const [weight, setWeight] = useState(400);
  const [people, setPeople] = useState(7);

  const maxShares: Record<string, number> = {
    cow: 7,
    goat: 1,
    sheep: 1,
  };

  const meatPercentage = 0.55;
  const totalMeat = weight * meatPercentage;
  const meatPerPerson = totalMeat / people;

  const priceRanges: Record<string, { min: number; max: number }> = {
    cow: { min: 20000000, max: 40000000 },
    goat: { min: 2500000, max: 7000000 },
    sheep: { min: 3000000, max: 6000000 },
  };

  const estimatedPrice =
    priceRanges[animalType].min +
    ((weight - 200) / 400) *
      (priceRanges[animalType].max - priceRanges[animalType].min);
  const pricePerPerson = estimatedPrice / people;

  const types = [
    { key: "cow" as const, label: "Cow", emoji: "🐄", maxW: 600 },
    { key: "goat" as const, label: "Goat", emoji: "🐐", maxW: 70 },
    { key: "sheep" as const, label: "Sheep", emoji: "🐑", maxW: 70 },
  ];

  return (
    <section
      id="calculator"
      className="relative py-24 md:py-32 overflow-hidden islamic-pattern-bg"
    >
      <IslamicPattern opacity={0.03} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 text-gold-700 text-sm font-medium mb-4 border border-gold-200">
              <Calculator size={14} />
              Interactive Tool
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-forest-800 mb-4">
              Qurban{" "}
              <span className="text-gradient-gold bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-400">
                Calculator
              </span>
            </h2>
            <p className="text-earth-500 max-w-xl mx-auto">
              Plan your Qurban with precision. Calculate shares, meat
              distribution, and estimated costs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass rounded-3xl p-6 md:p-10 shadow-premium">
            {/* Animal Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-forest-700 mb-3">
                Select Animal Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {types.map((type) => (
                  <motion.button
                    key={type.key}
                    onClick={() => {
                      setAnimalType(type.key);
                      setPeople(
                        Math.min(people, maxShares[type.key])
                      );
                      if (type.key === "cow") setWeight(400);
                      else setWeight(40);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      animalType === type.key
                        ? "border-forest-500 bg-forest-50 shadow-lg"
                        : "border-earth-200 bg-white hover:border-forest-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-3xl block mb-1">{type.emoji}</span>
                    <span
                      className={`text-sm font-semibold ${
                        animalType === type.key
                          ? "text-forest-700"
                          : "text-earth-500"
                      }`}
                    >
                      {type.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Weight Slider */}
              <div>
                <label className="block text-sm font-semibold text-forest-700 mb-3">
                  Animal Weight
                </label>
                <div className="bg-white rounded-2xl p-6 border border-earth-100">
                  <div className="text-center mb-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={weight}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-4xl font-display font-bold text-forest-700"
                      >
                        {weight}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-lg text-earth-400 ml-1">kg</span>
                  </div>

                  {/* Visual weight bar */}
                  <div className="relative h-4 bg-earth-100 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-forest-500 to-gold-400"
                      animate={{
                        width: `${
                          animalType === "cow"
                            ? ((weight - 200) / 400) * 100
                            : ((weight - 20) / 50) * 100
                        }%`,
                      }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>

                  <input
                    type="range"
                    min={animalType === "cow" ? 200 : 20}
                    max={animalType === "cow" ? 600 : 70}
                    step={animalType === "cow" ? 10 : 1}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-forest-500 cursor-pointer"
                  />

                  {/* Animal size visual */}
                  <div className="flex justify-center mt-4">
                    <motion.span
                      className="text-5xl"
                      animate={{
                        scale:
                          animalType === "cow"
                            ? 0.6 + (weight - 200) / 800
                            : 0.6 + (weight - 20) / 100,
                      }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {types.find((t) => t.key === animalType)?.emoji}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* People Slider */}
              <div>
                <label className="block text-sm font-semibold text-forest-700 mb-3">
                  Number of Shares
                </label>
                <div className="bg-white rounded-2xl p-6 border border-earth-100">
                  <div className="text-center mb-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={people}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-4xl font-display font-bold text-forest-700"
                      >
                        {people}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-lg text-earth-400 ml-1">
                      {people === 1 ? "person" : "people"}
                    </span>
                  </div>

                  {/* Visual people */}
                  <div className="flex justify-center gap-2 mb-4 min-h-[40px]">
                    {Array.from({ length: maxShares[animalType] }).map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: i < people ? 1 : 0.5,
                            opacity: i < people ? 1 : 0.2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            delay: i * 0.05,
                          }}
                        >
                          <Users
                            size={24}
                            className={
                              i < people
                                ? "text-forest-500"
                                : "text-earth-200"
                            }
                          />
                        </motion.div>
                      )
                    )}
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={maxShares[animalType]}
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full accent-forest-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-xs text-earth-400 mt-1">
                    <span>1</span>
                    <span>{maxShares[animalType]} max</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              layout
            >
              {[
                {
                  label: "Total Meat",
                  value: `${totalMeat.toFixed(0)} kg`,
                  sub: `${(meatPercentage * 100).toFixed(0)}% of weight`,
                  icon: Beef,
                  color: "text-rose-600 bg-rose-50",
                },
                {
                  label: "Per Person",
                  value: `${meatPerPerson.toFixed(1)} kg`,
                  sub: "estimated share",
                  icon: Users,
                  color: "text-forest-600 bg-forest-50",
                },
                {
                  label: "Est. Total",
                  value: `Rp ${(estimatedPrice / 1000000).toFixed(1)}M`,
                  sub: "estimated price",
                  icon: Calculator,
                  color: "text-gold-600 bg-gold-50",
                },
                {
                  label: "Per Share",
                  value: `Rp ${(pricePerPerson / 1000000).toFixed(1)}M`,
                  sub: "per person",
                  icon: Info,
                  color: "text-blue-600 bg-blue-50",
                },
              ].map((result) => {
                const Icon = result.icon;
                return (
                  <motion.div
                    key={result.label}
                    className="bg-white rounded-2xl p-4 border border-earth-100 text-center"
                    whileHover={{ y: -3 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${result.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon size={18} />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={result.value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-lg font-display font-bold text-forest-800"
                      >
                        {result.value}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-xs text-earth-400 mt-0.5">
                      {result.label}
                    </p>
                    <p className="text-[10px] text-earth-300 mt-0.5">
                      {result.sub}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}