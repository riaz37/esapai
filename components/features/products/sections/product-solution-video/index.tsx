"use client";

import { useRef } from "react";
import ReactDOM from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Play } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import type { Product } from "@/types/product";

// AV1 variants exist only where encoding produced a smaller file than H.264.
const AV1_VIDEO_MAP: Record<string, string> = {
    "/product-videos/fasih.mp4": "/product-videos/fasih.av1.webm",
    "/product-videos/ai-framework.mp4": "/product-videos/ai-framework.av1.webm",
    "/videos/fasih-demo.mp4": "/videos/fasih-demo.av1.webm",
};

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductSolutionVideoProps {
    product: Product | null;
}

export function ProductSolutionVideo({ product }: ProductSolutionVideoProps) {
    const demoTitle = product?.content?.demo?.title ?? product?.content?.mission?.title ?? "";
    const demoSubtitle = product?.content?.demo?.subtitle ?? "";
    const demoBadge = product?.content?.demo?.badge ?? "";
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);

    const demoVideo = product?.content?.hero?.demoVideo ?? "/videos/fasih-demo.mp4";
    const demoVideoAv1 = AV1_VIDEO_MAP[demoVideo];

    ReactDOM.preload(demoVideo, { as: "video", fetchPriority: "high" });

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Proactive Mobile Header Animation (Not really needed if this is desktop only, but keeping it safe)
      const header = containerRef.current?.querySelector(
        '.mobile-section-header [data-testid="section-header"]'
      );
      if (header) {
        const children = Array.from(header.children);
        gsap.fromTo(
          children,
          { y: 30, opacity: 0, filter: "blur(10px)", immediateRender: false },
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
            },
          }
        );
      }

      // 1 + 2. Kinetic Reveal Sequence (combined into fromTo so element stays
      // visible in CSS until the ScrollTrigger/timeline actually begins).
      tl.fromTo(
        videoWrapperRef.current,
        {
          z: -1000,
          rotationX: 25,
          opacity: 0,
          filter: "blur(10px) brightness(1.2)",
          transformPerspective: 2500,
          immediateRender: false,
        },
        {
          opacity: 1,
          z: 0,
          rotationX: 0,
          filter: "blur(0px) brightness(1)",
          duration: 4,
          ease: "power3.out",
        },
        0
      );

      // 3. Focal Hold / Cinematic Breathing
      tl.to(videoWrapperRef.current, {
        z: 80,
        duration: 5,
        ease: "sine.inOut",
      });

      // Subtle continuous float
      gsap.to(videoWrapperRef.current, {
        y: "+=12",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile fallback: Just a simple fade and slide up
      gsap.fromTo(
        videoWrapperRef.current,
        {
          opacity: 0,
          y: 50,
          immediateRender: false,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

    return (
        <div className="relative w-full">
            {/* Desktop/Tablet Header - Unpinned */}
            <div className="hidden md:block container mx-auto px-6 pt-20 pb-0 relative z-20">
                <SectionHeader
                    title={demoTitle}
                    subtitle={demoSubtitle}
                    badge={demoBadge}
                    badgeIcon={Play}
                    align="center"
                />
            </div>

            <Section
                ref={containerRef}
                withContainer={false}
                className="relative w-full h-auto md:h-screen perspective-[2500px] overflow-hidden md:-mt-20 sm:pb-24 pb-16 pt-8 md:pt-0"
                padding="none"
            >
                {/* Mobile-Only Pinned Header - Clears Navbar */}
                <div className="mobile-section-header block md:hidden w-full container mx-auto px-6 mb-8 z-20 pointer-events-auto">
                    <SectionHeader
                        title={demoTitle}
                        subtitle={demoSubtitle}
                        badge={demoBadge}
                        badgeIcon={Play}
                        align="center"
                        className="mb-0"
                        animate={false}
                    />
                </div>

                {/* The Kinetic 3D Stage - Tightened for mobile to reduce gaps */}
                <div className="video-stage relative md:absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 md:px-8">
                    <div
                        ref={videoWrapperRef}
                        className="relative w-[95vw] md:w-[90vw] max-w-[1400px] max-h-[55vh] md:max-h-[75vh] aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 pointer-events-auto will-change-transform"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Video Content */}
                        <div className="relative w-full h-full">
                            <OptimizedVideo
                                src={demoVideo}
                                av1Src={demoVideoAv1}
                                autoPlay
                                loop
                                muted
                                playsInline
                                priority
                                className="w-full h-full object-cover"
                            />


                            {/* Internal Cinematic Finish Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none mix-blend-overlay" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                        </div>

                        {/* Interactive Play Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center group cursor-pointer transition-all duration-1000">
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white transition-all duration-500 group-hover:text-primary group-hover:fill-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
