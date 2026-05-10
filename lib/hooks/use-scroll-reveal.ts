"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
    selector?: string;
    stagger?: number;
    duration?: number;
    y?: number;
    opacity?: number;
    scale?: number;
    filter?: string;
    start?: string;
    delay?: number;
    ease?: string;
    toggleActions?: string;
    dependencies?: unknown[];
}
const EMPTY_DEPENDENCIES: unknown[] = [];

/**
 * Reusable hook for scroll-triggered staggered entrance animations using GSAP
 */
export function useScrollReveal(
    ref: RefObject<HTMLElement | null>,
    options: ScrollRevealOptions = {}
) {
    const {
        selector = ".animate-item",
        stagger = 0.2,
        duration = 0.8,
        y = 30,
        opacity = 0,
        scale = 1,
        filter = "none",
        start = "top 85%",
        delay = 0,
        ease = "power3.out",
        toggleActions = "play none none reverse",
        dependencies = EMPTY_DEPENDENCIES,
    } = options;

    useGSAP(
        () => {
            if (!ref.current) return;

            const targets = ref.current.querySelectorAll(selector);
            if (targets.length === 0) return;

            if (prefersReducedMotion()) {
                gsap.set(targets, { opacity: 1, y: 0, scale: 1, filter: "none" });
                return;
            }

            gsap.fromTo(
                targets,
                {
                    opacity,
                    y,
                    scale,
                    filter: filter === "none" ? "none" : filter,
                    immediateRender: false,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "none",
                    duration,
                    delay,
                    stagger,
                    ease,
                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        toggleActions,
                    },
                    onComplete: () => {
                        gsap.set(targets, { willChange: "auto" });
                    },
                }
            );
        },
        { scope: ref, dependencies }
    );
}
