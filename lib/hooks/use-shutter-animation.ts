"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";
import { ShutterCanvasHandle } from "@/components/features/home/sections/technology-excellence/shutter-canvas";

interface ShutterAnimationOptions {
    containerRef: RefObject<HTMLElement | null>;
    leftShutterRef: RefObject<HTMLDivElement | null>;
    rightShutterRef: RefObject<HTMLDivElement | null>;
    leftCanvasRef: RefObject<ShutterCanvasHandle | null>;
    rightCanvasRef: RefObject<ShutterCanvasHandle | null>;
    contentRef: RefObject<HTMLDivElement | null>;
    isRTL: boolean;
}

/**
 * Hook for the 3D Cinematic Window Shutter sequence
 */
export function useShutterAnimation({
    containerRef,
    leftShutterRef,
    rightShutterRef,
    leftCanvasRef,
    rightCanvasRef,
    contentRef,
    isRTL,
}: ShutterAnimationOptions) {
    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            const container = containerRef.current;
            const leftShutter = leftShutterRef.current;
            const rightShutter = rightShutterRef.current;
            const content = contentRef.current;

            if (!container || !leftShutter || !rightShutter || !content) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=150%", // Adjusted pinning distance
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: 0, // Standard priority, Hero is 1
                    }
                });

                // Initial State Setup (Immediate)
                gsap.set(leftShutter, {
                    rotateY: 90,
                    xPercent: -50,
                    opacity: 0,
                    transformOrigin: "left center",
                });
                gsap.set(rightShutter, {
                    rotateY: -90,
                    xPercent: 50,
                    opacity: 0,
                    transformOrigin: "right center",
                });
                gsap.set(content, { opacity: 0, scale: 0.9, y: 30 });

                // Cinematic Shutter Closing Sequence
                const frameProgress = { value: 0 };

                tl.to(leftShutter, {
                    rotateY: 0,
                    xPercent: 0,
                    opacity: 1,
                    duration: 2.5, // Slower for more gravitas
                    ease: "power2.inOut",
                }, 0)
                    .to(rightShutter, {
                        rotateY: 0,
                        xPercent: 0,
                        opacity: 1,
                        duration: 2.5,
                        ease: "power2.inOut",
                    }, 0)
                    // Canvas Progress Scrubbing
                    .to(frameProgress, {
                        value: 1,
                        duration: 2.5,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (leftCanvasRef.current) leftCanvasRef.current.setFrame(frameProgress.value);
                            if (rightCanvasRef.current) rightCanvasRef.current.setFrame(frameProgress.value);
                        }
                    }, 0)
                    // Meet in middle and then reveal content with a dramatic fade
                    .to(content, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 2,
                        ease: "expo.out",
                    }, "-=0.8");
            });

            // Mobile fallback
            mm.add("(max-width: 1023px)", () => {
                gsap.from([leftShutter, rightShutter], {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                    }
                });
                gsap.from(content, {
                    opacity: 0,
                    y: 20,
                    delay: 0.3,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                    }
                });
            });

            return () => mm.revert();
        },
        { scope: containerRef, dependencies: [isRTL] }
    );
}
