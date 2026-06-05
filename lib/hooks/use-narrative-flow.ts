"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll } from "motion/react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

interface UseNarrativeFlowProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    itemCount: number;
}

export function useNarrativeFlow({ containerRef, itemCount }: UseNarrativeFlowProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const activeIndexRef = useRef(0);
    const isProgrammaticScrollRef = useRef(false);
    const programmaticScrollIdRef = useRef(0);
    const unlockScrollSyncTimeoutRef = useRef<number | null>(null);
    const lenis = useLenis();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest: number) => {
            if (isProgrammaticScrollRef.current || itemCount <= 0) return;

            const index = Math.max(0, Math.min(
                Math.floor(latest * itemCount),
                itemCount - 1
            ));
            if (index !== activeIndexRef.current) {
                setDirection(index > activeIndexRef.current ? 1 : -1);
                activeIndexRef.current = index;
                setActiveIndex(index);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, itemCount]);

    useEffect(() => {
        return () => {
            if (unlockScrollSyncTimeoutRef.current !== null) {
                window.clearTimeout(unlockScrollSyncTimeoutRef.current);
            }
        };
    }, []);

    const scrollToSection = useCallback((index: number) => {
        if (!containerRef.current) return;
        if (itemCount <= 0) return;

        const nextIndex = Math.min(Math.max(index, 0), itemCount - 1);
        const scrollableHeight = Math.max(containerRef.current.offsetHeight - window.innerHeight, 0);
        const progress = (nextIndex + 0.5) / itemCount;
        const targetScroll = progress * scrollableHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
        const absoluteTarget = containerTop + targetScroll;

        const scrollId = programmaticScrollIdRef.current + 1;
        programmaticScrollIdRef.current = scrollId;
        isProgrammaticScrollRef.current = true;

        if (nextIndex !== activeIndexRef.current) {
            setDirection(nextIndex > activeIndexRef.current ? 1 : -1);
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
        }

        if (unlockScrollSyncTimeoutRef.current !== null) {
            window.clearTimeout(unlockScrollSyncTimeoutRef.current);
        }

        const unlockScrollSync = () => {
            if (programmaticScrollIdRef.current !== scrollId) return;
            isProgrammaticScrollRef.current = false;
            if (unlockScrollSyncTimeoutRef.current !== null) {
                window.clearTimeout(unlockScrollSyncTimeoutRef.current);
                unlockScrollSyncTimeoutRef.current = null;
            }
        };

        if (lenis) {
            lenis.scrollTo(absoluteTarget, {
                duration: 0.8,
                onComplete: unlockScrollSync,
            });
            unlockScrollSyncTimeoutRef.current = window.setTimeout(unlockScrollSync, 1200);
        } else {
            window.scrollTo({
                top: absoluteTarget,
                behavior: "smooth",
            });
            unlockScrollSyncTimeoutRef.current = window.setTimeout(unlockScrollSync, 1200);
        }
    }, [containerRef, itemCount, lenis]);

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
