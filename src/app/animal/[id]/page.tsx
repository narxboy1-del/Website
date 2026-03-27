"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Weight,
  Calendar,
  Palette,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import {
  initialAnimals,
  type Animal,
  formatPrice,
  getTypeEmoji,
  getTypeLabel,
} from "@/data/animals";
import CertBadge from "@/components/CertBadge";
import WeightSimulator from "@/components/WeightSimulator";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import MagneticButton from "@/components/MagneticButton";

export default function AnimalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch("/api/animals");
        const data = await res.json();
        const found = data.find((a: Animal) => a.id === params.id);
        setAnimal(found || null);
      } catch {
        const found = initialAnimals.find((a) => a.id === params.id);
        setAnimal(found || null);
      }
      setIsLoading(false);
    };
    fetchAnimal();
  }, [params.id]);

  // Reset image loaded state when switching images
  useEffect(() => {
    setImageLoaded(false);
  }, [currentImageIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          className="w-16 h-16 border-4 border-forest-200 border-t-forest-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <span className="text-6xl block mb-4">😔</span>
          <h2 className="font-display text-2xl font-bold text-forest-700 mb-2">
            Animal Not Found
          </h2>
          <p className="text-earth-400 mb-6">
            The animal you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/catalog" className="btn-premium !rounded-xl">
            <span>Back to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((i) =>
      i === animal.images.length - 1 ? 0 : i + 1
    );
  const prevImage = () =>
    setCurrentImageIndex((i) =>
      i === 0 ? animal.images.length - 1 : i - 1
    );

  const whatsappMessage = `Assalamualaikum, saya tertarik dengan ${animal.name} (${animal.breed}, ${animal.weight}kg) - ${formatPrice(animal.price)}. Apakah masih tersedia?`;
  const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-20"
    >
      <IslamicPattern opacity={0.02} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-forest-600 hover:text-forest-700 mb-8 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Back to Collection</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium bg-earth-100">
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-earth-100">
                    <div className="text-center">
                      <motion.div
                        className="text-6xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {getTypeEmoji(animal.type)}
                      </motion.div>
                      <p className="text-sm text-earth-400 mt-2">Loading...</p>
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={animal.images[currentImageIndex]}
                      alt={`${animal.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {animal.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/80 transition-colors z-30"
                    >
                      <ChevronLeft size={20} className="text-forest-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/80 transition-colors z-30"
                    >
                      <ChevronRight size={20} className="text-forest-700" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full text-xs font-medium text-forest-700 z-30">
                  {currentImageIndex + 1} / {animal.images.length}
                </div>

                {/* Type badge */}
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-sm font-bold text-forest-700 z-30">
                  {getTypeEmoji(animal.type)} {getTypeLabel(animal.type)}
                </div>
              </div>

              {/* Thumbnail strip */}
              {animal.images.length > 1 && (
                <div className="flex gap-3">
                  {animal.images.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        i === currentImageIndex
                          ? "border-forest-500 shadow-lg"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={img}
                        alt={`Thumb ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-forest-800">
                      {animal.name}
                    </h1>
                    <p className="text-earth-500 text-lg">{animal.breed}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      className="w-10 h-10 rounded-full bg-earth-50 flex items-center justify-center text-earth-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={18} />
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 rounded-full bg-earth-50 flex items-center justify-center text-earth-400 hover:text-forest-600 hover:bg-forest-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {animal.certification.map((cert) => (
                    <CertBadge key={cert} type={cert} size="md" />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="glass-gold rounded-2xl p-6">
                <p className="text-sm text-gold-600/70 uppercase tracking-wider mb-1">
                  Price
                </p>
                <p className="text-3xl font-display font-bold text-forest-800">
                  {formatPrice(animal.price)}
                </p>
                {animal.type === "cow" && (
                  <p className="text-sm text-earth-400 mt-1">
                    ≈ {formatPrice(Math.round(animal.price / 7))} per share
                    (1/7)
                  </p>
                )}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Weight,
                    label: "Weight",
                    value: `${animal.weight} kg`,
                    color: "bg-forest-50 text-forest-600",
                  },
                  {
                    icon: Calendar,
                    label: "Age",
                    value: `${animal.age} months`,
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    icon: Palette,
                    label: "Color",
                    value: animal.color,
                    color: "bg-amber-50 text-amber-600",
                  },
                  {
                    icon: Heart,
                    label: "Health",
                    value:
                      animal.healthStatus.charAt(0).toUpperCase() +
                      animal.healthStatus.slice(1),
                    color: "bg-emerald-50 text-emerald-600",
                  },
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <motion.div
                      key={spec.label}
                      className="bg-white rounded-2xl p-4 border border-earth-100"
                      whileHover={{ y: -3 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${spec.color} flex items-center justify-center mb-2`}
                      >
                        <Icon size={16} />
                      </div>
                      <p className="text-xs text-earth-400">{spec.label}</p>
                      <p className="font-semibold text-forest-800">
                        {spec.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display text-lg font-bold text-forest-800 mb-3">
                  About This Animal
                </h3>
                <p className="text-earth-500 leading-relaxed">
                  {animal.description}
                </p>
              </div>

              {/* Weight Simulator */}
              <WeightSimulator
                currentWeight={animal.weight}
                type={animal.type}
              />

              {/* CTA */}
              <div className="flex gap-4 pt-4">
                <MagneticButton strength={15} className="flex-1">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition-colors"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(34,197,94,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor-text="ORDER"
                  >
                    <MessageCircle size={22} />
                    Order via WhatsApp
                  </motion.a>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.div>
  );
}