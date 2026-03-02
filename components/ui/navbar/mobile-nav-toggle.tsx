"use client";

import React from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { MobileNavToggleProps } from "./types";

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: MobileNavToggleProps) => {
    return isOpen ? (
        <IconX className="text-white cursor-pointer" onClick={onClick} />
    ) : (
        <IconMenu2 className="text-white cursor-pointer" onClick={onClick} />
    );
};
