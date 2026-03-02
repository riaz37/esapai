"use client";

import React, { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { CinematicAssistant } from "./cinematic-assistant";
import { ProblemSceneCard } from "./problem-scene-card";
import { CinematicProblemItem } from "./types";
import { useCinematicFlow } from "@/lib/hooks/use-cinematic-flow";

export function CinematicDesktopFlow({ slug, problems }: { slug: string; problems: CinematicProblemItem[] }) {
    const locale = useLocale();
    const dir = locale === "ar" ? -1 : 1;

    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const problemSceneRefs = useRef<(HTMLDivElement | null)[]>([]);
    const problemTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const problemDescRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardsStageRef = useRef<HTMLDivElement>(null);
    const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const flipperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const solTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const solDescRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const wipeRef = useRef<HTMLDivElement>(null);
    const assistantRef = useRef<HTMLDivElement>(null);
    const [assistantState, setAssistantState] = useState<"problem" | "solution">("problem");

    const reducedMotion = prefersReducedMotion();

    useCinematicFlow({
        containerRef,
        bgRef,
        problemSceneRefs,
        problemTitleRefs,
        problemDescRefs,
        cardsStageRef,
        cardWrapperRefs,
        flipperRefs,
        solTitleRefs,
        solDescRefs,
        wipeRef,
        assistantRef,
        setAssistantState,
        dir,
        slug,
    });

    return (
        <Section
            ref={containerRef}
            withContainer={false}
            className="relative w-full h-screen overflow-hidden text-white perspective-[2000px]"
            padding="none"
        >
            <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100" aria-hidden />

            {/* Marco Assistant: Dynamic Holographic character */}
            <div
                ref={assistantRef}
                className="absolute z-[1] w-[42%] max-w-md aspect-square max-h-[40vh] flex items-center justify-center pointer-events-none overflow-visible opacity-0"
                style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}
                aria-hidden
            >
                <CinematicAssistant
                    state={assistantState}
                    className="w-full h-full"
                    reducedMotion={reducedMotion}
                />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8 pt-20 md:pt-24 pb-20 md:pb-24 pointer-events-none">
                <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center">
                    {problems.map((p, i) => (
                        <div
                            key={p.id}
                            ref={(el) => {
                                problemSceneRefs.current[i] = el;
                            }}
                            className="absolute inset-0 flex items-center justify-center opacity-0"
                            style={{
                                justifyContent: i === 1 ? "flex-end" : "flex-start",
                                paddingInlineStart: i === 1 ? 0 : "10%",
                                paddingInlineEnd: i === 1 ? "10%" : 0,
                            }}
                        >
                            <div className="w-full max-w-md">
                                <ProblemSceneCard
                                    problem={p}
                                    titleRef={(el) => {
                                        problemTitleRefs.current[i] = el as HTMLDivElement | null;
                                    }}
                                    descRef={(el) => {
                                        problemDescRefs.current[i] = el as HTMLDivElement | null;
                                    }}
                                    side={i === 1 ? "right" : "left"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Solution stage: three cards that flip (same Card component, both faces) */}
            <div
                ref={cardsStageRef}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 pointer-events-none px-4 pt-16 pb-20"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[1400px] mx-auto mt-6">
                    {problems.map((p, i) => {
                        const ProblemIcon = p.icon;
                        const SolIcon = p.solIcon;
                        return (
                            <div
                                key={p.id}
                                ref={(el) => {
                                    cardWrapperRefs.current[i] = el;
                                }}
                                className="w-full h-[280px] opacity-0 overflow-visible"
                                style={{ perspective: "1200px" }}
                            >
                                <div
                                    ref={(el) => {
                                        flipperRefs.current[i] = el;
                                    }}
                                    className="relative w-full h-full"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl overflow-hidden"
                                        style={{ transform: "rotateY(0deg)", backfaceVisibility: "hidden" }}
                                    >
                                        <Card
                                            spotlight={false}
                                            className="w-full h-full bg-transparent border-red-500/20 backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] flex flex-col justify-between"
                                        >
                                            <CardHeader className="pb-4 px-6 pt-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <ProblemIcon className="w-5 h-5 text-red-500 shrink-0" />
                                                    <span className="text-red-500 text-label-caps">
                                                        ERR_0{p.id}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-white text-lg md:text-xl font-bold tracking-tight">{p.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="px-6 pb-8">
                                                <CardDescription className="text-gray-400 text-sm md:text-base font-normal leading-relaxed">
                                                    {p.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div
                                        className="absolute inset-0 rounded-2xl overflow-hidden"
                                        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                                    >
                                        <Card className="w-full h-full bg-transparent border-primary/50 backdrop-blur-xl flex flex-col justify-between">
                                            <CardHeader className="pb-4 px-6 pt-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <SolIcon className="w-5 h-5 text-primary shrink-0" />
                                                    <span className="text-primary text-label-caps glow-primary">
                                                        {p.solImpact}
                                                    </span>
                                                </div>
                                                <div ref={(el) => { solTitleRefs.current[i] = el; }} className="opacity-0">
                                                    <CardTitle className="text-white text-xl md:text-2xl font-bold tracking-tight">
                                                        {p.solTitle}
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="px-6 pb-8">
                                                <div ref={(el) => { solDescRefs.current[i] = el; }} className="opacity-0">
                                                    <CardDescription className="text-white/60 text-sm md:text-base font-normal leading-relaxed">
                                                        {p.solDesc}
                                                    </CardDescription>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                ref={wipeRef}
                className="pointer-events-none fixed start-0 end-0 z-[100] h-screen bg-[#09090b]"
                style={{ top: "100vh", clipPath: "inset(0 0 0% 0)" }}
                aria-hidden
            />
        </Section>
    );
}
