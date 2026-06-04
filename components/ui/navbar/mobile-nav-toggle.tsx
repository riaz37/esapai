"use client";

import React from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { MobileNavToggleProps } from "./types";

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: MobileNavToggleProps) => {
    const t = useTranslations("UI");
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
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
