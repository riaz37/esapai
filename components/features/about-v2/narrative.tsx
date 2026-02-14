"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion, useSpring } from "motion/react";
import { ABOUT_V2_DATA } from "@/lib/about-v2-data";
import { NarrativeItem } from "./narrative-item";
import { SidebarNavigator } from "./sidebar-navigator";

export const AboutV2Narrative: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest: number) => {
            const index = Math.min(
                Math.floor(latest * ABOUT_V2_DATA.length),
                ABOUT_V2_DATA.length - 1
            );
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, activeIndex]);

    const scrollToSection = (index: number) => {
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.offsetHeight;
        const targetScroll = (index / ABOUT_V2_DATA.length) * totalHeight;
        const absoluteTarget = containerRef.current.offsetTop + targetScroll;

        window.scrollTo({
            top: absoluteTarget,
            behavior: "smooth",
        });
    };

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

                {/* Background Ambient Glows */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
                </div>

                {/* Progress Tracker - Left Side Boutique Style */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 z-50">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-xs text-secondary-zinc-400 font-black tracking-widest uppercase [writing-mode:vertical-lr]">SEQUENCE</span>
                        <div className="h-40 w-[1px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                style={{ scaleY: scrollYProgress }}
                                className="absolute inset-0 bg-primary origin-top"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-black text-primary leading-none italic">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-bold leading-none">
                                {String(ABOUT_V2_DATA.length).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigator - Right Side */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                    <SidebarNavigator
                        items={ABOUT_V2_DATA}
                        activeIndex={activeIndex}
                        onItemClick={scrollToSection}
                    />
                </div>

                {/* Decorative elements */}
                <div className="absolute left-1/2 top-12 -translate-x-1/2 opacity-20 hidden md:block group z-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-white/40" />
                        <span className="text-[10px] tracking-[0.8em] text-white uppercase font-black whitespace-nowrap group-hover:text-primary transition-colors cursor-default">
                            ESAP AI — DOSSIER — EST. 2020
                        </span>
                        <div className="w-12 h-[1px] bg-white/40" />
                    </div>
                </div>

                {/* Narrative Slides */}
                <div className="relative w-full h-full flex-1">
                    {ABOUT_V2_DATA.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeIndex
                                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                : index < activeIndex
                                    ? "opacity-0 -translate-y-1/2 scale-95 pointer-events-none"
                                    : "opacity-0 translate-y-1/2 scale-105 pointer-events-none"
                                }`}
                        >
                            <NarrativeItem
                                item={item}
                                isActive={index === activeIndex}
                                isFlipped={index % 2 !== 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
