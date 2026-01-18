"use client";

import React, { useRef } from "react";

import { ServiceCard } from "@/components/ui/service-card";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceSyncedWireframe } from "./service-synced-wireframe";

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
  const gridRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  return (
    <section
      className={cn("relative w-full py-24 md:py-32 bg-transparent z-20 overflow-hidden")}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Focus on Growth"
          subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
          align="center"
          className="mb-16"
        />

        {/* Bento Grid with synced wireframe */}
        <div ref={gridRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(280px,auto)]">
            {/* Row 1: Tall left + 2 shorter right */}
            <div ref={card0Ref} className="md:row-span-2">
              <ServiceCard
                title={SERVICES[0].title}
                description={SERVICES[0].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card0Ref} />}
              />
            </div>
            <div ref={card1Ref}>
              <ServiceCard
                title={SERVICES[1].title}
                description={SERVICES[1].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card1Ref} />}
              />
            </div>
            <div ref={card2Ref}>
              <ServiceCard
                title={SERVICES[2].title}
                description={SERVICES[2].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card2Ref} />}
              />
            </div>

            {/* Row 2: Wide card spanning 2 columns */}
            <div ref={card3Ref} className="md:col-span-2">
              <ServiceCard
                title={SERVICES[3].title}
                description={SERVICES[3].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card3Ref} />}
              />
            </div>

            {/* Row 3: Two cards */}
            <div ref={card4Ref}>
              <ServiceCard
                title={SERVICES[4].title}
                description={SERVICES[4].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card4Ref} />}
              />
            </div>
            <div ref={card5Ref} className="md:col-span-2">
              <ServiceCard
                title={SERVICES[5].title}
                description={SERVICES[5].description}
                className="h-full"
                wireframe={<ServiceSyncedWireframe containerRef={gridRef} cardRef={card5Ref} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
