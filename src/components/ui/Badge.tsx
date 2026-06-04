"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "terracotta" | "sage" | "clay" | "rose" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className || ""}`}>
      {children}
    </span>
  );
}
