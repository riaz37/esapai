import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseProductCinematicReelProps {
    containerRef: RefObject<HTMLDivElement | null>;
    imagesRef: RefObject<(HTMLDivElement | null)[]>;
    reelImages: string[];
}

export function useProductCinematicReel({
    containerRef,
    imagesRef,
    reelImages,
}: UseProductCinematicReelProps) {
    useGSAP(
        () => {
            if (!containerRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%", // Reduced to minimize dead scroll space on mobile
                    pin: true,
                    scrub: 1, // Tighter response
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Initial State: Stack the "Blades"
            gsap.set(".deck-stage", { perspective: "2500px" });

            // Proactive Mobile Header Animation
            const header = containerRef.current?.querySelector(
                '.mobile-section-header [data-testid="section-header"]'
            );
            if (header) {
                const children = Array.from(header.children);
                gsap.fromTo(
                    children,
                    { y: 30, opacity: 0, filter: "blur(10px)" },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: header,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            reelImages.forEach((_, index) => {
                const el = imagesRef.current[index];
                if (!el) return;

                if (index === 0) {
                    // First image starts VISIBLE and CENTERED
                    gsap.set(el, {
                        opacity: 1,
                        z: 0,
                        rotationY: 0,
                        scaleX: 1,
                        xPercent: 0,
                        filter: "blur(0px) brightness(1)",
                    });
                } else {
                    // Others start as "Blades" in the background
                    gsap.set(el, {
                        opacity: 0,
                        z: -1500,
                        rotationY: index % 2 === 0 ? 45 : -45,
                        scaleX: 0.1, // Blade state
                        xPercent: index % 2 === 0 ? 150 : -150,
                        filter: "blur(20px) brightness(2)",
                    });
                }
            });

            // 2. The Deck Orchestration
            reelImages.forEach((_, index) => {
                // Tighter timing calculation
                const startTime = index * 3; // Shifted start time
                const holdDuration = 1.5;
                const transitionDuration = 1.5;

                const el = imagesRef.current[index];

                if (index === 0) {
                    // First image is already visible - SKIP entrance animation
                    // It just waits for its turn to be discarded
                } else {
                    // STEP A: The "Unfurl" - Buttery smooth entry for subsequent images
                    tl.to(
                        el,
                        {
                            opacity: 1,
                            z: 0,
                            rotationY: 0,
                            scaleX: 1,
                            xPercent: 0,
                            filter: "blur(0px) brightness(1)",
                            duration: transitionDuration,
                            ease: "power4.out",
                        },
                        startTime
                    );
                }

                // STEP B: The Focal Hold - Smooth drift (Applied to ALL)
                tl.to(
                    el,
                    {
                        z: 100, // Slightly more drift
                        duration: holdDuration,
                        ease: "sine.inOut", // Smooth periodic drift
                    },
                    startTime + transitionDuration
                );

                // STEP C: The Discard - Elegant exit
                if (index < reelImages.length - 1) {
                    tl.to(
                        el,
                        {
                            xPercent: index % 2 === 0 ? -150 : 150,
                            rotationY: index % 2 === 0 ? -45 : 45,
                            opacity: 0,
                            z: -1500,
                            filter: "blur(20px) brightness(2)",
                            duration: transitionDuration * 0.8,
                            ease: "expo.in",
                        },
                        startTime + transitionDuration + holdDuration
                    );
                }
            });

            // Parallax for the Stage
            const onMouseMove = (e: MouseEvent) => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
                const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

                gsap.to(".deck-stage", {
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    duration: 1.5,
                    ease: "power2.out",
                });
            };

            window.addEventListener("mousemove", onMouseMove);
            return () => window.removeEventListener("mousemove", onMouseMove);
        },
        { scope: containerRef }
    );
}
