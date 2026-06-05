"use client";

import { useEffect, useState, ReactNode, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getViewportPerformanceProfile, syncDocumentPerformanceMode } from "@/lib/utils/performance-utils";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    useEffect(() => {
        // Lenis fights iOS WebKit native scroll and causes renderer crashes (Android is fine)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
        const profile = getViewportPerformanceProfile();
        syncDocumentPerformanceMode(profile);

        const updatePerformanceMode = () => {
            syncDocumentPerformanceMode();
        };
        window.addEventListener("resize", updatePerformanceMode, { passive: true });

        if (isIOS || profile.shouldReduceMotion) {
            return () => {
                window.removeEventListener("resize", updatePerformanceMode);
            };
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;
        const publishFrame = window.requestAnimationFrame(() => {
            setLenisInstance(lenis);
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            window.cancelAnimationFrame(publishFrame);
            lenis.destroy();
            gsap.ticker.remove(update);
            window.removeEventListener("resize", updatePerformanceMode);
            lenisRef.current = null;
            setLenisInstance(null);
        };
    }, []);

    // Reset scroll on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
}
