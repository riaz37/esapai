"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { NavbarLogoProps } from "./types";

export const NavbarLogo = ({ visible: _visible }: NavbarLogoProps) => {
    return (
        <Link
            href="/"
            className="relative z-20 flex shrink-0 items-center space-x-2 px-2 py-1 me-6 text-sm font-normal"
        >
            <div className="flex shrink-0 items-center gap-2">
                <Image
                    src="/logo/mainlogo.webp"
                    alt="Main Logo"
                    width={40}
                    height={40}
                    priority
                    className="h-8 w-auto shrink-0"
                />
                <Image
                    src="/logo/esaplogo.svg"
                    alt="ESAP Logo"
                    width={130}
                    height={42}
                    priority
                    className="h-7 w-auto shrink-0"
                />
            </div>
        </Link>
    );
};
