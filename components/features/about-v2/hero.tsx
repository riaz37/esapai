"use client";

import React from "react";
import { motion } from "motion/react";
import { BadgeChip } from "@/components/ui/badge-chip";
import { BookOpen } from "lucide-react";

export const AboutV2Hero: React.FC = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background visual engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,245,132,0.08)_0%,transparent_70%)] opacity-50" />
                <div className="absolute inset-0 hero-mesh-gradient opacity-10" />

                {/* Animated Light Portal */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] mix-blend-screen pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(19, 245, 132, 0.6) 0%, rgba(19, 245, 132, 0.1) 50%, transparent 80%)',
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10"
                >
                    <BadgeChip label="Legacy & Vision" icon={BookOpen} className="bg-primary/5 border-primary/20 text-primary" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-7xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[0.95] tracking-tighter text-white uppercase italic"
                >
                    Our <span className="text-primary italic drop-shadow-[0_0_30px_rgba(19,245,132,0.3)]">Legacy</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight"
                >
                    Building the foundation for enterprise intelligence. From humble beginnings to global infrastructure — this is our story.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="absolute bottom-16 flex flex-col items-center gap-6"
                >
                    <div className="relative h-24 w-[1px] overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10" />
                    </div>
                    <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-black opacity-60">
                        Scroll to explore
                    </span>
                </motion.div>
            </div>
        </section>
    );
};
