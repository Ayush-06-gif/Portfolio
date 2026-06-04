"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const funnyMessages = [
  "Brewing coffee for the CPU ☕",
  "Teaching neural nets to sit...",
  "Compiling personality.exe...",
  "Asking GPT for permission...",
  "Loading opinions on tabs vs spaces...",
  "Defragmenting imposter syndrome...",
  "Calibrating sarcasm detector...",
  "Warming up the pixels...",
];

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Cycle through messages
  useEffect(() => {
    if (!isLoading) return;
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 800);
    return () => clearInterval(msgTimer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--cream)",
          }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ position: "relative", marginBottom: 48 }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                border: "2px solid var(--terracotta)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(199, 92, 44, 0.04)",
              }}
            >
              <motion.span
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--terracotta)",
                  userSelect: "none",
                  display: "inline-block",
                }}
              >
                AR
              </motion.span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div
            style={{
              width: 192,
              height: 3,
              background: "var(--border-subtle)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--terracotta), var(--clay))",
                borderRadius: 10,
              }}
            />
          </div>

          {/* Funny Message */}
          <div style={{ height: 40, display: "flex", alignItems: "center", marginTop: 16 }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  color: "var(--stone)",
                  textAlign: "center",
                }}
              >
                {funnyMessages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.65rem",
              color: "var(--stone-light)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
