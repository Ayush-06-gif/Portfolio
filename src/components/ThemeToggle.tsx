"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const currentTheme = savedTheme || "light";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36, marginLeft: "1rem" }} />;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "var(--bg-elevated)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-subtle)",
        cursor: "pointer",
        marginLeft: "1rem",
        boxShadow: "var(--shadow-sm)",
      }}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 360 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  );
}
