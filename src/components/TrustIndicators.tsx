"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Award, Leaf, Users, CheckCircle2 } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";
import TextReveal from "./TextReveal";
import SpotlightCard from "./SpotlightCard";

const indicators = [
  {
    icon: Shield,
    title: "Veterinary Verified",
    description:
      "Every animal undergoes thorough health inspections by certified veterinarians before listing.",
    color: "from-forest-500 to-forest-600",
  },
  {
    icon: Award,
    title: "Halal Certified",
    description:
      "All processes follow strict Islamic guidelines, ensuring your Qurban meets the highest standards.",
    color: "from-gold-400 to-gold-600",
  },
  {
    icon: Leaf,
    title: "Organic & Natural",
    description:
      "Premium organic feed and natural grazing environments for the healthiest livestock.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Heart,
    title: "Ethically Raised",
    description:
      "Animals are raised with compassion in spacious, clean, and stress-free environments.",
    color: "from-rose-400 to-rose-500",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our experienced team ensures every animal receives personalized care and attention.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: CheckCircle2,
    title: "Quality Guarantee",
    description:
      "Full transparency in weight, age, and health status. What you see is what you get.",
    color: "from-amber-500 to-amber-600",
  },
];

export default function TrustIndicators() {
  return (
    <section className="relative py-24 md:py-32 bg-forest-600 overflow-hidden">
      <IslamicPattern opacity={0.05} />

      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
              Why Choose Us
            </span>

            <TextReveal
              text="Built on Trust & Excellence"
              className="font-display text-3xl md:text-5xl font-bold text-white mb-4"
              type="word"
            />

            <p className="text-white/50 max-w-2xl mx-auto text-lg mt-4">
              Every aspect of our service is designed to give you peace of mind
              and the highest quality Qurban experience.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {indicators.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <SpotlightCard className="rounded-2xl">
                  <motion.div
                    className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}