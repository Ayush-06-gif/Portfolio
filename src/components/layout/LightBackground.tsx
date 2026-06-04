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
    const generatedShapes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: ["dot", "circle", "cross"][Math.floor(Math.random() * 3)],
      size: Math.random() * 15 + 8, // Between 8px and 23px
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
      {/* Light subtle gradient overlay for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top left, rgba(199, 92, 44, 0.04), transparent 50%), radial-gradient(circle at bottom right, rgba(123, 158, 107, 0.04), transparent 50%)",
        }}
      />
      
      {/* Background Subtle Architect Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(to right, rgba(138, 131, 120, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(138, 131, 120, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Floating Geometric Shapes */}
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          animate={{
            y: ["-15px", "15px", "-15px"],
            x: ["-5px", "5px", "-5px"],
            rotate: s.type === "cross" ? [0, 90, 0] : 0,
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
