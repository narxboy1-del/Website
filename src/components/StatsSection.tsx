"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import IslamicPattern from "./IslamicPattern";

const stats = [
  {
    icon: TrendingUp,
    value: 2500,
    suffix: "+",
    label: "Hewan Terjual",
    description: "Sejak 2014",
    color: "from-forest-500 to-emerald-500",
    bg: "bg-forest-500/10",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Pelanggan Puas",
    description: "Seluruh Indonesia",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    label: "Tersertifikasi",
    description: "Halal & Sehat",
    color: "from-gold-500 to-amber-500",
    bg: "bg-gold-500/10",
  },
  {
    icon: Heart,
    value: 4.9,
    suffix: "/5",
    label: "Rating",
    description: "Customer Review",
    decimals: 1,
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-earth-50 to-cream-50" />

        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-600/[0.02] via-transparent to-gold-400/[0.03]" />

        {/* Islamic pattern */}
        <IslamicPattern opacity={0.025} />

        {/* Soft decorative circles */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-forest-500/[0.02] blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-400/[0.03] blur-[60px]" />
      </div>

      {/* Top & Bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth-200/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest-50 text-forest-600 text-sm font-medium mb-4 border border-forest-100">
              Dipercaya Ribuan Keluarga
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-forest-800">
              Angka yang <span className="text-gradient-gold bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-400">Berbicara</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  className="relative group"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card */}
                  <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-earth-100/80 shadow-sm hover:shadow-lg hover:border-earth-200/80 transition-all duration-500 text-center overflow-hidden">
                    {/* Subtle corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-earth-100/40 to-transparent rounded-bl-[40px]" />

                    {/* Hover glow */}
                    <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                    {/* Icon */}
                    <motion.div
                      className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500`}
                    >
                      <Icon size={22} className="text-white" />
                    </motion.div>

                    {/* Number */}
                    <div className="relative text-3xl md:text-4xl font-display font-bold text-forest-800 mb-1.5">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        decimals={(stat as any).decimals || 0}
                        duration={2.5}
                      />
                    </div>

                    {/* Label */}
                    <h3 className="relative font-semibold text-forest-700 text-sm md:text-base mb-0.5">
                      {stat.label}
                    </h3>
                    <p className="relative text-xs text-earth-400">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom decorative divider */}
        <div className="flex items-center justify-center gap-3 mt-14">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-earth-200/50" />
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold-300/40">
            <polygon
              points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"
              fill="currentColor"
            />
          </svg>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-earth-200/50" />
        </div>
      </div>
    </section>
  );
}