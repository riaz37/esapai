"use client";

import { useRef, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Workflow, Search, FileText, Code2, Plug, Rocket, Headphones } from "lucide-react";
import type { ServiceProcessStep } from "@/types/service";
import { cn } from "@/lib/utils";
import { ProcessTimeline, type ProcessTimelineItem } from "@/components/ui/process-timeline";

const DEFAULT_STEPS: (ServiceProcessStep & { icon: React.ComponentType<{ className?: string }> })[] = [
  { duration: "Week 1", title: "Discovery & assessment", description: "We align on goals, map your systems, and identify the highest-impact automation opportunities.", icon: Search },
  { duration: "Week 2–3", title: "Strategy & roadmap", description: "ROI analysis, technology selection, and a phased implementation plan with clear milestones.", icon: FileText },
  { duration: "Week 4–8", title: "Design & build", description: "Custom agent design and development tailored to your workflows and integration points.", icon: Code2 },
  { duration: "Week 9–10", title: "Integrate & test", description: "Seamless connection to your infrastructure, APIs, and data sources with rigorous testing.", icon: Plug },
  { duration: "Week 11–12", title: "Deploy & train", description: "Go-live with change management, training, and handover so your team is ready to run.", icon: Rocket },
  { duration: "Ongoing", title: "Support & optimize", description: "24/7 monitoring, updates, and continuous improvement so your solution stays at peak performance.", icon: Headphones },
];

export function ServiceProcessSection({
  title = "This is how we do it",
  subtitle = "From discovery to go-live and beyond—a clear process so you know what to expect at every step.",
  steps = DEFAULT_STEPS,
}: {
  title?: string;
  subtitle?: string;
  steps?: (ServiceProcessStep & { icon?: React.ComponentType<{ className?: string }> })[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const displaySteps = steps?.length ? steps : DEFAULT_STEPS;

  const items = useMemo<ProcessTimelineItem[]>(() => {
    return displaySteps.map((step, index) => {
      const Icon = step.icon ?? DEFAULT_STEPS[index]?.icon ?? FileText;
      const stepNumber = (index + 1).toString().padStart(2, "0");

      return {
        id: index,
        leftContent: (
          <div className="flex justify-end pt-2 pr-4 lg:pr-6">
            <span
              className={cn(
                "text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter transition-all duration-500",
                "text-primary/60 group-hover:text-primary",
                "drop-shadow-[0_0_8px_rgba(19,245,132,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(19,245,132,0.4)]",
                "relative z-20"
              )}
            >
              {stepNumber}
            </span>
          </div>
        ),
        rightContent: (
          <Card
            className={cn(
              "group relative border border-white/10 overflow-hidden",
              "p-5 sm:p-6 transition-all duration-300",
              "hover:shadow-glow-primary-feature hover:border-primary/20",
              "bg-black/40 shadow-[0px_2px_12px_0px_rgba(226,226,226,0.15)_inset]"
            )}
          >
            {/* Light sweep on hover */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:animate-light-sweep" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    "bg-white/5 border border-white/10 text-primary",
                    "group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-300"
                  )}
                >
                  <Icon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          </Card>
        ),
      };
    });
  }, [displaySteps]);

  return (
    <Section
      ref={sectionRef}
      id="how-it-works"
      padding="none"
      containerMaxWidth="full"
      className="overflow-visible py-20 sm:py-28 lg:py-32"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[800px] gap-0">
        {/* Left: Pinned heading + subtitle */}
        <div
          ref={leftRef}
          className={cn(
            "relative z-10 flex flex-col justify-center overflow-hidden",
            "col-span-1 lg:col-span-5",
            "px-4 sm:px-6 md:px-8 lg:pl-8 lg:pr-6",
            "py-12 lg:py-24",
            "lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)]"
          )}
        >
          <div className="min-w-0 w-full max-w-full">
            <SectionHeader
              badge="Process"
              badgeIcon={Workflow}
              title={title}
              subtitle={subtitle}
              align="left"
              titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-white tracking-tight break-words"
              subtitleClassName="text-base md:text-lg text-white/80 max-w-md mt-4 break-words"
            />
          </div>
        </div>

        {/* Right: Vertical timeline */}
        <div className="col-span-1 lg:col-span-7 min-w-0 pt-4 lg:pt-24 lg:pb-32 px-0">
          <ProcessTimeline items={items} className="max-w-none px-0" />
        </div>
      </div>
    </Section>
  );
}
