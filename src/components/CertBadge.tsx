"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Star, Leaf } from "lucide-react";

const badgeConfig: Record<
  string,
  { icon: typeof Shield; label: string; color: string; bg: string }
> = {
  "veterinary-checked": {
    icon: Shield,
    label: "Vet Verified",
    color: "text-forest-600",
    bg: "bg-forest-50 border-forest-200",
  },
  "halal-certified": {
    icon: Star,
    label: "Halal Certified",
    color: "text-gold-600",
    bg: "bg-gold-50 border-gold-200",
  },
  "premium-grade": {
    icon: Heart,
    label: "Premium Grade",
    color: "text-rose-600",
    bg: "bg-rose-50 border-rose-200",
  },
  "organic-fed": {
    icon: Leaf,
    label: "Organic Fed",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
};

export default function CertBadge({
  type,
  size = "sm",
}: {
  type: string;
  size?: "sm" | "md" | "lg";
}) {
  const config = badgeConfig[type];
  if (!config) return null;

  const Icon = config.icon;
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };
  const iconSize = { sm: 12, md: 14, lg: 16 };

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border font-medium ${config.bg} ${config.color} ${sizeClasses[size]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={iconSize[size]} />
      {config.label}
    </motion.span>
  );
}