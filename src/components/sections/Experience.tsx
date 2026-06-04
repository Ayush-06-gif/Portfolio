"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Briefcase, GitBranch, ArrowRight } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users style={{ width: 20, height: 20 }} />,
  Briefcase: <Briefcase style={{ width: 20, height: 20 }} />,
  GitBranch: <GitBranch style={{ width: 20, height: 20 }} />,
};

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
      className="exp-card-wrapper"
    >
      {/* Timeline dot */}
      <div style={{
        position: "absolute",
        left: -36,
        top: 20,
        zIndex: 1,
      }} className="exp-timeline-dot">
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            border: exp.type === "active" ? "2px solid var(--terracotta)" : "2px solid var(--stone-light)",
            background: exp.type === "active" ? "var(--terracotta)" : "var(--cream)",
          }}
        />
      </div>

      {/* 3D Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX as unknown as number,
          rotateY: rotateY as unknown as number,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="exp-tilt-card"
      >
        <div
          className="card card-glossy paper-texture"
          style={{
            padding: "1.5rem",
            opacity: exp.type === "placeholder" ? 0.6 : 1,
            borderStyle: exp.type === "placeholder" ? "dashed" : "solid",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "var(--shadow-xl)";
            el.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "";
            el.style.transform = "";
          }}
        >
          {/* Light reflection */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
              pointerEvents: "none",
              zIndex: 3,
              transition: "background 0.15s ease-out",
              borderRadius: "inherit",
            }}
          />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", position: "relative", zIndex: 2 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background: exp.type === "active" ? "rgba(199, 92, 44, 0.08)" : "var(--parchment)",
              color: exp.type === "active" ? "var(--terracotta)" : "var(--stone)",
            }}>
              {iconMap[exp.icon]}
            </div>
            <div>
              <span className="text-caption" style={{ display: "block", marginBottom: 4 }}>
                {exp.period}
              </span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>
                {exp.role}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--terracotta)", marginBottom: 8 }}>
                {exp.organization}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--stone)", lineHeight: 1.6 }}>
                {exp.description}
              </p>
              {exp.type === "placeholder" && (
                <div style={{
                  marginTop: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "var(--stone-light)",
                }}>
                  <ArrowRight style={{ width: 12, height: 12 }} />
                  Coming Soon
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div
        className="blob blob-terracotta"
        style={{ width: 350, height: 350, top: "40%", left: "-8%", animation: "blob-drift 11s ease-in-out infinite" }}
      />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Experience & Leadership"
          subtitle="My professional journey and contributions"
        />

        <div style={{ position: "relative" }} className="exp-timeline">
          {/* Center line */}
          <div style={{
            position: "absolute",
            left: 32,
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, var(--terracotta), var(--sage), transparent)",
          }} className="exp-timeline-line" />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="exp-cards-list">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        .exp-card-wrapper {
          margin-left: 64px;
        }
        .exp-timeline-dot {
          left: -36px;
        }
        @media (max-width: 640px) {
          .exp-card-wrapper {
            margin-left: 48px !important;
          }
          .exp-timeline-line {
            left: 20px !important;
          }
          .exp-timeline-dot {
            left: -30px !important;
          }
          .exp-tilt-card {
            transform: none !important;
          }
        }
        @media (max-width: 480px) {
          .exp-card-wrapper {
            margin-left: 36px !important;
          }
          .exp-timeline-line {
            left: 14px !important;
          }
          .exp-timeline-dot {
            left: -24px !important;
          }
        }
      `}</style>
    </section>
  );
}
