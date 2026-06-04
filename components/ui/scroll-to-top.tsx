"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

// Geometry of the progress ring. The visible button is 44px; the SVG is
// slightly larger to give the ring breathing room outside the button edge.
const BUTTON_SIZE = 44;
const RING_PADDING = 4;
const SVG_SIZE = BUTTON_SIZE + RING_PADDING * 2;
const STROKE_WIDTH = 3;
const RADIUS = (SVG_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const REVEAL_THRESHOLD = 0.01;

export function ScrollToTop() {
    const lenis = useLenis();
    const t = useTranslations("UI");
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!lenis) return;

        const handler = ({ progress: p }: { progress: number }) => {
            // Coalesce updates into a single frame for smoothness.
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const clamped = Math.max(0, Math.min(1, p));
                setProgress(clamped);
                setIsVisible(clamped >= REVEAL_THRESHOLD);
            });
        };

        lenis.on("scroll", handler);
        return () => {
            lenis.off("scroll", handler);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [lenis]);

    const handleClick = useCallback(() => {
        if (!lenis) return;
        lenis.scrollTo(0, { duration: 1.4 });
    }, [lenis]);

    // When hovered, show the ring fully complete; otherwise reflect scroll.
    const displayProgress = isHovered ? 1 : progress;
    const dashOffset = CIRCUMFERENCE * (1 - displayProgress);

    return (
        <button
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label={t("scrollToTop")}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            className={[
                "group fixed end-6 bottom-8 z-[9998]",
                "grid place-items-center",
                "rounded-full",
                "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)]",
                isVisible
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-75 opacity-0 pointer-events-none",
            ].join(" ")}
            style={{
                width: SVG_SIZE,
                height: SVG_SIZE,
            }}
        >
            {/* Progress ring */}
            <svg
                width={SVG_SIZE}
                height={SVG_SIZE}
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                className="absolute inset-0 -rotate-90"
                aria-hidden="true"
            >
                {/* Track */}
                <circle
                    cx={SVG_SIZE / 2}
                    cy={SVG_SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="var(--color-primary-opacity-30)"
                    strokeWidth={STROKE_WIDTH}
                />
                {/* Progress */}
                <circle
                    cx={SVG_SIZE / 2}
                    cy={SVG_SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    style={{
                        transition: "stroke-dashoffset 200ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                />
            </svg>

            {/* Inner pill button */}
            <span
                className="relative grid place-items-center overflow-hidden rounded-full bg-[var(--color-dark)] transition-colors duration-200 group-hover:bg-[var(--color-primary)]"
                style={{
                    width: BUTTON_SIZE,
                    height: BUTTON_SIZE,
                    boxShadow:
                        "0 8px 24px -8px rgba(19, 245, 132, 0.35), inset 0 0 0 1px var(--color-primary-opacity-30)",
                }}
            >
                {/* Arrow stack: leading arrow slides up & out, trailing arrow slides up into place */}
                <span
                    aria-hidden="true"
                    className="relative block h-3.5 w-3.5 overflow-hidden"
                >
                    <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        className="absolute inset-0 h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4 group-focus-visible:-translate-y-4 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                    >
                        <path
                            d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5"
                            stroke="var(--color-primary)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-[stroke] duration-200 group-hover:stroke-[var(--color-dark)]"
                        />
                    </svg>
                    <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        className="absolute inset-0 h-full w-full translate-y-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none motion-reduce:translate-y-0"
                    >
                        <path
                            d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5"
                            stroke="var(--color-dark)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </span>
        </button>
    );
}
