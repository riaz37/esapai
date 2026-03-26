"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { NavBodyProps } from "./types";

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    return (
        <m.div
            animate={{
                backdropFilter: visible ? "blur(8px)" : "blur(0px)",
                backgroundColor: visible ? "rgba(250, 250, 250, 0.02)" : "rgba(250, 250, 250, 0)",
                borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "60%" : "100%",
                paddingLeft: visible ? "12px" : "0px",
                paddingRight: visible ? "12px" : "0px",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 40,
                mass: 1,
            }}
            style={{
                minWidth: "auto",
            }}
            className={cn(
                "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full bg-transparent border border-transparent py-2 lg:flex max-w-[1400px]",
                className,
            )}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                if (typeof child.type === 'string') return child;
                return React.cloneElement(
                    child as React.ReactElement<{ visible?: boolean }>,
                    { visible },
                );
            })}
        </m.div>
    );
};
