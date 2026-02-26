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

export interface ServiceItemData {
  id?: string;
  title: string;
  description: string;
  image?: string;
}

export interface ServiceProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  services?: ServiceItemData[];
}

export function Service({
  title,
  subtitle,
  badge,
  services,
}: ServiceProps = {}) {
  const displayServices = services || [];
  const displayTitle = title || "";
  const displaySubtitle = subtitle || "";
  const displayBadge = badge || "";
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
        title={displayTitle}
        subtitle={displaySubtitle}
        badge={displayBadge}
        badgeIcon={Cpu}
        align="center"
      />

      {/* Bento Grid with synced wireframe */}
      <div ref={gridRef} className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] gap-4 auto-rows-[minmax(360px,auto)]">
          {/* Big Card on the Left (Spans 2 rows) */}
          <div className="service-card-wrapper md:row-span-2 h-full">
            <ServiceCard
              title={displayServices[0]?.title || ""}
              description={displayServices[0]?.description || ""}
              className="h-full min-h-[400px] md:min-h-[740px]"
            />
          </div>

          {/* Right Column - Top Left (Split) */}
          <div className="service-card-wrapper h-full">
            <ServiceCard
              title={displayServices[1]?.title || ""}
              description={displayServices[1]?.description || ""}
              className="h-full min-h-[360px]"
            />
          </div>

          {/* Right Column - Top Right (Split) */}
          <div className="service-card-wrapper h-full">
            <ServiceCard
              title={displayServices[2]?.title || ""}
              description={displayServices[2]?.description || ""}
              className="h-full min-h-[360px]"
            />
          </div>

          {/* Right Column - Bottom Card (Spans 2 columns of the right side) */}
          <div className="service-card-wrapper md:col-span-2 h-full">
            <ServiceCard
              title={displayServices[3]?.title || ""}
              description={displayServices[3]?.description || ""}
              className="h-full min-h-[360px]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
