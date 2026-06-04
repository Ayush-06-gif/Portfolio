"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, TrendingUp, Brain, Users } from "lucide-react";
import { achievements } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy style={{ width: 24, height: 24 }} />,
  TrendingUp: <TrendingUp style={{ width: 24, height: 24 }} />,
  Brain: <Brain style={{ width: 24, height: 24 }} />,
  Users: <Users style={{ width: 24, height: 24 }} />,
};

const cardAccents = [
  { color: "var(--terracotta)", bg: "rgba(199, 92, 44, 0.06)" },
  { color: "var(--sage)", bg: "rgba(123, 158, 107, 0.06)" },
  { color: "var(--clay)", bg: "rgba(212, 165, 116, 0.08)" },
  { color: "var(--dusty-rose)", bg: "rgba(196, 154, 139, 0.06)" },
];

function SlotMachineNumber({
  target,
  suffix,
  isText,
  textValue,
  inView,
}: {
  target: number;
  suffix: string;
  isText: boolean;
  textValue: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isText) return;
    const duration = 2500; // slightly longer for slot machine feel
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Use an elastic easing out function for slot machine "overshoot" effect
      // This formula mimics a spring settling into place
      const c4 = (2 * Math.PI) / 3;
      const eased = progress === 0
        ? 0
        : progress === 1
        ? 1
        : Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1;
      
      setCount(Math.round(eased * target));
      if (current >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, isText]);

  if (isText) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ display: "inline-block" }}
      >
        {textValue}
      </motion.span>
    );
  }

  return (
    <span style={{ display: "inline-block", minWidth: `${String(target).length}ch` }}>
      {count}
      {suffix}
    </span>
  );
}

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div
        className="blob blob-sage"
        style={{ width: 350, height: 350, top: "30%", right: "-5%", animation: "blob-drift 14s ease-in-out infinite 3s" }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }} ref={ref}>
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and recognition along the way"
        />

        <div className="achievements-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          {achievements.map((achievement, i) => {
            const isText = achievement.numericValue === 0 || achievement.id === "codeforces";
            const accent = cardAccents[i % 4];
            
            // Tumble direction: even from left, odd from right
            const tumbleDirection = i % 2 === 0 ? "tumble-left" : "tumble-right";

            return (
              <motion.div
                key={achievement.id}
                style={{
                  opacity: inView ? 1 : 0,
                  animation: inView ? `${tumbleDirection} 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s forwards` : "none",
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="card card-glossy paper-texture" style={{ padding: "2rem", height: "100%", position: "relative", overflow: "hidden" }}>
                  {/* Glossy light overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                      pointerEvents: "none",
                      zIndex: 1,
                      borderRadius: "inherit",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: accent.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accent.color,
                      flexShrink: 0,
                    }}>
                      {iconMap[achievement.icon]}
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                        lineHeight: 1.1,
                        marginBottom: 4,
                        fontVariantNumeric: "tabular-nums",
                      }}>
                        <SlotMachineNumber
                          target={achievement.numericValue}
                          suffix={achievement.suffix}
                          isText={isText}
                          textValue={achievement.value}
                          inView={inView}
                        />
                      </p>
                      <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: 2 }}>
                        {achievement.title}
                      </h3>
                      <p style={{ fontSize: "0.78rem", color: "var(--stone)" }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        @media (min-width: 640px) {
          .achievements-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .achievements-grid { gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  );
}
