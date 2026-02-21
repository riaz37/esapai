"use client";

import React from "react";
import { m, AnimatePresence } from "motion/react";
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
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Main Content Grid - Refined for mobile balance */}
            <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col ${isFlipped ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-center lg:justify-between relative h-full gap-4 lg:gap-8 z-10 max-w-[1400px] pt-20 sm:pt-32 lg:pt-40`}>

                {/* Details Block */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center pointer-events-auto ${isFlipped ? "items-end text-right" : "items-start text-left"}`}>
                    <m.div
                        initial={{ opacity: 0, x: isFlipped ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl"
                    >
                        <div className="overflow-hidden mb-3 lg:mb-6">
                            <m.h3
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="text-3xl md:text-5xl lg:text-6xl text-white"
                            >
                                {item.name}
                            </m.h3>
                        </div>

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-4 lg:space-y-8"
                        >
                            <p className="text-base md:text-xl text-white/60 leading-relaxed line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
                                {item.description}
                            </p>

                            <div className={`flex items-center gap-6 lg:gap-10 ${isFlipped ? "flex-row-reverse" : "flex-row"}`}>
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-white/40 mb-1">Designation</span>
                                    <span className="text-base lg:text-lg text-white">{item.price}</span>
                                </div>

                                <div className="h-8 lg:h-10 w-[1px] bg-white/10" />
                            </div>
                        </m.div>
                    </m.div>
                </div>

                {/* Image Block - Refined height and framing to fix zoom and cropping */}
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none lg:w-[45%] aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[80vh] flex items-center justify-center z-0">
                    <m.div
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
                        className="relative w-full h-full shadow-2xl rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <m.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                        />
                    </m.div>
                </div>
            </div>
        </div>
    );
};
