import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

export const ProblemFrictionSequence = () => {
    const frame = useCurrentFrame();

    // Chaotic shaking based on "friction"
    const shake = interpolate(
        Math.sin(frame * 0.5),
        [-1, 1],
        [-5, 5]
    );

    // Glitch opacity
    const opacity = interpolate(
        Math.sin(frame * 1.2),
        [-1, 1],
        [0.7, 1]
    );

    // Scaling based on "Acts"
    // Act 1: 0-150 frames (Transition)
    // Act 2: 150-300 frames (Silos)
    const scale = interpolate(
        frame,
        [0, 150, 300],
        [1, 1.1, 0.9],
        { extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden">
            {/* Background Noise Layer */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #13F584 0%, transparent 70%)',
                    transform: `translate(${shake}px, ${shake}px) scale(${scale})`,
                    filter: `blur(${interpolate(frame, [0, 300], [0, 10])}px)`,
                }}
            />

            {/* Floating "Silos" - Representing fragments of disconnected workflows */}
            <div className="relative w-full h-full">
                {[...Array(5)].map((_, i) => {
                    const startFrame = i * 20;
                    const moveX = interpolate(frame, [startFrame, startFrame + 100], [0, (i - 2) * 200], { extrapolateRight: 'clamp' });
                    const moveY = interpolate(frame, [startFrame, startFrame + 100], [0, (i % 2 === 0 ? 1 : -1) * 100], { extrapolateRight: 'clamp' });

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${moveX + shake}px), calc(-50% + ${moveY}px)) rotate(${i * 15}deg)`,
                                width: 200,
                                height: 120,
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(19, 245, 132, 0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 12,
                                opacity: opacity,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(19, 245, 132, 0.6)',
                                fontSize: 10,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontFamily: 'monospace',
                            }}
                        >
                            Fragment_{i + 1}
                        </div>
                    );
                })}
            </div>

            {/* Chromatic Aberration Overlay (Simulated) */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30">
                <div
                    className="absolute inset-0 border-r-2 border-red-500/20 translate-x-[1px]"
                    style={{ transform: `scale(${scale}) translate(${shake}px)` }}
                />
                <div
                    className="absolute inset-0 border-l-2 border-blue-500/20 -translate-x-[1px]"
                    style={{ transform: `scale(${scale}) translate(${-shake}px)` }}
                />
            </div>
        </AbsoluteFill>
    );
};
