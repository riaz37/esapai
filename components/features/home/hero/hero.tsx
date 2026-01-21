"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ArrowUpRight } from "lucide-react";
import { Button, ButtonArrow } from "@/components/ui/button";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import Box from "@/components/shared/box";
import { SectionMask } from "@/components/ui/section-mask";
import Link from "next/link";
import { HeroBadge } from "@/components/ui/hero-badge";



const Circle = dynamic(() => import("./circle"), {
    ssr: false,
    loading: () => <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
});

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    // backdropRef removed
    const circleContainerRef = useRef<HTMLDivElement>(null);
    const circleGlowRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);
    const iconsScrollRef = useRef<HTMLDivElement>(null); // New wrapper for scroll
    const contentScrollRef = useRef<HTMLDivElement>(null); // New wrapper for scroll
    const badgeRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const continuousAnimationsRef = useRef<gsap.core.Tween[]>([]);
    const proxyCircleRef = useRef<HTMLDivElement>(null);

    const anim = useGSAPAnimations(sectionRef);


    useGSAP(
        () => {
            const tl = anim.createTimeline();
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=100%", // Determines scroll distance for the effect
                    scrub: 1, // Smooth scrubbing
                    pin: true, // Pin the hero section during the effect
                    pinSpacing: false, // Allow next section to scroll underneath
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                }
            });

            // Initial Setup: Ensure elements are centered handled by GSAP to avoid conflict with scale
            if (circleContainerRef.current) {
                gsap.set(circleContainerRef.current, { xPercent: -50, yPercent: -50 });
            }
            // Proxy Circle Setup
            if (proxyCircleRef.current) {
                gsap.set(proxyCircleRef.current, { xPercent: -50, yPercent: -50, scale: 0.8, autoAlpha: 0 });
            }

            // Center the Wrapper for Scroll
            if (iconsScrollRef.current) {
                gsap.set(iconsScrollRef.current, { xPercent: -50, yPercent: -50 });
            }

            // Individual Hexagon Animations (Apply to inner iconsRef)
            if (iconsRef.current) {
                // No centering needed here as parent wrapper handles it

                const hexClasses = [".hexagon-1", ".hexagon-2", ".hexagon-3", ".hexagon-4", ".hexagon-5", ".hexagon-6"];
                const q = gsap.utils.selector(iconsRef);

                hexClasses.forEach((hexClass) => {
                    gsap.to(q(hexClass), {
                        y: () => -15 - Math.random() * 20, // Random float distance
                        duration: () => 3 + Math.random() * 2, // Random duration 3-5s
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: () => Math.random() * 2 // Random start delay
                    });
                });
            }

            // Entrance animations (Target Children / Inner Refs)
            tl.fromTo(
                iconsRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                }
            )
                .fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");

            // SCROLL-LINKED PARALLAX ANIMATION ("The Eye of AI")

            // 1. Swap Real Circle with Proxy & Zoom Proxy
            if (circleContainerRef.current && proxyCircleRef.current) {
                // Fade OUT Scale Real Circle
                mainTl.to(circleContainerRef.current, {
                    autoAlpha: 0,
                    scale: 1.5,
                    duration: 0.5,
                    ease: "power1.in"
                }, 0);

                // Fade IN & Zoom Proxy Circle (The "Portal") - Quick burst effect
                mainTl.fromTo(proxyCircleRef.current,
                    {
                        autoAlpha: 0,
                        scale: 0.6,
                    },
                    {
                        autoAlpha: 0.8,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        transformOrigin: "center center",
                    }, 0);

                // Fade Proxy out early so next section appears clean
                mainTl.to(proxyCircleRef.current, {
                    autoAlpha: 0,
                    scale: 1.1,
                    duration: 0.4,
                    ease: "power2.in"
                }, 0.5);
            }

            // 2. Fade out Hero Content Wrapper (Parent)
            mainTl.fromTo([contentScrollRef.current, iconsScrollRef.current],
                {
                    autoAlpha: 1,
                    scale: 1,
                },
                {
                    autoAlpha: 0,
                    scale: 0.8,
                    duration: 0.5,
                    ease: "power2.in",
                }, 0);



            // 3. FINAL REVEAL: Fade out the entire Hero Section to reveal content underneath
            mainTl.to(sectionRef.current, {
                autoAlpha: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, 1.2); // Overlap slightly with the explosion



            // Cleanup function
            return () => {
                // Kill specific scroll trigger timeline
                mainTl.kill();

            };
        },
        { scope: sectionRef }
    );

    // Pause/resume animations based on viewport visibility
    // Animations paused via ScrollTrigger lifecycle or cleanup now.
    // useEffect for pause/resume removed as continuousAnimationsRef is unused.

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
            }}
            className="relative w-full z-30 min-h-0 sm:min-h-screen overflow-hidden"
        >
            <SectionMask
                fadeTop={false}
                fadeBottom={false}
                className="w-full h-full min-h-0 sm:min-h-screen flex items-start sm:items-center justify-center pb-6 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-40 pt-20 sm:pt-24 md:pt-0"
            >

                {/* Animated Gradient Background */}
                <div ref={bgRef} className="absolute inset-0 hero-mesh-gradient z-0 pointer-events-none" />



                {/* Circle behind content - animated glow and breathing effect */}
                <div
                    ref={circleContainerRef}
                    className="absolute top-[82%] left-1/2 z-0 pointer-events-none animate-optimized"
                >
                    <div ref={circleGlowRef} className="relative">
                        {/* Removed heavy CSS drop-shadows that cause crashes during scale */}
                        <Circle className="w-[270px] sm:w-[360px] md:w-[450px] lg:w-[540px] xl:w-[630px] max-w-[720px] h-auto brightness-[1.8]" />
                    </div>
                </div>

                {/* PROXY CIRCLE for Parallax Zoom (Lightweight div for performance) */}
                <div
                    ref={proxyCircleRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] rounded-full z-1 pointer-events-none opacity-0 blur-[100px] mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(200,255,220,1) 0%, rgba(19,245,132,0.6) 30%, rgba(19,245,132,0) 70%)',
                        willChange: "opacity, transform"
                    }}
                />

                {/* Hexagonal Icons Wrapper - Targets Scroll Fade Out */}
                <div
                    ref={iconsScrollRef}
                    className="absolute top-1/2 left-1/2 z-5 pointer-events-none hidden xl:block"
                >
                    {/* Inner Icons - Targets Entrance & Floating */}
                    <div
                        ref={iconsRef}
                        className="gsap-fade-in-optimized animate-optimized"
                    >
                        <Box className="max-w-[1400px] xl:max-w-[1800px] w-auto h-auto opacity-100 brightness-[1.2]" />
                    </div>
                </div>

                {/* Main Content Wrapper - Targets Scroll Fade Out */}
                <div ref={contentScrollRef} className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center">
                    {/* Tagline Badge */}
                    <HeroBadge ref={badgeRef} />

                    {/* Main Title - Kinetic Typography */}
                    <div className="hero-main-title w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
                        <TypewriterTitle
                            title="AI-Powered Solutions"
                            splitMode="secondLine"
                            secondLine="For Modern Enterprises"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-tight w-full"
                            align="center"
                            mainTextClassName="mt-1 sm:mt-2"
                        />
                    </div>

                    {/* Subtitle/Description */}
                    <div
                        ref={subtitleRef}
                        className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white max-w-3xl mx-auto px-2 sm:px-4 gsap-fade-in-optimized tracking-tight"
                    >
                        <p>
                            Transform your business with intelligent automation, voice-activated
                            systems,
                        </p>
                        <p>and AI agents that drive productivity and innovation</p>
                    </div>

                    {/* CTA Button */}
                    <Button
                        ref={buttonRef}
                        variant="primary"
                        size="lg"
                        className="gsap-scale-in-optimized"
                        asChild
                    >
                        <Link href="/contact" className="inline-flex items-center gap-2 group">
                            <span>Get Started</span>
                            <ButtonArrow />
                        </Link>
                    </Button>
                </div>
            </SectionMask>
        </section>
    );
}



