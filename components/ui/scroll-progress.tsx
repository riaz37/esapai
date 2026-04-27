"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

export function ScrollProgress() {
    const thumbRef = useRef<HTMLDivElement>(null);
    const thumbRatioRef = useRef(0);
    const lenis = useLenis();

    const updateThumbSize = useCallback(() => {
        const ratio = window.innerHeight / document.documentElement.scrollHeight;
        thumbRatioRef.current = Math.max(ratio, 0.04); // min 4% so thumb never vanishes
        if (thumbRef.current) {
            thumbRef.current.style.height = `${thumbRatioRef.current * 100}%`;
        }
    }, []);

    useEffect(() => {
        updateThumbSize();

        // Recalculate when page height changes (lazy sections, ScrollTrigger.refresh, resize)
        const ro = new ResizeObserver(updateThumbSize);
        ro.observe(document.body);
        window.addEventListener("resize", updateThumbSize);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", updateThumbSize);
        };
    }, [updateThumbSize]);

    useEffect(() => {
        if (!lenis || !thumbRef.current) return;

        const handler = ({ progress }: { progress: number }) => {
            if (thumbRef.current) {
                const maxOffset = (1 - thumbRatioRef.current) * 100;
                thumbRef.current.style.top = `${progress * maxOffset}%`;
            }
        };

        lenis.on("scroll", handler);
        return () => lenis.off("scroll", handler);
    }, [lenis]);

    return (
        <div
            className="fixed right-0 top-0 z-[9999] h-full w-[6px] bg-[var(--color-dark)]"
            aria-hidden="true"
        >
            <div
                ref={thumbRef}
                className="absolute w-full rounded-[3px] bg-[var(--color-primary-opacity-50)]"
                style={{ height: "0%", top: "0%" }}
            />
        </div>
    );
}
