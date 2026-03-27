"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import ParticleField from "./ParticleField";
import MorphingBlob from "./MorphingBlob";
import MouseParallax from "./MouseParallax";
import GradientMesh from "./GradientMesh";
import TextReveal from "./TextReveal";
import Typewriter from "./Typewriter";
import MagneticButton from "./MagneticButton";
import LiquidWave from "./LiquidWave";

function HeroCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const durationMs = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(target.toFixed(decimals));
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Gradient Mesh */}
      <GradientMesh />

      {/* Morphing Blobs with parallax */}
      <MouseParallax strength={15} className="absolute top-20 left-10">
        <MorphingBlob color="rgba(212,175,55,0.06)" size={500} />
      </MouseParallax>

      <MouseParallax strength={10} inverted className="absolute bottom-20 right-10">
        <MorphingBlob color="rgba(64,145,108,0.06)" size={400} />
      </MouseParallax>

      {/* Overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.15' stroke-width='0.5'%3E%3Cpolygon points='50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35'/%3E%3Ccircle cx='50' cy='50' r='30'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating particles */}
      <ParticleField count={50} />

      {/* Radial light effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Arabic bismillah with parallax */}
          <motion.div variants={itemVariants}>
            <MouseParallax strength={5}>
              <p className="font-arabic text-2xl md:text-3xl text-gold-300/80 mb-6">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>
            </MouseParallax>
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8"
          >
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-sm font-medium text-gold-300 tracking-widest uppercase">
              Premium Qurban Experience
            </span>
            <Sparkles size={14} className="text-gold-400" />
          </motion.div>

          {/* Text Reveal Headline */}
          <motion.div variants={itemVariants}>
            <TextReveal
              text="Sacred Quality,"
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]"
              tag="h1"
              type="word"
            />
          </motion.div>

          {/* Typewriter Effect */}
          <motion.div variants={itemVariants} className="mt-2 mb-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300">
                <Typewriter
                  words={[
                    "Divine Purpose",
                    "Premium Quality",
                    "Sacred Trust",
                    "Blessed Choice",
                  ]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseDuration={2500}
                />
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Experience the finest selection of premium livestock for your
            Qurban. Every animal is health-verified, ethically raised, and
            prepared with the highest standards of Islamic values.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton strength={30}>
              <Link href="/catalog">
                <motion.button
                  className="btn-gold !rounded-full !px-10 !py-4 text-base font-bold"
                  whileHover={{
                    boxShadow: "0 0 50px rgba(212,175,55,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-text="VIEW"
                >
                  <span className="flex items-center gap-2">
                    Explore Collection
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </MagneticButton>

            <MagneticButton strength={30}>
              <Link href="/#calculator">
                <motion.button
                  className="px-10 py-4 rounded-full text-base font-semibold text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileTap={{ scale: 0.97 }}
                >
                  Qurban Calculator
                </motion.button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Animated Stats Counter with Parallax */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { value: 500, suffix: "+", label: "Animals Sold", decimals: 0 },
              { value: 100, suffix: "%", label: "Health Verified", decimals: 0 },
              { value: 4.9, suffix: "★", label: "Customer Rating", decimals: 1 },
            ].map((stat) => (
              <MouseParallax key={stat.label} strength={3}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-gold-400">
                    <HeroCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              </MouseParallax>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with magnetic effect */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <MagneticButton strength={15}>
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <span className="text-xs text-white/30 tracking-widest uppercase">
              Scroll
            </span>
            <ArrowDown size={20} className="text-gold-400/50" />
          </div>
        </MagneticButton>
      </motion.div>

      {/* Liquid Waves at bottom */}
      <LiquidWave color="#faf7f2" opacity={0.3} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent z-10" />
    </section>
  );
}