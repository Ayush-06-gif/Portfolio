"use client";

import { motion } from "framer-motion";
import { githubStatsData } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GitHubStats() {
  // Light-themed GitHub stats URLs
  const lightCards = githubStatsData.cards.map((card) => {
    let url = card.url;
    // Replace dark theme params with light ones
    url = url.replace(/theme=radical/g, "theme=default");
    url = url.replace(/bg_color=0d1117/g, "bg_color=FAF3E8");
    url = url.replace(/background=0d1117/g, "background=FAF3E8");
    url = url.replace(/title_color=3b82f6/g, "title_color=C75C2C");
    url = url.replace(/icon_color=06b6d4/g, "icon_color=7B9E6B");
    url = url.replace(/text_color=a1a1aa/g, "text_color=3D3D3D");
    url = url.replace(/hide_border=true/g, "hide_border=false");
    url = url.replace(/ring=3b82f6/g, "ring=C75C2C");
    url = url.replace(/fire=06b6d4/g, "fire=D4A574");
    url = url.replace(/currStreakLabel=3b82f6/g, "currStreakLabel=C75C2C");
    return { ...card, url };
  });

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
          {lightCards.map((card, i) => (
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
