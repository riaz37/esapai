"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgeChipProps {
    label: string;
    icon?: LucideIcon;
    className?: string;
}

/**
 * Premium glassmorphism pill component used as section indicators.
 * Matches the reference design with dark background, subtle borders, and green accents.
 */
export function BadgeChip({ label, icon: Icon, className }: BadgeChipProps) {
    return (
        <div
            className={cn(
                "group inline-flex items-center gap-3 px-1.5 py-1.5 rounded-full",
                "border border-white/10 relative",
                "transition-all duration-300",
                "hover:border-[#13F584]/30",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #000000 0%, #121212 100%), radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 99.59%)",
                boxShadow: "0px 2px 12px 0px rgba(226, 226, 226, 0.15) inset, 0 8px 32px rgba(0,0,0,0.4)",
            }}
        >
            {Icon && (
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 shadow-inner group-hover:bg-[#13F584]/10 group-hover:border-[#13F584]/20 transition-colors duration-300">
                    <Icon className="w-4.5 h-4.5 text-[#13F584] drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]" strokeWidth={2} />
                </div>
            )}
            <span className="text-[#13F584] text-sm font-medium pr-4 tracking-tight">
                {label}
            </span>
        </div>
    );
}
