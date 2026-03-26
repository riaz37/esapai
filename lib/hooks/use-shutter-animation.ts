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
                const syncCanvasFrame = (progress: number) => {
                    if (leftCanvasRef.current) leftCanvasRef.current.setFrame(progress);
                    if (rightCanvasRef.current) rightCanvasRef.current.setFrame(progress);
                };
                const frameProgress = { value: 0 };
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=100%", // Reduced — no TechCards to animate in
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        refreshPriority: 0, // Standard priority, Hero is 1
                        onEnter: () => {
                            leftShutter.style.willChange = "transform, opacity";
                            rightShutter.style.willChange = "transform, opacity";
                        },
                        onEnterBack: () => {
                            leftShutter.style.willChange = "transform, opacity";
                            rightShutter.style.willChange = "transform, opacity";
                        },
                        onRefresh: () => {
                            requestAnimationFrame(() => {
                                syncCanvasFrame(frameProgress.value);
                            });
                        },
                    }
                });

                // Ensure the GSAP pin-spacer wrapper doesn't block pointer events
                // on the hero section underneath (hero is z-0, this section is z-10)
                const pinSpacer = container.parentElement;
                if (pinSpacer?.classList.contains("pin-spacer")) {
                    pinSpacer.style.pointerEvents = "none";
                }

                // Initial State Setup (Immediate)
                gsap.set([leftShutter, rightShutter], {
                    opacity: 0,
                    willChange: "transform, opacity"
                });
                gsap.set(leftShutter, {
                    rotateY: 90,
                    xPercent: -50,
                    transformOrigin: "left center",
                });
                gsap.set(rightShutter, {
                    rotateY: -90,
                    xPercent: 50,
                    transformOrigin: "right center",
                });
                gsap.set(content, { opacity: 0, scale: 0.9, y: 30 });

                // Cinematic Shutter Closing Sequence
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
                            syncCanvasFrame(frameProgress.value);
                        }
                    }, 0)
                    // Meet in middle and then reveal content with a dramatic fade
                    .to(content, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "expo.out",
                    }, "-=1");

                // Force refresh to ensure pinning is calculated correctly
                ScrollTrigger.refresh();
            });

            // Final refresh call for globally ensuring layout is synced
            ScrollTrigger.refresh();

            return () => mm.revert();
        },
        { scope: containerRef, dependencies: [isRTL] }
    );
}
