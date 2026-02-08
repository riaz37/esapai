"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button, ButtonArrow } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { ServicesCTASectionProps } from "@/types/props";

export function ServicesCTASection({
  title = "Ready to get started?",
  text,
  buttonText,
  buttonHref,
}: ServicesCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

      const tl = anim.createTimeline();

      const buttonElement = sectionRef.current.querySelector("a");

      if (buttonElement) {
        gsap.set(buttonElement, { opacity: 0, y: 10, scale: 0.95 });
      }

      if (buttonElement) {
        tl.to(
          buttonElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
      }
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <Section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
    >
      <SectionHeader
        badge="Get in touch"
        badgeIcon={MessageCircle}
        title={title}
        subtitle={text}
        subtitleClassName="text-base md:text-lg text-light-gray-90 max-w-2xl mx-auto mb-8"
      />
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          className="rounded-[32px] sm:rounded-[40px] px-10 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] group"
          asChild
        >
          <Link href={buttonHref} className="inline-flex items-center gap-2">
            <span>{buttonText}</span>
            <ButtonArrow className="ml-0" />
        </Link>
      </Button>
      </div>
    </Section>
  );
}
