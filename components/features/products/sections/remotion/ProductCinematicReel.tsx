import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Img, spring } from 'remotion';

const IMAGES = [
    '/productimages/Slide-22.png',
    '/productimages/Slide-23.png',
    '/productimages/Slide-24.png',
];

// Floating UI element component for added depth
const FloatingNode = ({ delay, x, y, size, color }: { delay: number, x: string, y: string, size: number, color: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const drift = interpolate(frame, [0, 300], [0, 100]);
    const opacity = interpolate(
        Math.sin((frame + delay) / 30),
        [-1, 1],
        [0.2, 0.6]
    );

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: `calc(${y} - ${drift}px)`,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                filter: 'blur(4px)',
                opacity,
                boxShadow: `0 0 20px ${color}`,
                zIndex: 10,
            }}
        />
    );
};

export const ProductCinematicReel = () => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    const framesPerScene = durationInFrames / (IMAGES.length - 0.5); // Slight overlap

    return (
        <AbsoluteFill className="bg-black">
            {/* 1. Background Atmosphere Nodes */}
            <FloatingNode delay={0} x="10%" y="20%" size={150} color="rgba(19, 245, 132, 0.1)" />
            <FloatingNode delay={50} x="80%" y="70%" size={200} color="rgba(19, 245, 132, 0.05)" />
            <FloatingNode delay={100} x="30%" y="80%" size={100} color="rgba(19, 245, 132, 0.08)" />

            {/* 2. Main Laptop Image Sequence with Infinite Zoom */}
            {IMAGES.map((src, index) => {
                const startFrame = index * (framesPerScene * 0.8);
                const endFrame = startFrame + framesPerScene;

                // Entry logic: Spring scale from very small or large
                const entrySpring = spring({
                    frame: frame - startFrame,
                    fps,
                    config: { stiffness: 40, damping: 20 },
                });

                // Progressive Zoom logic
                // Each scene zooms from a "distant" state to "entering the screen" state
                const scale = interpolate(
                    frame,
                    [startFrame, endFrame],
                    [index === 0 ? 1 : 0.4, 2], // First image starts at 1, others emerge from center
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                // Opacity logic: Fast fade in, stay, fade out as next one zooms in
                const opacity = interpolate(
                    frame,
                    [startFrame, startFrame + 15, endFrame - 20, endFrame],
                    [0, 1, 1, 0],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                // Skip rendering if not visible
                if (frame < startFrame || frame > endFrame) return null;

                return (
                    <AbsoluteFill
                        key={src}
                        style={{
                            opacity,
                            transform: `scale(${scale})`,
                            zIndex: index + 1,
                        }}
                    >
                        <Img
                            src={src}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                // Add a subtle glow to the laptop itself
                                filter: 'drop-shadow(0 0 50px rgba(19, 245, 132, 0.1))',
                            }}
                        />

                    </AbsoluteFill>
                );
            })}

            {/* 4. Global Overlay FX */}
            <AbsoluteFill style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
