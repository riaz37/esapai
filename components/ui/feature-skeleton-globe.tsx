"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface FeatureSkeletonGlobeProps {
  className?: string;
}

export function FeatureSkeletonGlobe({ className }: FeatureSkeletonGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.074, 0.96, 0.518], // Green dots matching world map: rgba(19, 245, 132)
      markerColor: [0.074, 0.96, 0.518], // Primary color: rgba(19, 245, 132)
      glowColor: [0.074, 0.96, 0.518], // Primary color for glow
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
      <canvas
        ref={canvasRef}
        className={`absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72 w-[600px] h-[600px] max-w-full aspect-square ${className || ""}`}
      />
    </div>
  );
}

