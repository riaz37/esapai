import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type JourneyNodeData = {
    id: string;
    position: { x: number; y: number };
    data: {
        image?: string;
        title?: string;
        icon?: React.ReactElement;
    } & Record<string, unknown>;
};

export const JourneyNode = ({
    node,
    isMobile = false,
    isRTL = false
}: {
    node: JourneyNodeData,
    isMobile?: boolean,
    isRTL?: boolean
}) => {
    return (
        <div
            className={cn(
                "group/node",
                isMobile
                    ? "relative"
                    : cn("absolute -translate-y-1/2", isRTL ? "translate-x-1/2" : "-translate-x-1/2")
            )}
            style={isMobile ? {} : {
                insetInlineStart: node.position.x,
                top: node.position.y,
            }}
        >
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    "rounded-2xl overflow-hidden",
                    "border border-white/10 hover:border-primary/50 transition-all duration-500",
                    "bg-transparent backdrop-blur-3xl",
                    "min-w-full md:min-w-[150px] p-4 md:p-6",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
                    "group-hover/node:scale-105 group-hover/node:shadow-[0_0_50px_rgba(19,245,132,0.15)]"
                )}
            >
                <div className="absolute inset-0 bg-radial-at-t from-primary/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity duration-700" />

                <div
                    className="relative mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-[0_0_20px_rgba(19,245,132,0.1)] group-hover/node:shadow-[0_0_30px_rgba(19,245,132,0.2)] transition-all"
                    style={{ color: "var(--color-primary)" }}
                >
                    {node.data.image ? (
                        <Image
                            src={node.data.image}
                            alt={node.data.title || ""}
                            fill
                            sizes="64px"
                            className="object-cover opacity-80 group-hover/node:opacity-100 transition-opacity duration-500"
                        />
                    ) : (
                        <div className="scale-75 md:scale-100 italic">
                            {node.data.icon && React.cloneElement(node.data.icon as any, {
                                size: 24,
                                strokeWidth: 1.5
                            })}
                        </div>
                    )}
                    <div className="absolute top-0 start-0 w-2 h-2 border-t border-s border-primary/40" />
                    <div className="absolute bottom-0 end-0 w-2 h-2 border-b border-e border-primary/40" />
                </div>

                <h3 className="relative text-white/90 text-center leading-tight text-xs tracking-widest uppercase">
                    {node.data.title}
                </h3>
            </div>
        </div>
    );
};
