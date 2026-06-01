"use client";

import { useState, useEffect, useRef } from "react";
import { useScroll } from "motion/react";

interface UseNarrativeFlowProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    itemCount: number;
}

export function useNarrativeFlow({ containerRef, itemCount }: UseNarrativeFlowProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const activeIndexRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest: number) => {
            const index = Math.min(
                Math.floor(latest * itemCount),
                itemCount - 1
            );
            if (index !== activeIndexRef.current) {
                setDirection(index > activeIndexRef.current ? 1 : -1);
                activeIndexRef.current = index;
                setActiveIndex(index);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, itemCount]);

    const scrollToSection = (index: number) => {
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.offsetHeight;
        const targetScroll = (index / itemCount) * totalHeight;
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

    return {
        activeIndex,
        direction,
        scrollToSection,
        variants,
    };
}
