"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

/**
 * Advanced SVG-based loading animation
 * Migrated from Motion to GSAP for better performance
 */

import type { AnimatedSVGLoaderProps } from "@/types/props";

const sizeMap = {
  sm: 24,
  md: 48,
  lg: 96,
};

const colorMap = {
  primary: "rgba(19, 245, 132, 1)",
  white: "rgba(255, 255, 255, 1)",
  gray: "rgba(156, 163, 175, 1)",
};

export function AnimatedSVGLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];
  const outerRingRef = useRef<SVGCircleElement>(null);
  const innerCircleRef = useRef<SVGCircleElement>(null);
  const centerDotRef = useRef<SVGCircleElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(() => {
    // Respect reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    // Outer rotating ring
    const ringTween = gsap.to(outerRingRef.current, {
      rotation: 360,
      duration: 1.5,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    animationsRef.current.push(ringTween);

    // Inner pulsing circle
    const circleTween = gsap.to(innerCircleRef.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 0.75,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
    });
    animationsRef.current.push(circleTween);

    // Center dot
    const dotTween = gsap.to(centerDotRef.current, {
      scale: 1.3,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
    });
    animationsRef.current.push(dotTween);
    
    // Cleanup
    return () => {
      animationsRef.current.forEach(tween => {
        if (tween) tween.kill();
      });
      animationsRef.current = [];
    };
  });
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(tween => {
        if (tween) tween.kill();
      });
    };
  }, []);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating ring */}
        <circle
          ref={outerRingRef}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={`url(#gradient-${variant})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="94.2"
          filter={`url(#glow-${variant})`}
        />

        {/* Inner pulsing circle */}
        <circle
          ref={innerCircleRef}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeOpacity="0.5"
        />

        {/* Center dot */}
        <circle
          ref={centerDotRef}
          cx="50"
          cy="50"
          r="4"
          fill={color}
        />
      </svg>
    </div>
  );
}

