"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AboutNarrativeItem } from "@/lib/about-v2-data";
import { Button } from "@/components/ui/button";

interface NarrativeItemProps {
    item: AboutNarrativeItem;
    isActive: boolean;
    isFlipped: boolean;
}

export const NarrativeItem: React.FC<NarrativeItemProps> = ({
    item,
    isActive,
    isFlipped,
}) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none bg-black">
            {/* Background Watermark - Matches ESAP AI Background style */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
                <AnimatePresence mode="wait">
                    {isActive && (
                        <motion.div
                            key={item.category}
                            initial={{ opacity: 0, scale: 1.2, filter: "blur(40px)" }}
                            animate={{ opacity: 0.03, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(40px)" }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-[28vw] font-black whitespace-nowrap leading-none select-none text-white tracking-tighter uppercase">
                                {item.name.split(" ")[0]}
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Content Grid */}
            <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col ${isFlipped ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between relative h-full gap-8 z-10 max-w-[1400px]`}>

                {/* Details Block - Boutique Styling */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center pointer-events-auto ${isFlipped ? "items-end text-right" : "items-start text-left"}`}>
                    <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: isFlipped ? 60 : -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isFlipped ? -60 : 60 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-xl"
                            >
                                <div className="overflow-hidden mb-6">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-xs tracking-[0.6em] uppercase text-primary font-black block"
                                    >
                                        — ACTIVE PROTOCOL
                                    </motion.span>
                                </div>

                                <div className="overflow-hidden mb-8">
                                    <motion.h3
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-white uppercase"
                                    >
                                        {item.name}
                                    </motion.h3>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="space-y-8"
                                >
                                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal">
                                        {item.description}
                                    </p>

                                    <div className={`flex items-center gap-10 ${isFlipped ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold mb-1">DESIGNATION</span>
                                            <span className="text-xl font-bold tracking-tight text-white uppercase italic">{item.price}</span>
                                        </div>

                                        <div className="h-10 w-[1px] bg-white/10" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Image Block - Performance Optimized Reveal */}
                <div className="relative w-full lg:w-[45%] h-[55vh] lg:h-[80vh] flex items-center justify-center z-0">
                    <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.div
                                key={item.id}
                                initial={{
                                    clipPath: isFlipped ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                                    scale: 1.1,
                                }}
                                animate={{
                                    clipPath: "inset(0 0 0 0)",
                                    scale: 1,
                                }}
                                exit={{
                                    clipPath: isFlipped ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                                    scale: 1.1,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="relative w-full h-full shadow-[0_80px_120px_-30px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border border-white/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <motion.img
                                    animate={{
                                        scale: [1, 1.15],
                                        x: [0, isFlipped ? -20 : 20],
                                        y: [0, 10]
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear"
                                    }}
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Technical Label */}
                                <div className={`absolute bottom-12 ${isFlipped ? "left-12" : "right-12"} z-20 flex flex-col items-start gap-1`}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] tracking-[0.4em] font-black text-primary uppercase">PROTOCOL ENABLED</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
                                        REF-SS26-{(Number(item.id) * 11).toString().padStart(4, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
