"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import with SSR disabled to prevent double loading
const GridFloorComponent = dynamic(
  () => import("@/components/three/instanced-grid-floor").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative w-full h-full z-0 pointer-events-auto"
        style={{
          backgroundColor: 'transparent',
          minHeight: '400px', // Prevent layout shift
        }}
      />
    ),
  }
);

import type { GridFloorProps } from "@/types/props";

export default function GridFloor({ className, perspective }: GridFloorProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`relative w-full h-full z-0 pointer-events-auto ${className || ''}`}
          style={{
            backgroundColor: 'transparent',
            minHeight: '400px', // Prevent layout shift
          }}
        />
      }
    >
      <GridFloorComponent className={className} perspective={perspective} />
    </Suspense>
  );
}

