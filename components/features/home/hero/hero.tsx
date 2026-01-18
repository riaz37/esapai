"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ArrowUpRight } from "lucide-react";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { HeroBadge } from "@/components/ui/hero-badge";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Box from "@/components/shared/box";
import Frame from "@/components/shared/frame";
import { motion } from "motion/react";



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
    const badgeRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const continuousAnimationsRef = useRef<gsap.core.Tween[]>([]);
    const lightEffectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const anim = useGSAPAnimations(sectionRef);

    // Intersection observer to pause animations when off-screen
    const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
        threshold: 0.1,
        rootMargin: "100px",
    });

    useGSAP(
        () => {
            const tl = anim.createTimeline();

            // Entrance animations - GSAP reads initial states from CSS classes
            tl.to(
                iconsRef.current,
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                }
            )
                .to(
                    badgeRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                // Title animation is now handled by KineticText component
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    buttonRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );

            // Continuous animations (start after entrance sequence completes)
            if (!prefersReducedMotion()) {
                if (circleContainerRef.current) {
                    const breathingTween = anim.breathing(circleContainerRef.current, {
                        delay: 0.8,
                    });
                    if (breathingTween) {
                        breathingTween.paused(!isInView);
                        continuousAnimationsRef.current.push(breathingTween);
                    }
                }
                if (circleGlowRef.current) {
                    const glowTween = anim.glow(circleGlowRef.current, { delay: 0.8 });
                    if (glowTween) {
                        glowTween.paused(!isInView);
                        continuousAnimationsRef.current.push(glowTween);
                    }
                }
                if (iconsRef.current) {
                    // Spread hexagons further apart to avoid overlapping the circle
                    // Left side hexagons
                    gsap.set(iconsRef.current.querySelectorAll('.hexagon-4, .hexagon-5, .hexagon-6'), { x: -80 });
                    // Right side hexagons
                    gsap.set(iconsRef.current.querySelectorAll('.hexagon-1, .hexagon-2, .hexagon-3'), { x: 80 });

                    // Set initial states for smooth entrance animation
                    gsap.set(iconsRef.current.querySelectorAll('[class^="hexagon-"]'), {
                        opacity: 0,
                        scale: 0.8,
                    });

                    // Smooth staggered entrance animation
                    tl.to(
                        iconsRef.current.querySelectorAll('[class^="hexagon-"]'),
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power2.out",
                            stagger: {
                                each: 0.15,
                                from: "random",
                            },
                        },
                        "-=0.3"
                    );

                    // Individual animations for each of the 6 hexagons - enhanced with more variety

                    // Hexagon 1 - Intensified diagonal float (Right)
                    const hex1 = gsap.to(iconsRef.current.querySelector('.hexagon-1'), {
                        y: "-=40",
                        x: "+=30",
                        rotation: 12,
                        duration: 4.5,
                        ease: "power1.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0,
                    });
                    continuousAnimationsRef.current.push(hex1);

                    // Hexagon 2 - Intensified vertical bounce with horizontal drift (Right)
                    const hex2 = gsap.to(iconsRef.current.querySelector('.hexagon-2'), {
                        y: "-=50",
                        x: "+=10",
                        rotation: -8,
                        duration: 5,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.5,
                    });
                    continuousAnimationsRef.current.push(hex2);

                    // Hexagon 3 - Intensified circular motion (Right)
                    const hex3 = gsap.to(iconsRef.current.querySelector('.hexagon-3'), {
                        y: "-=35",
                        x: "-=25",
                        rotation: 15,
                        duration: 5.5,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 1,
                    });
                    continuousAnimationsRef.current.push(hex3);

                    // Hexagon 4 - Intensified horizontal sway (Left)
                    const hex4 = gsap.to(iconsRef.current.querySelector('.hexagon-4'), {
                        x: "-=40",
                        y: "-=20",
                        rotation: -10,
                        duration: 4.8,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.3,
                    });
                    continuousAnimationsRef.current.push(hex4);

                    // Hexagon 5 - Intensified figure-8 pattern (Left)
                    const hex5 = gsap.to(iconsRef.current.querySelector('.hexagon-5'), {
                        y: "-=45",
                        x: "+=30",
                        rotation: 18,
                        duration: 5.8,
                        ease: "power1.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.8,
                    });
                    continuousAnimationsRef.current.push(hex5);

                    // Hexagon 6 - Intensified pulse movement (Left)
                    const hex6 = gsap.to(iconsRef.current.querySelector('.hexagon-6'), {
                        y: "-=30",
                        rotation: -12,
                        duration: 4,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 1.2,
                    });
                    continuousAnimationsRef.current.push(hex6);


                    // Pause all animations if not in view
                    [hex1, hex2, hex3, hex4, hex5, hex6].forEach(
                        (anim) => anim.paused(!isInView)
                    );
                }
            }

            // Cleanup function
            return () => {
                continuousAnimationsRef.current.forEach((tween) => {
                    tween?.kill();
                });
                continuousAnimationsRef.current = [];
                if (lightEffectTimeoutRef.current) {
                    clearTimeout(lightEffectTimeoutRef.current);
                    lightEffectTimeoutRef.current = null;
                }
            };
        },
        { scope: sectionRef }
    );

    // Pause/resume animations based on viewport visibility
    useEffect(() => {
        if (!isInView || prefersReducedMotion()) {
            continuousAnimationsRef.current.forEach((tween) => tween?.pause());
        } else {
            continuousAnimationsRef.current.forEach((tween) => tween?.resume());
        }
    }, [isInView]);

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
                setIntersectionRef(el);
            }}
            className="relative w-full z-30 min-h-0 sm:min-h-screen flex items-start sm:items-center justify-center overflow-hidden pb-6 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-40 pt-20 sm:pt-24 md:pt-0"
            style={{
                background: "radial-gradient(circle at 50% -20%, #0d3823 0%, #001a0f 50%, #010101 100%)"
            }}
        >




            {/* Frame Background - Added for depth */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden select-none z-0">
                <Frame className="w-full h-full max-w-[1500px] object-contain scale-110" />
            </div>

            {/* Circle behind content - animated glow and breathing effect */}
            <div
                ref={circleContainerRef}
                className="absolute top-[45%] sm:top-[50%] md:top-[55%] lg:top-[55%] left-1/2 -translate-x-1/2 z-0 pointer-events-none animate-optimized"
            >
                <div ref={circleGlowRef} className="relative">
                    <Circle className="w-[270px] sm:w-[360px] md:w-[450px] lg:w-[540px] xl:w-[630px] max-w-[720px] h-auto brightness-[1.8] drop-shadow-[0_0_40px_rgba(0,165,81,0.8)] drop-shadow-[0_0_80px_rgba(0,165,81,0.6)] drop-shadow-[0_0_120px_rgba(0,165,81,0.4)]" />
                </div>
            </div>

            {/* Hexagonal Icons (Box component) - floating with glow - Hidden on mobile/tablet */}
            <div
                ref={iconsRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden xl:block gsap-fade-in-optimized animate-optimized"
            >
                <Box className="max-w-[1400px] xl:max-w-[1800px] w-auto h-auto opacity-100 brightness-[1.2]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center">
                {/* Tagline Badge */}
                <div
                    ref={badgeRef}
                    className="relative inline-flex items-center p-1 rounded-full bg-[#020305]/80 backdrop-blur-md border border-[#13F584]/20 shadow-[0_0_20px_rgba(19,245,132,0.1)] mb-4 sm:mb-6 md:mb-8 overflow-hidden scale-90 sm:scale-95 md:scale-100 gsap-slide-up-optimized"
                >
                    {/* Animated beam effect */}
                    <motion.div
                        className="absolute inset-0 w-[200%] z-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(19, 245, 132, 0.1) 50%, transparent 55%, transparent 100%)',
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    />

                    {/* Left: Exclusive Pill */}
                    <div className="relative z-10 flex items-center justify-center px-4 py-1.5 rounded-full bg-[#13F584] shadow-[0_0_15px_rgba(19,245,132,0.4)]">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black leading-none">
                            Exclusive
                        </span>
                    </div>

                    {/* Right: Text */}
                    <div className="relative z-10 flex items-center px-4 py-1.5 ml-1">
                        <span className="text-[11px] sm:text-sm font-medium tracking-wide text-[#13F584] leading-none">
                            Tomorrow&apos;s Edge, Built Today
                        </span>
                    </div>
                </div>

                {/* Main Title - Kinetic Typography */}
                <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
                    <TypewriterTitle
                        title="AI-Powered Solutions"
                        splitMode="secondLine"
                        secondLine="For Modern Enterprises"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-3 sm:mb-4 md:mb-6 leading-tight w-full"
                        align="center"
                        mainTextClassName="mt-1 sm:mt-2"
                    />
                </div>

                {/* Subtitle/Description */}
                <div
                    ref={subtitleRef}
                    className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-4 gsap-fade-in-optimized tracking-tight"
                >
                    <p>
                        Transform your business with intelligent automation, voice-activated
                        systems,
                    </p>
                    <p>and AI agents that drive productivity and innovation</p>
                </div>

                {/* CTA Button */}
                <button
                    ref={buttonRef}
                    className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[#13F584]/30 hover:shadow-[0_0_30px_rgba(19,245,132,0.3)] gsap-scale-in-optimized cursor-pointer"
                >
                    <span className="text-base font-medium text-[#13F584] tracking-wide">Get Started</span>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#13F584] text-black transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:rotate-[360deg] group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                </button>
            </div>
        </section>
    );
}



