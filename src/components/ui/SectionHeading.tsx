"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

function useTextScramble(text: string, isInView: boolean) {
  const [displayText, setDisplayText] = useState(text);
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const chars = text.split("");
    const totalDuration = 600; // ms
    const perChar = totalDuration / chars.length;
    let iteration = 0;

    const timer = setInterval(() => {
      setDisplayText(
        chars
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return chars[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );
      iteration += 1;
      if (iteration > chars.length) {
        clearInterval(timer);
        setDisplayText(text);
      }
    }, perChar);

    return () => clearInterval(timer);
  }, [text]);

  useEffect(() => {
    if (isInView && !hasRun.current) {
      scramble();
    }
  }, [isInView, scramble]);

  return displayText;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrambledTitle = useTextScramble(title, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        marginBottom: "4rem",
        textAlign: align,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            height: 2,
            background: "var(--terracotta)",
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--terracotta)",
          }}
        >
          {title}
        </span>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            height: 2,
            background: "var(--terracotta)",
            borderRadius: 2,
          }}
        />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}
      >
        {scrambledTitle}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.05rem",
            color: "var(--stone)",
            marginTop: "0.75rem",
            maxWidth: 560,
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
