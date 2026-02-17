"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BookOpen } from "lucide-react";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { BadgeChip } from "@/components/ui/badge-chip";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (
        !isMounted ||
        !isInView ||
        prefersReducedMotion() ||
        !sectionRef.current ||
        hasAnimated
      ) {
        return;
      }

      const badgeEl = sectionRef.current.querySelector('[data-hero-badge]');
      const titleElement = sectionRef.current.querySelector("h1");
      const descriptionElement = sectionRef.current.querySelector("p");

      if (!titleElement && !descriptionElement) return;

      setHasAnimated(true);

      const tl = anim.createTimeline();

      if (badgeEl) {
        gsap.set(badgeEl, { opacity: 0, y: 10 });
        tl.to(badgeEl, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -20 });
        tl.to(
          titleElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          badgeEl ? "-=0.3" : 0
        );
      }

      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 10 });
        tl.to(
          descriptionElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    },
    { scope: sectionRef, dependencies: [isInView, isMounted, hasAnimated] }
  );

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-transparent pt-20 sm:pt-24 md:pt-0"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
        <div data-hero-badge className="mb-4 sm:mb-5">
          <BadgeChip label="From the co-founders" icon={BookOpen} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
          <span className="text-white">Our Story</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4">
          Enterprise AI that meets you where your data lives — built from the ground up after digitalizing what couldn&apos;t be digitalized.
        </p>
      </div>
    </section>
  );
}
