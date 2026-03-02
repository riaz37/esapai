"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProblemSceneCardProps } from "./types";

export function ProblemSceneCard({
    problem,
    titleRef,
    descRef,
    side,
}: ProblemSceneCardProps) {
    const Icon = problem.icon;
    return (
        <Card
            spotlight={false}
            className={`w-full max-w-lg border-red-500/20 backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] min-h-[220px] flex flex-col justify-between ${side === "left" ? "me-auto" : "ms-auto"
                }`}
        >
            <CardHeader className="pb-4 px-6 pt-6">
                <div className="flex justify-between items-center mb-2">
                    <Icon className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-red-500 text-label-caps">ERR_0{problem.id}</span>
                </div>
                <div ref={titleRef as React.RefObject<HTMLDivElement>} className="opacity-0">
                    <CardTitle className="text-white text-xl md:text-2xl font-bold tracking-tight leading-tight">
                        {problem.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-8">
                <div ref={descRef as React.RefObject<HTMLDivElement>} className="opacity-0">
                    <CardDescription className="text-white/60 text-sm md:text-base font-normal leading-relaxed">
                        {problem.description}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}
