"use client";

import type { CinematicProblemConfig } from "@/config/product-cinematic-problems";

export interface CinematicProblemText {
    title: string;
    description: string;
    solTitle: string;
    solDesc: string;
    solImpact: string;
}

export type CinematicProblemItem = CinematicProblemConfig & CinematicProblemText;

export const MARCO_FRAMES = {
    problem: [
        "/logo/marco/Angry-01.svg",
        "/logo/marco/Angry-02.svg"
    ],
    solution: [
        "/logo/marco/Smill face-01.svg",
        "/logo/marco/Smill face-02.svg",
        "/logo/marco/Smill face03.svg"
    ]
};

export interface CinematicAssistantProps {
    state: "problem" | "solution";
    className?: string;
    reducedMotion?: boolean;
}

export interface ProblemSceneCardProps {
    problem: CinematicProblemItem;
    titleRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
    descRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
    side: "left" | "right";
}
