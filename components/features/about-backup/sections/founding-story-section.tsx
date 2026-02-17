"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foundingStoryConfig } from "@/config/about-founding-story";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { FoundingStoryStage } from "./founding-story-stage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCROLL_DURATION = 400; // % of viewport for full story

export function FoundingStorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reduceMotion) return;

      const { hook, phases, visionTitle, visionBody, closing } = foundingStoryConfig;
      const allStageRefs = [
        hookRef.current,
        ...phaseRefs.current.filter(Boolean),
        visionRef.current,
        closingRef.current,
      ].filter(Boolean) as HTMLDivElement[];

      if (allStageRefs.length === 0) return;

      gsap.set(allStageRefs, { opacity: 0, y: 30, filter: "blur(8px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${SCROLL_DURATION}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.inOut", force3D: true },
      });

      // Hook
      tl.to(hookRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 });
      tl.to({}, { duration: 2 });
      tl.to(hookRef.current, { opacity: 0, y: -20, filter: "blur(10px)", duration: 1 });

      // Phases
      phases.forEach((_, i) => {
        const ref = phaseRefs.current[i];
        if (!ref) return;
        tl.set(ref, { zIndex: 10 + i });
        tl.to(ref, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 });
        tl.to({}, { duration: 3 });
        tl.to(ref, { opacity: 0, y: -20, filter: "blur(8px)", duration: 1 });
      });

      // Vision
      tl.set(visionRef.current, { zIndex: 20 });
      tl.to(visionRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 });
      tl.to({}, { duration: 3 });
      tl.to(visionRef.current, { opacity: 0, y: -20, filter: "blur(8px)", duration: 1 });

      // Closing
      tl.set(closingRef.current, { zIndex: 25 });
      tl.to(closingRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 });
      tl.to({}, { duration: 2 });
    },
    { scope: containerRef, dependencies: [reduceMotion] }
  );

  if (reduceMotion) {
    return (
      <div className="bg-dark">
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-24">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-normal text-white/70 italic">
              {foundingStoryConfig.hook}
            </p>
          </div>
          {foundingStoryConfig.phases.map((phase) => (
            <FoundingStoryStage key={phase.id} phase={phase} />
          ))}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
              {foundingStoryConfig.visionTitle}
            </h2>
            <div className="text-white/70 text-base sm:text-lg leading-relaxed space-y-4">
              {foundingStoryConfig.visionBody.split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl text-primary font-medium drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]">{foundingStoryConfig.closing}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* Ambient background - matches problem-exploration-section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,245,132,0.03)_0%,transparent_70%)]" />
      </div>

      <div
        ref={stageContainerRef}
        className="relative z-10 w-full h-full py-12 sm:py-16 md:py-24 lg:py-32 flex items-center justify-center px-4 sm:px-6"
      >
        <div className="relative w-full max-w-4xl min-h-[400px] flex items-center justify-center">
          {/* Hook - matches problem-exploration intro text styling */}
          <div
            ref={hookRef}
            className="absolute inset-0 flex items-center justify-center text-center pointer-events-none opacity-0"
          >
            <p className="text-2xl md:text-3xl font-normal text-white/70 max-w-3xl leading-relaxed italic">
              {foundingStoryConfig.hook}
            </p>
          </div>

          {/* Phases */}
          {foundingStoryConfig.phases.map((phase, i) => (
            <div
              key={phase.id}
              ref={(el) => {
                phaseRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
            >
              <div className="w-full max-h-[80vh] overflow-y-auto py-4">
                <FoundingStoryStage phase={phase} />
              </div>
            </div>
          ))}

          {/* Vision */}
          <div
            ref={visionRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
          >
            <div className="w-full max-h-[80vh] overflow-y-auto py-4 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                {foundingStoryConfig.visionTitle}
              </h2>
              <div className="text-white/70 text-base sm:text-lg leading-relaxed space-y-4">
                {foundingStoryConfig.visionBody.split(/\n\n+/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Closing */}
          <div
            ref={closingRef}
            className="absolute inset-0 flex items-center justify-center text-center pointer-events-none opacity-0"
          >
            <p className="text-2xl sm:text-3xl font-medium text-primary drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]">
              {foundingStoryConfig.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
