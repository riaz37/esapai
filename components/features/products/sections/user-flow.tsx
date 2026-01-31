"use client";

import React, { useRef } from 'react';
import {
    Bot,
    Cpu,
    Layers,
    ShoppingBasket,
    Workflow,
    Plus,
    RefreshCw,
    Cloud
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface NodeProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    x: string;
    y: string;
    items?: string[];
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

// Optimized Node Component: Pure CSS/HTML, no heavy motion libs or blurs during scroll
const Node = ({ title, icon, x, y, items, subtitle, size = 'md', active }: NodeProps) => {
    const isLarge = size === 'lg';
    const isSmall = size === 'sm';

    return (
        <div
            className="absolute z-10 flex flex-col items-center group will-change-transform"
            style={{
                left: x,
                top: y,
                transform: 'translate3d(-50%, -50%, 0)' // Enforce GPU acceleration
            }}
        >
            <div
                className={`
                  relative flex flex-col items-center justify-center 
                  bg-[#0A0A0A]
                  border border-white/10 rounded-2xl
                  ${isLarge ? 'p-8 min-w-[180px]' : isSmall ? 'p-3 min-w-[100px]' : 'p-6 min-w-[140px]'}
                  transition-all duration-300
                  group-hover:border-[#13F584]/40
                  ${active ? 'border-[#13F584]/80 shadow-[0_0_50px_-12px_rgba(19,245,132,0.3)]' : ''}
                `}
            >
                {/* Icon */}
                <div className={`
                    mb-3 text-[#13F584] transition-transform duration-300
                    ${isLarge ? 'scale-125' : isSmall ? 'scale-90' : ''} 
                    ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(19,245,132,0.5)]' : ''}
                `}>
                    {icon}
                </div>

                {/* Title */}
                <h3 className={`font-bold tracking-wider text-center ${isLarge ? 'text-lg' : 'text-sm'} uppercase text-white/90`}>
                    {title}
                </h3>

                {subtitle && (
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-tighter">{subtitle}</p>
                )}

                {/* List Items */}
                {items && (
                    <div className="mt-4 w-full flex flex-col gap-1">
                        {items.map((item, i) => (
                            <div key={i} className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded-md text-white/60 text-center uppercase tracking-tight hover:bg-white/10 transition-colors">
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Connection Point Dot */}
            {!isSmall && (
                <div className={`
                    absolute -bottom-3 left-1/2 -translate-x-1/2 
                    w-6 h-6 flex items-center justify-center
                    bg-[#0A0A0A] border rounded-full 
                    transition-colors duration-300
                    ${active ? 'border-[#13F584] scale-110' : 'border-white/10 group-hover:border-[#13F584]/50'}
                `}>
                    <Plus className={`w-3 h-3 ${active ? 'text-[#13F584]' : 'text-[#13F584]/50'}`} />
                </div>
            )}
        </div>
    );
};

export const AivmBlockchainFlow = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const travelerRef = useRef<SVGCircleElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !svgRef.current || !travelerRef.current) return;

        const mainPaths = svgRef.current.querySelectorAll('.pulse-path');
        const path1 = mainPaths[0] as SVGPathElement;
        const path2 = mainPaths[1] as SVGPathElement;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // Reduced from 500% to make it feel less "static" / faster paced
                pin: true,
                scrub: 0.5, // Smoother scrub
            },
            defaults: {
                ease: "none",
                force3D: true
            }
        });

        // --- Initial Setup ---
        // Dim everything except Hub initially
        gsap.set(".journey-card", { opacity: 0.15, scale: 0.95, filter: "grayscale(100%)" });
        gsap.set("#hub", { opacity: 1, scale: 1, filter: "grayscale(0%)" });
        gsap.set(travelerRef.current, { opacity: 0, scale: 0 });


        // --- ACT 1: INGESTION (Validators -> Hub) ---
        tl.addLabel("act1")
            .to(stageRef.current, {
                x: 250,
                y: 100,
                scale: 1.15,
                duration: 1.5,
                ease: "power1.inOut"
            }, "act1")
            .to("#validators", {
                opacity: 1,
                scale: 1.05,
                filter: "grayscale(0%)",
                duration: 1
            }, "act1+=0.2")
            .to(travelerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5
            }, "act1+=0.5");


        // --- ACT 2: PROCESSING (Hub Activity) ---
        // Move Traveler along first path (Validators -> Hub)
        tl.addLabel("act2")
            .to(travelerRef.current, {
                motionPath: {
                    path: path1,
                    align: path1,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false
                },
                duration: 2.5
            }, "act2")
            // Camera follows traveler to Hub
            .to(stageRef.current, {
                x: 0,
                y: 0,
                scale: 1.25,
                duration: 2.5,
                ease: "power1.inOut"
            }, "act2")
            // Hub "Pulses" when traveler hits it
            .to("#hub", {
                scale: 1.1,
                boxShadow: "0 0 60px rgba(19, 245, 132, 0.2)",
                duration: 0.4,
                yoyo: true,
                repeat: 1
            }, ">-0.5");


        // --- ACT 3: DISTRIBUTION (Hub -> Marketplace) ---
        // Traveler takes second path (Hub -> Marketplace)
        tl.addLabel("act3")
            .to(travelerRef.current, {
                motionPath: {
                    path: path2,
                    align: path2,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false
                },
                duration: 3
            }, "act3")
            // Camera Pans to Marketplace
            .to(stageRef.current, {
                x: -300,
                y: 180,
                scale: 1.3,
                duration: 2.5,
                ease: "power1.inOut"
            }, "act3")
            // Activate Marketplace
            .to("#marketplace", {
                opacity: 1,
                scale: 1.05,
                filter: "grayscale(0%)",
                duration: 1
            }, ">-1");


        // --- ACT 4: EXECUTION (Zoom out to show ecosystem) ---
        tl.addLabel("act4")
            .to(stageRef.current, {
                x: 100,
                y: -150,
                scale: 1.1,
                duration: 2,
                ease: "power2.inOut"
            }, "act4")
            .to(["#sdk", "#agents"], {
                opacity: 1,
                scale: 1,
                filter: "grayscale(0%)",
                stagger: 0.2,
                duration: 1
            }, "act4+=0.5");


        // --- FINAL OUTRO: Return to "Full Map" View ---
        tl.to(stageRef.current, {
            x: 0,
            y: 0,
            scale: 0.9,
            duration: 2,
            ease: "power2.out"
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center p-0"
        >
            {/* Context Header - Fades out during deep zoom */}
            <div className="absolute top-12 left-8 md:top-16 md:left-16 z-20 pointer-events-none mix-blend-difference">
                <h2 className="text-3xl md:text-5xl font-bold text-white/90 tracking-tighter uppercase">
                    AIVM Ecosystem
                </h2>
                <div className="flex items-center gap-2 mt-4 text-[#13F584] font-mono text-xs tracking-[0.3em] uppercase">
                    <span>Live Flow</span>
                    <div className="w-12 h-[1px] bg-[#13F584]" />
                </div>
            </div>

            {/* Stage Container */}
            <div
                ref={stageRef}
                className="relative w-[1200px] h-[800px] flex-shrink-0 will-change-transform"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
                {/* SVG Layer */}
                <svg
                    ref={svgRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 1200 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Simplified Glow - No redundant heavy blurs */}
                        <filter id="simple-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <radialGradient id="traveler-gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="50%" stopColor="#13F584" />
                            <stop offset="100%" stopColor="rgba(19, 245, 132, 0)" />
                        </radialGradient>
                    </defs>

                    {/* Passive connections (faint grid) */}
                    <g className="opacity-10" stroke="#FFFFFF" strokeWidth="1" fill="none">
                        <path d="M 250 280 H 430 Q 450 280 450 300 V 360 Q 450 380 470 380 H 530" />
                        <path d="M 640 380 H 850 Q 870 380 870 360 V 200 Q 870 180 890 180 H 940" />
                        <path d="M 550 420 V 510 Q 550 530 570 530 H 750" />
                        <path d="M 180 650 H 310 Q 330 650 330 670 V 690" />
                    </g>

                    {/* Active Paths (The tracks) */}
                    <g stroke="#13F584" strokeWidth="2" strokeLinecap="round" opacity="0.4">
                        <path d="M 250 280 H 430 Q 450 280 450 300 V 360 Q 450 380 470 380 H 530" />
                        <path d="M 640 380 H 850 Q 870 380 870 360 V 200 Q 870 180 890 180 H 940" />
                    </g>

                    {/* Invisible Motion Paths for GSAP Physics */}
                    <path className="pulse-path" d="M 250 280 H 430 Q 450 280 450 300 V 360 Q 450 380 470 380 H 530" fill="none" stroke="none" />
                    <path className="pulse-path" d="M 640 380 H 850 Q 870 380 870 360 V 200 Q 870 180 890 180 H 940" fill="none" stroke="none" />

                    {/* The Traveler */}
                    <circle
                        ref={travelerRef}
                        r="8"
                        fill="url(#traveler-gradient)"
                        className="drop-shadow-[0_0_8px_rgba(19,245,132,0.8)]"
                    />
                </svg>

                {/* Nodes Layer */}
                <div className="relative w-full h-full">
                    <div id="hub" className="journey-card will-change-transform">
                        <Node id="hub-node" title="AIVM" icon={<Layers size={40} />} x="550px" y="380px" size="lg" active={true} />
                    </div>

                    <div id="validators" className="journey-card will-change-transform">
                        <Node id="validators-node" title="AIVM VALIDATORS" icon={<RefreshCw size={28} />} x="250px" y="280px" />
                    </div>

                    <div id="marketplace" className="journey-card will-change-transform">
                        <Node id="marketplace-node" title="AI DATA MARKETPLACE" icon={<ShoppingBasket size={32} />} x="950px" y="180px" items={['AI COMPANIES', 'AI & LLM ENGINEERS', 'DATASET PROVIDERS']} />
                    </div>

                    <div id="gpu" className="journey-card will-change-transform">
                        <Node id="gpu-node" title="GPU MARKETPLACE" icon={<Cpu size={32} />} x="1050px" y="500px" />
                    </div>

                    <div id="sdk" className="journey-card will-change-transform">
                        <Node id="sdk-node" title="INFERENCE SDK" icon={<Workflow size={28} />} x="800px" y="550px" />
                    </div>

                    <div id="agents" className="journey-card will-change-transform">
                        <Node id="agents-node" title="AI AGENTS INFRASTRUCTURE" icon={<Bot size={32} />} x="180px" y="650px" />
                    </div>

                    <div id="llms" className="journey-card will-change-transform">
                        <Node id="llms-node" title="ON-CHAIN LLMS" icon={<Cloud size={28} />} x="350px" y="720px" subtitle="LLM" />
                    </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-[#13F584]/20 rounded-tr-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-[#13F584]/20 rounded-bl-3xl pointer-events-none" />
            </div>

            {/* Grid Background - Static */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* --- Cinematic Overlays --- */}

            {/* 1. Vignettes for seamless blending with adjacent sections */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* 2. Film Grain / Noise Texture */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />

            {/* 3. Global Atmospheric Glow (Teal/Green) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 blur-[120px] bg-radial-gradient from-[#13F584]/20 to-transparent rounded-full" />
            </div>
        </section>
    );
};
