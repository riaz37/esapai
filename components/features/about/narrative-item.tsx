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
    isFlipped,
}) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none bg-black">
            {/* Main Content Grid - Added pt-20 to clear fixed navbar */}
            <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col ${isFlipped ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between relative h-full gap-8 z-10 max-w-[1400px] pt-20`}>

                {/* Details Block */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center pointer-events-auto ${isFlipped ? "items-end text-right" : "items-start text-left"}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isFlipped ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <div className="overflow-hidden mb-6">
                            <motion.h3
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                            >
                                {item.name}
                            </motion.h3>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-8"
                        >
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-normal">
                                {item.description}
                            </p>

                            <div className={`flex items-center gap-10 ${isFlipped ? "flex-row-reverse" : "flex-row"}`}>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-white/40 mb-1">Designation</span>
                                    <span className="text-lg font-bold text-white">{item.price}</span>
                                </div>

                                <div className="h-10 w-[1px] bg-white/10" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Image Block */}
                <div className="relative w-full lg:w-[45%] h-[60vh] lg:h-[80vh] flex items-center justify-center z-0">
                    <motion.div
                        initial={{
                            clipPath: isFlipped ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                            scale: 1.05,
                        }}
                        animate={{
                            clipPath: "inset(0 0 0 0)",
                            scale: 1,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="relative w-full h-full shadow-2xl rounded-3xl overflow-hidden border border-white/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
