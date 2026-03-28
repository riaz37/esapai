"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/types/product";
import type { MissionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic2, Rocket, Layers, Target } from "lucide-react";
import { MissionCard } from "@/components/ui/mission-card";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const defaultCards: MissionCardType[] = [
  {
    title: "Democratizing Intelligence",
    description: "Making advanced AI intuitive and accessible through voice-first innovation.",
    icon: Mic2,
    image: "/landing/m1.webp",
  },
  {
    title: "Accelerating Innovation",
    description: "Deploying autonomous agents to eliminate friction and accelerate business growth.",
    icon: Rocket,
    image: "/landing/m2.webp",
  },
  {
    title: "Unified Ecosystems",
    description: "Connecting legacy systems with future AI for seamless organizational evolution.",
    icon: Layers,
    image: "/landing/m3.webp",
  },
];

export function Mission({
  title,
  subtitle,
  badge,
  cards = defaultCards,
}: MissionProps & { badge?: string } = {}) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const displayTitle = title || "";
  const displaySubtitle = subtitle || "";
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, {
    selector: '[data-testid="section-header"] > *',
    y: 30,
    filter: "blur(10px)",
    stagger: 0.1,
    ease: "power3.out",
  });

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
      }, (context) => {
        if (!trackRef.current) return;
        const cardsElements = Array.from(trackRef.current.children);
        const { isMobile, isTablet } = context.conditions as { isMobile: boolean; isTablet: boolean; isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "+=150%" : "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Side-by-side assembly (no rotation)
        tl.fromTo(
          cardsElements,
          {
            x: isRTL
              ? (isMobile ? "-20%" : (isTablet ? "-80%" : "-150%"))
              : (isMobile ? "20%" : (isTablet ? "80%" : "150%")),
            scale: isMobile ? 0.9 : 0.85,
            autoAlpha: 0,
            filter: "blur(15px)",
          },
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: isMobile ? 0.3 : 0.8,
            ease: "expo.out",
            force3D: true,
          },
          0.5
        );

      });

    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      padding="none"
      containerClassName="flex flex-col min-h-screen md:h-screen"
      className="relative overflow-hidden z-20 bg-transparent flex flex-col justify-center py-10 md:py-0"
      containerMaxWidth="full"
    >
      <SectionHeader
        title={displayTitle}
        subtitle={displaySubtitle}
        badge={badge ?? ""}
        badgeIcon={Target}
        animate={false}
        className="mission-header pt-24 md:pt-28 mb-2 md:mb-4"
      />
      <div className="flex-grow flex items-center justify-center w-full relative z-10 pt-2 pb-12">
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-6 w-full max-w-[1400px] mx-auto"
        >
          {cards.map((card, _index) => (
            <div
              key={card.title}
              className="w-full min-h-[340px] sm:min-h-[380px] md:min-h-[420px]"
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                image={card.image}
                showGlow={true}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
