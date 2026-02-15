"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

gsap.registerPlugin(ScrollTrigger);

export function TextRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !textRef.current) return;

            const words = textRef.current.querySelectorAll(".word");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=120%", // Tightened scrolling distance
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            // Phase 1: Reveal Text
            tl.fromTo(
                words,
                {
                    opacity: 0,
                    filter: "blur(12px)",
                    y: 20,
                    scale: 0.8,
                    color: "rgba(255, 255, 255, 0.1)",
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    scale: 1,
                    stagger: 0.08,
                    duration: 1.2,
                    ease: "power4.out",
                    color: (i, target: HTMLElement) => {
                        return target.classList.contains("highlight") ? "#13f584" : "#ffffff";
                    },
                    textShadow: (i, target: HTMLElement) => {
                        return target.classList.contains("highlight")
                            ? "0 0 30px rgba(19, 245, 132, 0.4)"
                            : "0 0 20px rgba(255, 255, 255, 0)";
                    },
                }
            );

            // Phase 2: "Jump" / Zoom Past
            tl.fromTo(
                textRef.current,
                {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                },
                {
                    scale: 3, // Zoom in massively
                    opacity: 0, // Fade out as we pass through
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power2.in",
                },
                "+=0.2" // Slight pause before jumping
            );
        },
        { scope: containerRef }
    );

    const text =
        "Forging the intelligence layer of tomorrow. Unlocking limitless potential.";
    const wordsArray = text.split(" ");
    const highlightIndices = [2, 3, 7, 8];

    return (
        <Section
            ref={containerRef}
            padding="none"
            containerMaxWidth="5xl"
            className="relative min-h-screen w-full flex items-center justify-center bg-transparent overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-20"
        >
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <h2
                    ref={textRef}
                    className="text-center font-bold tracking-tighter origin-center will-change-transform leading-[1.1]"
                >
                    {wordsArray.map((word, i) => (
                        <span
                            key={i}
                            className={cn(
                                "word inline-block mr-[0.2em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/10",
                                highlightIndices.includes(i) && "highlight"
                            )}
                        >
                            {word}
                        </span>
                    ))}
                </h2>
            </div>
        </Section>
    );
}
