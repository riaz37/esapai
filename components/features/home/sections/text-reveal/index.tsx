"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealSectionProps {
    text?: string;
}

export function TextRevealSection({
    text = "Forging the intelligence layer of tomorrow. Unlocking limitless potential."
}: TextRevealSectionProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !textRef.current) return;

            const words = textRef.current.querySelectorAll(".word");

            // --- Stage 1: Entry / Presence (No Pin) ---
            // As the section enters the viewport, fade text to a dim state so it's not empty.
            gsap.fromTo(
                words,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                    filter: "blur(4px)",
                    color: "rgba(255, 255, 255, 0.1)",
                },
                {
                    opacity: 0.3, // Visible but faint
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%", // Start fading in as soon as it enters view
                        end: "top 40%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // --- Stage 2: Focus / Highlight (Pinned) ---
            // Once focused, pin and light up the text.
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=150%", // Reading time
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            // Reveal Phase
            tl.to(
                words,
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.1, // Slower, more deliberate reading pace
                    duration: 1.5,
                    ease: "power2.out",
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

            // Exit Phase ("Jump" / Zoom Past)
            tl.to(
                textRef.current,
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

    const wordsArray = text.split(" ");
    const highlightIndices = [2, 3, 7, 8];
    const wordsWithKeys = wordsArray.map((word, pos) => ({
        word,
        key: `${word}-${pos}`,
        isHighlight: highlightIndices.includes(pos),
    }));

    return (
        <Section
            ref={containerRef}
            padding="md"
            containerMaxWidth="5xl"
            className="relative min-h-screen w-full flex items-center justify-center bg-transparent overflow-hidden"
        >
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <h2
                    ref={textRef}
                    className="text-center font-bold tracking-tighter origin-center will-change-transform leading-none"
                >
                    {wordsWithKeys.map((item) => (
                        <span
                            key={item.key}
                            className={cn(
                                "word inline-block me-[0.2em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/10",
                                item.isHighlight && "highlight"
                            )}
                        >
                            {item.word}
                        </span>
                    ))}
                </h2>
            </div>
        </Section>
    );
}
