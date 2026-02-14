"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { PerformanceMetric as PerformanceMetricType } from "@/types/product";
import type { PerformanceMetricProps, PerformanceSectionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

// Note: PerformanceMetricProps in this file is different from types/props.ts
// This is a local component-specific type, not the exported one
type LocalPerformanceMetricProps = {
  value: string;
  label: string;
  valueRef: (el: HTMLSpanElement | null) => void;
};

function PerformanceMetric({ value, label, valueRef }: LocalPerformanceMetricProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative">
        <span ref={valueRef} className="relative z-10 text-gradient-radial-white">
          {value}
        </span>
      </div>
      <p className="text-lg md:text-xl text-gradient-radial-white">{label}</p>
    </div>
  );
}


const defaultMetrics: PerformanceMetricType[] = [
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
];

export function PerformanceSection({
  metrics = defaultMetrics,
}: PerformanceSectionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  const extractNumber = (value: string): number => {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const formatValue = (value: string, num: number): string => {
    if (value.includes("%")) return `${Math.round(num)}%`;
    if (value.includes("x")) return `${num.toFixed(1)}x`;
    return Math.round(num).toString();
  };

  useGSAP(
    () => {
      if (!isInView || !sectionRef.current) return;

      valueRefs.current.forEach((valueRef, index) => {
        if (!valueRef) return;

        const originalValue = metrics[index]?.value || "0%";
        const targetNumber = extractNumber(originalValue);

        if (prefersReducedMotion()) {
          valueRef.textContent = originalValue;
          return;
        }

        gsap.set(valueRef, { opacity: 0, scale: 0.5 });

        gsap.to(valueRef, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            const animatedValue = { value: 0 };

            gsap.to(animatedValue, {
              value: targetNumber,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                valueRef.textContent = formatValue(
                  originalValue,
                  animatedValue.value
                );
              },
            });
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [isInView, metrics] }
  );

  return (
    <Section>
      <div
        ref={(node) => {
          sectionRef.current = node;
          setIntersectionRef(node);
        }}
        className="relative w-full rounded-lg p-8 md:p-12 bg-dark performance-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <PerformanceMetric
              key={index}
              value={metric.value}
              label={metric.label}
              valueRef={(el) => {
                valueRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}



