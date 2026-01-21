"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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
        <Section ref={sectionRef} className="py-24 sm:py-32 relative z-10">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Our Technology Excellence"
                    subtitle="Experience the dual power of autonomous execution and deep analytical insight, engineered for the future of enterprise."
                    badge="Core Tech"
                    badgeIcon={Cpu}
                    align="left"
                    className="mb-12 sm:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    {/* Card 1: Autonomous Agents */}
                    <TechCard
                        ref={card1Ref}
                        title="Autonomous Agents"
                        description="Deploy intelligent workers that handle complex workflows 24/7 without supervision."
                        videoSrc="/productvideo1.mp4"
                        delay={0}
                    />

                    {/* Card 2: Neural Processing */}
                    <TechCard
                        ref={card2Ref}
                        title="Neural Processing"
                        description="Transform raw data into actionable foresight with our advanced neural models."
                        videoSrc="/productvideo2.mp4"
                        delay={0.2}
                    />
                </div>
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
    const glowRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!glowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(glowRef.current, {
            left: x,
            top: y,
            duration: 0.3,
            ease: "power2.out",
            opacity: 1
        });
    };

    const onMouseLeave = () => {
        if (!glowRef.current) return;
        gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.5
        });
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={cn(
                "group relative w-full h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden rounded-3xl bg-neutral-900 border border-white/5",
                className
            )}
        >
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Interactive Glow */}
            <div
                ref={glowRef}
                className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 z-20 transition-opacity duration-300"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3 tracking-tight">
                    {title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed opacity-90 group-hover:text-white group-hover:opacity-100 transition-colors duration-300">
                    {description}
                </p>
            </div>

            {/* Hover Frame Glow */}
            <div className="absolute inset-0 rounded-3xl group-hover:ring-1 group-hover:ring-primary/30 transition-all duration-500 pointer-events-none z-40" />
        </div>
    );
});

TechCard.displayName = "TechCard";
