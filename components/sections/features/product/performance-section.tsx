"use client";

import type { PerformanceMetric as PerformanceMetricType } from "@/lib/products";
import { Section } from "@/components/ui/section";

interface PerformanceMetricProps {
  value: string;
  label: string;
}

function PerformanceMetric({ value, label }: PerformanceMetricProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative">
        <span className="relative z-10 text-gradient-radial-white">
          {value}
        </span>
      </div>
      <p className="text-lg md:text-xl text-gradient-radial-white">{label}</p>
    </div>
  );
}

interface PerformanceSectionProps {
  metrics?: PerformanceMetricType[];
}

const defaultMetrics: PerformanceMetricType[] = [
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
];

export function PerformanceSection({
  metrics = defaultMetrics,
}: PerformanceSectionProps = {}) {
  return (
    <Section containerClassName="max-w-6xl mx-auto">
      <div 
        className="relative w-full rounded-lg p-8 md:p-12 bg-dark performance-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <PerformanceMetric
              key={index}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

