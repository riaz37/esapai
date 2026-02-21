"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { OptimizedVideo } from "@/components/ui/optimized-video";

gsap.registerPlugin(ScrollTrigger);

export function TechnologyExcellence() {
    const sectionRef = useRef<HTMLElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = [card1Ref.current, card2Ref.current];
            const header = sectionRef.current?.querySelector('[data-testid="section-header"]');

            // Staggered Entrance for Header
            if (header) {
                gsap.fromTo(
                    header.children,
                    { y: 30, opacity: 0, filter: "blur(10px)" },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: header,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Cards Entrance
            gsap.fromTo(
                cards,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <Section ref={sectionRef} padding="md" className="relative z-10">
            <SectionHeader
                title="Our Technology Excellence"
                subtitle="Experience the dual power of autonomous execution and deep analytical insight, engineered for the future of enterprise."
                badge="Core Tech"
                badgeIcon={Cpu}
                align="left"
                className="mb-8 sm:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1: Autonomous Agents */}
                <TechCard
                    ref={card1Ref}
                    title="Autonomous Agents"
                    description="Deploy intelligent workers that handle complex workflows 24/7 without supervision."
                    videoSrc="/technology1.mp4"
                    delay={0}
                />

                {/* Card 2: Neural Processing */}
                <TechCard
                    ref={card2Ref}
                    title="Neural Processing"
                    description="Transform raw data into actionable foresight with our advanced neural models."
                    videoSrc="/technology2.mp4"
                    delay={0.2}
                />
            </div>
        </Section>
    );
}

interface TechCardProps {
    title: string;
    description: string;
    videoSrc: string;
    className?: string;
    delay?: number;
    ref?: React.RefObject<HTMLDivElement>;
}

import React from "react";

const TechCard = React.forwardRef<HTMLDivElement, TechCardProps>(({ title, description, videoSrc, className }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const beamRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Interactive Glow Position
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                left: x,
                top: y,
                duration: 0.4,
                ease: "power2.out",
                opacity: 0.6,
            });
        }

        // 3D Tilt Calculation (Subtle max 6 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
        });

        // Border Beam Position (Tracking Mouse)
        if (beamRef.current) {
            gsap.to(beamRef.current, {
                left: x,
                top: y,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const onMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        // Reset Card Transform
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
        });

        // Hide Glow and Beam
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                opacity: 0,
                duration: 0.5,
            });
        }

        if (beamRef.current) {
            gsap.to(beamRef.current, {
                opacity: 0,
                duration: 0.5,
            });
        }
    };

    return (
        <div className="relative group p-px h-[280px] sm:h-[340px] lg:h-[400px] perspective-1000 rounded-[32px]">
            {/* The actual card that tilts */}
            <div
                ref={(el) => {
                    cardRef.current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) (ref as any).current = el;
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={cn(
                    "relative w-full h-full overflow-hidden rounded-[32px] bg-neutral-900 border border-transparent transition-all duration-300 transform-gpu preserve-3d will-change-transform",
                    className
                )}
            >
                {/* Video Background */}
                <OptimizedVideo
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 ease-out"
                />

                {/* Interactive Spotlight Glow */}
                <div
                    ref={glowRef}
                    className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/25 blur-[120px] rounded-full pointer-events-none opacity-0 z-10 mix-blend-screen"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

                {/* Border Beam Animation Container */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div
                        ref={beamRef}
                        className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-primary/60 blur-xl rounded-full"
                    />
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 transform z-30 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">
                        {title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed opacity-90 group-hover:text-white group-hover:opacity-100 transition-all duration-500">
                        {description}
                    </p>
                </div>

                {/* Final Subtle Frame */}
                <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none z-40" />
            </div>
        </div>
    );
});

TechCard.displayName = "TechCard";
