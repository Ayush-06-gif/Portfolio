"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextRevealProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TextReveal({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TextRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentFullText = texts[currentIndex];

  const tick = useCallback(() => {
    const fullChars = [...currentFullText];
    const displayChars = [...displayText];

    if (!isDeleting) {
      if (displayChars.length < fullChars.length) {
        setDisplayText(fullChars.slice(0, displayChars.length + 1).join(""));
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      if (displayChars.length > 0) {
        setDisplayText(displayChars.slice(0, -1).join(""));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, currentFullText, texts.length, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayText}
          style={{ color: "var(--terracotta)" }}
          aria-live="polite"
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      <motion.span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "var(--terracotta)",
          marginLeft: 4,
          verticalAlign: "middle",
        }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden="true"
      />
    </span>
  );
}
