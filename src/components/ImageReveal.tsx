"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type ReactNode } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  overlayColor?: string;
  children?: ReactNode;
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  direction = "left",
  overlayColor = "#1b4332",
  children,
}: ImageRevealProps) {
  const isHorizontal = direction === "left" || direction === "right";

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="w-full h-full"
        variants={{
          hidden: { scale: 1.3 },
          visible: {
            scale: 1,
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
          },
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20"
        style={{ backgroundColor: "#d4af37" }}
        variants={{
          hidden: {
            [isHorizontal ? "x" : "y"]: "0%",
          },
          visible: {
            [isHorizontal ? "x" : "y"]:
              direction === "left" || direction === "up" ? "100%" : "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0,
            },
          },
        }}
      />

      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
        variants={{
          hidden: {
            [isHorizontal ? "x" : "y"]: "0%",
          },
          visible: {
            [isHorizontal ? "x" : "y"]:
              direction === "left" || direction === "up" ? "100%" : "-100%",
            transition: {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            },
          },
        }}
      />
    </motion.div>
  );
}