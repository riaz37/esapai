"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { SectionMask } from "@/components/ui/section-mask";

import { HeroContent } from "./components/hero-content";
import { useHeroParallax } from "./hooks/use-hero-parallax";

export interface HeroProps {
    title?: string;
    subtitle?: string;
    badgePill?: string;
    badgeDescription?: string;
    ctaButtonText?: string;
    ctaButtonHref?: string;
}

const Circle = dynamic(() => import("./circle"), {
    ssr: false,
    loading: () => <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
});

const Box = dynamic(() => import("@/components/shared/box"), {
    ssr: false,
    loading: () => <div className="max-w-[1400px] xl:max-w-[1800px] w-auto h-auto opacity-0" />
});

export function Hero({
    title = "",
    subtitle = "",
    badgePill,
    badgeDescription,
    ctaButtonText = "",
    ctaButtonHref = "/contact"
}: HeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const circleContainerRef = useRef<HTMLDivElement>(null);
    const circleGlowRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);
    const iconsScrollRef = useRef<HTMLDivElement>(null);
    const contentScrollRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const anim = useGSAPAnimations(sectionRef);

    // Proxy Circle Ref for Parallax (Needs to be passed to useHeroParallax)
    const proxyCircleRef = useRef<HTMLDivElement>(null);

    // Modular Animation Hook
    useHeroParallax({
        sectionRef,
        circleContainerRef,
        proxyCircleRef,
        contentScrollRef,
        iconsScrollRef,
    });

    // Independent Entrance & Floating Animations
    useGSAP(
        () => {
            const tl = anim.createTimeline();

            // Individual Hexagon Floating Animations
            if (iconsRef.current) {
                const hexClasses = [".hexagon-1", ".hexagon-2", ".hexagon-3", ".hexagon-4", ".hexagon-5", ".hexagon-6"];
                const q = gsap.utils.selector(iconsRef);

                hexClasses.forEach((hexClass) => {
                    const targets = q(hexClass);
                    if (!targets.length) return;
                    gsap.to(targets, {
                        y: () => -15 - Math.random() * 20,
                        duration: () => 3 + Math.random() * 2,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: () => Math.random() * 2
                    });
                });
            }

            // Entrance Sequence
            tl.fromTo(iconsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
                .fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full z-0 min-h-screen overflow-hidden"
        >
            <SectionMask
                fadeTop={false}
                fadeBottom={false}
                className="w-full h-full min-h-screen flex items-start sm:items-center justify-center pt-48 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20"
            >
                <div ref={bgRef} className="absolute inset-0 hero-mesh-gradient z-0 pointer-events-none" />

                {/* Eye of AI - Background Circle */}
                <div
                    ref={circleContainerRef}
                    className="absolute top-[60%] sm:top-[78%] md:top-[82%] left-1/2 z-0 pointer-events-none animate-optimized"
                >
                    <div ref={circleGlowRef} className="relative">
                        <Circle className="w-[270px] sm:w-[360px] md:w-[450px] lg:w-[540px] xl:w-[630px] max-w-[720px] h-auto brightness-[0.9]" />
                    </div>
                </div>

                {/* Parallax Portal Proxy — hidden on mobile, GPU-intensive blur layer */}
                <div
                    ref={proxyCircleRef}
                    className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] rounded-full z-1 pointer-events-none opacity-0 blur-[64px] mix-blend-screen hidden lg:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(200,255,220,1) 0%, rgba(19,245,132,0.6) 30%, rgba(19,245,132,0) 70%)',
                    }}
                />

                {/* Floating Hexagons */}
                <div
                    ref={iconsScrollRef}
                    className="absolute top-[58%] sm:top-[72%] xl:top-1/2 left-1/2 z-[5] pointer-events-none block"
                >
                    <div ref={iconsRef} className="gsap-fade-in-optimized animate-optimized">
                        <Box className="w-screen sm:w-[150vw] md:w-[120vw] max-w-[1400px] xl:max-w-[1800px] h-auto opacity-100 brightness-[1.2]" />
                    </div>
                </div>

                {/* Hero Text & Actions */}
                <HeroContent
                    ref={contentScrollRef}
                    title={title}
                    subtitle={subtitle}
                    badgePill={badgePill}
                    badgeDescription={badgeDescription}
                    ctaButtonText={ctaButtonText}
                    ctaButtonHref={ctaButtonHref || "/contact"}
                    badgeRef={badgeRef}
                    subtitleRef={subtitleRef}
                    buttonRef={buttonRef}
                />
            </SectionMask>
        </section>
    );
}
