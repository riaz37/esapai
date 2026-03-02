"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export interface CounterProps {
    value: string; // The target value as a string (e.g., "500", "99.9", "10k")
    className?: string;
    duration?: number;
    delay?: number;
    ease?: string;
}

export function Counter({
    value,
    className,
    duration = 1.2,
    delay = 0,
    ease = "power2.out",
}: CounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!counterRef.current) return;

        const reducedMotion = prefersReducedMotion();
        const targetStr = value.replace(/[^0-9.]/g, "");
        const target = targetStr.includes(".") ? parseFloat(targetStr) : parseInt(targetStr);
        const suffix = value.replace(/[0-9.]/g, "");

        if (reducedMotion) {
            counterRef.current.textContent = value;
            return;
        }

        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration,
            delay,
            ease,
            onUpdate: () => {
                const val = targetStr.includes(".") ? obj.value.toFixed(1) : Math.floor(obj.value);
                if (counterRef.current) {
                    counterRef.current.textContent = val + suffix;
                }
            },
            scrollTrigger: {
                trigger: counterRef.current,
                start: "top 95%", // Trigger slightly before it comes into view
                toggleActions: "play none none none", // Only play once
            }
        });
    }, { scope: counterRef });

    return (
        <span
            ref={counterRef}
            className={cn("tabular-nums", className)}
        >
            0
        </span>
    );
}
