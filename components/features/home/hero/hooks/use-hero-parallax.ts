"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { MutableRefObject } from "react";
import { getViewportPerformanceProfile } from "@/lib/utils/performance-utils";

interface useHeroParallaxProps {
    sectionRef: MutableRefObject<HTMLElement | null>;
    circleContainerRef: MutableRefObject<HTMLDivElement | null>;
    proxyCircleRef: MutableRefObject<HTMLDivElement | null>;
    contentScrollRef: MutableRefObject<HTMLDivElement | null>;
    iconsScrollRef: MutableRefObject<HTMLDivElement | null>;
}

export function useHeroParallax({
    sectionRef,
    circleContainerRef,
    proxyCircleRef,
    contentScrollRef,
    iconsScrollRef,
}: useHeroParallaxProps) {
    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Centering runs on ALL devices — these elements use left-1/2 CSS which
            // only sets the left edge to 50%; xPercent/yPercent provide the translate(-50%)
            // needed to actually center them. Without this, the circle is half off-screen on iOS.
            if (circleContainerRef.current) {
                gsap.set(circleContainerRef.current, { xPercent: -50, yPercent: -50, scale: 1, autoAlpha: 1 });
            }
            if (proxyCircleRef.current) {
                gsap.set(proxyCircleRef.current, {
                    xPercent: -50,
                    yPercent: -50,
                    scale: 0.8,
                    autoAlpha: 0,
                });
            }
            if (iconsScrollRef.current) {
                gsap.set(iconsScrollRef.current, { xPercent: -50, yPercent: -50, scale: 1, autoAlpha: 1 });
            }

            // iOS WebKit: skip scroll-triggered pin — causes renderer crash and pin-spacer void
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
            const profile = getViewportPerformanceProfile();
            if (isIOS || profile.shouldReduceMotion) return;

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                },
            });

            mainTl.addLabel("start", 0);

            // SCROLL-LINKED PARALLAX ANIMATION ("The Eye of AI")
            if (circleContainerRef.current && proxyCircleRef.current) {
                // Fade OUT Scale Real Circle
                mainTl.to(
                    circleContainerRef.current,
                    {
                        autoAlpha: 0,
                        scale: 1.5,
                        duration: 0.6,
                        ease: "power1.in",
                    },
                    0
                );

                // Fade IN & Zoom Proxy Circle
                mainTl.fromTo(
                    proxyCircleRef.current,
                    {
                        autoAlpha: 0,
                        scale: 0.6,
                    },
                    {
                        autoAlpha: 0.8,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        transformOrigin: "center center",
                    },
                    0
                );

                // Fade Proxy out more gradually
                mainTl.to(
                    proxyCircleRef.current,
                    {
                        autoAlpha: 0,
                        scale: 1.2,
                        duration: 0.5,
                        ease: "power2.in",
                    },
                    0.5
                );
            }

            // Fade out Content Wrappers
            mainTl.to(
                [contentScrollRef.current, iconsScrollRef.current],
                {
                    autoAlpha: 0,
                    scale: 0.85,
                    duration: 0.6,
                    ease: "power2.in",
                },
                0
            );

            // FINAL REVEAL: Fade out the entire Hero Section by the end of the scroll
            // Adjusted: Fade out slightly later and more gradually to prevent "blank" gap during reverse scroll
            mainTl.to(
                sectionRef.current,
                {
                    opacity: 0, // Changed from autoAlpha for cleaner transition
                    duration: 0.3,
                    ease: "power1.inOut",
                },
                0.7 // Delayed from 0.6
            );

            return () => {
                mainTl.kill();
            };
        },
        { scope: sectionRef }
    );
}
