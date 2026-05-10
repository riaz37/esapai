"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

interface ReelStageProps {
    images: string[];
    imagesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const ReelStage = forwardRef<HTMLDivElement, ReelStageProps>(({ images, imagesRef }, ref) => {
    return (
        <div ref={ref} className="relative w-full h-auto md:h-[110vh] overflow-hidden">
            <div className="deck-stage relative md:absolute inset-0 z-10 flex flex-col md:items-center md:justify-center pointer-events-none transform-gpu pt-0 md:pt-0" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-full h-full flex flex-col md:items-center justify-center gap-8 md:gap-0 px-4 md:px-0" style={{ transformStyle: 'preserve-3d' }}>
                    {images.map((src, idx) => (
                        <div
                            key={src}
                            ref={(el) => { imagesRef.current[idx] = el; }}
                            className="relative md:absolute w-full md:w-[70vw] h-[50vh] sm:h-[60vh] md:h-[75vh] will-change-transform"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                                <Image
                                    src={src}
                                    alt={`Blade ${idx}`}
                                    fill
                                    sizes="(max-width: 768px) 90vw, 70vw"
                                    className="object-contain md:object-cover"
                                    priority={idx === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 blur-2xl -z-10 opacity-30" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Edge Masking - Only on Desktop where animation happens */}
            <div className="hidden md:block absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-15" />
            <div className="hidden md:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-15" />
        </div>
    );
});

ReelStage.displayName = "ReelStage";
