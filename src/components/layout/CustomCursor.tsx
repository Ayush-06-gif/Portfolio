"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const TRAIL_LENGTH = 5;

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorColor, setCursorColor] = useState("var(--terracotta)");
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Section-aware cursor color
  const updateCursorColor = useCallback((y: number) => {
    const sections = [
      { id: "hero", color: "var(--terracotta)" },
      { id: "about", color: "var(--dusty-rose)" },
      { id: "skills", color: "var(--sage)" },
      { id: "projects", color: "var(--clay)" },
      { id: "experience", color: "var(--terracotta)" },
      { id: "achievements", color: "var(--sage)" },
      { id: "certifications", color: "var(--terracotta-light)" },
      { id: "contact", color: "var(--dusty-rose)" },
    ];
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (y >= rect.top && y <= rect.bottom) {
          setCursorColor(section.color);
          return;
        }
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    // Update trail
    trailPositions.current = [
      { x: e.clientX, y: e.clientY },
      ...trailPositions.current.slice(0, TRAIL_LENGTH - 1),
    ];

    // Section color
    updateCursorColor(e.clientY);
  }, [updateCursorColor]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Click burst effect
  const handleClick = useCallback((e: MouseEvent) => {
    const burst = document.createElement("div");
    burst.className = "click-burst";
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 500);
  }, []);

  // Animate trail
  useEffect(() => {
    if (isTouchDevice) return;

    function animateTrail() {
      trailRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const pos = trailPositions.current[i];
        if (pos) {
          dot.style.transform = `translate(${pos.x - 2.5}px, ${pos.y - 2.5}px)`;
          dot.style.opacity = isVisible ? `${0.4 - i * 0.08}` : "0";
        }
      });
      animFrameRef.current = requestAnimationFrame(animateTrail);
    }
    animFrameRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isTouchDevice, isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-hoverable]'
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const hoverables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-hoverable]'
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave, handleClick]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="cursor-trail-dot"
          style={{
            width: 5 - i * 0.5,
            height: 5 - i * 0.5,
            background: cursorColor,
            transition: `transform ${0.08 + i * 0.04}s ease-out, opacity 0.15s`,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          borderRadius: "50%",
          border: `1.5px solid ${cursorColor}`,
        }}
        aria-hidden="true"
      />
      {/* Inner dot */}
      <motion.div
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cursorColor,
        }}
        aria-hidden="true"
      />
    </>
  );
}
