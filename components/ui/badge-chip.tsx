"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgeChipProps {
    label: string;
    icon?: LucideIcon;
    className?: string;
    variant?: "primary" | "red";
}

/**
 * Premium glassmorphism pill component used as section indicators.
 * Matches the reference design with dark background, subtle borders, and green accents.
 */
export function BadgeChip({ label, icon: Icon, className, variant = "primary" }: BadgeChipProps) {
    const isRed = variant === "red";

    return (
        <div
            className={cn(
                "group inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "border relative transition-all duration-300",
                isRed ? "border-red-500/20 hover:border-red-500/40" : "border-white/10 hover:border-primary/30",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #000000 0%, #121212 100%), radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 99.59%)",
                boxShadow: isRed
                    ? "0px 2px 12px 0px rgba(239, 68, 68, 0.1) inset, 0 8px 32px rgba(0,0,0,0.4)"
                    : "0px 2px 12px 0px rgba(226, 226, 226, 0.15) inset, 0 8px 32px rgba(0,0,0,0.4)",
            }}
        >
            {Icon && (
                <div className="flex items-center justify-center shrink-0">
                    <Icon
                        className={cn(
                            "w-4 h-4 transition-colors",
                            isRed
                                ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                                : "text-primary drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]"
                        )}
                        strokeWidth={2.5}
                    />
                </div>
            )}
            <span className={cn(
                "text-label-caps transition-colors",
                isRed ? "text-red-500" : "text-primary"
            )}>
                {label}
            </span>
        </div>
    );
}
