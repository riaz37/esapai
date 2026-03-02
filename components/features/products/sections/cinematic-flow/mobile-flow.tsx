"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CinematicAssistant } from "./cinematic-assistant";
import { CinematicProblemItem } from "./types";

export const ResponsiveMobileProblemFlow = ({ problems }: { problems: CinematicProblemItem[] }) => {
    return (
        <div className="flex flex-col gap-10 px-6 pt-0 pb-16 sm:pb-20 lg:pb-24">
            {problems.map((p) => {
                const Icon = p.icon;
                const SolIcon = p.solIcon;
                return (
                    <div key={p.id} className="flex flex-col gap-6">
                        {/* Problem Card */}
                        <Card className="bg-transparent border-red-500/20 backdrop-blur-xl text-center">
                            <CardHeader className="pb-4 items-center">
                                <div className="flex flex-col items-center justify-center gap-2 mb-3">
                                    <Icon className="w-6 h-6 text-red-500" />
                                    <span className="text-red-500 text-xs uppercase tracking-widest">Problem_0{p.id}</span>
                                </div>
                                <CardTitle className="text-white text-xl font-bold leading-tight">
                                    {p.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/60 text-sm leading-relaxed">
                                    {p.description}
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Transition Indicator */}
                        <div className="flex flex-col items-center gap-2 py-2">
                            <div className="w-[1px] h-8 bg-gradient-to-b from-red-500/50 to-[#13F584]/50" />
                            <div className="p-2 rounded-full border border-white/10 bg-white/5">
                                <CinematicAssistant state="solution" className="w-8 h-8 scale-110" />
                            </div>
                            <div className="w-[1px] h-8 bg-gradient-to-b from-[#13F584]/50 to-transparent" />
                        </div>

                        {/* Solution Card */}
                        <Card className="bg-transparent border-[#13F584]/30 backdrop-blur-2xl text-center">
                            <CardHeader className="pb-4 items-center">
                                <div className="flex flex-col items-center justify-center gap-2 mb-3">
                                    <SolIcon className="w-6 h-6 text-[#13F584]" />
                                    <span className="text-[#13F584] text-xs uppercase tracking-widest">{p.solImpact}</span>
                                </div>
                                <CardTitle className="text-white text-xl font-bold leading-tight">
                                    {p.solTitle}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70 text-sm leading-relaxed">
                                    {p.solDesc}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};
