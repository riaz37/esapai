"use client";

import React, { useRef, useMemo } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { useProductContent } from "@/lib/hooks/use-product-content";
import { getProductCinematicProblems } from "@/config/product-cinematic-problems";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";
import type { CinematicProblemItem } from "@/config/product-cinematic-problems";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const MARCO_FRAMES = {
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

interface CinematicAssistantProps {
    state: "problem" | "solution";
    className?: string;
    reducedMotion?: boolean;
}

function CinematicAssistant({ state, className, reducedMotion }: CinematicAssistantProps) {
    const [currentFrame, setCurrentFrame] = React.useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const frames = MARCO_FRAMES[state];
    const [jitter] = React.useState(() => 150 + Math.random() * 100);

    // Frame cycling
    React.useEffect(() => {
        if (reducedMotion) return;
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % frames.length);
        }, jitter); // Use stable jitter for consistency
        return () => clearInterval(interval);
    }, [frames.length, reducedMotion, jitter]);

    // Idle bobbing
    useGSAP(() => {
        if (reducedMotion) return;
        gsap.to(containerRef.current, {
            y: "-=15",
            rotation: 1,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }, { scope: containerRef, dependencies: [reducedMotion] });

    return (
        <div ref={containerRef} className={`relative select-none ${className}`}>
            {/* Holographic Glow */}
            <div
                className={`absolute inset-0 scale-125 blur-3xl opacity-20 transition-colors duration-1000 ${state === "problem" ? "bg-red-500" : "bg-emerald-500"
                    }`}
            />

            {/* Scanlines Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full opacity-30">
                <div
                    className="absolute inset-0 w-full h-[200%]"
                    style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 3px, transparent 4px)",
                        animation: reducedMotion ? "none" : "scanline 10s linear infinite"
                    }}
                />
            </div>

            {/* Main Character Image */}
            <div className="relative z-10 w-full h-full filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Image
                    src={frames[currentFrame % frames.length]}
                    alt="Marco AI Assistant"
                    fill
                    sizes="(max-width: 1060px) 42vw, 448px"
                    unoptimized
                    className="object-contain transition-opacity duration-150"
                    key={`${state}-${currentFrame}`}
                />
            </div>

            {/* Sub-components for futuristic look */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-white/5 blur-xl rounded-full" />

            <style jsx>{`
                @keyframes scanline {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
}

interface ProductCinematicFlowProps {
    slug: string;
    initialProduct: Product | null;
}

/** Single problem card for one-by-one scenes (with refs for title/description reveal). */
function ProblemSceneCard({
    problem,
    titleRef,
    descRef,
    side,
}: {
    problem: CinematicProblemItem;
    titleRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
    descRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
    side: "left" | "right";
}) {
    const Icon = problem.icon;
    return (
        <Card
            spotlight={false}
            className={`w-full max-w-lg bg-zinc-900/90 border-red-500/20 backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] min-h-[220px] flex flex-col justify-between ${side === "left" ? "mr-auto" : "ml-auto"
                }`}
        >
            <CardHeader className="pb-4 px-6 pt-6">
                <div className="flex justify-between items-center mb-2">
                    <Icon className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-red-500 font-mono text-label-caps">ERR_0{problem.id}</span>
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

export function ProductCinematicFlow({ slug, initialProduct }: ProductCinematicFlowProps) {
    const { product } = useProductContent(slug, { initialProduct });
    const problems = useMemo(() => getProductCinematicProblems(slug), [slug]);

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
    const [assistantState, setAssistantState] = React.useState<"problem" | "solution">("problem");


    const reducedMotion = prefersReducedMotion();

    useGSAP(() => {
        if (!containerRef.current) return;
        const reduced = prefersReducedMotion();
        const flippers = flipperRefs.current.filter(Boolean);

        if (reduced) {
            gsap.set(bgRef.current, { filter: "none" });
            problemSceneRefs.current.forEach((s, i) => {
                if (i === 0) {
                    if (s) gsap.set(s, { opacity: 1, x: 0 });
                    if (problemTitleRefs.current[i]) gsap.set(problemTitleRefs.current[i], { opacity: 1, y: 0 });
                    if (problemDescRefs.current[i]) gsap.set(problemDescRefs.current[i], { opacity: 1, y: 0 });
                } else if (s) gsap.set(s, { opacity: 0 });
            });
            gsap.set(cardsStageRef.current, { opacity: 1 });
            cardWrapperRefs.current.forEach((w) => w && gsap.set(w, { opacity: 1 }));
            flippers.forEach((f) => f && gsap.set(f, { rotationY: 180 }));
            solTitleRefs.current.forEach((r) => r && gsap.set(r, { opacity: 1, y: 0 }));
            solDescRefs.current.forEach((r) => r && gsap.set(r, { opacity: 1, y: 0 }));
            if (wipeRef.current) gsap.set(wipeRef.current, { clipPath: "inset(0 0 100% 0)" });
            if (assistantRef.current) gsap.set(assistantRef.current, { opacity: 0.6, left: "auto", right: "10%", yPercent: 0 });
            setAssistantState("solution");
            return;
        }

        // Initial state
        gsap.set(assistantRef.current, { opacity: 0, top: "45%", left: "50%", xPercent: -50, yPercent: -150, scale: 1 });
        problemSceneRefs.current.forEach((s, i) => {
            if (s) gsap.set(s, { opacity: 0, x: i === 1 ? 80 : -80 });
            if (problemTitleRefs.current[i]) gsap.set(problemTitleRefs.current[i], { opacity: 0, y: 8 });
            if (problemDescRefs.current[i]) gsap.set(problemDescRefs.current[i], { opacity: 0, y: 8 });
        });
        gsap.set(cardsStageRef.current, { opacity: 0 });
        cardWrapperRefs.current.forEach((w) => w && gsap.set(w, { opacity: 0 }));
        solTitleRefs.current.forEach((r) => r && gsap.set(r, { opacity: 0, y: 8 }));
        solDescRefs.current.forEach((r) => r && gsap.set(r, { opacity: 0, y: 8 }));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // Reduced from 400% to tighten for mobile
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            },
        });

        // Direct Entry: Marco drops and first problem reveals
        tl.addLabel("problem1");
        tl.to(assistantRef.current, {
            opacity: 0.7,
            xPercent: -50,
            x: "20vw",
            yPercent: 0,
            duration: 0.8, // Reduced from 1.2
            ease: "back.out(1.2)",
            force3D: true
        }, "problem1");

        if (problemSceneRefs.current[0]) {
            tl.to(problemSceneRefs.current[0], {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power4.out"
            }, "problem1+=0.3");
        }
        if (problemTitleRefs.current[0]) {
            tl.to(problemTitleRefs.current[0], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power4.out"
            }, "problem1+=0.5");
        }
        if (problemDescRefs.current[0]) {
            tl.to(problemDescRefs.current[0], {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power4.out"
            }, "problem1+=0.7");
        }

        tl.to({}, { duration: 0.8 }); // Hold

        // Transition to Problem 2
        tl.addLabel("problem2");
        tl.to(assistantRef.current, { x: "-20vw", duration: 1.2, ease: "power3.inOut" }, "problem2");
        if (problemSceneRefs.current[0]) {
            tl.to(problemSceneRefs.current[0], { opacity: 0, x: -60, duration: 0.6, ease: "power3.in" }, "problem2");
        }
        if (problemSceneRefs.current[1]) {
            tl.to(problemSceneRefs.current[1], { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }, "problem2+=0.4");
        }
        if (problemTitleRefs.current[1]) {
            tl.to(problemTitleRefs.current[1], { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, "problem2+=0.6");
        }
        if (problemDescRefs.current[1]) {
            tl.to(problemDescRefs.current[1], { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, "problem2+=0.8");
        }

        tl.to({}, { duration: 0.8 }); // Hold

        // Transition to Problem 3
        tl.addLabel("problem3");
        tl.to(assistantRef.current, { x: "20vw", scale: 1.2, duration: 1.2, ease: "power3.inOut" }, "problem3");
        if (problemSceneRefs.current[1]) {
            tl.to(problemSceneRefs.current[1], { opacity: 0, x: 60, duration: 0.6, ease: "power3.in" }, "problem3");
        }
        if (problemSceneRefs.current[2]) {
            tl.to(problemSceneRefs.current[2], { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }, "problem3+=0.4");
        }
        if (problemTitleRefs.current[2]) {
            tl.to(problemTitleRefs.current[2], { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, "problem3+=0.6");
        }
        if (problemDescRefs.current[2]) {
            tl.to(problemDescRefs.current[2], { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, "problem3+=0.8");
        }

        tl.to({}, { duration: 1 }); // Hold

        // Direct transition to Solution
        tl.addLabel("solution");
        if (problemSceneRefs.current[2]) {
            tl.to(problemSceneRefs.current[2], { opacity: 0, x: -60, duration: 0.7, ease: "power3.in" }, "solution");
        }

        // Marco transforms and moves to final position (shifted down)
        tl.to(assistantRef.current, {
            x: 0,
            y: "20vh",
            scale: 0.55,
            duration: 1.2,
            ease: "power3.inOut",
            onStart: () => setAssistantState("solution"),
            onReverseComplete: () => setAssistantState("problem"),
            force3D: true
        }, "solution");

        // Reveal Solution Stage (shifted up)
        tl.fromTo(cardsStageRef.current,
            { y: "15vh", opacity: 0 },
            { y: "-18vh", opacity: 1, duration: 1.2, ease: "power3.inOut" },
            "solution"
        );

        cardWrapperRefs.current.forEach((el, i) => {
            if (el) tl.to(el, { opacity: 1, duration: 0.4 }, `solution+=${0.5 + i * 0.1}`);
        });

        tl.to(flippers, {
            rotationY: 180,
            duration: 1.4,
            ease: "power4.inOut",
            stagger: 0.15,
            force3D: true
        }, "solution+=0.8");

        // Staggered text reveal on solution side
        solTitleRefs.current.forEach((r, i) => {
            if (r) {
                tl.to(r, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power4.out"
                }, `solution+=${1.4 + i * 0.15}`);
            }
        });
        solDescRefs.current.forEach((r, i) => {
            if (r) {
                tl.to(r, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power4.out"
                }, `solution+=${1.6 + i * 0.15}`);
            }
        });

        tl.addLabel("exit", "+=1.5");
        tl.to(assistantRef.current, { opacity: 0, y: "20vh", duration: 0.8, ease: "power3.in" }, "exit");
        tl.to(cardsStageRef.current, { opacity: 0, y: "-20vh", duration: 1, ease: "power3.in" }, "exit");
        tl.to(bgRef.current, { opacity: 0, duration: 1.2 }, "exit");
        tl.fromTo(
            wipeRef.current,
            { clipPath: "inset(0 0 0% 0)" },
            { clipPath: "inset(0 0 100% 0)", duration: 1.5, ease: "power3.inOut" },
            "exit+=0.5"
        );
    }, { scope: containerRef, dependencies: [slug] });



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



            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8 pt-24 md:pt-32 pb-24 md:pb-32 pointer-events-none">
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
                                paddingLeft: i === 1 ? 0 : "10%",
                                paddingRight: i === 1 ? "10%" : 0,
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1400px] mx-auto mt-6">
                    {problems.map((p, i) => {
                        const ProblemIcon = p.icon;
                        const SolIcon = p.solIcon;
                        return (
                            <div
                                key={p.id}
                                ref={(el) => {
                                    cardWrapperRefs.current[i] = el;
                                }}
                                className="w-[300px] md:w-[340px] h-[280px] shrink-0 opacity-0 overflow-visible"
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
                                            className="w-full h-full bg-zinc-900/90 border-red-500/20 backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] flex flex-col justify-between"
                                        >
                                            <CardHeader className="pb-4 px-6 pt-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <ProblemIcon className="w-5 h-5 text-red-500 shrink-0" />
                                                    <span className="text-red-500 font-mono text-label-caps">
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
                                        <Card className="w-full h-full bg-black/90 border-primary/50 backdrop-blur-xl flex flex-col justify-between">
                                            <CardHeader className="pb-4 px-6 pt-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <SolIcon className="w-5 h-5 text-primary shrink-0" />
                                                    <span className="text-primary font-mono text-label-caps glow-primary">
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
                className="pointer-events-none fixed left-0 right-0 z-[100] h-screen bg-background"
                style={{ top: "100vh", clipPath: "inset(0 0 0% 0)" }}
                aria-hidden
            />
        </Section>
    );
}
