"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-forest-600 overflow-hidden"
    >
      <IslamicPattern opacity={0.04} />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <ScrollReveal direction="left">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                <MessageCircle size={14} />
                Get in Touch
              </span>

              <TextReveal
                text="Ready for Your Premium Qurban?"
                className="font-display text-3xl md:text-5xl font-bold text-white mb-6"
                type="word"
              />

              <p className="text-white/60 text-lg mb-10 leading-relaxed mt-6">
                Our team is here to help you find the perfect animal. Reach out
                to us via WhatsApp for the fastest response, or visit our farm
                for a personal experience.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+62 812-3456-789",
                    sub: "Available 8AM - 8PM",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@qurbanelite.com",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: MapPin,
                    label: "Farm Location",
                    value: "Jl. Peternakan Premium No. 88",
                    sub: "Semarang, Central Java, Indonesia",
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    value: "Mon - Sat: 8:00 AM - 6:00 PM",
                    sub: "Sun: By appointment only",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                        <Icon size={20} className="text-gold-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-white font-semibold">{item.value}</p>
                        <p className="text-sm text-white/40">{item.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: WhatsApp CTA */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="glass-dark rounded-3xl p-8 md:p-10 text-center">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>

              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Chat with Us on WhatsApp
              </h3>
              <p className="text-white/50 mb-8">
                Get instant responses, live photos of animals, and personalized
                recommendations from our team.
              </p>

              <MagneticButton strength={20}>
                <motion.a
                  href="https://wa.me/628123456789?text=Assalamualaikum%2C%20saya%20tertarik%20dengan%20hewan%20qurban%20dari%20QurbanElite"
                  target="_blank"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition-colors"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(34,197,94,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-text="CHAT"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Start Chat Now
                </motion.a>
              </MagneticButton>

              <p className="text-white/30 text-sm mt-4">
                Average response time: 5 minutes
              </p>

              {/* Map placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden h-48 bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin
                    size={32}
                    className="text-gold-400/50 mx-auto mb-2"
                  />
                  <p className="text-sm text-white/30">Interactive map</p>
                  <p className="text-xs text-white/20">
                    Semarang, Central Java
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}