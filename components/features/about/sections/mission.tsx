"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/types/product";
import type { MissionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingEarth from "@/components/globe/wireframe-globe";


gsap.registerPlugin(ScrollTrigger);

import { Mic2, Rocket, Layers, Activity, Target } from "lucide-react";
import { MissionCard } from "@/components/ui/mission-card";

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

      // Cinematic 3D Fly-In
      tl.fromTo(
        cardsElements,
        {
          x: "130%", // Distinct off-screen start
          rotationY: -45, // Angled away
          rotationX: 10,  // Slight tilt
          scale: 0.6,     // Depth effect
          z: -500,
          autoAlpha: 0,
          filter: "blur(10px)",
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
          duration: 1,
          stagger: 1,
          ease: "back.out(1.2)", // "Sit" physics
        }
      );

      // Smooth Header Reveal (Independent of the pinned timeline or parallel? 
      // Plan didn't specify, but keeping it ensures the header is visible. 
      // Let's attach it to the main scroll trigger or keep it separate.
      // Keeping it separate but coordinating start points is usually safer for complex layouts,
      // but here we are pinning the section. If we pin, the header needs to be visible.
      // Let's assume the header should be visible or animate in *before* the pin logic aggressively takes over?
      // Actually, if we pin "top top", the header is at top.
      // Let's animate the header immediately as the section hits the view, or part of the timeline.

      gsap.fromTo(
        '[data-testid="section-header"]',
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Start animating header before locking
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pt-4 sm:pt-10 overflow-hidden z-20 bg-transparent"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="container mx-auto px-4 relative z-20">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badge="Our Mission"
          badgeIcon={Target}
        />
      </div>

      <div className="flex-grow flex items-center justify-center w-full relative z-10">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 md:gap-10 px-4 sm:px-12 md:px-24 w-max"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-[280px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[420px] md:h-[460px] flex-shrink-0"
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                image={card.image}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>


    </Section>
  );
}



