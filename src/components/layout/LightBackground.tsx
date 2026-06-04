"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LightBackground() {
  const [mounted, setMounted] = useState(false);
  
  // We compute the shapes in state so they are stable between client re-renders, 
  // but we wait until mount to avoid hydration mismatches.
  const [shapes, setShapes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const generatedShapes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      type: ["dot", "circle", "cross"][Math.floor(Math.random() * 3)],
      size: Math.random() * 8 + 6, // Between 6px and 14px (reduced from 23px)
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
    <div className="light-theme-bg" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated Glow Orbs (Aurora effect for light theme) */}
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
          background: "radial-gradient(circle, rgba(199, 92, 44, 0.05) 0%, transparent 60%)", // Soft terracotta tint
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
          background: "radial-gradient(circle, rgba(123, 158, 107, 0.04) 0%, transparent 60%)", // Soft sage tint
          filter: "blur(100px)",
        }}
      />

      {/* Center ambient glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
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
      
      {/* Floating Geometric Shapes */}
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
            opacity: 0.25, // Subtle but visible
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {s.type === "dot" && (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", backgroundColor: s.color }} />
          )}
          {s.type === "circle" && (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: `2px solid ${s.color}` }} />
          )}
          {s.type === "cross" && (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 2, backgroundColor: s.color, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 2, backgroundColor: s.color, transform: "translateX(-50%)" }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
