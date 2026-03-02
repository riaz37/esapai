"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReelHeaderProps {
    title: string;
    subtitle: string;
    badge: string;
    isMobile?: boolean;
    className?: string;
}

export function ReelHeader({ title, subtitle, badge, isMobile, className }: ReelHeaderProps) {
    if (isMobile) {
        return (
            <div className={cn("mobile-section-header block md:hidden absolute top-0 inset-x-0 w-full container mx-auto px-6 pt-24 pb-0 z-50 pointer-events-auto", className)}>
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    badge={badge}
                    badgeIcon={Layers}
                    align="center"
                    className="mb-0"
                    animate={false}
                />
            </div>
        );
    }

    return (
        <div className={cn("hidden md:block container mx-auto px-6 pt-20 pb-0 relative z-20", className)}>
            <SectionHeader
                title={title}
                subtitle={subtitle}
                badge={badge}
                badgeIcon={Layers}
                align="center"
                animate={true}
            />
        </div>
    );
}
