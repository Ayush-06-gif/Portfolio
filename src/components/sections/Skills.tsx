"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Brain, Layers, Database, BookOpen } from "lucide-react";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 style={{ width: 16, height: 16 }} />,
  Brain: <Brain style={{ width: 16, height: 16 }} />,
  Layers: <Layers style={{ width: 16, height: 16 }} />,
  Database: <Database style={{ width: 16, height: 16 }} />,
  BookOpen: <BookOpen style={{ width: 16, height: 16 }} />,
};

const tabColors = [
  { bg: "rgba(199, 92, 44, 0.08)", border: "rgba(199, 92, 44, 0.2)", text: "var(--terracotta)" },
  { bg: "rgba(123, 158, 107, 0.08)", border: "rgba(123, 158, 107, 0.2)", text: "var(--sage)" },
  { bg: "rgba(212, 165, 116, 0.08)", border: "rgba(212, 165, 116, 0.25)", text: "#9A7B52" },
  { bg: "rgba(196, 154, 139, 0.08)", border: "rgba(196, 154, 139, 0.2)", text: "#9A706A" },
  { bg: "rgba(138, 131, 120, 0.08)", border: "rgba(138, 131, 120, 0.2)", text: "var(--stone)" },
];

const skillQuips: Record<string, string> = {
  "Python": "My first love ❤️",
  "C++": "Pain is temporary, segfaults are forever",
  "Java": "Verbose, but we make it work ☕",
  "SQL": "SELECT * FROM skills WHERE cool = true",
  "Machine Learning": "It's just fancy curve fitting 📈",
  "Deep Learning": "Where my gradients vanish 👻",
  "NLP": "Teaching machines to read my bad code comments",
  "LLMs": "The reason I have imposter syndrome",
  "RAG": "Making LLMs actually useful since 2024",
  "LangChain": "Chains of greatness 🦜",
  "TensorFlow": "Where my GPU goes to cry 🔥",
  "Pandas": "Not the cute animal 🐼",
  "NumPy": "Arrays all the way down",
  "HuggingFace": "The real MVP of ML 🤗",
  "FastAPI": "Speed is not a feature, it's a lifestyle ⚡",
  "Streamlit": "UI? In 5 lines of code 🎈",
  "FAISS": "Finding needles in vector haystacks",
  "Git": "git commit -m 'fixed everything' (narrator: he didn't)",
  "DSA": "Left-right-left-right... wait, which tree?",
  "OOPs": "Object Oriented Overthinking",
  "BERT": "The OG transformer 🤖",
  "Prompt Engineering": "Professional GPT whisperer ✍️",
};

export function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const activeCategory = skillCategories.find((c) => c.id === activeTab);
  const activeIdx = skillCategories.findIndex((c) => c.id === activeTab);

  // 3D tilt for the skills container
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  function handleContainerMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleContainerMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setLightPos({ x: 50, y: 50 });
  }

  const handleSkillClick = useCallback((name: string) => {
    if (clickedSkill === name) {
      setClickedSkill(null);
    } else {
      setClickedSkill(name);
      setTimeout(() => setClickedSkill(null), 2500);
    }
  }, [clickedSkill]);

  return (
    <section
      id="skills"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div
        className="blob blob-sage"
        style={{
          width: 350,
          height: 350,
          top: "30%",
          right: "-5%",
          animation: "blob-drift 12s ease-in-out infinite 2s",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with"
        />

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 6,
            marginBottom: "3rem",
            padding: "0.375rem",
            borderRadius: 100,
            background: "var(--parchment)",
            border: "1px solid var(--border-subtle)",
            maxWidth: "fit-content",
            margin: "0 auto 3rem",
          }}
        >
          {skillCategories.map((category, i) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => { setActiveTab(category.id); setClickedSkill(null); }}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0.5rem 1.125rem",
                  borderRadius: 100,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  border: "none",
                  background: isActive ? tabColors[i].bg : "transparent",
                  color: isActive ? tabColors[i].text : "var(--stone)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                aria-label={`Show ${category.label} skills`}
              >
                {iconMap[category.icon]}
                <span className="skill-tab-label">{category.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* 3D Tilting Skills Container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          style={{
            rotateX: rotateX as unknown as number,
            rotateY: rotateY as unknown as number,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="skills-tilt-container"
        >
          <div
            className="card card-glossy paper-texture"
            style={{
              padding: "2.5rem 2rem",
              position: "relative",
              overflow: "hidden",
              minHeight: 180,
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

            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "0.625rem",
                    maxWidth: 700,
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 4,
                  }}
                >
                  {activeCategory.skills.map((skill, i) => {
                    const rotation = ((i % 5) - 2) * 0.8;
                    const isHovered = hoveredSkill === skill.name;
                    const isClicked = clickedSkill === skill.name;
                    const quip = skillQuips[skill.name];

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{
                          opacity: 1,
                          scale: hoveredSkill && !isHovered ? 0.95 : 1,
                          y: 0,
                          x: 0,
                        }}
                        transition={{
                          delay: i * 0.04,
                          type: "spring",
                          stiffness: 300,
                          damping: 22,
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -6,
                          rotate: 0,
                          boxShadow: "var(--shadow-md)",
                        }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        onClick={() => handleSkillClick(skill.name)}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 1rem",
                          borderRadius: 100,
                          background: tabColors[activeIdx]?.bg || "var(--parchment)",
                          border: `1px solid ${tabColors[activeIdx]?.border || "var(--border-subtle)"}`,
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          fontWeight: 500,
                          cursor: quip ? "pointer" : "default",
                          transition: "all 0.3s ease",
                          transform: `rotate(${rotation}deg)`,
                        }}
                        className="skill-pill"
                      >
                        <span style={{ fontSize: "1rem" }} aria-hidden="true">{skill.icon}</span>
                        <span>{skill.name}</span>

                        {quip && (
                          <AnimatePresence>
                            {isClicked && (
                              <motion.div
                                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                className="skill-tooltip visible"
                                style={{
                                  position: "absolute",
                                  bottom: "calc(100% + 8px)",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  padding: "0.5rem 0.875rem",
                                  borderRadius: 10,
                                  background: "var(--ink)",
                                  color: "var(--cream)",
                                  fontSize: "0.72rem",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                  pointerEvents: "none",
                                  zIndex: 10,
                                  opacity: 1,
                                }}
                              >
                                {quip}
                                <div style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: 0,
                                  height: 0,
                                  borderLeft: "5px solid transparent",
                                  borderRight: "5px solid transparent",
                                  borderTop: "5px solid var(--ink)",
                                }} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        @media (max-width: 640px) {
          .skill-tab-label { display: none; }
          .skill-pill {
            padding: 0.4rem 0.75rem !important;
            font-size: 0.78rem !important;
            gap: 0.35rem !important;
          }
          .skills-tilt-container {
            transform: none !important;
          }
        }
        @media (max-width: 480px) {
          .skill-pill {
            padding: 0.35rem 0.6rem !important;
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </section>
  );
}
