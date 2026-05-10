"use client";

import { useRef } from "react";

import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { SkeletonGrid } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

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

  useScrollReveal(sectionRef, {
    selector: '[data-testid="section-header"] > *',
    y: 30,
    filter: "blur(10px)",
    stagger: 0.1,
    ease: "power2.out",
  });

  useGSAP(() => {
    if (!gridRef.current) return;

    const mm = gsap.matchMedia();

    // Sync GSAP breakpoints with Tailwind (md: 768px)
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };
      const cards = gsap.utils.toArray<Element>(gridRef.current!.querySelectorAll(".service-card-wrapper"));

      cards.forEach((card, i) => {
        let entryX = 0;
        let entryY = 80; // Default rise from below
        let rotateY = 0;

        if (isDesktop) {
          // Large card on left: Come from further left
          if (i === 0) {
            entryX = -100;
            entryY = 0;
            rotateY = 20;
          }
          // Top right split cards: Rise slightly and tilt
          else if (i === 1 || i === 2) {
            entryY = 100;
            rotateY = i === 1 ? -15 : 15;
          }
          // Bottom wide card: Consistent rise
          else if (i === 3) {
            entryY = 120;
            rotateY = -8;
          }
        }

        gsap.fromTo(card,
          {
            opacity: 0,
            x: isDesktop ? entryX : 0,
            y: isDesktop ? entryY : 60,
            rotateY: isDesktop ? rotateY : 0,
            scale: 0.85,
            immediateRender: false,
          },
          {
            scrollTrigger: {
              trigger: card,
              // For top cards, wait until they are deeper in screen (away from header)
              // For bottom "perfect" card (3), keep entering as it crosses the bottom fold
              start: i < 3 ? "top 75%" : "top 95%",
              end: i < 3 ? "top 25%" : "top 45%",
              scrub: 2.5, // High damping for weighted, deliberate motion
              invalidateOnRefresh: true,
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            ease: "expo.out",
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [displayServices] });

  // Helper to get grid classes based on index
  const getGridClasses = (index: number) => {
    switch (index) {
      case 0:
        return "md:row-span-2 h-full";
      case 1:
      case 2:
        return "h-full";
      case 3:
        return "md:col-span-2 h-full";
      default:
        return "h-full";
    }
  };

  // Helper to get specific card styles/props
  const getCardProps = (index: number, _service: ServiceItemData) => {
    switch (index) {
      case 0:
        return {
          videoSrc: "/services/grid-video.mp4",
          imageSrc: "/services/grid1.png",
        };
      case 1:
        return {
          videoSrc: "/services/grid-2.mp4",
          imageSrc: "/services/gridvideo2.png",
        };
      case 2:
        return {
          videoSrc: "/services/gridvideo3.mp4",
          imageSrc: "/services/grid3.png",
        };
      case 3:
        return {
          videoSrc: "/services/gridvideo4.mp4",
          imageSrc: "/services/grid4.png",
        };
      default:
        return {};
    }
  };

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
        badgeIcon={Zap}
        align="center"
      />

      {/* Bento Grid with dynamic mapping */}
      <div ref={gridRef} className="relative w-full">
        {services === undefined ? (
          <SkeletonGrid count={4} variant="card" columns="grid-cols-1 md:grid-cols-3" />
        ) : displayServices.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] gap-4 md:auto-rows-[minmax(360px,auto)]">
            {displayServices.slice(0, 4).map((service, index) => (
              <div
                key={service.id || service.title}
                className={cn("service-card-wrapper aspect-[4/3] md:aspect-auto md:h-full", getGridClasses(index))}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description === "PLACEHOLDER" ? "" : service.description}
                  className={cn(
                    "h-full min-h-0",
                    index === 0 && "md:min-h-[600px] lg:min-h-[740px]"
                  )}
                  {...getCardProps(index, service)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

