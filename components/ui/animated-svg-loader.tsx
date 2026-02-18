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

/**
 * SVG Path-based loader - draws a path progressively
 */
function SVGPathLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const pathData = "M 20,50 Q 50,20 80,50 T 80,50";

  useGSAP(() => {
    // Respect reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    // Path drawing animation
    const pathTween = gsap.fromTo(
      pathRef.current,
      { strokeDashoffset: 200, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      }
    );
    animationsRef.current.push(pathTween);

    // Circle movement along path
    const circleTween = gsap.to(circleRef.current, {
      x: 60,
      duration: 0.75,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    animationsRef.current.push(circleTween);
    
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
      <svg width={dimension} height={dimension} viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="200"
        />
        <circle
          ref={circleRef}
          cx="20"
          cy="50"
          r="4"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Morphing shape loader - transforms between different shapes
 */
function MorphingLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];
  const pathRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const shapes = {
    circle: "M 50,50 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0",
    triangle: "M 50,20 L 80,70 L 20,70 Z",
    square: "M 30,30 L 70,30 L 70,70 L 30,70 Z",
    hexagon: "M 50,20 L 75,35 L 75,65 L 50,80 L 25,65 L 25,35 Z",
  };

  useGSAP(() => {
    // Respect reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    timelineRef.current = gsap.timeline({ repeat: -1 });
    
    timelineRef.current
      .to(pathRef.current, { attr: { d: shapes.triangle }, duration: 0.5, ease: "power2.inOut" })
      .to(pathRef.current, { attr: { d: shapes.square }, duration: 0.5, ease: "power2.inOut" })
      .to(pathRef.current, { attr: { d: shapes.hexagon }, duration: 0.5, ease: "power2.inOut" })
      .to(pathRef.current, { attr: { d: shapes.circle }, duration: 0.5, ease: "power2.inOut" });
    
    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  });
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg width={dimension} height={dimension} viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d={shapes.circle}
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
