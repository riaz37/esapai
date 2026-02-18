"use client";

import React from "react";
import Image from "next/image";
import { m } from "motion/react";
import { AboutNarrativeItem } from "@/lib/about-v2-data";

interface SidebarNavigatorProps {
    items: AboutNarrativeItem[];
    activeIndex: number;
    onItemClick: (index: number) => void;
}

export const SidebarNavigator: React.FC<SidebarNavigatorProps> = ({
    items,
    activeIndex,
    onItemClick,
}) => {
    return (
        <div className="flex flex-col gap-6 items-center">
            {items.map((item, idx) => (
                <m.button
                    key={item.id}
                    whileHover={{ x: 8, scale: 1.05 }}
                    onClick={() => onItemClick(idx)}
                    className={`relative group transition-all duration-700 ${activeIndex === idx ? "opacity-100 scale-110" : "opacity-30 grayscale hover:opacity-100 hover:grayscale-0"
                        }`}
                >
                    {/* Active Ring */}
                    {activeIndex === idx && (
                        <m.div
                            layoutId="active-ring"
                            className="absolute -inset-2 border-2 border-primary rounded-xl z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}

                    <div className="w-16 h-20 md:w-20 md:h-28 overflow-hidden rounded-xl shadow-2xl border border-white/5 bg-zinc-950 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 64px, 80px"
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        <span className="text-primary bg-black/80 px-2 py-1 rounded text-label-caps tracking-cinematic-widest">
                            {item.name}
                        </span>
                    </div>
                </m.button>
            ))}
        </div>
    );
};
