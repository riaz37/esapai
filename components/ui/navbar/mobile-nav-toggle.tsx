"use client";

import React from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { MobileNavToggleProps } from "./types";

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: MobileNavToggleProps) => {
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="h-11 w-11 flex items-center justify-center text-white"
        >
            {isOpen ? (
                <IconX className="text-white" />
            ) : (
                <IconMenu2 className="text-white" />
            )}
        </button>
    );
};
