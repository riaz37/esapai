"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "motion/react";
import { MobileNavMenuProps } from "./types";

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose,
}: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-1 rounded-2xl px-3 py-4 border border-white/10",
                        className,
                    )}
                    style={{
                        background: "rgba(3, 13, 8, 0.98)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
                    }}
                >
                    {children}
                </m.div>
            )}
        </AnimatePresence>
    );
};
