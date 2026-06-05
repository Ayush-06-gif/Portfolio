"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { heroData } from "@/lib/data";
import { TextReveal } from "@/components/animations/TextReveal";
import Image from "next/image";

// Mix real roles with fun ones
const allRoles = [
  "Aspiring AI/ML Engineer 🤖",
  "Professional Bug Creator 🐛",
  "LangChain Developer 🔗",
  "RAG Systems Builder 📚",
  "Chai-Fueled Coder ☕",
  "DSA Enthusiast 🧩",
  "Problem Solver 🎯",
];

// Parallax floating shapes
const parallaxShapes = [
  { size: 14, x: "8%", y: "15%", color: "var(--terracotta)", depth: 0.3 },
  { size: 8, x: "85%", y: "20%", color: "var(--sage)", depth: 0.5 },
  { size: 20, x: "75%", y: "70%", color: "var(--clay-light)", depth: 0.2 },
  { size: 6, x: "20%", y: "80%", color: "var(--dusty-rose)", depth: 0.6 },
  { size: 12, x: "90%", y: "45%", color: "var(--terracotta-light)", depth: 0.4 },
  { size: 10, x: "50%", y: "10%", color: "var(--sage-light)", depth: 0.35 },
  { size: 16, x: "15%", y: "55%", color: "var(--clay)", depth: 0.25 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion native mouse tracking for performance and 3D compatibility
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Springs for smooth 3D tilting
  const rotateX = useSpring(useTransform(mouseY, [-4, 4], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-4, 4], [-12, 12]), { stiffness: 150, damping: 20 });

  const imgRotateX = useSpring(useTransform(mouseY, [-4, 4], [6, -6]), { stiffness: 150, damping: 20 });
  const imgRotateY = useSpring(useTransform(mouseX, [-4, 4], [-6, 6]), { stiffness: 150, damping: 20 });

  const [dotClickCount, setDotClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) return;
      if (!heroCardRef.current) return;
      const rect = heroCardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientX - centerX) / (rect.width / 2)) * 4;
      const yVal = ((e.clientY - centerY) / (rect.height / 2)) * 4;
      
      mouseX.set(x);
      mouseY.set(yVal);
      setMousePos({ x, y: yVal });
    }

    function handleMouseLeave() {
      mouseX.set(0);
      mouseY.set(0);
      setMousePos({ x: 0, y: 0 });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const nameChars = heroData.name.split("");

  // Secret dot click handler
  const handleDotClick = useCallback(() => {
    const newCount = dotClickCount + 1;
    setDotClickCount(newCount);
    if (newCount === 5) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      setDotClickCount(0);
    }
  }, [dotClickCount]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Parallax floating shapes */}
      {parallaxShapes.map((shape, i) => (
        <div
          key={i}
          className="parallax-shape"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            transform: `translate(${mousePos.x * shape.depth * 15}px, ${mousePos.y * shape.depth * 15}px)`,
          }}
        />
      ))}

      {/* Decorative cross shapes */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "12%",
          width: 20,
          height: 20,
          opacity: 0.12,
          pointerEvents: "none",
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px) rotate(45deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div style={{ position: "absolute", width: "100%", height: 2, top: "50%", background: "var(--terracotta)" }} />
        <div style={{ position: "absolute", height: "100%", width: 2, left: "50%", background: "var(--terracotta)" }} />
      </div>

      {/* Decorative Blobs */}
      <div
        className="blob blob-terracotta"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          right: "-10%",
          animation: "blob-drift 12s ease-in-out infinite",
        }}
      />
      <div
        className="blob blob-sage"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          left: "-5%",
          animation: "blob-drift 15s ease-in-out infinite 3s",
        }}
      />
      <div
        className="blob blob-clay"
        style={{
          width: 300,
          height: 300,
          top: "50%",
          left: "40%",
          animation: "blob-drift 10s ease-in-out infinite 6s",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, width: "100%" }}
        ref={heroCardRef}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
            perspective: 1200,
          }}
          className="hero-grid"
        >
          {/* Left — Big Name + Role */}
          <motion.div
            className="hero-left-content"
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ marginBottom: "1.5rem", z: 20 }}
            >
              <span className="badge badge-sage" style={{ gap: "0.5rem" }}>
                <span style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 8,
                  height: 8,
                }}>
                  <span style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "var(--sage)",
                    opacity: 0.6,
                    animation: "float 2s ease-in-out infinite",
                  }} />
                  <span style={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--sage)",
                  }} />
                </span>
                {heroData.availableBadge}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{
                fontSize: "1.1rem",
                color: "var(--stone)",
                marginBottom: "0.75rem",
                fontWeight: 400,
                z: 30,
              }}
            >
              {heroData.greeting}
            </motion.p>

            {/* Name — big serif with character animation */}
            <h1 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "1.25rem",
            }}>
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.04,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "inline-block",
                    perspective: 500,
                    z: 50,
                    color: "var(--ink)",
                    ...(char === " " ? { width: "0.25em" } : {}),
                  }}
                  whileHover={{ scale: 1.1, color: "var(--terracotta)", z: 70 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              {/* Secret clickable dot */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                onClick={handleDotClick}
                whileHover={{ scale: 1.5, z: 80, color: "var(--terracotta-light)" }}
                whileTap={{ scale: 0.8, rotate: 180 }}
                style={{
                  color: "var(--terracotta)",
                  display: "inline-block",
                  marginLeft: "0.05em",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "color 0.3s",
                  z: 50,
                }}
                title={dotClickCount > 0 ? `${5 - dotClickCount} more...` : undefined}
              >
                .
              </motion.span>
            </h1>

            {/* Typing Roles — now with fun roles mixed in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 500,
                color: "var(--charcoal)",
                minHeight: "2rem",
                marginBottom: "1.5rem",
                z: 40,
              }}
            >
              <TextReveal texts={allRoles} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              style={{
                fontSize: "1rem",
                color: "var(--stone)",
                maxWidth: 580,
                lineHeight: 1.7,
                marginBottom: "2rem",
                z: 25,
              }}
            >
              {heroData.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="cta-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              style={{ z: 60 }}
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="btn btn-primary">
                <Sparkles style={{ width: 16, height: 16 }} />
                View Projects
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" download="Ayush_Raj_Resume.pdf" className="btn btn-secondary">
                <ArrowDown style={{ width: 16, height: 16 }} />
                Download Resume
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="btn btn-ghost">
                Contact Me
              </motion.a>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              className="tech-pills-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              style={{ z: 45 }}
            >
              {heroData.techIcons.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2.2 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ y: -5, scale: 1.15, rotate: [-2, 2, 0] }}
                  className="badge badge-neutral"
                  style={{ cursor: "pointer", z: 50 }}
                >
                  <span aria-hidden="true">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Hero Image Area (Premium AI Engineer Aesthetic) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
            }}
            className="hero-image-container"
          >
            {/* --- Layer 1: Background & Particles (Normal Blend) --- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                transformStyle: "preserve-3d",
                transform: `rotateY(${mousePos.x * 0.05}deg) rotateX(${-mousePos.y * 0.05}deg) translateZ(-20px)`,
              }}
            >
              {/* Subtle orange radial glow */}
              <div
                style={{
                  position: "absolute",
                  width: "140%",
                  height: "140%",
                  top: "-20%",
                  left: "-20%",
                  background: "radial-gradient(circle at center, rgba(196, 106, 53, 0.15) 0%, transparent 60%)",
                  zIndex: 0,
                  animation: "pulse-glow 6s ease-in-out infinite alternate",
                }}
              />

              {/* AI Neural-Network Nodes (Floating Particles) */}
              {[
                { top: "15%", left: "20%", size: 6, delay: 0 },
                { top: "25%", left: "80%", size: 8, delay: 1 },
                { top: "75%", left: "15%", size: 10, delay: 2 },
                { top: "85%", left: "75%", size: 6, delay: 1.5 },
                { top: "50%", left: "85%", size: 12, delay: 0.5 },
              ].map((node, i) => (
                <motion.div
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -20, 0], scale: 1 }}
                  transition={{ duration: 5, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                  whileHover={{ scale: 2, backgroundColor: "#fff", boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
                  style={{
                    position: "absolute",
                    width: node.size,
                    height: node.size,
                    borderRadius: "50%",
                    background: "var(--terracotta)",
                    top: node.top,
                    left: node.left,
                    boxShadow: "0 0 15px rgba(196, 106, 53, 0.6)",
                    zIndex: 0,
                    cursor: "pointer",
                  }}
                />
              ))}

              {/* Connecting lines for AI vibe */}
              <svg
                style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0, opacity: 0.15 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 20 15 Q 40 40 80 25"
                  stroke="var(--terracotta)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M 15 75 Q 50 60 75 85"
                  stroke="var(--terracotta)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <motion.path
                  d="M 85 50 Q 50 50 20 15"
                  stroke="var(--terracotta)"
                  strokeWidth="0.2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                  strokeDasharray="2 2"
                />
              </svg>
            </motion.div>

            {/* --- Layer 2: The Image --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 1, delay: 0.6 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
              }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // Multiply blend mode completely eliminates white backgrounds!
                mixBlendMode: "multiply",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="hero-image-wrapper"
                style={{
                  position: "relative",
                  height: "100%",
                  maxWidth: "100%", 
                  aspectRatio: "3/4",
                  transform: `rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg) translateZ(80px)`,
                  transformStyle: "preserve-3d",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // Blends ONLY the borderline (outer 2%), and completely protects the bottom from fading
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 2%, black 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 2%, black 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
                whileHover={{ scale: 1.05, rotateZ: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="/images/hero-image.png"
                  alt="Ayush Raj"
                  className="hero-profile-img"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone-light)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background: "linear-gradient(to bottom, var(--stone-light), transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Easter egg toast */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fun-toast"
          >
            🎉 You found the secret! You&apos;re clearly detail-oriented.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive hero grid & custom animations */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
        
        .hero-left-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .cta-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          justify-content: flex-start;
        }

        .tech-pills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: flex-start;
        }

        .hero-profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 45% center; /* Align face properly across all devices */
        }

        @media (min-width: 768px) {
          .hero-grid {
            padding: 0 2rem !important;
          }
        }

        @media (min-width: 1024px) {
          .hero-grid {
            padding: 0 5% !important;
            grid-template-columns: 1fr 1fr !important;
            align-items: center;
          }
          .hero-image-container {
             padding-left: 4rem;
             max-height: 500px;
             display: flex;
             justify-content: flex-end;
          }
          .hero-image-wrapper {
             height: 92% !important;
          }
          .hero-profile-img {
             object-position: 45% 25%;
          }
        }

        @media (min-width: 1440px) {
          .hero-grid {
            padding: 0 8% !important;
          }
        }

        /* Mobile Layout Fixes */
        @media (max-width: 1023px) {
          .hero-grid {
            text-align: center;
          }
          .hero-left-content {
            align-items: center;
            text-align: center;
          }
          .cta-container, .tech-pills-container {
            justify-content: center;
          }
          .hero-image-container {
            margin-top: 2rem;
            order: 2;
            width: 100%;
            height: 50vh;
            min-height: 350px; 
            max-height: 500px;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            padding: 0 1rem !important;
            gap: 1.5rem !important;
          }
          .hero-image-container {
            height: 45vh;
            min-height: 320px;
          }
        }

        @media (max-width: 480px) {
          .hero-grid {
            padding: 0 0.75rem !important;
            gap: 1rem !important;
          }
          .hero-image-container {
            height: 40vh;
            min-height: 280px;
          }
          .cta-container {
            flex-direction: column;
            width: 100%;
          }
          .cta-container .btn {
            width: 100%;
            justify-content: center;
          }
          .hero-profile-img {
            object-position: 45% center;
          }
        }
      `}</style>
    </section>
  );
}
