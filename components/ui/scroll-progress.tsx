"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

const THUMB_PX = 80;

export function ScrollProgress() {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const pathname = usePathname();
    const lenis = useLenis();
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        setIsRTL(document.documentElement.dir === "rtl");
    }, [pathname]);

    const getMetrics = useCallback(() => {
        const trackH = trackRef.current?.getBoundingClientRect().height ?? window.innerHeight;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const thumbH = THUMB_PX;
        return { trackH, maxScroll, thumbH };
    }, []);

    const updateThumb = useCallback(() => {
        if (!thumbRef.current) return;
        const { trackH, maxScroll, thumbH } = getMetrics();
        const progress = Math.min(window.scrollY / maxScroll, 1);
        const maxTop = trackH - thumbH;
        thumbRef.current.style.height = `${thumbH}px`;
        thumbRef.current.style.top = `${progress * maxTop}px`;
    }, [getMetrics]);

    // Listen on native scroll event — works regardless of Lenis internals
    useEffect(() => {
        updateThumb();
        window.addEventListener("scroll", updateThumb, { passive: true });
        window.addEventListener("resize", updateThumb, { passive: true });
        return () => {
            window.removeEventListener("scroll", updateThumb);
            window.removeEventListener("resize", updateThumb);
        };
    }, [updateThumb]);

    // Reset on route change
    useEffect(() => {
        updateThumb();
    }, [pathname, updateThumb]);

    const scrollTo = useCallback((targetY: number) => {
        if (lenis) {
            lenis.scrollTo(targetY, { immediate: false, duration: 0.8 });
        } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
        }
    }, [lenis]);

    const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isDraggingRef.current || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const { trackH, maxScroll, thumbH } = getMetrics();
        const clickY = e.clientY - rect.top;
        const maxTop = trackH - thumbH;
        const progress = Math.min(Math.max((clickY - thumbH / 2) / maxTop, 0), 1);
        scrollTo(progress * maxScroll);
    }, [getMetrics, scrollTo]);

    const handleThumbMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        isDraggingRef.current = true;
        const startY = e.clientY;
        const startScrollY = window.scrollY;

        const onMove = (ev: MouseEvent) => {
            const { trackH, maxScroll, thumbH } = getMetrics();
            const maxTop = trackH - thumbH;
            if (maxTop <= 0) return;
            const delta = ev.clientY - startY;
            const scrollDelta = (delta / maxTop) * maxScroll;
            const target = Math.min(Math.max(startScrollY + scrollDelta, 0), maxScroll);
            if (lenis) {
                lenis.scrollTo(target, { immediate: true });
            } else {
                window.scrollTo(0, target);
            }
        };

        const onUp = () => {
            isDraggingRef.current = false;
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.body.style.userSelect = "";
        };

        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    }, [getMetrics, lenis]);

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
                onClick={(e) => e.stopPropagation()}
                className="absolute w-full cursor-grab rounded-[3px] bg-[var(--color-primary-opacity-50)] active:cursor-grabbing"
                style={{ height: `${THUMB_PX}px`, top: "0px" }}
            />
        </div>
    );
}
