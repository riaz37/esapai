/**
 * Performance utilities for adaptive quality control
 */

export interface ViewportPerformanceProfile {
  width: number;
  height: number;
  dpr: number;
  physicalPixels: number;
  isLargeDisplay: boolean;
  prefersReducedMotion: boolean;
  shouldReduceMotion: boolean;
}

const LARGE_DISPLAY_MIN_WIDTH = 2560;
const LARGE_DISPLAY_MIN_HEIGHT = 1440;
const LARGE_DISPLAY_PIXEL_BUDGET = 6_000_000;

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Classifies the current viewport so expensive visual effects can scale down
 * before large screens turn scroll-linked animation into paint-bound work.
 */
export const getViewportPerformanceProfile = (): ViewportPerformanceProfile => {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      dpr: 1,
      physicalPixels: 0,
      isLargeDisplay: false,
      prefersReducedMotion: false,
      shouldReduceMotion: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  const physicalPixels = width * height * dpr;
  const reducedMotion = prefersReducedMotion();
  const isLargeDisplay =
    width >= LARGE_DISPLAY_MIN_WIDTH ||
    height >= LARGE_DISPLAY_MIN_HEIGHT ||
    physicalPixels >= LARGE_DISPLAY_PIXEL_BUDGET;

  return {
    width,
    height,
    dpr,
    physicalPixels,
    isLargeDisplay,
    prefersReducedMotion: reducedMotion,
    shouldReduceMotion: reducedMotion || isLargeDisplay,
  };
};

export const syncDocumentPerformanceMode = (
  profile = getViewportPerformanceProfile(),
) => {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.performanceMode = profile.prefersReducedMotion
    ? "reduced-motion"
    : profile.isLargeDisplay
      ? "large-display"
      : "standard";
};
