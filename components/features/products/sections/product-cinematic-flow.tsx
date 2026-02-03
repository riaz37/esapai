"use client";

import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProductContent } from "@/lib/hooks/use-product-content";
import { getProductCinematicProblems, getProductCinematicNarrative } from "@/config/product-cinematic-problems";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/** Static MAR expression images for cinematic flow narrator (problem vs solution); alternated so each phase uses a different Marco. */
const ASSISTANT_PROBLEM = "/logo/marco/MAR (8).png";
const ASSISTANT_SOLUTION = "/logo/marco/MAR (5).png";

interface ProductCinematicFlowProps {
    slug: string;
    initialProduct: Product | null;
}

export function ProductCinematicFlow({ slug, initialProduct }: ProductCinematicFlowProps) {
    const { product } = useProductContent(slug, { initialProduct });

    // CONTENT DATA: product-specific problems and narrative from config
    const problems = useMemo(() => getProductCinematicProblems(slug), [slug]);
    const narrative = useMemo(() => getProductCinematicNarrative(slug), [slug]);

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const problemsIntroRef = useRef<HTMLParagraphElement>(null);
    const epiphanyPreRef = useRef<HTMLParagraphElement>(null);
    const solutionIntroRef = useRef<HTMLParagraphElement>(null);
    const cardsStageRef = useRef<HTMLDivElement>(null);
    const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const flipperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const whatIfRef = useRef<HTMLDivElement>(null);
    const solutionLabelRef = useRef<HTMLParagraphElement>(null);
    const wipeRef = useRef<HTMLDivElement>(null);
    const assistantRef = useRef<HTMLDivElement>(null);
    const assistantGlowRef = useRef<HTMLDivElement>(null);
    const assistantProblemRef = useRef<HTMLImageElement>(null);
    const assistantSolutionRef = useRef<HTMLImageElement>(null);

    const productName = product?.name ?? "Product";
    const solutionLabel = `How ${productName} fixes it`;

    useGSAP(() => {
        if (!containerRef.current) return;

        const reducedMotion = prefersReducedMotion();
        const wrappers = cardWrapperRefs.current.filter(Boolean);
        const flippers = flipperRefs.current.filter(Boolean);

        if (reducedMotion) {
            gsap.set(bgRef.current, { filter: "none" });
            if (introRef.current) {
                gsap.set(introRef.current, { opacity: 1 });
                introRef.current.querySelectorAll(".word").forEach((w) => gsap.set(w, { opacity: 1, y: 0 }));
            }
            if (problemsIntroRef.current) gsap.set(problemsIntroRef.current, { opacity: 1, y: 0 });
            if (epiphanyPreRef.current) gsap.set(epiphanyPreRef.current, { opacity: 1, y: 0 });
            if (solutionIntroRef.current) gsap.set(solutionIntroRef.current, { opacity: 1, y: 0 });
            gsap.set(cardsStageRef.current, { opacity: 1 });
            wrappers.forEach((w) => w && gsap.set(w, { opacity: 1, y: 0 }));
            flippers.forEach((f) => f && gsap.set(f, { rotationY: 180 }));
            gsap.set(whatIfRef.current, { opacity: 0 });
            if (solutionLabelRef.current) gsap.set(solutionLabelRef.current, { opacity: 1 });
            if (wipeRef.current) gsap.set(wipeRef.current, { clipPath: "inset(0 0 100% 0)" });
            if (assistantRef.current) gsap.set(assistantRef.current, { opacity: 0.6 });
            if (assistantGlowRef.current) gsap.set(assistantGlowRef.current, { opacity: 0.6, scale: 1 });
            if (assistantProblemRef.current) gsap.set(assistantProblemRef.current, { opacity: 0, filter: "brightness(1)" });
            if (assistantSolutionRef.current) gsap.set(assistantSolutionRef.current, { opacity: 1, filter: "brightness(1)" });
            return;
        }

        gsap.set(assistantRef.current, { opacity: 0, scale: 1 });
        gsap.set(assistantGlowRef.current, { opacity: 0, scale: 0.9 });
        gsap.set(assistantProblemRef.current, { opacity: 1, filter: "brightness(0.9)" });
        gsap.set(assistantSolutionRef.current, { opacity: 0, filter: "brightness(1)" });

        // === MASTER TIMELINE (Opening → Problems → Epiphany → Cards flip to Solution → Exit) ===
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1200%",
                pin: true,
                scrub: 1.5,
                anticipatePin: 1
            }
        });

        tl.addLabel("start");

        // Opening: intro line (word reveal), hold, fade out
        const introWords = introRef.current?.querySelectorAll(".word");
        if (introRef.current && introWords?.length) {
            tl.fromTo(introWords, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.8, ease: "power2.out" }, "start");
            tl.addLabel("openHold", "start+=1.2");
            tl.to(introRef.current, { opacity: 0, duration: 1, ease: "power2.in" }, "openHold+=0.4");
            tl.addLabel("cardsIntro", "openHold+=1.6");
        } else {
            tl.addLabel("cardsIntro", "start+=1.5");
        }

        // Problems intro + show all 3 problem cards (stagger in)
        if (problemsIntroRef.current) {
            tl.fromTo(problemsIntroRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "cardsIntro");
        }
        tl.set(cardsStageRef.current, { opacity: 1 }, "cardsIntro");
        tl.fromTo(wrappers, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.25 }, "cardsIntro");
        tl.fromTo(assistantRef.current, { opacity: 0, scale: 0.96 }, { opacity: 0.65, scale: 1, duration: 1, ease: "power2.out" }, "cardsIntro+=0.3");
        tl.fromTo(assistantGlowRef.current, { opacity: 0, scale: 0.85 }, { opacity: 0.5, scale: 1, duration: 1, ease: "power2.out" }, "cardsIntro+=0.3");
        tl.fromTo(assistantProblemRef.current, { filter: "brightness(0.85)" }, { filter: "brightness(1.05)", duration: 1.2, ease: "power2.out" }, "cardsIntro+=0.5");
        tl.to(assistantRef.current, { scale: 1.03, duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=1");
        tl.to(assistantGlowRef.current, { opacity: 0.7, scale: 1.08, duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=1");
        tl.to(assistantProblemRef.current, { filter: "brightness(1.12)", duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=1");
        tl.to(assistantRef.current, { scale: 1, duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=2.5");
        tl.to(assistantGlowRef.current, { opacity: 0.5, scale: 1, duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=2.5");
        tl.to(assistantProblemRef.current, { filter: "brightness(1)", duration: 1.5, ease: "sine.inOut" }, "cardsIntro+=2.5");
        tl.to({}, { duration: 0.8 });

        // Epiphany: problems intro out, pre-line, then headline
        tl.addLabel("epiphany");
        if (problemsIntroRef.current) {
            tl.to(problemsIntroRef.current, { opacity: 0, duration: 0.6 }, "epiphany");
        }
        if (epiphanyPreRef.current) {
            tl.fromTo(epiphanyPreRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "epiphany");
        }
        tl.fromTo(whatIfRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "epiphany+=0.5");
        tl.to(whatIfRef.current, { opacity: 0, scale: 1.05, duration: 1.2, ease: "power2.in" }, "epiphany+=2");
        if (epiphanyPreRef.current) {
            tl.to(epiphanyPreRef.current, { opacity: 0, duration: 0.5 }, "epiphany+=2.5");
        }

        // Solution: problem cards turn into solution cards (flip in place)
        tl.addLabel("solution");
        if (solutionIntroRef.current) {
            tl.fromTo(solutionIntroRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "solution");
        }
        tl.fromTo(solutionLabelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "solution");
        tl.to(assistantProblemRef.current, { opacity: 0, filter: "brightness(1)", duration: 0.4 }, "solution+=0.3");
        tl.fromTo(assistantSolutionRef.current, { opacity: 0, filter: "brightness(0.9)" }, { opacity: 1, filter: "brightness(1.08)", duration: 0.6, ease: "power2.out" }, "solution+=0.35");
        tl.to(assistantGlowRef.current, { opacity: 0.9, scale: 1.1, duration: 0.5, ease: "power2.out" }, "solution+=0.35");
        tl.to(assistantSolutionRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" }, "solution+=0.4");
        tl.to(assistantSolutionRef.current, { scale: 1, duration: 0.25, ease: "power2.inOut" }, "solution+=0.6");
        tl.to(assistantSolutionRef.current, { filter: "brightness(1.05)", duration: 0.8, ease: "sine.inOut" }, "solution+=0.8");
        tl.to(flippers, { rotationY: 180, duration: 1.4, ease: "power2.inOut", stagger: 0.2, force3D: true }, "solution+=0.4");
        // Exit: wipe to next section
        tl.addLabel("exit");
        if (solutionIntroRef.current) {
            tl.to(solutionIntroRef.current, { opacity: 0, duration: 0.5 }, "exit");
        }
        tl.to(assistantRef.current, { opacity: 0, scale: 0.98, duration: 0.8, ease: "power2.in" }, "exit");
        tl.to(assistantGlowRef.current, { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.in" }, "exit");
        tl.to(cardsStageRef.current, { opacity: 0, duration: 2, ease: "power2.in" }, "exit");
        tl.to(bgRef.current, { opacity: 0, duration: 2 }, "exit");
        tl.fromTo(wipeRef.current,
            { clipPath: "inset(0 0 0% 0)" },
            { clipPath: "inset(0 0 100% 0)", duration: 1.5, ease: "power2.inOut" },
            "exit+=1.5"
        );
    }, { scope: containerRef, dependencies: [slug, narrative] });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#09090b] text-white perspective-[2000px]">
            {/* 0. BACKGROUND — gradient only (no video); calmer focus on narrative */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100"
                aria-hidden
            >
               
            </div>

            {/* Assistant as background layer — positioned in lower half so cards (center) stay clear */}
            <div
                ref={assistantRef}
                className="absolute inset-0 z-[1] flex items-end justify-center pointer-events-none overflow-visible opacity-0"
                aria-hidden
            >
                <div className="relative w-[75%] max-w-xl aspect-square max-h-[45vh] mb-0 flex items-center justify-center">
                    {/* Soft glow behind Marco — primary tint for lighting */}
                    <div
                        ref={assistantGlowRef}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] min-w-[200px] min-h-[200px] rounded-full opacity-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(19,245,132,0.22) 0%, rgba(19,245,132,0.08) 40%, transparent 70%)",
                            filter: "blur(24px)",
                        }}
                        aria-hidden
                    />
                    <img
                        ref={assistantProblemRef}
                        src={ASSISTANT_PROBLEM}
                        alt=""
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                    />
                    <img
                        ref={assistantSolutionRef}
                        src={ASSISTANT_SOLUTION}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain opacity-0 drop-shadow-[0_0_40px_rgba(19,245,132,0.12)]"
                    />
                </div>
                {/* Gradient: lighter over assistant area so Marco stays visible */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, rgba(9,9,11,0.88) 0%, transparent 40%, transparent 50%, rgba(9,9,11,0.4) 100%)",
                    }}
                    aria-hidden
                />
            </div>

            {/* Opening narrative — hook line with word reveal */}
            {narrative.introLine && (
                <div
                    ref={introRef}
                    className="absolute inset-0 z-10 flex items-center justify-center px-4 pointer-events-none"
                    aria-hidden
                >
                    <p className="text-center text-xl md:text-2xl lg:text-3xl font-medium text-white/95 max-w-2xl">
                        {narrative.introLine.split(" ").map((word, i) => (
                            <span key={i} className="word inline-block opacity-0 mr-[0.25em]">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>
            )}

            {/* Problems intro — short line before first problem card */}
            {narrative.problemsIntroLine && (
                <p
                    ref={problemsIntroRef}
                    className="absolute top-[22%] left-1/2 -translate-x-1/2 z-10 text-sm md:text-base uppercase tracking-[0.2em] text-primary/80 font-mono opacity-0 pointer-events-none px-4"
                    aria-hidden
                >
                    {narrative.problemsIntroLine}
                </p>
            )}

            {/* 1. CARDS STAGE — problem cards that turn into solution cards (flip in place) */}
            <div
                ref={cardsStageRef}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 pointer-events-none px-4 pt-20 pb-24"
            >
                {narrative.solutionIntroLine && (
                    <p
                        ref={solutionIntroRef}
                        className="absolute top-[18%] left-1/2 -translate-x-1/2 text-sm md:text-base text-gray-400 font-medium opacity-0 pointer-events-none"
                        aria-hidden
                    >
                        {narrative.solutionIntroLine}
                    </p>
                )}
                <p
                    ref={solutionLabelRef}
                    className="absolute top-[22%] left-1/2 -translate-x-1/2 text-xs md:text-sm uppercase tracking-[0.2em] text-primary/80 font-mono opacity-0 pointer-events-none"
                    aria-hidden
                >
                    {solutionLabel}
                </p>
                <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mt-4">
                    {problems.map((p, i) => {
                        const ProblemIcon = p.icon;
                        const SolIcon = p.solIcon;
                        return (
                            <div
                                key={p.id}
                                ref={(el) => { cardWrapperRefs.current[i] = el; }}
                                className="w-[260px] md:w-[280px] h-[200px] shrink-0 opacity-0 overflow-visible"
                                style={{ perspective: "1200px" }}
                            >
                                <div
                                    ref={(el) => { flipperRefs.current[i] = el; }}
                                    className="relative w-full h-full"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Problem face (front) */}
                                    <div
                                        className="absolute inset-0 rounded-2xl overflow-hidden"
                                        style={{ transform: "rotateY(0deg)", backfaceVisibility: "hidden" }}
                                    >
                                        <Card
                                            spotlight={false}
                                            className="w-full h-full bg-zinc-900/90 border-red-500/20 backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <ProblemIcon className="w-4 h-4 text-red-500 shrink-0" />
                                                    <span className="text-[9px] uppercase tracking-widest text-red-500 font-mono">ERR_0{p.id}</span>
                                                </div>
                                                <CardTitle className="text-white text-sm md:text-base line-clamp-2">{p.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="text-gray-400 text-xs md:text-sm line-clamp-3">{p.description}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    {/* Solution face (back) */}
                                    <div
                                        className="absolute inset-0 rounded-2xl overflow-hidden"
                                        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                                    >
                                        <Card className="w-full h-full bg-black/90 border-primary/50 backdrop-blur-xl">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <SolIcon className="w-4 h-4 text-primary shrink-0" />
                                                    <span className="text-[9px] uppercase tracking-widest text-primary font-mono font-bold">{p.solImpact}</span>
                                                </div>
                                                <CardTitle className="text-white text-sm md:text-base line-clamp-2">{p.solTitle}</CardTitle>
                                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1 line-clamp-1" aria-hidden>
                                                    In response to: {p.title}
                                                </p>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="text-gray-400 text-xs line-clamp-2">{p.solDesc}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Epiphany pre-line — appears just before epiphany headline (outside whatIfRef so it can animate first) */}
            {narrative.epiphanyPreLine && (
                <p
                    ref={epiphanyPreRef}
                    className="absolute top-[28%] left-1/2 -translate-x-1/2 z-20 text-xs md:text-sm uppercase tracking-[0.2em] text-primary/80 font-mono opacity-0 pointer-events-none px-4"
                    aria-hidden
                >
                    {narrative.epiphanyPreLine}
                </p>
            )}

            {/* 2. EPIPHANY — narrative turn (no headline/subline) */}
            <div ref={whatIfRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none px-4" aria-hidden />

            {/* 4. EXIT WIPE — sits below viewport, covers next section; at exit animates to reveal Solution Video from bottom up */}
            <div
                ref={wipeRef}
                className="pointer-events-none fixed left-0 right-0 z-[100] h-screen bg-[#09090b]"
                style={{ top: "100vh", clipPath: "inset(0 0 0% 0)" }}
                aria-hidden
            />
        </div>
    );
}
