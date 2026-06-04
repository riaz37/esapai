"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { MobileNavProps } from "./types";

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <m.div
            animate={{
                backdropFilter: visible ? "blur(8px)" : "blur(0px)",
                backgroundColor: visible ? "rgba(250, 250, 250, 0.02)" : "rgba(250, 250, 250, 0)",
                borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "90%" : "100%",
                paddingInlineEnd: visible ? "12px" : "0px",
                paddingInlineStart: visible ? "12px" : "0px",
                borderRadius: visible ? "12px" : "0px",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 40,
                mass: 1,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent border border-transparent px-0 py-2 lg:hidden",
                className,
            )}
        >
            {children}
        </m.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};
