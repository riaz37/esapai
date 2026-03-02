"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

export function NavDropdownTrigger({
    label,
    isActive,
    isOpen,
    onClick,
    visible,
}: {
    label: string;
    isActive: boolean;
    isOpen: boolean;
    onClick: () => void;
    visible?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer ${visible ? "px-2 py-1.5" : "px-4 py-2"
                } text-base font-semibold transition-all duration-300 ${isActive ? "is-active text-[var(--color-primary)]" : "text-light-gray hover:text-[var(--color-primary)]"
                }`}
            aria-expanded={isOpen}
        >
            <span className="nav-glow" aria-hidden="true" />
            <span className="relative z-10">{label}</span>
            <ChevronDown
                className={`size-4 transition-transform duration-200 relative z-10 ${isOpen ? "rotate-180" : ""
                    }`}
            />
        </button>
    );
}
