"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Workflow, Search, FileText, Code2, Plug, Rocket, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";


gsap.registerPlugin(ScrollTrigger);

interface ProcessStepData {
  title: string;
  description: string;
}

interface ServiceProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStepData[];
  badge?: string;
}

const STEP_ICONS = [Search, FileText, Code2, Plug, Rocket, Headphones];

export function ServiceProcessSection({
  title,
  subtitle,
  badge,
  steps = [],
}: ServiceProcessSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const displaySteps = useMemo(() => {
    return steps.map((step, i) => ({
      id: String(i + 1).padStart(2, "0"),
      title: step.title,
      description: step.description,
      icon: STEP_ICONS[i % STEP_ICONS.length],
    }));
  }, [steps]);

  const locale = useLocale();
  const isRTL = locale === "ar";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!scrollContainerRef.current || !trackRef.current || !stickyWrapperRef.current) return;

        const track = trackRef.current;
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const amountToScroll = trackWidth - viewportWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyWrapperRef.current,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.to(track, {
          x: isRTL ? (amountToScroll + 100) : -(amountToScroll + 100),
          ease: "none",
        });
      });

      return () => mm.revert();
    },
    { scope: scrollContainerRef, dependencies: [isRTL] }
  );

  return (
    <Section
      withContainer={false}
      padding="none"
      ref={scrollContainerRef}
      className="relative w-full md:h-[250vh] scroll-mt-20 md:scroll-mt-32"
    >
      <div
        ref={stickyWrapperRef}
        className="md:h-screen w-full flex flex-col justify-between overflow-hidden relative bg-transparent"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-20 flex-none z-10 pointer-events-none">
          <SectionHeader
            badge={badge ?? ""}
            badgeIcon={Workflow}
            title={title || ""}
            subtitle={subtitle || ""}
            align="left"
            className="mb-0"
          />
        </div>

        <div className="flex-1 w-full flex items-start pt-8 md:pt-12 overflow-hidden no-scrollbar relative z-0">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:ps-[max(2rem,calc((100vw-1400px)/2+2rem))] md:pe-[5vw] pb-16 sm:pb-20 md:pb-0 w-full md:w-max"
          >
            {displaySteps.map((step, index) => (
              <ProcessCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProcessCard({ step, index }: { step: { id: string; title: string; description: string; icon: React.ComponentType<{ className?: string }> }; index: number }) {
  return (
    <div className="relative group w-full md:w-[500px] flex-shrink-0">
      <Card
        className={cn(
          "relative min-h-[400px] p-8 flex flex-col",
          "bg-white/[0.02] backdrop-blur-md border-white/10",
          "hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-500",
          "group cursor-default"
        )}
      >
        <span className="absolute top-4 end-6 text-8xl font-bold text-white/5 select-none transition-colors group-hover:text-primary/10">
          {step.id}
        </span>

        <div className="relative z-10 pt-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
            <step.icon className="w-6 h-6" />
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>

          <p className="text-gray-400 leading-relaxed text-base">
            {step.description}
          </p>
        </div>

        <div className="absolute bottom-0 start-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-start" />
      </Card>
    </div>
  );
}
