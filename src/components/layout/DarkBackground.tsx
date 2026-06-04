"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DarkBackground() {
  const [mounted, setMounted] = useState(false);
  const [shapes, setShapes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Add geometric shapes tailored for dark mode
    const generatedShapes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      type: ["dot", "circle", "cross"][Math.floor(Math.random() * 3)],
      size: Math.random() * 8 + 6,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      duration: Math.random() * 15 + 20, // 20s to 35s
      delay: Math.random() * 5,
      color: ["var(--terracotta)", "var(--sage)", "var(--clay)", "var(--dusty-rose)"][Math.floor(Math.random() * 4)],
    }));
    setShapes(generatedShapes);
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

      {/* Shooting Stars (Motion Effects) */}
      <motion.div
        animate={{
          x: ["-10vw", "110vw"],
          y: ["-10vh", "110vh"],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
        style={{
          position: "absolute",
          width: 150,
          height: 1,
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%)",
          transform: "rotate(45deg)",
          top: "10%",
          left: "-10vw"
        }}
      />

      <motion.div
        animate={{
          x: ["110vw", "-10vw"],
          y: ["30vh", "150vh"],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 5 }}
        style={{
          position: "absolute",
          width: 200,
          height: 1,
          background: "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
          transform: "rotate(135deg)",
          top: 0,
          right: "-10vw"
        }}
      />

      {/* Floating Geometric Shapes (Dark Mode Version) */}
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          animate={{
            y: ["-50px", "50px", "-50px"],
            x: ["-30px", "30px", "-30px"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: 0.35, // More visible in dark mode
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: `drop-shadow(0 0 8px ${s.color})`, // Neon glow effect
          }}
        >
          {s.type === "dot" && (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", backgroundColor: s.color }} />
          )}
          {s.type === "circle" && (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: `1px solid ${s.color}` }} />
          )}
          {s.type === "cross" && (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1.5, backgroundColor: s.color, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 1.5, backgroundColor: s.color, transform: "translateX(-50%)" }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
