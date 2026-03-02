"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Button, ButtonArrow } from "@/components/ui/button";
import { NavbarButtonProps } from "./types";

export const NavbarButton = ({
    href,
    children,
    className,
    variant = "primary",
    size = "default",
    onClick,
    ...props
}: NavbarButtonProps) => {
    if (href) {
        return (
            <Button variant={variant} size={size} className={className} asChild {...props}>
                <Link href={href} onClick={onClick} className="inline-flex items-center gap-2 group">
                    <span>{children}</span>
                    {variant === "primary" && <ButtonArrow size={size} />}
                </Link>
            </Button>
        );
    }

    return (
        <Button variant={variant} size={size} className={className} onClick={onClick} {...props}>
            {children}
        </Button>
    );
};
