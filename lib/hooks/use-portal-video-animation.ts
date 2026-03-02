"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";


interface PortalVideoAnimationOptions {
    videoRef: RefObject<HTMLDivElement | null>;
    textRef: RefObject<HTMLDivElement | null>;
    overlayRef: RefObject<HTMLDivElement | null>;
    isRTL: boolean;
}

/**
 * Hook for the Service Portal Video expansion/pinning animation sequence
 */
export function usePortalVideoAnimation({
    videoRef,
    textRef,
    overlayRef,
    isRTL
}: PortalVideoAnimationOptions) {
    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);
            const videoContainer = videoRef.current;
            const container = videoContainer?.parentElement?.parentElement; // Based on ServicePortalVideoSection structure
            if (!container || !videoContainer) return;

            const mm = gsap.matchMedia();
            const videoElement = videoContainer.querySelector("video");

            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=200%", // 200vh scroll distance
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Initial State
                gsap.set(videoContainer, {
                    width: "40%",
                    borderRadius: "48px",
                    position: "absolute",
                    top: "25%",
                    yPercent: 0,
                    xPercent: 0,
                    ...(isRTL ? { right: "5%", left: "auto" } : { left: "5%", right: "auto" }),
                });

                // Animation Sequence
                tl
                    // 1. Expand Video & Center
                    .to(videoContainer, {
                        width: "70%",
                        ...(isRTL ? { right: "50%", xPercent: 50, left: "auto" } : { left: "50%", xPercent: -50, right: "auto" }),
                        top: "50%",
                        yPercent: -50,
                        borderRadius: "32px",
                        duration: 1,
                        ease: "power1.inOut"
                    }, 0)
                    // 2. Fade out Text
                    .to(textRef.current, {
                        opacity: 0,
                        y: -50,
                        duration: 0.3,
                        ease: "power1.out"
                    }, 0)
                    // 3. Adjust Video Filters
                    .fromTo(videoElement,
                        { filter: "brightness(1.3) saturate(1.2)" },
                        { filter: "brightness(1) saturate(1)", duration: 0.8 },
                        0
                    )
                    // 4. Fade out overlay tint
                    .to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.3
                    }, 0);
            });

            return () => mm.revert();
        },
        { scope: videoRef }
    );
}
