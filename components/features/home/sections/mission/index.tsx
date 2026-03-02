"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/types/product";
import type { MissionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic2, Rocket, Layers, Target } from "lucide-react";
import { MissionCard } from "@/components/ui/mission-card";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const defaultTitle = "Our Core Mission";
const defaultSubtitle =
  "Building the foundational intelligence layer to empower organizations beyond traditional limits.";
const defaultCards: MissionCardType[] = [
  {
    title: "Democratizing Intelligence",
    description: "Making advanced AI intuitive and accessible through voice-first innovation.",
    icon: Mic2,
    image: "/landing/m1.svg",
  },
  {
    title: "Accelerating Innovation",
    description: "Deploying autonomous agents to eliminate friction and accelerate business growth.",
    icon: Rocket,
    image: "/landing/m2.svg",
  },
  {
    title: "Unified Ecosystems",
    description: "Connecting legacy systems with future AI for seamless organizational evolution.",
    icon: Layers,
    image: "/landing/m3.svg",
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
        const { isMobile, isTablet } = context.conditions as any;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "+=80%" : "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Luxury "Cylindrical Unrolling" Assembly
        tl.fromTo(
          cardsElements,
          {
            x: isRTL
              ? (isMobile ? "-20%" : (isTablet ? "-80%" : "-150%"))
              : (isMobile ? "20%" : (isTablet ? "80%" : "150%")),
            rotationY: isRTL
              ? (isMobile ? 10 : 60)
              : (isMobile ? -10 : -60),
            rotationX: isMobile ? 5 : 15,
            scale: isMobile ? 0.9 : 0.5,
            z: isMobile ? -100 : -800,
            autoAlpha: 0,
            filter: "blur(15px)",
            transformOrigin: "50% 50%",
          },
          {
            x: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            z: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: isMobile ? 0.3 : 0.8,
            ease: "expo.out",
            force3D: true,
          },
          0.5
        );

        // Add a subtle "parallax" drift
        tl.to(cardsElements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
          z: 20,
          ease: "none"
        });
      });

      // Proactive Header Animation (outside matchMedia since it's simpler)
      const header = sectionRef.current?.querySelector('[data-testid="section-header"]');
      if (header) {
        const children = Array.from(header.children);
        gsap.fromTo(
          children,
          { y: 30, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      padding="md"
      containerClassName="flex flex-col"
      className="relative overflow-hidden z-20 bg-transparent"
      containerMaxWidth="full"
    >
      <SectionHeader
        title={displayTitle}
        subtitle={displaySubtitle}
        badge={badge ?? ""}
        badgeIcon={Target}
        animate={false}
        className="mission-header pt-16 md:pt-20"
      />

      <div className="flex-grow flex items-center justify-center w-full relative z-10 pb-6">
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-6 w-full max-w-[1400px] mx-auto"
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="w-full h-[340px] sm:h-[380px] md:h-[420px]"
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
