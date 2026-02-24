/* eslint-disable react/no-unknown-property */
"use client";

import { m, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import Remotion Player wrapper to defer ~608KB from initial bundle
const RemotionPlayerWrapper = dynamic(
    () => import("./remotion-player-wrapper").then((mod) => mod.RemotionPlayerWrapper),
    { ssr: false }
);
interface IntroLoaderProps {
    children: React.ReactNode;
}

const SCRAMBLE_CHARS = "01$#%&@*?><{}[]";

const PULSE_ITEMS = [
    { key: "pulse-a", delay: 0 },
    { key: "pulse-b", delay: 0.4 },
    { key: "pulse-c", delay: 0.8 },
] as const;

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let frame = 0;
        const totalFrames = 30;
        let animationFrameId: number;
        let lastTimestamp = 0;

        const animate = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const progress = timestamp - lastTimestamp;

            // Update every ~40ms (similar to the interval before)
            if (progress >= 40) {
                lastTimestamp = timestamp;
                if (frame >= totalFrames) {
                    setDisplayText(text);
                    return;
                }

                const scrambled = text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < (frame / totalFrames) * text.length) return text[i];
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    })
                    .join("");

                setDisplayText(scrambled);
                frame += 1;
            }

            if (frame < totalFrames) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        const timeout = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [text, delay]);

    return <span>{displayText}</span>;
}

export function IntroLoader({ children }: IntroLoaderProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isLoading, setIsLoading] = useState(isHomePage);

    useEffect(() => {
        if (!isHomePage) return;

        // Smooth transition time for cinematic reveal
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => {
            clearTimeout(timer);
        };
    }, [isHomePage]);

    return (
        <>
            {/* Preload the LCP image to make it discoverable in the initial HTML request */}
            {/* @ts-ignore */}
            <link rel="preload" href="/logo/mainlogo.png" as="image" fetchPriority="high" />
            <AnimatePresence mode="wait">
                {isLoading && (
                    <m.div
                        key="intro-loader"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 1.5,
                                ease: [0.7, 0, 0.3, 1],
                                when: "afterChildren"
                            }
                        }}
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
                    >
                        {/* Cinematic Grain Overlay - Static noise for better color accuracy */}
                        {/* Inline SVG grain — no external network request */}
                        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02] mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

                        {/* Immersive Background Depth */}
                        <m.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,165,81,0.1)_0%,transparent_60%)]"
                        />

                        {/* Logo & Glow Portal */}
                        <div className="relative flex flex-col items-center gap-16">
                            <div className="relative group">
                                {/* Tiered Glow Layers */}
                                <m.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 -m-8 rounded-full bg-[#00A551]/20 blur-[60px]"
                                />

                                <m.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{
                                        scale: 12,
                                        opacity: 0,
                                        filter: "brightness(2) blur(5px)",
                                        transition: {
                                            duration: 1.2,
                                            ease: [0.7, 0, 0.3, 1]
                                        }
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                                >
                                    <RemotionPlayerWrapper />
                                </m.div>
                            </div>
                        </div>

                        {/* Typography - Refined Spacing */}
                        <m.div
                            exit={{
                                opacity: 0,
                                y: 10,
                                transition: { duration: 0.5 }
                            }}
                            className="flex flex-col items-center gap-6"
                        >
                            <m.h1
                                initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
                                animate={{ opacity: 1, y: 0, letterSpacing: "1em" }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                className="text-xl md:text-2xl font-semibold uppercase text-white/90 text-center ml-[1em]"
                            >
                                <ScrambleText text="ESAP AI" delay={1} />
                            </m.h1>

                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2, delay: 1.8 }}
                                className="flex flex-col items-center gap-3"
                            >
                                <div className="text-xs uppercase tracking-widest text-white/30 ml-2">
                                    <ScrambleText text="The Vanguard of Intelligence" delay={2} />
                                </div>

                                {/* Performance-neutral breathing indicator */}
                                <div className="flex gap-2 mt-4">
                                    {PULSE_ITEMS.map((pulse) => (
                                        <m.div
                                            key={pulse.key}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.2, 0.5, 0.2]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: pulse.delay,
                                                ease: "easeInOut"
                                            }}
                                            className="h-1 w-1 rounded-full bg-[#00A551]"
                                        />
                                    ))}
                                </div>
                            </m.div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence >
            {children}
        </>
    );
}
