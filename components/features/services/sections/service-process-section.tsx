"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Workflow, Search, FileText, Code2, Plug, Rocket, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);


  useGSAP(
    () => {
      // Logic for Desktop/Horizontal Scroll
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!scrollContainerRef.current || !trackRef.current || !stickyWrapperRef.current) return;

        const track = trackRef.current;
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const amountToScroll = trackWidth - viewportWidth;

        // Ensure we have enough scroll distance
        // The taller the container, the slower the horizontal scroll
        const scrollDistance = amountToScroll + 600;

        // Set the height of the scroll container to enable scrolling
        // We set this dynamically or just use a CSS class (like h-[400vh])
        // Here we rely on the parent className passed or explicitly set it via CSS.

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyWrapperRef.current, // Pin the internal wrapper, not the container itself
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Horizontal Scroll
        tl.to(track, {
          x: -(amountToScroll + 100), // Move slightly past end for padding
          ease: "none",
        });


      });

      return () => mm.revert();
    },
    { scope: scrollContainerRef }
  );

  return (
    // Outer scroll container - defines the scrollable height
    <Section
      withContainer={false}
      padding="none"
      ref={scrollContainerRef}
      className="relative w-full md:h-[250vh] scroll-mt-20 md:scroll-mt-32" // Reduced height for tighter scroll
    >
      {/* Sticky Wrapper - Pins to viewport */}
      <div
        ref={stickyWrapperRef}
        className="md:h-screen w-full flex flex-col justify-between overflow-hidden relative bg-transparent"
      >
        {/* HEADER: Flex-none to keep it at top */}
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-20 flex-none z-10 pointer-events-none">
          <SectionHeader
            badge="Process"
            badgeIcon={Workflow}
            title="How We Build"
            subtitle="From concept to launch, a precise engineering workflow."
            align="left"
            className="mb-0" // Remove default margin as flex handles it
          />
        </div>

        {/* TRACK CONTAINER: Fills remaining space, aligns cards to top with gap */}
        <div className="flex-1 w-full flex items-start pt-8 md:pt-12 overflow-hidden no-scrollbar relative z-0">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] md:pr-[5vw] w-full md:w-max"
          >
            {STEPS.map((step, index) => (
              <ProcessCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* PROGRESS BAR: Fixed at bottom */}

      </div>
    </Section>
  );
}

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <div className="relative group w-full md:w-[500px] flex-shrink-0">

      <Card
        className={cn(
          "relative min-h-[400px] p-8 flex flex-col", // Removed justify-between
          "bg-black/40 backdrop-blur-md border-white/10",
          "hover:border-primary/30 hover:bg-black/60 transition-all duration-500",
          "group cursor-default"
        )}
      >
        {/* Big Background Number */}
        <span className="absolute top-4 right-6 text-8xl font-bold text-white/5 select-none transition-colors group-hover:text-primary/10">
          {step.id}
        </span>

        {/* Card Header */}
        <div className="relative z-10 pt-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
            <step.icon className="w-6 h-6" />
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-primary/80 mb-6">
            {step.duration}
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>

          {/* Card Description - Matches MissionCard style (no line, small gap) */}
          <p className="text-gray-400 leading-relaxed text-base">
            {step.description}
          </p>
        </div>

        {/* Hover Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </div>
  )
}
