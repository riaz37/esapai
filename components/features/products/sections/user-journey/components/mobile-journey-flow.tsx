import React from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { JourneyNode } from "./journey-node";

/**
 * MOBILE VIEW: Vertical Timeline/Card Layout
 */
export const MobileJourneyFlow = ({
    layers,
    stages,
    isRTL
}: {
    layers: any[],
    stages: string[],
    isRTL: boolean
}) => {
    return (
        <div className="flex flex-col gap-12 px-4">
            {layers.map((layer, index) => (
                <div key={layer.id} className="relative group">
                    {/* Stage Label */}
                    <div className="flex flex-col items-center justify-center gap-2 mb-5">
                        <span className="text-xs font-bold text-[#13F584] tracking-widest uppercase text-center">
                            {stages[index] ?? `Stage ${index + 1}`}
                        </span>
                        <div className="w-12 h-[1px] bg-[#13F584]/30" />
                    </div>

                    {/* Stage Card */}
                    <Card className="relative p-5 sm:p-6 transition-all duration-500 text-center">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 tracking-tight px-1 text-center mx-auto">
                            {layer.title}
                        </h4>

                        {/* Nodes Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {layer.nodes.map((node: any) => (
                                <JourneyNode key={node.id} node={node} isMobile={true} isRTL={isRTL} />
                            ))}
                        </div>

                        {/* Edge Visualizer for Mobile (Simplified) */}
                        <div className={cn(
                            "absolute -bottom-10 start-1/2 opacity-30 group-last:hidden",
                            isRTL ? "translate-x-1/2" : "-translate-x-1/2"
                        )}>
                            <ArrowDown size={32} className="text-[#13F584] animate-bounce" />
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};
