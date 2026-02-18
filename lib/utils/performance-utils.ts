/**
 * Performance utilities for adaptive quality control
 */

import type { PerformanceTier } from "@/types/performance";

/**
 * Get device performance tier for optimization
 */
const getPerformanceTier = (): PerformanceTier => {
  if (typeof window === "undefined") return "medium";
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  const pixelRatio = window.devicePixelRatio || 1;
  
  if (hardwareConcurrency >= 8 && deviceMemory >= 8 && pixelRatio <= 2) {
    return "high";
  } else if (hardwareConcurrency >= 4 && deviceMemory >= 4) {
    return "medium";
  } else {
    return "low";
  }
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get adaptive quality settings based on performance tier
 */
const getAdaptiveQuality = (tier: PerformanceTier) => {
  switch (tier) {
    case "high":
      return {
        dpr: [1, 2],
        antialias: true,
        shadows: true,
        maxFPS: 60,
        gridSize: 40,
        particleCount: 1.0,
      };
    case "medium":
      return {
        dpr: [1, 1.5],
        antialias: true,
        shadows: false,
        maxFPS: 45,
        gridSize: 30,
        particleCount: 0.7,
      };
    case "low":
      return {
        dpr: [1, 1],
        antialias: false,
        shadows: false,
        maxFPS: 30,
        gridSize: 20,
        particleCount: 0.5,
      };
  }
};

/**
 * Throttle function calls based on frame rate
 */
const createFrameThrottle = (targetFPS: number) => {
  const frameInterval = 1000 / targetFPS;
  let lastFrameTime = 0;
  
  return (callback: () => void) => {
    const now = performance.now();
    const elapsed = now - lastFrameTime;
    
    if (elapsed >= frameInterval) {
      callback();
      lastFrameTime = now - (elapsed % frameInterval);
      return true;
    }
    return false;
  };
};

