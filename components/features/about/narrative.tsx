"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, m, useSpring, AnimatePresence } from "motion/react";
import { ABOUT_V2_DATA } from "@/lib/about-v2-data";
import { NarrativeItem } from "./narrative-item";
import { SidebarNavigator } from "./sidebar-navigator";

export const AboutNarrative: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest: number) => {
            const index = Math.min(
                Math.floor(latest * ABOUT_V2_DATA.length),
                ABOUT_V2_DATA.length - 1
            );
            if (index !== activeIndex) {
                setDirection(index > activeIndex ? 1 : -1);
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

    const variants = {
        enter: (direction: number) => ({
            y: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
        }),
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: (direction: number) => ({
            zIndex: 0,
            y: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
        }),
    };

    return (
        <div ref={containerRef} className="relative h-[600vh] scroll-mt-20 md:scroll-mt-32">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">


                {/* Sidebar Navigator - Right Side */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                    <SidebarNavigator
                        items={ABOUT_V2_DATA}
                        activeIndex={activeIndex}
                        onItemClick={scrollToSection}
                    />
                </div>

                {/* Narrative Slides */}
                <div className="relative w-full h-full flex-1">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <m.div
                            key={activeIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                y: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.5 },
                                filter: { duration: 0.5 },
                                scale: { duration: 0.5 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <NarrativeItem
                                item={ABOUT_V2_DATA[activeIndex]}
                                isActive={true}
                                isFlipped={activeIndex % 2 !== 0}
                            />
                        </m.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
