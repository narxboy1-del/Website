"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="relative bg-forest-800 text-white/60 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#1b4332"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  QurbanElite
                </h3>
                <p className="text-xs text-gold-400/60 tracking-widest uppercase">
                  Premium Livestock
                </p>
              </div>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-6">
              Providing the finest selection of premium livestock for your sacred
              Qurban. Quality, trust, and Islamic values in every animal we
              raise.
            </p>
            <p className="font-arabic text-lg text-gold-400/40">
              بارك الله فيكم
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Catalog", href: "/catalog" },
                { label: "Calculator", href: "/#calculator" },
                { label: "About Us", href: "/#about" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <MagneticButton key={link.href} strength={10}>
                  <Link
                    href={link.href}
                    className="block text-sm text-white/40 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Categories
            </h4>
            <div className="space-y-3">
              {[
                { label: "🐄 Premium Cows", href: "/catalog?type=cow" },
                { label: "🐐 Quality Goats", href: "/catalog?type=goat" },
                { label: "🐑 Fine Sheep", href: "/catalog?type=sheep" },
              ].map((link) => (
                <MagneticButton key={link.href} strength={10}>
                  <Link
                    href={link.href}
                    className="block text-sm text-white/40 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} QurbanElite. All rights reserved.
          </p>
          <motion.p
            className="text-sm text-white/30 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={14} className="text-rose-400" />
            </motion.span>{" "}
            for the Ummah
          </motion.p>
        </div>
      </div>
    </footer>
  );
}