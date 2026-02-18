"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import type { LazySectionProps } from "@/types/props";

const DefaultFallback = ({ className, minHeight }: { className?: string; minHeight?: string }) => (
  <div
    className={cn("relative w-full", className)}
    style={{ minHeight }}
    aria-hidden="true"
  />
);

/**
 * Wrapper for sections that:
 * 1. Only loads when approaching viewport (Intersection Observer)
 * 2. Shows a placeholder to prevent layout shift
 * 3. Provides smooth progressive loading
 * 
 * Performance benefits:
 * - Reduces initial bundle size
 * - Improves Time to Interactive (TTI)
 * - Better Core Web Vitals scores
 * - Smoother animations (sections animate as they load)
 */
export function LazySection({
  children,
  className,
  fallback,
  threshold = 0.1,
  rootMargin = "200px", // Start loading 200px before it enters viewport
  minHeight = "400px",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isInView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });

  useEffect(() => {
    if (!isInView || shouldLoad) return;

    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setShouldLoad(true);
      // Important: Refresh ScrollTrigger after content is loaded to update layout positions
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [isInView, shouldLoad]);

  const fallbackElement = fallback || <DefaultFallback className={className} minHeight={minHeight} />;

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {shouldLoad ? (
        <Suspense fallback={fallbackElement}>
          {children}
        </Suspense>
      ) : (
        fallbackElement
      )}
    </div>
  );
}
