"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ChevronRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function GithubIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const accentColors = ["var(--terracotta)", "var(--sage)", "var(--clay)"];
const accentBgs = [
  "rgba(199, 92, 44, 0.06)",
  "rgba(123, 158, 107, 0.06)",
  "rgba(212, 165, 116, 0.06)",
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
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

  const accent = accentColors[index % 3];
  const accentBg = accentBgs[index % 3];

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
      }}
    >
      <div
        className="card card-glossy paper-texture"
        style={{
          padding: 0,
          overflow: "hidden",
          height: "100%",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
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
        <div style={{ height: 3, background: accent }} />

        {/* Image Preview */}
        {project.image && (
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--bg-muted)"
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} Preview`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--parchment);"><p style="color: var(--stone-light); font-size: 0.8rem;">Image not found</p></div>';
                }
              }}
            />
          </div>
        )}

        {/* Header */}
        <div style={{ padding: "1.5rem 1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <span className="text-caption" style={{ display: "block", marginBottom: 6 }}>
                Project {String(index + 1).padStart(2, "0")}
              </span>
              <h3 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--ink)",
              }}>
                {project.title}
              </h3>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: accentBg,
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: accent,
                flexShrink: 0,
              }}
            >
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 1.5rem 1.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--stone)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.25rem" }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "0.25rem 0.625rem",
                  fontSize: "0.65rem",
                  borderRadius: 6,
                  background: accentBg,
                  border: "1px solid var(--border-subtle)",
                  color: "var(--stone)",
                  fontFamily: "var(--font-mono), monospace",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: "1rem" }} />

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.78rem",
                  color: "var(--stone)",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.background = "var(--parchment)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--stone)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }}
                aria-label={`View ${project.title} source code`}
              >
                <GithubIcon style={{ width: 14, height: 14 }} />
                Source
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.78rem",
                  color: "var(--terracotta)",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(199, 92, 44, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink style={{ width: 14, height: 14 }} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      {/* Blob */}
      <div
        className="blob blob-clay"
        style={{
          width: 450,
          height: 450,
          top: "20%",
          left: "-8%",
          animation: "blob-drift 13s ease-in-out infinite 4s",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Featured Projects"
          subtitle="Real-world AI/ML systems I've built from scratch"
        />

        <div className="projects-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        @media (min-width: 768px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
