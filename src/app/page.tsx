"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedAnimals from "@/components/FeaturedAnimals";
import TrustIndicators from "@/components/TrustIndicators";
import StatsSection from "@/components/StatsSection";
import QurbanCalculator from "@/components/QurbanCalculator";
import AboutPreview from "@/components/AboutPreview";
import EidCountdown from "@/components/EidCountdown";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";
import { initialAnimals, type Animal } from "@/data/animals";

export default function HomePage() {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);

  useEffect(() => {
    fetch("/api/animals")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setAnimals(data);
      })
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <Hero />
      <FeaturedAnimals animals={animals} />
      <StatsSection />
      <TrustIndicators />
      <AboutPreview />
      <EidCountdown />
      <QurbanCalculator />
      <ContactSection />
    </PageTransition>
  );
}