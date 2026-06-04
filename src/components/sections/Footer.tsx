"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Coffee } from "lucide-react";
import { navLinks, socialLinks, personalInfo } from "@/lib/data";

function GithubIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-9.658a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/>
    </svg>
  );
}

const socialIconMap: Record<string, React.ReactNode> = {
  Github: <GithubIcon style={{ width: 16, height: 16 }} />,
  Linkedin: <LinkedinIcon style={{ width: 16, height: 16 }} />,
  Twitter: <TwitterIcon style={{ width: 16, height: 16 }} />,
  Instagram: <InstagramIcon style={{ width: 16, height: 16 }} />,
  Mail: <Mail style={{ width: 16, height: 16 }} />,
};

const builtWithMessages = [
  "Crafted with care",
  "Made with ☕ and existential dread",
  "Powered by chai & deadlines",
  "Built by a human, not ChatGPT (mostly)",
  "Fueled by curiosity & late nights",
  "Debugged with patience (and Stack Overflow)",
];

export function Footer() {
  const [messageIdx, setMessageIdx] = useState(0);
  const [chaiCount, setChaiCount] = useState(847);

  // Cycle messages every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % builtWithMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Slowly increment chai counter
  useEffect(() => {
    const timer = setInterval(() => {
      setChaiCount((prev) => prev + 1);
    }, 30000); // every 30 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <footer style={{ position: "relative", borderTop: "1px solid var(--border-subtle)", background: "var(--warm-white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", marginBottom: "2.5rem" }}>
          {/* Brand */}
          <div>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--ink)",
                display: "inline-block",
                marginBottom: 12,
              }}
              aria-label="Go to homepage"
            >
              {personalInfo.name}
              <span style={{ color: "var(--terracotta)" }}>.</span>
            </a>
            <p style={{ fontSize: "0.85rem", color: "var(--stone)", lineHeight: 1.6, maxWidth: 300 }}>
              Building AI-powered solutions and pushing the boundaries of what&apos;s possible with machine learning.
            </p>

            {/* Fun chai counter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                marginTop: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "0.4rem 0.75rem",
                borderRadius: 8,
                background: "rgba(212, 165, 116, 0.08)",
                border: "1px solid rgba(212, 165, 116, 0.15)",
                fontSize: "0.72rem",
                color: "var(--stone)",
              }}
            >
              <Coffee style={{ width: 12, height: 12, color: "var(--clay)" }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                ~{chaiCount} cups of chai consumed during development
              </span>
            </motion.div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-caption" style={{ marginBottom: 16 }}>Navigation</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }} aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--stone)",
                    transition: "color 0.2s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--terracotta)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--stone)"; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-caption" style={{ marginBottom: 16 }}>Connect</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "var(--parchment)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--stone)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--terracotta)";
                    e.currentTarget.style.borderColor = "rgba(199, 92, 44, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--stone)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.transform = "";
                  }}
                  aria-label={social.ariaLabel}
                >
                  {socialIconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom — cycling messages */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <p style={{
            fontSize: "0.78rem",
            color: "var(--stone)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            © {new Date().getFullYear()} {personalInfo.name}
            <span style={{ color: "var(--border-medium)" }}>·</span>
            <motion.span
              key={messageIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              {builtWithMessages[messageIdx]}
              {messageIdx === 0 && <Heart style={{ width: 12, height: 12, color: "var(--dusty-rose)", fill: "var(--dusty-rose)" }} />}
            </motion.span>
          </p>

          {/* Konami code hint */}
          <p
            style={{
              fontSize: "0.6rem",
              color: "var(--stone-light)",
              opacity: 0.4,
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.05em",
              userSelect: "none",
              transition: "opacity 0.3s",
            }}
            className="konami-hint"
            title="Try it..."
          >
            ↑↑↓↓←→←→BA
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }
        .konami-hint:hover { opacity: 0.8 !important; }
        @media (max-width: 640px) {
          .footer-grid { gap: 1.5rem !important; }
          .konami-hint { display: none !important; }
        }
      `}</style>
    </footer>
  );
}
