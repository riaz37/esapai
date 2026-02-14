"use client";

import React, { useRef } from "react";

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
    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children[0].children);

    cards.forEach((card, i) => {
      let x = 0;
      let y = 0;
      let rotateY = 0;
      let scale = 1;

      // Determine animation based on grid position (rough approximation for Concept 1)
      if (i === 0 || i === 4) { // Left column
        x = -200;
        rotateY = 25;
      } else if (i === 2) { // Top Right
        x = 200;
        rotateY = -25;
      } else if (i === 1) { // Top Center
        y = 100;
        scale = 0.95;
      } else { // Spanning or middle cards
        y = 150;
        scale = 0.9;
      }

      gsap.fromTo(card,
        {
          opacity: 0,
          x,
          y,
          rotateY,
          scale,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 35%",
            scrub: 2,
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
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full py-12 sm:py-20 bg-transparent z-20 overflow-hidden")}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Focus on Growth"
          subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
          badge="Our Solutions"
          badgeIcon={Cpu}
          align="center"
        />

        {/* Bento Grid with synced wireframe */}
        <div ref={gridRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(400px,auto)]">
            {/* Row 1: Tall left + 2 shorter right */}
            <div className="md:row-span-2">
              <ServiceCard
                title={SERVICES[0].title}
                description={SERVICES[0].description}
                className="h-full"
              />
            </div>
            <div>
              <ServiceCard
                title={SERVICES[1].title}
                description={SERVICES[1].description}
                className="h-full"
              />
            </div>
            <div>
              <ServiceCard
                title={SERVICES[2].title}
                description={SERVICES[2].description}
                className="h-full"
              />
            </div>

            {/* Row 2: Wide card spanning 2 columns */}
            <div className="md:col-span-2">
              <ServiceCard
                title={SERVICES[3].title}
                description={SERVICES[3].description}
                className="h-full"
              />
            </div>

            {/* Row 3: Two cards */}
            <div>
              <ServiceCard
                title={SERVICES[4].title}
                description={SERVICES[4].description}
                className="h-full"
              />
            </div>
            <div className="md:col-span-2">
              <ServiceCard
                title={SERVICES[5].title}
                description={SERVICES[5].description}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
