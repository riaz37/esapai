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
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const cardsElements = trackRef.current.children;

      // Clear any previous props to ensure clean state on refresh
      gsap.set(cardsElements, { clearProps: "all" });

      gsap.set(trackRef.current, { perspective: 2000 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Synchronized Header Animation (Non-scrubbed feel but tied to scroll)
      const header = sectionRef.current.querySelector('[data-testid="section-header"]');
      if (header) {
        const badge = header.children[0]; // Badge wrapper
        const titleEl = header.querySelector("h2");
        const accent = header.querySelector('div[class*="bg-primary"]');
        const subtitleEl = header.querySelector("p");

        tl.fromTo(
          [badge, titleEl, accent, subtitleEl],
          {
            y: 30,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          0 // Start immediately at pin
        );
      }

      // Luxury "Cylindrical Unrolling" Assembly
      tl.fromTo(
        cardsElements,
        {
          x: "150%",           // Enter from much further right
          rotationY: -60,     // Stronger cylindrical curve
          rotationX: 15,      // Tilted for perspective
          scale: 0.5,         // Distant perspective
          z: -800,            // Deep space
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
          duration: 1.5,      // Longer, weighted duration
          stagger: 0.8,       // Overlapping "unrolling" feel
          ease: "expo.out",   // Smooth, buttery deceleration
          force3D: true,      // GPU acceleration
        },
        0.5 // Start soon after pin begins
      );

      // Add a subtle "parallax" drift to cards as they are scrolled through
      tl.to(cardsElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        z: 20,              // Slight drift towards camera
        ease: "none"
      });
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      padding="none"
      containerClassName="min-h-screen flex flex-col py-20 sm:py-32"
      className="relative overflow-hidden z-20 bg-transparent"
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        badge="Our Mission"
        badgeIcon={Target}
        animate={false}
        className="mission-header"
      />

      <div className="flex-grow flex items-center justify-center w-full relative z-10 pb-6">
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 md:gap-8 px-4 sm:px-12 md:px-24 w-max"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[340px] md:w-[380px] h-[340px] sm:h-[380px] md:h-[420px] flex-shrink-0"
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
