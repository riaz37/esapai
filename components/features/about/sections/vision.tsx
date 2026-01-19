"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";

import Robot from "@/components/shared/robot";
import { GravityBubbles } from "@/components/features/about/components/gravity-bubbles";

const ConcaveFloor = dynamic(
  () => import("@/components/shared/concave-floor"),
  { ssr: false }
);


export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const robotWrapperRef = useRef<HTMLDivElement>(null);
  const dotCircleContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef);

  // Removed Curtain/Spacer specific GSAP logic

  // Animation triggers for the internal elements (Robot, Text)
  useGSAP(
    () => {
      const content = sectionRef.current;
      if (!content) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: "top 80%", // Trigger slightly earlier
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        }
      });

      const titleElement = content.querySelector("h2");
      const subtitleElement = content.querySelector("p");

      if (titleElement) {
        tl.fromTo(titleElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1);
      }
      if (subtitleElement) {
        tl.fromTo(subtitleElement, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.3);
      }
      if (robotRef.current) {
        tl.fromTo(robotRef.current, { opacity: 0, y: 50, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }, 0.2);
      }
      if (dotCircleContainerRef.current) {
        tl.fromTo(dotCircleContainerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "sine.out" }, 0.1);
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Continuous Floating Animation - Replaces Cursor Follower
  useGSAP(
    () => {
      if (!robotWrapperRef.current) return; // Removed prefersReducedMotion check here as it should be handled inside hooks or globally if needed, but keeping it simple for now

      const wrapper = robotWrapperRef.current;

      // Reset any existing transforms
      gsap.set(wrapper, { x: 0, y: 0 });

      // Create continuous floating motion
      gsap.to(wrapper, {
        y: -20, // Float up
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
      });

      return () => {
        gsap.killTweensOf(wrapper);
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Holographic Glitch Effect
  useGSAP(
    () => {
      if (!robotRef.current) return;

      const robot = robotRef.current;

      const triggerGlitch = () => {
        const skew = gsap.utils.random(-20, 20);
        const scaleX = gsap.utils.random(0.9, 1.1);
        const x = gsap.utils.random(-5, 5);

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(robot, {
              skewX: 0,
              scaleX: 1,
              x: 0,
              opacity: 1,
              filter: "none",
            });
            const nextDelay = gsap.utils.random(2, 6);
            gsap.delayedCall(nextDelay, triggerGlitch);
          },
        });

        tl.to(robot, {
          skewX: skew,
          scaleX,
          x,
          opacity: 0.8,
          filter: "brightness(1.5) hue-rotate(90deg)",
          duration: 0.05,
          ease: "power4.inOut",
        })
          .to(robot, {
            skewX: -skew / 2,
            scaleX: 1,
            x: -x / 2,
            opacity: 0.9,
            filter: "brightness(1.2) hue-rotate(-45deg)",
            duration: 0.05,
            ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })",
          })
          .to(robot, {
            skewX: 0,
            scaleX: 1,
            x: 0,
            opacity: 1,
            filter: "none",
            duration: 0.05,
          });
      };

      const startDelay = gsap.utils.random(1, 3);
      gsap.delayedCall(startDelay, triggerGlitch);

      return () => {
        gsap.killTweensOf(robot);
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <Section
      ref={sectionRef}
      background="transparent"
      className="relative w-full py-6 sm:py-12 flex flex-col z-10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <GravityBubbles />
      </div>

      <SectionHeader
        title="Our Vision"
        subtitle="Seamlessly integrating advanced AI to transform enterprises of all sizes."
        badge="Our Vision"
        badgeIcon={Eye}
      />

      <div className="relative w-full flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10 z-0 flex-grow">
        <div className="relative w-full max-w-[1200px] aspect-[1.5/1] sm:aspect-[1.8/1] md:aspect-[2.2/1] lg:aspect-[2.5/1] z-0">
          <div
            ref={dotCircleContainerRef}
            className="absolute left-0 right-0 z-20 [mix-blend-mode:screen] opacity-1 top-[10%] h-full [isolation:isolate]"
          >
            <ConcaveFloor intensity={1} className="absolute inset-0" />
          </div>

          <div
            ref={robotWrapperRef}
            className="absolute left-1/2 -translate-x-1/2 z-20 top-[-15%]"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] -z-10 pointer-events-none [background:radial-gradient(circle,rgba(19,245,132,0.6)_0%,rgba(19,245,132,0.3)_40%,transparent_70%)] [filter:blur(50px)] [transform:translateZ(0)]" />

            <div
              ref={robotRef}
              className="translate-y-[50px] scale-[0.8]"
            >
              <Robot
                className="w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[220px] h-auto object-contain"
                width={220}
                height={220}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
