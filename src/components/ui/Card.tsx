"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover3d?: boolean;
}

export function Card({ children, className, hover3d = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover3d ? { y: -4, rotateX: 1 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`card ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}
