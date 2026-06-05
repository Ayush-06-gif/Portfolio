"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code2, Brain, TrendingUp, GraduationCap, Zap, MapPin } from "lucide-react";
import { aboutData } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 style={{ width: 20, height: 20 }} />,
  Brain: <Brain style={{ width: 20, height: 20 }} />,
  TrendingUp: <TrendingUp style={{ width: 20, height: 20 }} />,
  GraduationCap: <GraduationCap style={{ width: 20, height: 20 }} />,
};

const codeLines = [
  { type: "keyword", content: "class", rest: " AyushRaj:" },
  { type: "indent", keyword: "def", func: "__init__", rest: "(self):" },
  { type: "attr", name: "self.passion", value: '"AI/ML"', tooltip: "Since 2023 and counting 🚀" },
  { type: "attr", name: "self.approach", value: '"Build → Break → Learn"', tooltip: "mostly break, let's be honest 😅" },
  { type: "attr", name: "self.goal", value: '"Solve real problems"', tooltip: "...and create new ones along the way" },
  { type: "blank" },
  { type: "indent", keyword: "def", func: "daily_routine", rest: "(self):" },
  { type: "return", content: "return [" },
  { type: "list-item", value: '"Code"', comma: true },
  { type: "list-item", value: '"Drink Chai"', comma: true },
  { type: "list-item", value: '"Build AI Systems"', comma: true },
  { type: "list-item", value: '"Repeat"', comma: false },
  { type: "close-bracket", content: "]" },
];

function TypewriterCode() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState(0);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setVisibleLines(current);
      if (current >= codeLines.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="code-block" style={{ fontSize: "0.75rem" }}>
      {codeLines.map((line, i) => {
        if (i >= visibleLines) return null;
        const hasTooltip = line.type === "attr" && line.tooltip;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "relative", display: "inline-block", width: "100%" }}
            onMouseEnter={() => hasTooltip ? setHoveredLine(i) : null}
            onMouseLeave={() => setHoveredLine(null)}
          >
            {line.type === "keyword" && (
              <div><span className="keyword">{line.content}</span> <span className="function">AyushRaj</span>:</div>
            )}
            {line.type === "indent" && (
              <div>    <span className="keyword">{line.keyword}</span> <span className="function">{line.func}</span>{line.rest}</div>
            )}
            {line.type === "attr" && (
              <div style={{ cursor: hasTooltip ? "help" : "default" }}>
                        <span className="variable">{line.name}</span> = <span className="string">{line.value}</span>
                {hoveredLine === i && line.tooltip && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "var(--ink)",
                      color: "var(--cream)",
                      padding: "0.3rem 0.6rem",
                      borderRadius: 6,
                      fontSize: "0.65rem",
                      whiteSpace: "nowrap",
                      zIndex: 5,
                    }}
                  >
                    {line.tooltip}
                  </motion.span>
                )}
              </div>
            )}
            {line.type === "blank" && <div>&nbsp;</div>}
            {line.type === "return" && (
              <div>        <span className="keyword">return</span> [</div>
            )}
            {line.type === "list-item" && (
              <div>            <span className="string">{line.value}</span>{line.comma ? "," : ""}</div>
            )}
            {line.type === "close-bracket" && (
              <div>        ]</div>
            )}
          </motion.div>
        );
      })}
      {visibleLines > 0 && visibleLines < codeLines.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          style={{ color: "var(--terracotta)", fontWeight: 700 }}
        >
          █
        </motion.span>
      )}
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      {/* Decorative blob */}
      <div
        className="blob blob-rose"
        style={{
          width: 400,
          height: 400,
          top: "20%",
          right: "-5%",
          animation: "blob-drift 14s ease-in-out infinite",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="About Me"
          subtitle="A glimpse into my journey and what drives me"
        />

        {/* Two-column editorial layout */}
        <div className="about-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", marginBottom: "4rem" }}>
          {/* Bio — large pull quote style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="card paper-texture" style={{ padding: "2.5rem", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Zap style={{ width: 16, height: 16, color: "var(--terracotta)" }} />
                <span className="text-caption" style={{ color: "var(--terracotta)" }}>
                  Who I Am
                </span>
              </div>
              <p style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}>
                {aboutData.bio}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "1fr", gap: "1rem", marginBottom: "4rem" }}>
          {aboutData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{ height: "100%" }}
            >
              <div className="card" style={{ textAlign: "center", padding: "1.75rem 1rem", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(199, 92, 44, 0.06)",
                    color: "var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {iconMap[stat.icon]}
                </div>
                <p className="stat-value" style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.25rem",
                  whiteSpace: "nowrap",
                }}>
                  {stat.value}
                </p>
                <p className="text-caption stat-label" style={{ fontSize: "0.65rem", whiteSpace: "nowrap" }}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code + Timeline side by side */}
        <div className="about-bottom" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          {/* Code Snippet — now with typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--dusty-rose)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--clay)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--sage)" }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.65rem",
                  color: "var(--stone-light)",
                  marginLeft: 8,
                }}>
                  my_philosophy.py
                </span>
              </div>
              <TypewriterCode />
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <MapPin style={{ width: 16, height: 16, color: "var(--sage)" }} />
                <span className="text-caption" style={{ color: "var(--sage)" }}>Journey</span>
              </div>

              <div style={{ position: "relative", paddingLeft: 24 }}>
                {/* Animated vertical line */}
                <div style={{
                  position: "absolute",
                  left: 3,
                  top: 4,
                  bottom: 4,
                  width: 1,
                  background: "var(--border-subtle)",
                }}>
                  <motion.div
                    style={{
                      width: "100%",
                      background: "linear-gradient(to bottom, var(--terracotta), var(--sage))",
                      height: lineHeight,
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {aboutData.timeline.map((entry, i) => (
                    <motion.div
                      key={entry.year}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.12 }}
                      style={{ position: "relative" }}
                    >
                      <div style={{
                        position: "absolute",
                        left: -24,
                        top: 6,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        border: "2px solid var(--terracotta)",
                        background: "var(--cream)",
                        zIndex: 1,
                      }} />
                      <span style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.65rem",
                        color: "var(--terracotta)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                        {entry.year}
                      </span>
                      <h4 style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginTop: 2,
                      }}>
                        {entry.title}
                      </h4>
                      <p style={{
                        fontSize: "0.8rem",
                        color: "var(--stone)",
                        lineHeight: 1.5,
                        marginTop: 2,
                      }}>
                        {entry.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "4rem" }} />

      {/* Responsive */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .about-layout { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .about-bottom { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { gap: 0.625rem !important; }
          .about-bottom { gap: 1rem !important; }
          .stat-value { font-size: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
