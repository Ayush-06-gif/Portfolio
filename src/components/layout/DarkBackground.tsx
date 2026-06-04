"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DarkBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="dark-theme-bg" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated Glow Orbs (Nebula effect) */}
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(199, 92, 44, 0.06) 0%, transparent 60%)", // Terracotta tint
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(123, 158, 107, 0.05) 0%, transparent 60%)", // Sage tint
          filter: "blur(100px)",
        }}
      />

      {/* Center ambient glow */}
      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(212, 165, 116, 0.03) 0%, transparent 70%)", // Clay tint
          filter: "blur(120px)",
        }}
      />

      {/* The stars are applied via CSS in globals.css, this component just adds the premium glows. */}
    </div>
  );
}
