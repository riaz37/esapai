"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TypewriterTitleProps {
    /** The full title text to animate (Part 1 in manual mode) */
    title: string;
    /** 
     * How to split the title for highlighting:
     * - "lastWord": Highlights the last word (default)
     * - "firstWord": Highlights the first word
     * - "secondLine": Treats Part 2 as a separate line
     * - "manual": Explicitly uses 'title' as Part 1 and 'tagline' as Part 2
     */
    splitMode?: "lastWord" | "firstWord" | "secondLine" | "manual";
    /** Which part to highlight with the primary color */
    highlightPart?: "first" | "last";
    /** The tagline or second part of the title for manual/secondLine modes */
    tagline?: string;
    /** Custom class for the main title wrapper */
    className?: string;
    /** Custom class for the white/main text portion */
    mainTextClassName?: string;
    /** Custom class for the highlighted/primary text portion */
    highlightTextClassName?: string;
    /** @deprecated Use 'tagline' instead */
    secondLine?: string;
    /** Delay before animation starts (in seconds) */
    startDelay?: number;
    /** Duration per letter animation (in seconds) */
    letterDuration?: number;
    /** Stagger delay between letters (in seconds) */
    staggerDelay?: number;
    /** Whether to show glow effect behind highlighted text */
    showGlow?: boolean;
    /** Text alignment */
    align?: "left" | "center" | "right";
}

/**
 * Animated letter component for typewriter effect
 */
const AnimatedLetter = ({
    letter,
    index,
    className,
    duration = 0.4,
    staggerDelay = 0.05,
    startDelay = 0,
}: {
    letter: string;
    index: number;
    className?: string;
    duration?: number;
    staggerDelay?: number;
    startDelay?: number;
}) => (
    <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
            duration,
            delay: startDelay + (staggerDelay * index),
            ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn("inline-block", className)}
    >
        {letter === " " ? "\u00A0" : letter}
    </motion.span>
);

/**
 * TypewriterTitle - A reusable animated title component with letter-by-letter reveal
 * 
 * Features:
 * - Smooth blur-to-clear animation per letter
 * - Configurable split modes for highlighting
 * - Optional glow effect behind highlighted text
 * - Fully customizable timing and styling
 */
export function TypewriterTitle({
    title,
    splitMode = "lastWord",
    highlightPart = "last",
    tagline,
    className,
    mainTextClassName,
    highlightTextClassName,
    secondLine,
    startDelay = 0,
    letterDuration = 0.4,
    staggerDelay = 0.05,
    showGlow = true,
    align = "left",
}: TypewriterTitleProps) {
    // Aliasing secondLine to tagline for backward compatibility
    const effectiveTagline = tagline || secondLine;

    // Parse title into parts
    const { part1, part2, highlightIndex } = useMemo(() => {
        const hIdx = highlightPart === "first" ? 0 : 1;

        if ((splitMode === "secondLine" || splitMode === "manual") && effectiveTagline) {
            return {
                part1: title,
                part2: effectiveTagline,
                highlightIndex: hIdx,
            };
        }

        const words = title.split(' ');
        if (splitMode === "firstWord") {
            return {
                part1: words[0],
                part2: words.slice(1).join(' '),
                highlightIndex: 0, // Force first word if mode is firstWord
            };
        }

        // Default: last word
        return {
            part1: words.slice(0, -1).join(' '),
            part2: words.slice(-1)[0],
            highlightIndex: 1, // Force last word if mode is lastWord
        };
    }, [title, splitMode, effectiveTagline, highlightPart]);

    const alignmentClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }[align];

    // Determine which part is highlighted
    const isPart1Highlighted = highlightIndex === 0;
    const isPart2Highlighted = highlightIndex === 1;

    let indexCounter = 0;

    return (
        <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight",
            alignmentClass,
            className
        )}>
            {/* Part 1 */}
            <span className={cn(
                "block relative",
                isPart1Highlighted ? "text-primary" : "text-white",
                isPart1Highlighted ? highlightTextClassName : mainTextClassName
            )}>
                {isPart1Highlighted && showGlow && (
                    <span
                        className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse-slow"
                        aria-hidden="true"
                    />
                )}
                <span className="relative">
                    {part1.split(' ').map((word, wordIndex, wordsArr) => (
                        <span key={wordIndex} className="inline-block whitespace-nowrap">
                            {word.split('').map((letter, letterIndex) => (
                                <AnimatedLetter
                                    key={letterIndex}
                                    letter={letter}
                                    index={indexCounter++}
                                    duration={letterDuration}
                                    staggerDelay={staggerDelay}
                                    startDelay={startDelay}
                                />
                            ))}
                            {wordIndex < wordsArr.length - 1 && (
                                <AnimatedLetter
                                    letter=" "
                                    index={indexCounter++}
                                    duration={letterDuration}
                                    staggerDelay={staggerDelay}
                                    startDelay={startDelay}
                                />
                            )}
                        </span>
                    ))}
                </span>
            </span>

            {/* Part 2 */}
            <span className={cn(
                "block relative",
                isPart2Highlighted ? "text-primary" : "text-white",
                isPart2Highlighted ? highlightTextClassName : mainTextClassName
            )}>
                {isPart2Highlighted && showGlow && (
                    <span
                        className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse-slow"
                        aria-hidden="true"
                    />
                )}
                <span className="relative">
                    {part2.split(' ').map((word, wordIndex, wordsArr) => (
                        <span key={wordIndex} className="inline-block whitespace-nowrap">
                            {word.split('').map((letter, letterIndex) => (
                                <AnimatedLetter
                                    key={letterIndex}
                                    letter={letter}
                                    index={indexCounter++}
                                    duration={letterDuration}
                                    staggerDelay={staggerDelay}
                                    startDelay={startDelay}
                                />
                            ))}
                            {wordIndex < wordsArr.length - 1 && (
                                <AnimatedLetter
                                    letter=" "
                                    index={indexCounter++}
                                    duration={letterDuration}
                                    staggerDelay={staggerDelay}
                                    startDelay={startDelay}
                                />
                            )}
                        </span>
                    ))}
                </span>
            </span>
        </h1>
    );
}
