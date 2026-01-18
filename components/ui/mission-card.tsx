"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface MissionCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    image?: string;
    className?: string;
}

export function MissionCard({
    title,
    description,
    icon: Icon,
    image,
    className,
}: MissionCardProps) {
    return (
        <Card
            className={cn(
                "relative overflow-hidden group py-0 gap-0",
                className
            )}
        >





            {/* Glass Border Overlay with Strong Top Highlight */}

            {/* Green Grid Pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(19, 245, 132, 0.25) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(19, 245, 132, 0.25) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                }}
            />




            <CardContent className="flex flex-col items-center text-left p-6 pb-8 h-full relative z-10">

                {/* Image Area */}
                {image && (
                    <div className="w-full relative aspect-square mb-6 flex items-center justify-center">
                        <Image
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            className="object-contain w-3/4 h-3/4 drop-shadow-2xl"
                        />
                    </div>
                )}

                {/* Content Area */}
                <div className="w-full mt-auto">
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        {description}
                    </p>
                </div>

            </CardContent>
        </Card>
    );
}
