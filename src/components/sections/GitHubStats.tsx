"use client";

import { motion } from "framer-motion";
import { githubStatsData } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GitHubStats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Light-themed GitHub stats URLs
  const lightCards = githubStatsData.cards.map((card) => {
    let url = card.url;
    // Replace dark theme (great-gatsby) params with light ones (default)
    url = url.replace(/theme=great-gatsby/g, "theme=default");
    return { ...card, url };
  });

  const displayCards = mounted && resolvedTheme === "light" ? lightCards : githubStatsData.cards;

  return (
    <section
      id="github"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open-source contributions and coding activity"
        />

        <div className="github-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          {displayCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="card" style={{ padding: "1rem", overflow: "hidden" }}>
                <h3 className="text-caption" style={{ marginBottom: 12, paddingLeft: 4 }}>
                  {card.title}
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.url}
                  alt={card.alt}
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "5rem" }} />

      <style jsx global>{`
        @media (min-width: 768px) {
          .github-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .github-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
