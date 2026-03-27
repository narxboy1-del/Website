"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import PageTransition from "@/components/PageTransition";
import {
  initialAnimals,
  type Animal,
  formatPrice,
} from "@/data/animals";

type SortKey = "price-asc" | "price-desc" | "weight-asc" | "weight-desc" | "name";

export default function CatalogPage() {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [healthFilter, setHealthFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/animals")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setAnimals(data);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let result = [...animals];

    if (typeFilter !== "all") {
      result = result.filter((a) => a.type === typeFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.breed.toLowerCase().includes(q)
      );
    }

    if (healthFilter !== "all") {
      result = result.filter((a) => a.healthStatus === healthFilter);
    }

    result = result.filter(
      (a) => a.price >= priceRange[0] && a.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "weight-asc":
        result.sort((a, b) => a.weight - b.weight);
        break;
      case "weight-desc":
        result.sort((a, b) => b.weight - a.weight);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [animals, typeFilter, searchQuery, sortBy, healthFilter, priceRange]);

  const types = [
    { key: "all", label: "Semua", emoji: "✨" },
    { key: "cow", label: "Sapi", emoji: "🐄" },
    { key: "goat", label: "Kambing", emoji: "🐐" },
    { key: "sheep", label: "Domba", emoji: "🐑" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Header */}
        <section className="relative py-16 bg-gradient-to-b from-forest-600 to-forest-700 overflow-hidden">
          <IslamicPattern opacity={0.05} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Koleksi <span className="text-gold-400">Premium</span> Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-lg max-w-xl mx-auto"
            >
              Pilih hewan Qurban terbaik dari koleksi kami yang sudah terverifikasi kesehatannya.
            </motion.p>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="relative py-12 islamic-pattern-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <ScrollReveal>
              <div className="glass rounded-2xl p-4 md:p-6 mb-10 shadow-glass">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400"
                    />
                    <input
                      type="text"
                      placeholder="Cari nama atau jenis..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-earth-200 text-forest-800 placeholder:text-earth-300 focus:outline-none focus:ring-2 focus:ring-forest-400/30 focus:border-forest-400 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-300 hover:text-earth-500"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <ArrowUpDown
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortKey)}
                      className="pl-10 pr-8 py-3 rounded-xl bg-white border border-earth-200 text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-400/30 focus:border-forest-400 appearance-none cursor-pointer text-sm"
                    >
                      <option value="name">Nama</option>
                      <option value="price-asc">Harga: Rendah → Tinggi</option>
                      <option value="price-desc">Harga: Tinggi → Rendah</option>
                      <option value="weight-asc">Berat: Ringan → Berat</option>
                      <option value="weight-desc">Berat: Berat → Ringan</option>
                    </select>
                  </div>

                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-colors ${
                      showFilters
                        ? "bg-forest-600 text-white border-forest-600"
                        : "bg-white border-earth-200 text-forest-700 hover:bg-forest-50"
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    Filter
                  </button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-earth-100 grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Status Kesehatan
                          </label>
                          <select
                            value={healthFilter}
                            onChange={(e) => setHealthFilter(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-earth-200 text-forest-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
                          >
                            <option value="all">Semua</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Harga Maks: {formatPrice(priceRange[1])}
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={50000000}
                            step={1000000}
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], Number(e.target.value)])
                            }
                            className="w-full accent-forest-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>

            {/* Type Tabs */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {types.map((type) => (
                <motion.button
                  key={type.key}
                  onClick={() => setTypeFilter(type.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    typeFilter === type.key
                      ? "bg-forest-600 text-white shadow-lg"
                      : "bg-white text-forest-700 border border-earth-200 hover:border-forest-300 hover:bg-forest-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1.5">{type.emoji}</span>
                  {type.label}
                </motion.button>
              ))}
            </div>

            {/* Results Count */}
            <motion.p className="text-sm text-earth-400 mb-6" layout>
              Menampilkan{" "}
              <span className="font-semibold text-forest-700">
                {filtered.length}
              </span>{" "}
              hewan
            </motion.p>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={`${typeFilter}-${sortBy}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filtered.map((animal, i) => (
                    <AnimalCard key={animal.id} animal={animal} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <span className="text-6xl block mb-4">🔍</span>
                  <h3 className="font-display text-xl font-bold text-forest-700 mb-2">
                    Tidak Ditemukan
                  </h3>
                  <p className="text-earth-400">
                    Coba ubah filter atau kata kunci pencarian.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}