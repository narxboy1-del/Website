"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function EidCountdown() {
  // Idul Adha 2025: ~7 Juni 2025 (perkiraan)
  const eidDate = new Date("2025-06-07T00:00:00+07:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eidDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const blocks = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-700 via-forest-600 to-forest-700" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.5' stroke-opacity='0.3'%3E%3Cpolygon points='40,5 47,25 68,25 52,38 58,58 40,46 22,58 28,38 12,25 33,25'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-sm font-medium mb-6 backdrop-blur-sm border border-gold-400/20"
          >
            🕌 Idul Adha 1446 H
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Persiapkan Qurban Anda
          </h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto">
            Jangan sampai kehabisan! Pesan hewan Qurban premium sebelum waktu habis.
          </p>
        </ScrollReveal>

        {/* Countdown Blocks */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-3 md:gap-6">
            {blocks.map((block, i) => (
              <div key={block.label} className="flex items-center gap-3 md:gap-6">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <motion.span
                      key={block.value}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl md:text-4xl font-display font-bold text-white"
                    >
                      {String(block.value).padStart(2, "0")}
                    </motion.span>
                  </div>
                  <p className="text-white/40 text-xs md:text-sm mt-2 font-medium">
                    {block.label}
                  </p>
                </motion.div>

                {/* Separator */}
                {i < blocks.length - 1 && (
                  <motion.span
                    className="text-gold-400/50 text-2xl md:text-3xl font-bold mb-6"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <motion.a
            href="/catalog"
            className="inline-flex items-center gap-2 mt-10 px-8 py-3.5 rounded-full bg-gold-400 text-forest-900 font-bold hover:bg-gold-300 transition-colors shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Pesan Sekarang →
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}