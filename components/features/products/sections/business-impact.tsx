"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Spotlight } from "@/components/ui/spotlight";
import { BarChart3 } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";
import type { PerformanceMetric as PerformanceMetricType } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BusinessImpactProps {
  product: Product | null;
}

function extractNumber(value: string): number {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function formatValue(value: string, num: number): string {
  if (value.includes("%")) return `${Math.round(num)}%`;
  if (value.includes("x")) return `${num.toFixed(1)}x`;
  if (value.includes("/")) return `${num.toFixed(1)}/5`;
  return Math.round(num).toString();
}

export function BusinessImpact({ product }: BusinessImpactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const metrics: PerformanceMetricType[] =
    product?.content?.performance?.metrics ?? [
      { value: "75%", label: "Time Savings" },
      { value: "90%", label: "User Satisfaction" },
      { value: "3x", label: "Productivity Increase" },
    ];
  const subtitle = product?.content?.mission?.subtitle ?? "Here's the proof.";

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reducedMotion = prefersReducedMotion();

      // Count-up for metrics
      valueRefs.current.forEach((valueRef, index) => {
        if (!valueRef) return;
        const originalValue = metrics[index]?.value ?? "0%";
        const targetNumber = extractNumber(originalValue);

        if (reducedMotion) {
          valueRef.textContent = originalValue;
          return;
        }

        gsap.fromTo(
          valueRef,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valueRef,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              const animatedValue = { value: 0 };
              gsap.to(animatedValue, {
                value: targetNumber,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                  valueRef.textContent = formatValue(originalValue, animatedValue.value);
                },
              });
            },
          }
        );
      });

    },
    { scope: sectionRef, dependencies: [product?.slug] }
  );

  return (
    <Section
      ref={sectionRef}
      padding="lg"
      containerMaxWidth="wide"
      className="bg-transparent overflow-hidden"
      data-section="impact"
    >
      <SectionHeader
        title="Outcomes"
        subtitle={subtitle}
        badge="Proof"
        badgeIcon={BarChart3}
        align="center"
        className="mb-10"
      />

      {/* Metrics grid — same structure as landing achievement section (with visible grid lines) */}
      <div ref={gridRef} className="relative w-full">
        {/* Horizontal grid lines — top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#13F584]/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#13F584]/50 to-transparent z-20 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 md:divide-x md:divide-[#13F584]/30">
          {metrics.map((metric, index) => (
            <Spotlight
              key={index}
              className="relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center w-full h-full"
              intensity={0.45}
              radius={400}
            >
              {/* Vertical grid line — right divider (md+) */}
              {index < metrics.length - 1 && (
                <div
                  className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#13F584]/40 to-transparent hidden md:block z-50 pointer-events-none"
                  aria-hidden
                />
              )}

              <div className="relative z-40 pointer-events-none">
                <span
                  ref={(el) => {
                    valueRefs.current[index] = el;
                  }}
                  className="block text-5xl sm:text-6xl md:text-7xl font-bold text-primary tracking-tighter mb-3"
                >
                  {metric.value}
                </span>
                <span className="text-white text-label-caps">
                  {metric.label}
                </span>
              </div>
            </Spotlight>
          ))}
        </div>
      </div>
    </Section>
  );
}
