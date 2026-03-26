"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { NavbarLogoProps } from "./types";

export const NavbarLogo = ({ visible: _visible }: NavbarLogoProps) => {
    return (
        <Link
            href="/"
            className="relative z-20 me-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
        >
            <div className="flex items-center gap-2">
                <Image
                    src="/logo/mainlogo.png"
                    alt="Main Logo"
                    width={40}
                    height={40}
                    priority
                    className="h-8 w-auto shrink-0"
                />
                <Image
                    src="/logo/esaplogo.svg"
                    alt="ESAP Logo"
                    width={65}
                    height={21}
                    className="h-5 w-auto shrink-0"
                />
            </div>
        </Link>
    );
};
