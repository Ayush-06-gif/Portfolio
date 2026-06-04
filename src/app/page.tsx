"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { DarkBackground } from "@/components/layout/DarkBackground";
import { LightBackground } from "@/components/layout/LightBackground";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const confettiColors = [
  "var(--terracotta)",
  "var(--sage)",
  "var(--clay)",
  "var(--dusty-rose)",
  "var(--terracotta-light)",
  "var(--sage-light)",
  "var(--clay-light)",
];

function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: confettiColors[i % confettiColors.length],
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? "50%" : "2px",
  }));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.shape,
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const scrollProgress = useScrollProgress();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [showKonamiToast, setShowKonamiToast] = useState(false);
  const konamiIndex = useRef(0);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Konami code listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.key) return;
      const expected = KONAMI[konamiIndex.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          setKonamiActive(true);
          setShowKonamiToast(true);
          document.body.classList.add("konami-active");
          setTimeout(() => {
            setKonamiActive(false);
            setShowKonamiToast(false);
            document.body.classList.remove("konami-active");
          }, 4000);
        }
      } else {
        konamiIndex.current = 0;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <SmoothScroll>
      <DarkBackground />
      <LightBackground />
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Konami Confetti */}
      {konamiActive && <Confetti />}

      {/* Konami Toast */}
      <AnimatePresence>
        {showKonamiToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fun-toast"
          >
            🥚 Achievement Unlocked: Easter Egg Hunter!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="custom-cursor-active">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <GitHubStats />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="custom-cursor-active"
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 40,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--terracotta)",
              color: "#FFF8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(199, 92, 44, 0.25)",
              border: "none",
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            aria-label="Scroll back to top"
          >
            <ArrowUp style={{ width: 18, height: 18 }} />
          </motion.button>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}
