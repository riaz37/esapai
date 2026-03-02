"use client";

import { Link } from "@/i18n/routing";
import React from "react";

export function NavLinkItem({
    href,
    label,
    isActive,
    onClick,
    className = "",
    visible,
}: {
    href: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
    className?: string;
    visible?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`nav-link-group relative group whitespace-nowrap cursor-pointer ${visible ? "px-2 py-1.5" : "px-4 py-2"
                } text-base font-semibold transition-all duration-300 ${isActive ? "is-active text-[var(--color-primary)]" : "text-light-gray hover:text-[var(--color-primary)]"
                } ${className}`}
            onClick={onClick}
        >
            <span className="nav-glow" aria-hidden="true" />
            <span className="relative z-10">{label}</span>
        </Link>
    );
}
