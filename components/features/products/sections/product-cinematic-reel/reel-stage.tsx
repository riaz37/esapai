"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

interface ReelStageProps {
    images: string[];
    imagesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const ReelStage = forwardRef<HTMLDivElement, ReelStageProps>(({ images, imagesRef }, ref) => {
    return (
        <div ref={ref} className="relative w-full h-[100svh] md:h-[110vh] overflow-hidden">
            <div className="deck-stage absolute inset-0 z-10 flex items-center justify-center pointer-events-none transform-gpu pt-20 md:pt-0" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    {images.map((src, idx) => (
                        <div
                            key={src}
                            ref={(el) => { imagesRef.current[idx] = el; }}
                            className="absolute w-[90vw] md:w-[70vw] h-[50vh] sm:h-[60vh] md:h-[75vh] will-change-transform"
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

            {/* Edge Masking */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-15" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-15" />
        </div>
    );
});

ReelStage.displayName = "ReelStage";
