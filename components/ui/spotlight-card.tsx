"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(19, 245, 132, 0.15)",
  glowColor = "rgba(19, 245, 132, 0.3)",
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
    onMouseMove?.(e);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "product-card relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Effect - Radial Gradient Background */}
      {/* Note: Dynamic styles required for mouse position tracking - cannot use static Tailwind classes */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor} 0%, ${spotlightColor.replace("0.15", "0.05")} 30%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Additional Glow Effect on Hover */}
      {/* Note: Dynamic styles required for conditional hover glow - cannot use static Tailwind classes */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px]"
        style={{
          boxShadow: isHovered
            ? `0 0 40px ${glowColor}, inset 0 0 40px ${glowColor.replace("0.3", "0.1")}`
            : "none",
        }}
      />
    </div>
  );
}

