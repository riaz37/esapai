"use client";

import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, XCircle, FileWarning, CheckCircle2, Zap, Sparkles, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeChip } from "@/components/ui/badge-chip";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProblemExplorationSectionProps {
    title?: string;
    subtitle?: string;
}

export function ProblemExplorationSection({
    title = "The Broken Workflow",
    subtitle = "Traditional workflows are built on fragile connections and manual effort.",
}: ProblemExplorationSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const problemStageRef = useRef<HTMLDivElement>(null);
    const whatIfRef = useRef<HTMLDivElement>(null);
    const solutionStageRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const solutionCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    const problems = useMemo(() => [
        {
            id: 1,
            title: "The Ghost Variable",
            description: "One change in a spreadsheet ripples into 40 broken triggers.",
            icon: AlertCircle,
            color: "text-zinc-500",
            accent: "text-red-500/50",
            spreadPos: { x: -280, y: 0, rotate: -6 }
        },
        {
            id: 2,
            title: "The Integration Anchor",
            description: "Your stack doesn't talk; it screams in translation errors.",
            icon: FileWarning,
            color: "text-zinc-500",
            accent: "text-orange-500/50",
            spreadPos: { x: 0, y: 0, rotate: 0 }
        },
        {
            id: 3,
            title: "The Human Buffer",
            description: "Valuable minds spent acting as copy-paste glue.",
            icon: XCircle,
            color: "text-zinc-500",
            accent: "text-zinc-500/50",
            spreadPos: { x: 280, y: 0, rotate: 6 }
        }
    ], []);

    const solutions = useMemo(() => [
        {
            id: 1,
            title: "Unified Data Mind",
            description: "All your data, connected and synchronized in real-time.",
            impact: "+92% Velocity",
            icon: Zap
        },
        {
            id: 2,
            title: "Autonomous Healing",
            description: "Workflows that detect and fix themselves before you notice.",
            impact: "Zero Downtime",
            icon: Sparkles
        },
        {
            id: 3,
            title: "Cognitive Orchestration",
            description: "AI that understands intent, not just instructions.",
            impact: "10x Scaling",
            icon: CheckCircle2
        }
    ], []);



    useGSAP(
        () => {
            if (!containerRef.current) return;

            const cards = cardsRef.current.filter(Boolean);
            const solCards = solutionCardsRef.current.filter(Boolean);
            if (cards.length === 0) return;

            // === INITIAL STATES ===
            gsap.set(storyRef.current, { opacity: 0, y: 20 });
            gsap.set(problemStageRef.current, { opacity: 0, zIndex: 20 });
            gsap.set(cards, {
                opacity: 0,
                y: 60,
                x: (i) => problems[i].spreadPos.x,
                scale: 0.9,
                rotation: (i) => problems[i].spreadPos.rotate,
                filter: "url(#glitch-filter)"
            });
            gsap.set(whatIfRef.current, { opacity: 0, scale: 0.8, y: 0, zIndex: 10 });
            gsap.set(solutionStageRef.current, { opacity: 0, zIndex: 5 });
            gsap.set(solCards, { opacity: 0, scale: 0.8, y: 40 });
            gsap.set(ctaRef.current, { opacity: 0, y: 20 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1200%",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1
                },
                defaults: { ease: "power3.inOut", force3D: true }
            });

            tl.to({}, { duration: 1 });

            // Cinematic text reveal
            tl.to(storyRef.current, { opacity: 0.8, y: 0, duration: 2 });
            tl.to({}, { duration: 2.5 });
            tl.to(storyRef.current, { opacity: 0, y: -30, filter: "blur(10px)", duration: 1.2 });

            // === ACT 1: FRICTION FIELD (PROBLEMS) ===
            tl.set(problemStageRef.current, { opacity: 1 });
            cards.forEach((card, i) => {
                tl.fromTo(card,
                    { opacity: 0, scale: 0.8, y: 100, filter: "url(#glitch-filter) brightness(2)" },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "url(#glitch-filter) brightness(1)",
                        duration: 1.5,
                        ease: "elastic.out(1, 0.75)"
                    },
                    i > 0 ? "-=1.2" : ">"
                );

                tl.to("#glitch-displacement", {
                    attr: { scale: 40 },
                    duration: 0.1,
                    repeat: 1,
                    yoyo: true
                }, "<");
                tl.to("#glitch-displacement", {
                    attr: { scale: 0 },
                    duration: 0.4
                }, ">");

                tl.to({}, { duration: 1.8 });
            });

            // Transition to Solution phase
            tl.to(cards, {
                opacity: 0,
                y: -40,
                stagger: 0.1,
                duration: 1
            }, "+=1");

            tl.set(whatIfRef.current, { zIndex: 110, opacity: 0, scale: 0.95 });
            tl.to(whatIfRef.current, { opacity: 1, scale: 1, duration: 1.5 });
            tl.to({}, { duration: 2 });
            tl.to(whatIfRef.current, { opacity: 0, scale: 1.05, filter: "blur(15px)", duration: 1 });

            // === ACT 4: UNIFIED MIND (BLOSSOM) ===
            tl.set(solutionStageRef.current, { zIndex: 120 });
            tl.to(solutionStageRef.current, { opacity: 1, duration: 1 });

            tl.fromTo(solCards,
                { opacity: 0, scale: 0, x: 0, y: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.25,
                    duration: 1.8,
                    ease: "expo.out"
                },
                "-=0.5"
            );

            tl.to(".glow-primary", {
                textShadow: "0 0 20px rgba(19,245,132,0.8)",
                scale: 1.1,
                duration: 0.5,
                stagger: 0.2,
                repeat: 1,
                yoyo: true
            }, "-=1.2");

            tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
            tl.to({}, { duration: 3 });
        },
        { scope: containerRef, dependencies: [problems, solutions] }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen bg-black overflow-hidden"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,245,132,0.03)_0%,transparent_70%)]" />
            </div>



            {/* MAIN STAGE */}
            <div className="relative z-10 w-full h-full pt-20 flex items-center justify-center px-4">
                <div className="relative w-full max-w-5xl" style={{ height: '450px' }}>



                    {/* INTRO STORYTELLING HOOK */}
                    <div
                        ref={storyRef}
                        className="absolute inset-0 flex items-center justify-center text-center pointer-events-none opacity-0"
                    >
                        <p className="text-2xl md:text-3xl font-light text-white/70 max-w-3xl leading-relaxed italic">
                            "Behind every great enterprise, friction hides in plain sight..."
                        </p>
                    </div>

                    {/* PROBLEM CARDS STAGE */}
                    <div
                        ref={problemStageRef}
                        className="absolute inset-0 flex items-center justify-center opacity-0"
                    >
                        <div className="relative flex items-center justify-center w-full">
                            {problems.map((problem, i) => {
                                const Icon = problem.icon;
                                return (
                                    <div
                                        key={`problem-${problem.id}`}
                                        ref={(el) => { cardsRef.current[i] = el; }}
                                        className="absolute"
                                    >
                                        <Card
                                            className="w-[240px] md:w-[260px] border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl"
                                            spotlight={false}
                                        >
                                            <CardHeader className="pb-3 px-5">
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
                                                        <Icon className="w-4 h-4 text-zinc-400" />
                                                    </div>
                                                    <span className={`text-[9px] font-mono uppercase tracking-widest ${problem.accent}`}>Entropy Pt.{problem.id}</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 px-5 pb-6">
                                                <CardTitle className="text-sm md:text-base font-medium text-zinc-100 mb-1.5">{problem.title}</CardTitle>
                                                <CardDescription className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                                    {problem.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>



                    {/* "WHAT IF" TRANSITION */}
                    <div
                        ref={whatIfRef}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0 pointer-events-none"
                    >
                        <BadgeChip label="Imagine" icon={Sparkles} className="mb-6" />
                        <h2 className="text-3xl md:text-5xl lg:text-3xl font-bold text-white mb-4 leading-tight max-w-3xl">
                            What if one product could{" "}
                            <span className="text-primary">transform all of this?</span>
                        </h2>
                        <p className="text-base md:text-lg text-white/50 max-w-md">
                            Watch problems become solutions.
                        </p>
                    </div>

                    {/* SOLUTION CARDS STAGE */}
                    <div
                        ref={solutionStageRef}
                        className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
                    >
                        {/* THE BLOSSOM SUNBURST */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                            <div className="absolute w-[800px] h-[1px] bg-primary/20 rotate-45" />
                            <div className="absolute w-[800px] h-[1px] bg-primary/20 -rotate-45" />
                        </div>

                        <div className="relative z-10 text-center mb-8">
                            <BadgeChip label="Transformed" icon={CheckCircle2} className="mb-3" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                Problems → <span className="text-primary">Solutions</span>
                            </h2>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                            {solutions.map((solution, i) => {
                                const Icon = solution.icon;
                                return (
                                    <div
                                        key={`solution-${solution.id}`}
                                        ref={(el) => { solutionCardsRef.current[i] = el; }}
                                        className="opacity-0"
                                    >
                                        <Card
                                            className="h-full border-primary/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_30px_-15px_rgba(19,245,132,0.3)] hover:shadow-[0_0_45px_-5px_rgba(19,245,132,0.4)] transition-all duration-700"
                                            spotlight={true}
                                        >
                                            <CardHeader className="pb-3 px-5">
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                                        <Icon className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-bold glow-primary">{solution.impact}</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 px-5 pb-6">
                                                <CardTitle className="text-sm md:text-base text-white mb-1">{solution.title}</CardTitle>
                                                <CardDescription className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                                                    {solution.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex flex-col items-center mt-10 opacity-0 relative z-10">
                            <p className="text-white/30 text-xs md:text-sm mb-2">Continue scrolling</p>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-primary/5 text-primary">
                                <ArrowDown className="w-5 h-5 animate-bounce" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* HIDDEN SVG FILTERS */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
                <defs>
                    <filter id="glitch-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
                        <feDisplacementMap id="glitch-displacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </section>
    );
}
