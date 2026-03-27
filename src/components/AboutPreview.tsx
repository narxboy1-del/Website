"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";
import ImageReveal from "./ImageReveal";
import AnimatedCounter from "./AnimatedCounter";
import TextReveal from "./TextReveal";

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <IslamicPattern opacity={0.02} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column with Reveal Effect */}
          <ScrollReveal direction="left">
            <div className="relative">
              <motion.div style={{ y: imageY }} className="relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
                  alt="Our Premium Farm"
                  className="h-[500px] rounded-3xl shadow-premium"
                  direction="left"
                  overlayColor="#1b4332"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent z-[5]" />
                </ImageReveal>

                {/* Floating stats card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 z-30"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold text-forest-700">
                        <AnimatedCounter target={10} suffix="+" />
                      </p>
                      <p className="text-xs text-earth-500">Years</p>
                    </div>
                    <div className="text-center border-x border-earth-200">
                      <p className="text-2xl font-display font-bold text-forest-700">
                        <AnimatedCounter target={5} suffix="K+" />
                      </p>
                      <p className="text-xs text-earth-500">Customers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold text-forest-700">
                        <AnimatedCounter target={100} suffix="%" />
                      </p>
                      <p className="text-xs text-earth-500">Trusted</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold-300/30 rounded-3xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-forest-100/50 rounded-3xl -z-10" />
            </div>
          </ScrollReveal>

          {/* Text Column */}
          <ScrollReveal direction="right">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 text-forest-600 text-sm font-medium mb-6">
                <Award size={14} />
                Our Story
              </span>

              <TextReveal
                text="A Legacy of Excellence in Livestock Care"
                className="font-display text-3xl md:text-4xl font-bold text-forest-800 mb-6 leading-tight"
                type="word"
                delay={0.2}
              />

              <p className="text-earth-500 text-lg leading-relaxed mb-6 mt-6">
                For over a decade, QurbanElite has been the trusted name in
                premium livestock. Our journey began with a simple belief: every
                Qurban deserves an animal raised with the utmost care, health,
                and respect for Islamic values.
              </p>

              <p className="text-earth-400 leading-relaxed mb-8">
                From our lush green pastures to your doorstep, we ensure every
                step of the process upholds the highest standards of quality.
                Our team of experienced veterinarians and caretakers work
                tirelessly to raise livestock that you can be proud of.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Located in Central Java",
                    desc: "50 hectares of premium grazing land",
                  },
                  {
                    icon: Clock,
                    title: "Established 2014",
                    desc: "10+ years of trusted service",
                  },
                  {
                    icon: Award,
                    title: "Certified Excellence",
                    desc: "ISO 9001 certified farm operations",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0 group-hover:bg-forest-100 transition-colors">
                        <Icon size={18} className="text-forest-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-forest-700">
                          {item.title}
                        </h4>
                        <p className="text-sm text-earth-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}