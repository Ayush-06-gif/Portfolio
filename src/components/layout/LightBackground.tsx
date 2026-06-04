"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function InteractiveDots() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      {/* Faint Base Dots (No Lines) */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(138, 131, 120, 0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
        }}
      />
      {/* Glowing Highlight Dots that follow the mouse */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, var(--terracotta) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
          opacity: 0.6,
          maskImage: "radial-gradient(250px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(250px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)",
          transition: "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out", // Smooth tracking
        }}
      />
    </div>
  );
}

export function LightBackground() {
  const [mounted, setMounted] = useState(false);
  const [shapes, setShapes] = useState<any[]>([]);
  
  useEffect(() => {
    setMounted(true);
    const generatedShapes = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      type: ["dot", "circle", "cross"][Math.floor(Math.random() * 3)],
      size: Math.random() * 8 + 6, // Between 6px and 14px
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
    <div className="light-theme-bg" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden", background: "var(--cream)" }}>
      
      {/* 1. Premium Animated Mesh Gradient (Stripe-Style Aurora) */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.8, filter: "blur(90px)" }}>
        {/* Top Left Warm Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ["0%", "5%", "0%"],
            y: ["0%", "5%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-15%", left: "-10%",
            width: "60vw", height: "60vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199, 92, 44, 0.12), transparent 70%)", // Terracotta
          }}
        />
        {/* Bottom Right Sage Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: ["0%", "-5%", "0%"],
            y: ["0%", "5%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-20%", right: "-10%",
            width: "70vw", height: "70vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123, 158, 107, 0.10), transparent 70%)", // Sage
          }}
        />
        {/* Center Dust Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: ["0%", "8%", "0%"],
            y: ["0%", "-8%", "0%"],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "20%", left: "30%",
            width: "55vw", height: "55vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(207, 168, 154, 0.08), transparent 70%)", // Dusty Rose
          }}
        />
      </div>

      {/* 2. Floating Geometric Shapes (Crosses & Dots) */}
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
            opacity: 0.35, // Soft visibility
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

      {/* 3. Interactive Dot Matrix Overlay */}
      <InteractiveDots />
      
      {/* Top/Bottom Fading Mask to ensure the dots don't abruptly end at the screen edge on mobile */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, var(--cream) 0%, transparent 5%, transparent 95%, var(--cream) 100%)",
      }} />
    </div>
  );
}
