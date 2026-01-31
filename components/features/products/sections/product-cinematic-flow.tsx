"use client";

import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, XCircle, FileWarning, CheckCircle2, Zap, Sparkles, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { Button } from "@/components/ui/button";
import { useProductContent } from "@/lib/hooks/use-product-content";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductCinematicFlowProps {
    slug: string;
    initialProduct: any;
}

export function ProductCinematicFlow({ slug, initialProduct }: ProductCinematicFlowProps) {
    const { product } = useProductContent(slug, { initialProduct });
    const hydratedProduct = product ?? initialProduct;
    const content = hydratedProduct.content ?? {};

    // CONTENT DATA
    const heroSubtitle = content.hero?.subtitle ?? [
        "Where Innovation Meets Productivity Driven by agents Powered by automation",
        "Built for what's next",
    ];

    const problems = useMemo(() => [
        {
            id: 1,
            title: "The Ghost Variable",
            description: "One change in a spreadsheet ripples into 40 broken triggers.",
            icon: AlertCircle,
            spreadPos: { x: -300, y: -40, rotate: -6 },
            solTitle: "Unified Data Mind",
            solDesc: "All your data, connected and synchronized in real-time.",
            solIcon: Zap,
            solImpact: "+92% Velocity"
        },
        {
            id: 2,
            title: "The Integration Anchor",
            description: "Your stack doesn't talk; it screams in translation errors.",
            icon: FileWarning,
            spreadPos: { x: 20, y: 30, rotate: 2 },
            solTitle: "Autonomous Healing",
            solDesc: "Workflows that detect and fix themselves before you notice.",
            solIcon: Sparkles,
            solImpact: "Zero Downtime"
        },
        {
            id: 3,
            title: "The Human Buffer",
            description: "Valuable minds spent acting as copy-paste glue.",
            icon: XCircle,
            spreadPos: { x: 320, y: -20, rotate: 8 },
            solTitle: "Cognitive Orchestration",
            solDesc: "AI that understands intent, not just instructions.",
            solIcon: CheckCircle2,
            solImpact: "10x Scaling"
        }
    ], []);

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const whatIfRef = useRef<HTMLDivElement>(null);

    // Separate refs for "2.5D Swap" logic
    const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
    const problemCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const solutionCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const wrappers = wrappersRef.current.filter(Boolean);
        const pCards = problemCardsRef.current.filter(Boolean);
        const sCards = solutionCardsRef.current.filter(Boolean);

        // === MASTER TIMELINE ===
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2500%",  // Extended for pacing
                pin: true,
                scrub: 1.2,
                anticipatePin: 1
            }
        });

        tl.addLabel("start");

        // 1. DISSOLVE INTO ENTROPY (0% - 20%)
        // Hero fades out, Video darkens smoothly
        tl.to(heroRef.current, { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 2.5, ease: "power2.inOut" }, "start");
        tl.fromTo(videoRef.current,
            { filter: "grayscale(0%) brightness(1)" },
            {
                filter: "grayscale(100%) brightness(0.45)",
                duration: 4,
                ease: "power2.in"
            },
            "start+=2"
        );

        // 2. CHAOS ENTRY (Overlap with Hero Exit)
        tl.addLabel("chaos", 0.5); // Start card entry while hero is still fading

        // Stage becomes visible
        tl.to(sceneRef.current, { opacity: 1, duration: 1.5 }, "chaos");

        // Wrappers (containing both cards) float in from deep space
        wrappers.forEach((wrap, i) => {
            tl.fromTo(wrap,
                { z: -2500, opacity: 0, x: problems[i].spreadPos.x * 2.5, y: problems[i].spreadPos.y * 2.5, rotationZ: problems[i].spreadPos.rotate * 2 },
                { z: 0, opacity: 1, x: problems[i].spreadPos.x, y: problems[i].spreadPos.y, rotationZ: problems[i].spreadPos.rotate, duration: 4, ease: "power3.out" },
                `chaos+=${i * 0.3}`
            );
        });

        // 3. IDLING / DRIFT
        tl.addLabel("drift");
        tl.to(wrappers, {
            y: "+=40",
            rotationZ: "+=3",
            duration: 4,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        }, "drift");

        // 4. EPIPHANY
        tl.addLabel("epiphany");
        // Blur cards slightly
        tl.to(wrappers, { filter: "blur(4px) brightness(0.7)", scale: 0.9, duration: 2 }, "epiphany");
        tl.fromTo(whatIfRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2 }, "epiphany");
        tl.to(whatIfRef.current, { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 2 }, "epiphany+=2.5");

        // 5. THE FLIP
        tl.addLabel("flip");
        // Align Wrappers to Grid first (Order)
        tl.to(wrappers, {
            filter: "blur(0px) brightness(1)",
            scale: 1,
            x: (i) => (i - 1) * 350,
            y: 0,
            rotationZ: 0,
            duration: 3,
            ease: "power2.inOut"
        }, "flip");

        // THE "FAKE 3D" SWAP
        tl.to(pCards, {
            rotationY: 90,
            opacity: 0,
            duration: 1.5,
            ease: "power1.in",
            stagger: 0.1
        }, "flip+=1.5");

        tl.fromTo(sCards,
            { rotationY: -90, opacity: 0 },
            {
                rotationY: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power1.out",
                stagger: 0.1
            },
            "flip+=3"
        );

        // Synchronize Video Bloom with Flip
        // Glow effect - Applied to sCards for clipping
        tl.to(sCards, {
            boxShadow: "0 0 60px rgba(19,245,132,0.3)",
            duration: 2
        }, "flip+=4");

        // 6. EXIT (The Smooth Handoff)
        tl.addLabel("exit");
        tl.to(wrappers, {
            opacity: 0,
            y: -100,
            filter: "blur(10px)",
            duration: 2,
            ease: "power2.in"
        }, "exit");
        tl.to(videoRef.current, {
            opacity: 0,
            duration: 2
        }, "exit");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white perspective-[2000px]">
            {/* 0. FIXED VIDEO */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <video
                    ref={videoRef}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-100"
                >
                    <source src="/fasih-demo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
            </div>

            {/* 1. HERO CONTENT */}
            <div ref={heroRef} className="absolute inset-0 z-10 flex items-center justify-center pt-20">
                <div className="flex flex-col items-center text-center max-w-4xl px-4">
                    <BadgeChip label="Product Suite" icon={Sparkles} className="mb-8" />
                    <TypewriterTitle title={hydratedProduct.name} splitMode="lastWord" className="mb-8" align="center" />
                    <div className="space-y-4 mb-10 max-w-2xl">
                        {heroSubtitle.map((line: string, index: number) => (
                            <p key={index} className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium">
                                {line}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto px-10">
                            <span className="inline-flex items-center gap-2 group">Get Started Now</span>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 bg-white/5 border-white/10 hover:bg-white/10">
                            <span className="flex items-center gap-2">View Features</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. THE STAGE (Problems & Solutions) */}
            <div ref={sceneRef} className="absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none perspective-[1000px]">
                {problems.map((p, i) => (
                    <div
                        key={p.id}
                        ref={(el) => { wrappersRef.current[i] = el; }}
                        className="absolute w-[280px] h-[180px] rounded-[32px] overflow-hidden"
                    // No preserve-3d here. We want flat stacking context for children to avoid mixing.
                    >
                        {/* A. PROBLEM CARD */}
                        <div
                            ref={(el) => { problemCardsRef.current[i] = el; }}
                            className="absolute inset-0 w-full h-full z-20 rounded-[32px] overflow-hidden" // Higher Z initially
                        >
                            <Card className="w-full h-full bg-zinc-900/90 border-red-500/20 backdrop-blur-xl">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <p.icon className="w-4 h-4 text-red-500" />
                                        <span className="text-[9px] uppercase tracking-widest text-red-500 font-mono">ERR_0{p.id}</span>
                                    </div>
                                    <CardTitle className="text-white text-base">{p.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-zinc-400 text-xs">{p.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </div>

                        {/* B. SOLUTION CARD (Initial State: Invisible & Rotated -90) */}
                        <div
                            ref={(el) => { solutionCardsRef.current[i] = el; }}
                            className="absolute inset-0 w-full h-full z-10 opacity-0 rounded-[32px] overflow-hidden"
                            style={{ transform: "rotateY(-90deg)" }}
                        >
                            <Card className="w-full h-full bg-black/90 border-primary/50 backdrop-blur-xl shadow-[0_0_30px_rgba(19,245,132,0.1)]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <p.solIcon className="w-4 h-4 text-primary" />
                                        <span className="text-[9px] uppercase tracking-widest text-primary font-mono font-bold">{p.solImpact}</span>
                                    </div>
                                    <CardTitle className="text-white text-base">{p.solTitle}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-zinc-300 text-xs">{p.solDesc}</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. EPIPHANY TEXT */}
            <div ref={whatIfRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none px-4">
                <BadgeChip label="System Reimaged" icon={Sparkles} className="mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    Order from Chaos.
                </h2>
            </div>

        </div>
    );
}
