"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, Leaf, Heart } from "lucide-react";
import AnimalCard from "./AnimalCard";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern, { IslamicDivider } from "./IslamicPattern";
import InfiniteMarquee from "./InfiniteMarquee";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import { type Animal } from "@/data/animals";

export default function FeaturedAnimals({
  animals,
}: {
  animals: Animal[];
}) {
  const featured = animals.filter((a) => a.featured).slice(0, 6);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <IslamicPattern opacity={0.02} />

      {/* Trust Marquee Banner */}
      <div className="mb-16">
        <InfiniteMarquee
          speed={25}
          className="py-4 border-y border-earth-200/50 bg-forest-50/50"
        >
          <div className="flex items-center gap-12">
            {[
              { icon: Star, text: "Premium Quality" },
              { icon: Shield, text: "Veterinary Verified" },
              { icon: Leaf, text: "Organic Fed" },
              { icon: Heart, text: "Ethically Raised" },
              { icon: Star, text: "Halal Certified" },
              { icon: Shield, text: "Health Guaranteed" },
              { icon: Leaf, text: "Natural Grazing" },
              { icon: Heart, text: "Trusted Since 2014" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-forest-600/60 whitespace-nowrap"
                >
                  <Icon size={16} className="text-gold-500/60" />
                  <span className="text-sm font-medium tracking-wider uppercase">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </InfiniteMarquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with TextReveal */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span className="inline-block px-4 py-1.5 rounded-full bg-forest-50 text-forest-600 text-sm font-medium mb-4">
              Our Finest Selection
            </motion.span>

            <TextReveal
              text="Featured Premium Livestock"
              className="font-display text-3xl md:text-5xl font-bold text-forest-800 mb-4"
              type="word"
            />

            <p className="text-earth-500 max-w-2xl mx-auto text-lg mt-4">
              Hand-picked animals that represent the pinnacle of health,
              quality, and care — worthy of your sacred Qurban.
            </p>
          </div>
        </ScrollReveal>

        <IslamicDivider />

        {/* Animal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <MagneticButton strength={25}>
              <Link href="/catalog">
                <motion.button
                  className="btn-premium !rounded-full !px-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-text="VIEW"
                >
                  <span className="flex items-center gap-2">
                    View Full Collection
                    <ArrowRight size={18} />
                  </span>
                </motion.button>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}