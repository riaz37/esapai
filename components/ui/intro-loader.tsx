"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface IntroLoaderProps {
    children: React.ReactNode;
}

const SCRAMBLE_CHARS = "01$#%&@*?><{}[]";

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
                frame++;
            }, 40);
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
}

export function IntroLoader({ children }: IntroLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Smooth transition time for cinematic reveal
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="intro-loader"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.1,
                            filter: "blur(10px)",
                            transition: {
                                duration: 1.2,
                                ease: [0.7, 0, 0.3, 1]
                            }
                        }}
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
                    >
                        {/* Cinematic Grain Overlay - Static noise for better color accuracy */}
                        <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.02] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                        {/* Immersive Background Depth */}
                        <motion.div
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
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 -m-8 rounded-full bg-[#00A551]/20 blur-[60px]"
                                />

                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        duration: 2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative z-10 w-40 h-40 md:w-56 md:h-56 flex items-center justify-center"
                                >
                                    <motion.img
                                        src="/landing/circle.svg"
                                        alt="ESAP AI"
                                        className="w-full h-full brightness-[1.2] drop-shadow-[0_0_50px_rgba(0,165,81,0.6)]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Typography - Refined Spacing */}
                        <div className="flex flex-col items-center gap-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
                                animate={{ opacity: 1, y: 0, letterSpacing: "1em" }}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                className="text-xl md:text-2xl font-semibold uppercase text-white/90 text-center ml-[1em]"
                            >
                                <ScrambleText text="ESAP AI" delay={1} />
                            </motion.h1>

                            <motion.div
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
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.2, 0.5, 0.2]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.4,
                                                ease: "easeInOut"
                                            }}
                                            className="h-1 w-1 rounded-full bg-[#00A551]"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
            {children}
        </>
    );
}
