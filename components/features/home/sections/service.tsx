"use client";

import React, { useRef } from "react";

import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


// --- Data ---
const SERVICES = [
  {
    id: "agentic",
    title: "Agentic AI Integration",
    description: "Seamlessly integrate autonomous agents into your workflow to automate complex decision-making processes.",
    image: "/bentogird/agenticai.svg",
  },
  {
    id: "strategy",
    title: "Enterprise Strategy",
    description: "Tailored AI roadmaps designed to align with your business goals and drive long-term digital transformation.",
    image: "/bentogird/enterprise.svg",
  },
  {
    id: "faas",
    title: "FaaS Infrastructure",
    description: "Managed infrastructure for AI Agent Framework-as-a-Service, ensuring scalability and peak performance.",
    image: "/bentogird/faas.svg",
  },
  {
    id: "tailored",
    title: "Tailored Solutions",
    description: "Bespoke AI systems built from the ground up to solve your unique operational challenges and industry needs.",
    image: "/bentogird/aisolution.svg",
  },
  {
    id: "industry",
    title: "Industry Excellence",
    description: "Leveraging domain-specific expertise to deploy AI solutions that exceed industry standards for security and reliability.",
    image: "/bentogird/industry.svg",
  },
  {
    id: "lab",
    title: "Innovation Lab",
    description: "Continuous research and rapid prototyping of cutting-edge AI technologies to keep your enterprise ahead of the curve.",
    image: "/bentogird/ailab.svg",
  },
];

export function Service() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
    }, (context) => {
      const { isMobile } = context.conditions as any;
      const cards = gsap.utils.toArray(gridRef.current!.querySelectorAll(".service-card-wrapper"));

      cards.forEach((card: any, i) => {
        let entryX = 0;
        let entryY = 30;
        let rotateY = 0;

        if (!isMobile) {
          // Large card on left
          if (i === 0) {
            entryX = -40;
            rotateY = 15;
          }
          // Top cards
          else if (i === 1 || i === 2) {
            entryY = -20;
            rotateY = i === 1 ? -5 : 5;
          }
          // Bottom wide card
          else if (i === 3) {
            entryY = 40;
            rotateY = -10;
          }
        }

        gsap.fromTo(card,
          {
            opacity: 0,
            x: isMobile ? 0 : entryX,
            y: isMobile ? 40 : entryY,
            rotateY: isMobile ? 0 : rotateY,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            ease: "power2.out",
          }
        );
      });
    });
  }, { scope: sectionRef });

  return (
    <Section
      ref={sectionRef}
      padding="md"
      className={cn("relative w-full bg-transparent z-20 overflow-hidden")}
    >
      <SectionHeader
        title="Focus on Growth"
        subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
        badge="Our Solutions"
        badgeIcon={Cpu}
        align="center"
      />

      {/* Bento Grid with synced wireframe */}
      <div ref={gridRef} className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] gap-4 auto-rows-[minmax(360px,auto)]">
          {/* Big Card on the Left (Spans 2 rows) */}
          <div className="service-card-wrapper md:row-span-2 h-full">
            <ServiceCard
              title={SERVICES[0].title}
              description={SERVICES[0].description}
              className="h-full min-h-[400px] md:min-h-[740px]"
            />
          </div>

          {/* Right Column - Top Left (Split) */}
          <div className="service-card-wrapper h-full">
            <ServiceCard
              title={SERVICES[1].title}
              description={SERVICES[1].description}
              className="h-full min-h-[360px]"
            />
          </div>

          {/* Right Column - Top Right (Split) */}
          <div className="service-card-wrapper h-full">
            <ServiceCard
              title={SERVICES[2].title}
              description={SERVICES[2].description}
              className="h-full min-h-[360px]"
            />
          </div>

          {/* Right Column - Bottom Card (Spans 2 columns of the right side) */}
          <div className="service-card-wrapper md:col-span-2 h-full">
            <ServiceCard
              title={SERVICES[3].title}
              description={SERVICES[3].description}
              className="h-full min-h-[360px]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
