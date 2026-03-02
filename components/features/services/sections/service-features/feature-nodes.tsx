"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CentralNodeIcon } from "./flow-utils";
import { CentralNodeProps, FeatureNodeProps } from "./types";

// Custom Central Node Component
export function CentralNode({ data }: CentralNodeProps) {
    return (
        <Card className="min-w-[180px] md:min-w-[200px] p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
            <Handle
                type="source"
                position={Position.Top}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Left}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                    <CentralNodeIcon />
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-radial-white text-center">
                    {data.label}
                </CardTitle>
            </div>
        </Card>
    );
}

// Custom Feature Node Component
export function FeatureNode({ data }: FeatureNodeProps) {
    return (
        <Card className="min-w-[240px] sm:min-w-[260px] max-w-[300px] sm:max-w-[320px] p-5 sm:p-6 md:p-7 lg:p-8">
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <Handle
                type="source"
                position={Position.Left}
                style={{ background: "rgba(19, 245, 132, 0.8)" }}
            />
            <div className="pointer-events-none">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gradient-radial-white">
                    {data.title}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-light-gray-90 leading-relaxed">
                    {data.description}
                </CardDescription>
            </div>
        </Card>
    );
}
