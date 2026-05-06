"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

export function ScrollProgress() {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const thumbRatioRef = useRef(0);
    const lenis = useLenis();
    const pathname = usePathname();
    const [isRTL, setIsRTL] = useState(false);

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

    useEffect(() => {
        updateThumbSize();
        window.addEventListener("resize", updateThumbSize);
        return () => window.removeEventListener("resize", updateThumbSize);
    }, [updateThumbSize]);

    useEffect(() => {
        if (thumbRef.current) {
            thumbRef.current.style.top = "0%";
        }
        updateThumbSize();
    }, [pathname, updateThumbSize]);

    useEffect(() => {
        ScrollTrigger.addEventListener("refresh", updateThumbSize);
        return () => ScrollTrigger.removeEventListener("refresh", updateThumbSize);
    }, [updateThumbSize]);

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

    // Track click — jump to clicked position
    const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!trackRef.current || !lenis) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clickRatio = (e.clientY - rect.top) / rect.height;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        lenis.scrollTo(clickRatio * maxScroll, { immediate: false });
    }, [lenis]);

    // Thumb drag
    const handleThumbMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!trackRef.current || !lenis) return;

        const startY = e.clientY;
        const startScroll = window.scrollY;
        const trackHeight = trackRef.current.getBoundingClientRect().height;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        lenis.stop();

        const onMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientY - startY;
            const scrollDelta = (delta / trackHeight) * maxScroll / (1 - thumbRatioRef.current);
            lenis.scrollTo(Math.max(0, Math.min(maxScroll, startScroll + scrollDelta)), { immediate: true });
        };

        const onUp = () => {
            lenis.start();
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    }, [lenis]);

    return (
        <div
            ref={trackRef}
            onClick={handleTrackClick}
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 z-[9999] h-full w-[6px] cursor-pointer bg-[var(--color-dark)]`}
            aria-hidden="true"
        >
            <div
                ref={thumbRef}
                onMouseDown={handleThumbMouseDown}
                className="absolute w-full cursor-grab rounded-[3px] bg-[var(--color-primary-opacity-50)] active:cursor-grabbing"
                style={{ height: "0%", top: "0%" }}
            />
        </div>
    );
}
