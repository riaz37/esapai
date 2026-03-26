"use client";

import React, { useRef, useState, useEffect } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export interface ProcessTimelineItem {
    id: string | number;
    leftContent?: React.ReactNode;
    rightContent: React.ReactNode;
    nodeContent?: React.ReactNode;
}

interface ProcessTimelineProps {
    items: ProcessTimelineItem[];
    className?: string;
}

function TimelineEntry({ item, index: _index, entryRef }: { item: ProcessTimelineItem; index: number; entryRef: (el: HTMLDivElement | null) => void }) {
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion() || !containerRef.current) return;

            // Set initial states
            if (leftRef.current) gsap.set(leftRef.current, { opacity: 0, x: -10 });
            if (nodeRef.current) gsap.set(nodeRef.current, { opacity: 0, scale: 0.8 });
            if (rightRef.current) gsap.set(rightRef.current, { opacity: 0, x: 10 });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const tl = gsap.timeline();

                            // Faster, punchier animations
                            if (leftRef.current) {
                                tl.to(leftRef.current, {
                                    opacity: 1,
                                    x: 0,
                                    duration: 0.4,
                                    ease: "power2.out",
                                });
                            }

                            if (nodeRef.current) {
                                tl.to(
                                    nodeRef.current,
                                    {
                                        opacity: 1,
                                        scale: 1,
                                        duration: 0.4,
                                        ease: "back.out(1.7)",
                                    },
                                    "-=0.3"
                                );
                            }

                            if (rightRef.current) {
                                tl.to(
                                    rightRef.current,
                                    {
                                        opacity: 1,
                                        x: 0,
                                        duration: 0.5,
                                        ease: "power2.out",
                                    },
                                    "-=0.2"
                                );
                            }

                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
            );

            if (containerRef.current) observer.observe(containerRef.current);

            return () => {
                if (containerRef.current) observer.unobserve(containerRef.current);
            };
        },
        { scope: containerRef, dependencies: [item] }
    );

    return (
        <div
            ref={(el) => {
                containerRef.current = el;
                entryRef(el);
            }}
            className="relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-12 last:mb-0"
        >
            {/* Mobile Header: Date + Node */}
            <div className="flex md:hidden items-center gap-4 mb-2">
                <div ref={nodeRef} className="relative z-10 flex items-center justify-center">
                    {item.nodeContent || (
                        <div className="h-8 w-8 rounded-full flex items-center justify-center border bg-[#F8F8F81A] border-[#13F58440] shadow-[inset_0_0_21.06px_0_#F8F8F840] backdrop-blur-[31.59px]">
                            <div className="h-4 w-4 rounded-full border bg-[#13F5844D] border-[#13F584BF]" />
                        </div>
                    )}
                </div>
                <div ref={leftRef} className="flex-1">
                    {item.leftContent}
                </div>
            </div>

            {/* Desktop Left Content */}
            <div className="hidden md:block flex-shrink-0 w-32 lg:w-40">
                <div ref={leftRef}>{item.leftContent}</div>
            </div>

            {/* Desktop Node */}
            <div className="hidden md:flex flex-shrink-0 relative w-10 items-start justify-center">
                <div ref={nodeRef} className="relative z-10 flex items-center justify-center">
                    {item.nodeContent || (
                        <div className="h-10 w-10 rounded-full flex items-center justify-center border bg-[#F8F8F81A] border-[#13F58440] shadow-[inset_0_0_21.06px_0_#F8F8F840] backdrop-blur-[31.59px]">
                            <div className="h-5 w-5 rounded-full border bg-[#13F5844D] border-[#13F584BF]" />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Content */}
            <div ref={rightRef} className="flex-1 pb-2 md:pb-8">
                {item.rightContent}
            </div>
        </div>
    );
}

export function ProcessTimeline({ items, className }: ProcessTimelineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [items]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    if (!items || items.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className={cn("relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8", className)}
        >
            <div ref={ref} className="relative space-y-0 pb-6 sm:pb-7 md:pb-8">
                {/* Animated Line */}
                {items.length > 1 && (
                    <div
                        style={{ height: `${height}px` }}
                        // Positioned based on: left width + gap + half node width
                        // Left widths: w-24 (6rem/96px) | sm:w-28 (7rem/112px) | md:w-32 (8rem/128px) | lg:w-40 (10rem/160px)
                        // Gaps: gap-4 (1rem/16px) | sm:gap-6 (1.5rem/24px) | md:gap-8 (2rem/32px) | lg:gap-12 (3rem/48px)
                        // Half Node: w-8/2 (1rem/16px) | sm:w-9/2 (1.125rem/18px) | md:w-10/2 (1.25rem/20px)
                        // Total Left: 
                        // - Base: 96 + 16 + 16 = 128px (8rem) -> left-[8rem]
                        // - SM: 112 + 24 + 18 = 154px (9.625rem)
                        // - MD: 128 + 32 + 20 = 180px (11.25rem) 
                        // - LG: 160 + 48 + 20 = 228px (14.25rem)
                        className="absolute start-[8rem] sm:start-[9.625rem] md:start-[11.25rem] lg:start-[14.25rem] top-0 overflow-hidden w-[2px] -translate-x-1/2 hidden md:block bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    >
                        <m.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[var(--color-primary)] via-emerald-200 to-transparent from-[0%] via-[10%] rounded-full"
                        />
                    </div>
                )}

                {items.map((item, index) => (
                    <TimelineEntry
                        key={item.id}
                        item={item}
                        index={index}
                        entryRef={(el) => {
                            entryRefs.current[index] = el;
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
