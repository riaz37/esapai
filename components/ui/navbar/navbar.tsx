"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { m, useScroll, useMotionValueEvent } from "motion/react";
import { NavbarProps } from "./types";

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "center start"],
    });
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <m.div
            ref={ref}
            className={cn("fixed inset-x-0 top-2 z-40 w-full px-4 sm:px-6 md:px-8 lg:px-12", className)}
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
