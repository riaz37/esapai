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
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/agenticai.svg",
  },
  {
    id: "strategy",
    title: "Enterprise Strategy",
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/enterprise.svg",
  },
  {
    id: "faas",
    title: "FaaS Infrastructure",
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/faas.svg",
  },
  {
    id: "tailored",
    title: "Tailored Solutions",
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/aisolution.svg",
  },
  {
    id: "industry",
    title: "Industry Excellence",
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/industry.svg",
  },
  {
    id: "lab",
    title: "Innovation Lab",
    description: "For everyone starting out on a website for their big idea",
    image: "/bentogird/ailab.svg",
  },
];

export function Service() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    // Target the direct Children of the grid container (the wrappers of ServiceCard)
    const cards = Array.from(gridRef.current.children[0].children);

    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1, // Smoothly link to scroll
          invalidateOnRefresh: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full py-8 sm:py-16 bg-transparent z-20 overflow-hidden")}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(280px,auto)]">
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
