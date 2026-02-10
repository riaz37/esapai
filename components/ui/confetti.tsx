"use client";

import React, { useImperativeHandle, forwardRef } from "react";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export interface ConfettiHandle {
  trigger: (options?: ConfettiOptions) => void;
}

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
}

const DEFAULT_OPTIONS: ConfettiOptions = {
  particleCount: 120,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#13f584", "#1EF38A", "#16f585", "#0d9488", "#2dd4bf"],
};

interface ConfettiProps {
  /** Optional ref for imperative trigger. */
  ref?: React.Ref<ConfettiHandle>;
}

function ConfettiImpl(_props: ConfettiProps, ref: React.Ref<ConfettiHandle>) {
  useImperativeHandle(
    ref,
    () => ({
      trigger(options?: ConfettiOptions) {
        if (typeof window === "undefined") return;
        if (prefersReducedMotion()) return;

        import("canvas-confetti").then((confetti) => {
          const opts = { ...DEFAULT_OPTIONS, ...options };
          confetti.default({
            particleCount: opts.particleCount ?? 120,
            spread: opts.spread ?? 70,
            origin: opts.origin ?? { y: 0.6 },
            colors: opts.colors ?? DEFAULT_OPTIONS.colors,
            disableForReducedMotion: true,
          });
        });
      },
    }),
    []
  );

  return null;
}

export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(
  ConfettiImpl
);

/**
 * One-shot confetti trigger (e.g. from a button or on mount).
 * Respects prefers-reduced-motion.
 */
export function triggerConfetti(options?: ConfettiOptions): void {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;

  import("canvas-confetti").then((confetti) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    confetti.default({
      particleCount: opts.particleCount ?? 120,
      spread: opts.spread ?? 70,
      origin: opts.origin ?? { y: 0.6 },
      colors: opts.colors ?? DEFAULT_OPTIONS.colors,
      disableForReducedMotion: true,
    });
  });
}
