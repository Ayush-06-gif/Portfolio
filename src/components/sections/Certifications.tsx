"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3,
  Sparkles,
  Bot,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 style={{ width: 18, height: 18 }} />,
  Sparkles: <Sparkles style={{ width: 18, height: 18 }} />,
  Bot: <Bot style={{ width: 18, height: 18 }} />,
  GraduationCap: <GraduationCap style={{ width: 18, height: 18 }} />,
};

const accents = ["var(--terracotta)", "var(--sage)"];
const accentBgs = [
  "rgba(199, 92, 44, 0.06)",
  "rgba(123, 158, 107, 0.06)",
];

function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setLightPos({ x: 50, y: 50 });
  }

  const accent = accents[index % 2];
  const accentBg = accentBgs[index % 2];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX as unknown as number,
        rotateY: rotateY as unknown as number,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        height: "100%",
      }}
    >
      <div
        className="card card-glossy paper-texture"
        style={{
          padding: 0,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          background: "var(--warm-white)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 16,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "var(--shadow-xl)";
          el.style.transform = "translateY(-6px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "";
          el.style.transform = "";
        }}
      >
        {/* Moving light reflection overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 3,
            transition: "background 0.15s ease-out",
            borderRadius: "inherit",
          }}
        />

        {/* Top accent bar */}
        <div style={{ height: 3, background: accent, position: "relative", zIndex: 4 }} />

        {/* Edge-to-Edge Image Preview */}
        <div style={{
          width: "100%",
          aspectRatio: "1.414", // Landscape ratio (A4)
          position: "relative",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-muted)",
          overflow: "hidden"
        }}>
          {cert.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={cert.image}
              alt={`${cert.name} Certificate`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--parchment);"><p style="color: var(--stone-light); font-size: 0.8rem;">Image not found</p></div>';
                }
              }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--parchment)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "var(--stone-light)", fontSize: "0.8rem" }}>No preview available</p>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <div style={{ paddingRight: "1rem" }}>
              <p className="text-caption" style={{ color: accent, marginBottom: 6 }}>
                {cert.issuer}
              </p>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                {cert.name}
              </h3>
            </div>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: accentBg,
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              {iconMap[cert.icon]}
            </div>
          </div>
          
          <p style={{ fontSize: "0.85rem", color: "var(--stone)", marginBottom: "1.5rem" }}>Issued: {cert.date}</p>
          
          <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem" }}>
            {cert.certificateUrl && (
              <a
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "transparent",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--parchment)";
                  e.currentTarget.style.borderColor = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "var(--border-medium)";
                }}
              >
                View Certificate <ExternalLink style={{ width: 14, height: 14 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and courses completed"
        />

        <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          {certifications.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        @media (min-width: 640px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .certs-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .certs-grid { gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
