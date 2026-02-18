"use client";

import { m, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { usePathname } from "next/navigation";
import { LogoBootSequence } from "@/components/features/products/hero/remotion/LogoBootSequence";
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
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (frame >= totalFrames) {
                    setDisplayText(text);
                    clearInterval(interval);
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
            }, 40);
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
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
                        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

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
                                    <Player
                                        component={LogoBootSequence}
                                        durationInFrames={120} // 4 seconds
                                        compositionWidth={400} // Higher res for crisp scaling
                                        compositionHeight={400}
                                        fps={30}
                                        loop={false} // One-shot boot
                                        autoPlay
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        inputProps={{}}
                                    />
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
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/30 ml-[0.6em]">
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
