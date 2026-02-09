"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Workflow, Search, FileText, Code2, Plug, Rocket, Headphones, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface ProcessStep {
  id: string;
  duration: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: ProcessStep[] = [
  {
    id: "01",
    duration: "Week 1",
    title: "Discovery & Assessment",
    description: "We align on goals, map your systems, and identify the highest-impact automation opportunities.",
    icon: Search
  },
  {
    id: "02",
    duration: "Week 2–3",
    title: "Strategy & Roadmap",
    description: "ROI analysis, technology selection, and a phased implementation plan with clear milestones.",
    icon: FileText
  },
  {
    id: "03",
    duration: "Week 4–8",
    title: "Design & Build",
    description: "Custom agent design and development tailored to your workflows and integration points.",
    icon: Code2
  },
  {
    id: "04",
    duration: "Week 9–10",
    title: "Integrate & Test",
    description: "Seamless connection to your infrastructure, APIs, and data sources with rigorous testing.",
    icon: Plug
  },
  {
    id: "05",
    duration: "Week 11–12",
    title: "Deploy & Train",
    description: "Go-live with change management, training, and handover so your team is ready to run.",
    icon: Rocket
  },
  {
    id: "06",
    duration: "Ongoing",
    title: "Support & Optimize",
    description: "24/7 monitoring, updates, and continuous improvement so your solution stays at peak performance.",
    icon: Headphones
  },
];

export function ServiceProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map vertical scroll to horizontal translation on desktop only
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative min-h-screen md:h-[400vh] bg-black">
      {/* Sticky Viewport (Desktop) / Normal Flow (Mobile) */}
      <div className="md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-between py-12 md:py-24 overflow-hidden">

        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(19,245,132,0.03),transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <SectionHeader
            badge="Process"
            badgeIcon={Workflow}
            title="How We Build"
            subtitle="From concept to launch, a precise engineering workflow."
            align="left"
          />
        </div>

        {/* Horizontal Track (Desktop) / Vertical Stack (Mobile) */}
        <div ref={trackRef} className="relative w-full px-4 md:px-0 md:pl-[10vw] mb-12">
          <motion.div
            style={{ x }}
            className="flex flex-col md:flex-row gap-8 md:gap-24 items-center md:w-max md:py-20"
          >
            {STEPS.map((step, index) => (
              <ProcessCard
                key={step.id}
                step={step}
                index={index}
                total={STEPS.length}
                progress={smoothProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress Bar (Desktop Only) */}
        <div className="hidden md:block absolute bottom-10 left-0 w-full px-20">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full bg-primary"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
  total,
  progress
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Calculate active range for this card roughly based on index
  const stepSize = 1 / Math.max(total - 1, 1);
  const start = Math.max(0, (index * stepSize) - 0.15);
  const end = Math.min(1, (index * stepSize) + 0.15);

  // Transform scale and opacity based on proximity to "active" scroll position
  const isActive = useTransform(progress, [start, index * stepSize, end], [0, 1, 0]);

  const scale = useTransform(isActive, [0, 1], [0.95, 1.05]);
  const opacity = useTransform(isActive, [0, 1], [0.4, 1]);

  return (
    <motion.div
      className="relative group w-full md:w-auto"
      style={{
        scale,
        opacity
      }}
    >
      {/* Connection Line segment (Desktop) */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-1/2 left-full w-8 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
      )}

      {/* Decorative vertical line (Mobile) */}
      {index < total - 1 && (
        <div className="md:hidden absolute top-full left-1/2 w-[1px] h-8 bg-white/10 -translate-x-1/2 z-0" />
      )}

      <Card
        className={cn(
          "relative w-full md:w-[320px] h-auto md:h-[420px] p-6 md:p-8 flex flex-col justify-between",
          "bg-black/40 backdrop-blur-md",
          "transition-colors duration-500",
          "z-10"
        )}
        style={{
          borderColor: "rgba(255,255,255,0.1)" // Fallback/Base
        }}
      >

        {/* Step Number */}
        <div className="text-6xl md:text-9xl font-bold text-white/5 absolute top-4 right-4 select-none">
          {step.id}
        </div>

        {/* Top Content */}
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8">
            <step.icon className="w-7 h-7" />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary/80 mb-6">
            {step.duration}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {step.title}
          </h3>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10">
          <p className="text-white/60 leading-relaxed text-base md:text-lg">
            {step.description}
          </p>

          {/* Active Indicator Icon */}
          <motion.div
            style={{ opacity: isActive }}
            className="mt-6 flex items-center gap-2 text-sm text-primary -translate-x-2"
          >
            <span className="font-mono uppercase tracking-wider">Explore</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          style={{ opacity: isActive }}
          className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/5 to-primary/10 pointer-events-none"
        />
      </Card>
    </motion.div>
  );
}
