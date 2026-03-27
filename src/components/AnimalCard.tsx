"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Weight, Calendar, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";
import CertBadge from "./CertBadge";
import SpotlightCard from "./SpotlightCard";
import { type Animal, formatPrice, getTypeEmoji } from "@/data/animals";

interface AnimalCardProps {
  animal: Animal;
  index?: number;
}

export default function AnimalCard({ animal, index = 0 }: AnimalCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const healthColors = {
    excellent: "bg-emerald-500",
    good: "bg-blue-500",
    certified: "bg-gold-500",
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&h=600&fit=crop&q=80";

  return (
    <TiltCard tiltAmount={5} glareOpacity={0.1}>
      <SpotlightCard className="rounded-2xl h-full">
        <Link href={`/animal/${animal.id}`}>
          <motion.div
            className="card-premium group cursor-pointer h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-earth-100">
              {/* Loading skeleton */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 z-10">
                  <div className="w-full h-full bg-gradient-to-r from-earth-100 via-earth-50 to-earth-100 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl animate-bounce">
                      {getTypeEmoji(animal.type)}
                    </div>
                  </div>
                </div>
              )}

              {/* Error fallback */}
              {imageError && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-earth-100">
                  <div className="text-center">
                    <span className="text-5xl block mb-2">
                      {getTypeEmoji(animal.type)}
                    </span>
                    <span className="text-xs text-earth-400">
                      {animal.name}
                    </span>
                  </div>
                </div>
              )}

              <Image
                src={imageError ? fallbackImage : animal.image}
                alt={animal.name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={index < 3}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />

              {/* Type badge */}
              <div className="absolute top-4 left-4 z-[3]">
                <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-forest-700 flex items-center gap-1">
                  {getTypeEmoji(animal.type)}
                  {animal.type.charAt(0).toUpperCase() + animal.type.slice(1)}
                </span>
              </div>

              {/* Featured badge */}
              {animal.featured && (
                <motion.div
                  className="absolute top-4 right-4 z-[3]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold-400/90 text-forest-900 text-xs font-bold backdrop-blur-sm">
                    <Sparkles size={12} />
                    Featured
                  </span>
                </motion.div>
              )}

              {/* Health indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-[3]">
                <span
                  className={`w-2 h-2 rounded-full ${healthColors[animal.healthStatus]} animate-pulse`}
                />
                <span className="text-xs text-white/80 font-medium capitalize">
                  {animal.healthStatus}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-500 flex items-center justify-center z-[4]">
                <motion.span className="px-6 py-2 rounded-full bg-white/90 text-forest-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  View Details →
                </motion.span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-forest-800 mb-1 group-hover:text-forest-600 transition-colors">
                {animal.name}
              </h3>
              <p className="text-sm text-earth-600 mb-3">{animal.breed}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-forest-600">
                  <Weight size={14} className="text-gold-500" />
                  <span className="font-semibold">{animal.weight} kg</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-forest-600">
                  <Calendar size={14} className="text-gold-500" />
                  <span className="font-semibold">{animal.age} months</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {animal.certification.slice(0, 2).map((cert) => (
                  <CertBadge key={cert} type={cert} size="sm" />
                ))}
                {animal.certification.length > 2 && (
                  <span className="text-xs text-earth-400 self-center">
                    +{animal.certification.length - 2} more
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-earth-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-earth-400 uppercase tracking-wider">
                      Starting from
                    </p>
                    <p className="text-xl font-display font-bold text-forest-700">
                      {formatPrice(animal.price)}
                    </p>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center group-hover:bg-forest-600 transition-colors duration-300"
                    whileHover={{ rotate: 45 }}
                  >
                    <span className="text-forest-600 group-hover:text-white transition-colors text-lg">
                      →
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  );
}