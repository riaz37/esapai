"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

export function ScrollProgress() {
    const thumbRef = useRef<HTMLDivElement>(null);
    const thumbRatioRef = useRef(0);
    const lenis = useLenis();
    const pathname = usePathname();
    const [isRTL, setIsRTL] = useState(false);

    // Detect RTL on mount (dir is set on <html> by the locale layout)
    useEffect(() => {
        setIsRTL(document.documentElement.dir === "rtl");
    }, [pathname]);

    const updateThumbSize = useCallback(() => {
        const ratio = Math.max(window.innerHeight / document.documentElement.scrollHeight, 0.04);
        thumbRatioRef.current = ratio;
        if (thumbRef.current) {
            thumbRef.current.style.height = `${ratio * 100}%`;
        }
    }, []);

    // Initial size + resize
    useEffect(() => {
        updateThumbSize();
        window.addEventListener("resize", updateThumbSize);
        return () => window.removeEventListener("resize", updateThumbSize);
    }, [updateThumbSize]);

    // Reset thumb position on route change (Lenis may skip event if already at top)
    useEffect(() => {
        if (thumbRef.current) {
            thumbRef.current.style.top = "0%";
        }
        updateThumbSize();
    }, [pathname, updateThumbSize]);

    // Keep thumb size accurate after ScrollTrigger.refresh() (triggered by LazySection loads)
    useEffect(() => {
        ScrollTrigger.addEventListener("refresh", updateThumbSize);
        return () => ScrollTrigger.removeEventListener("refresh", updateThumbSize);
    }, [updateThumbSize]);

    // Update size + position atomically on every Lenis scroll event
    useEffect(() => {
        if (!lenis || !thumbRef.current) return;

        const handler = ({ progress }: { progress: number }) => {
            if (!thumbRef.current) return;
            const ratio = Math.max(window.innerHeight / document.documentElement.scrollHeight, 0.04);
            thumbRatioRef.current = ratio;
            thumbRef.current.style.height = `${ratio * 100}%`;
            thumbRef.current.style.top = `${progress * (1 - ratio) * 100}%`;
        };

        lenis.on("scroll", handler);
        return () => lenis.off("scroll", handler);
    }, [lenis]);

    return (
        <div
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 z-[9999] h-full w-[6px] bg-[var(--color-dark)]`}
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
