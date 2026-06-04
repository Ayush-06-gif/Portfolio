"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

function MagneticLink({ children, href, style }: { children: React.ReactNode; href: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    setOffset({ x: dx, y: dy });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease, background 0.3s ease",
        display: "inline-block",
      }}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dotClicks, setDotClicks] = useState(0);
  const [dotSpin, setDotSpin] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleDotClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newCount = dotClicks + 1;
    setDotClicks(newCount);
    if (newCount >= 3) {
      setDotSpin(true);
      setTimeout(() => {
        setDotSpin(false);
        setDotClicks(0);
      }, 1200);
    }
  }, [dotClicks]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          background: isScrolled ? "rgba(253, 246, 236, 0.85)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            {/* Logo */}
            <a
              href="#"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--ink)",
                display: "flex",
                alignItems: "baseline",
                gap: "0.15rem",
              }}
              aria-label="Go to homepage"
            >
              {personalInfo.name.split(" ")[0]}
              <motion.span
                onClick={handleDotClick}
                animate={dotSpin ? { rotate: 360, color: ["#C75C2C", "#7B9E6B", "#D4A574", "#C75C2C"] } : {}}
                transition={dotSpin ? { duration: 1, ease: "easeInOut" } : {}}
                style={{
                  color: "var(--terracotta)",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "inline-block",
                  userSelect: "none",
                }}
              >
                .
              </motion.span>
            </a>

            {/* Desktop Links — Magnetic */}
            <div
              style={{
                display: "none",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.375rem",
                borderRadius: 100,
                background: "rgba(245, 237, 224, 0.6)",
                border: "1px solid var(--border-subtle)",
              }}
              className="nav-desktop"
            >
              {navLinks.map((link) => (
                <MagneticLink
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    borderRadius: 100,
                  }}
                >
                  {link.label}
                </MagneticLink>
              ))}
            </div>

            {/* Right side */}
            <div className="nav-desktop" style={{ display: "none", alignItems: "center", gap: "0.75rem" }}>
              <a
                href="/resume.pdf"
                download="Ayush_Raj_Resume.pdf"
                className="btn btn-primary"
                style={{ padding: "0.625rem 1.25rem", fontSize: "0.8rem" }}
                aria-label="Download resume"
              >
                <Download style={{ width: 14, height: 14 }} />
                Resume
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-mobile-toggle"
              style={{
                display: "flex",
                padding: 8,
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(253, 246, 236, 0.98)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.75rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: "1.5rem" }}
            >
              <a href="/resume.pdf" download="Ayush_Raj_Resume.pdf" className="btn btn-primary" aria-label="Download resume">
                <Download style={{ width: 16, height: 16 }} />
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
