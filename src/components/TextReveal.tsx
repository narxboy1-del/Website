"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "char" | "word";
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  type = "word",
  tag: Tag = "h2",
}: TextRevealProps) {
  const items = type === "char" ? text.split("") : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === "char" ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -90,
      skewY: type === "char" ? 0 : 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      skewY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className="overflow-hidden"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px" }}
    >
      <Tag className={className}>
        {items.map((item, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={child}
              style={{ transformOrigin: "top left" }}
            >
              {item}
              {type === "word" && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}