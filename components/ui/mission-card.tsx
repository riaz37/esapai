"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface MissionCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    image?: string;
    className?: string;
    showGlow?: boolean;
}

const imgFrame1000006146 = "https://www.figma.com/api/mcp/asset/040b8ff5-2adb-4b1b-a3c9-9fda812f28b2";
const imgFrame1000006147 = "https://www.figma.com/api/mcp/asset/f80acb39-a9b4-45bd-9bf8-578553d79afa";
const imgFrame1000006148 = "https://www.figma.com/api/mcp/asset/37988a00-7f48-4ade-9d74-a87b1c247df1";
const imgGroup326 = "https://www.figma.com/api/mcp/asset/d9c97cdf-df78-4bce-aec0-ebf6f1422c1b";
const imgShine = "https://www.figma.com/api/mcp/asset/564d2152-71a3-43ce-acac-365b22c922c9";

export function MissionCard({
    title,
    description,
    icon: Icon,
    image,
    className,
    showGlow = false,
}: MissionCardProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex flex-col gap-6 h-full items-start overflow-hidden p-6 rounded-[32px] transition-all duration-300",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: 'rgba(250, 250, 250, 0.02)',
                border: '1px solid transparent',
                boxShadow: `
                    inset 0 -40px 80px -20px rgba(226, 226, 226, 0.02), 
                    inset 40px 0 80px -20px rgba(226, 226, 226, 0.03), 
                    inset -40px 0 80px -20px rgba(226, 226, 226, 0.03)
                `,
            }}
        >
            {/* Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(19, 245, 132, 0.15), transparent 80%)`,
                }}
            />
            {/* Masked Background Images */}
            <div className="absolute left-[-17px] top-[4px] pointer-events-none opacity-80">
                <div className="absolute left-[-16px] top-[5px]">
                    <div className="absolute left-[16px] top-[3px]">
                        <div
                            className="absolute h-[281px] left-0 top-[38px] w-[405px]"
                            style={{
                                WebkitMaskImage: `url('${imgFrame1000006146}')`,
                                maskImage: `url('${imgFrame1000006146}')`,
                                WebkitMaskSize: '441px 362px',
                                maskSize: '441px 362px',
                                WebkitMaskPosition: '-16px -41px',
                                maskPosition: '-16px -41px',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                            }}
                        >
                            <div className="absolute" style={{ inset: '-0.18% 0' }}>
                                <Image alt="" className="block max-w-none w-full h-full" src={imgFrame1000006147} width={405} height={281} unoptimized />
                            </div>
                        </div>
                        <div className="absolute flex h-[357px] items-center justify-center left-[62px] top-0 w-[281px]">
                            <div className="flex-none rotate-[270deg]">
                                <div
                                    className="h-[281px] relative w-[357px]"
                                    style={{
                                        WebkitMaskImage: `url('${imgFrame1000006146}')`,
                                        maskImage: `url('${imgFrame1000006146}')`,
                                        WebkitMaskSize: '441px 362px',
                                        maskSize: '441px 362px',
                                        WebkitMaskPosition: '-78px -3px',
                                        maskPosition: '-78px -3px',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                    }}
                                >
                                    <div className="absolute" style={{ inset: '-0.18% 0' }}>
                                        <Image alt="" className="block max-w-none w-full h-full" src={imgFrame1000006148} width={357} height={281} unoptimized />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Green Glow Effect */}
            {showGlow && (
                <>
                    <div className="absolute h-[145px] left-[1.67px] top-[-80.17px] w-[403px] pointer-events-none z-10">
                        <div className="absolute" style={{ inset: '-107.59% -38.71%' }}>
                            <Image alt="" className="block max-w-none w-full h-full" src={imgGroup326} width={403} height={145} unoptimized />
                        </div>
                    </div>
                    <div className="absolute h-[2px] left-[27.67px] right-[25.67px] top-[-0.17px] pointer-events-none z-20">
                        <div className="absolute" style={{ inset: '-1px 0' }}>
                            <Image alt="" className="block max-w-none w-full h-full" src={imgShine} width={100} height={2} unoptimized />
                        </div>
                    </div>
                </>
            )}

            {/* Image Area */}
            {image && (
                <div className="absolute inset-0 z-0 flex items-start justify-center pt-12 pointer-events-none">
                    <div className="w-full relative aspect-square flex items-center justify-center opacity-80">
                        <Image
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            className="object-contain w-3/4 h-3/4 drop-shadow-2xl translate-y-[-10px] group-hover:translate-y-[-20px] transition-transform duration-500"
                        />
                    </div>
                </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col gap-2 items-start h-full relative w-full z-40 pointer-events-none">
                <div className="flex-1 min-h-[180px]" />
                <div className="w-full mt-auto">
                    <h3 className="text-[#fafafa] text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-[#a1a1aa] text-sm font-normal leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Inner Shadow */}
            <div
                className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
                style={{
                    boxShadow: 'inset 0px 4px 54px 11px rgba(226, 226, 226, 0.04)',
                }}
            />
        </div>
    );
}
