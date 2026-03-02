"use client";

import React from "react";

export interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

export interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

export interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
}

export interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

export interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export interface MobileNavToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export interface NavbarLogoProps {
    visible?: boolean;
}

export interface NavbarButtonProps {
    href?: string;
    children: React.ReactNode;
    className?: string;
    variant?: "primary";
    size?: "default" | "sm" | "lg" | "icon";
    onClick?: () => void;
    [key: string]: any;
}
