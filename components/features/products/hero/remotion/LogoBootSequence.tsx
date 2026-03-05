/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, random } from 'remotion';

const LOGO_PATH = "/logo/mainlogo.png";
const PRIMARY_GREEN = '#13F584';

export const LogoBootSequence = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Phase 1: Holographic Scan (Reveal) ---
    // Reveal from 0% height to 100% height
    const scanProgress = spring({
        frame,
        fps,
        config: { damping: 30, stiffness: 100 },
        durationInFrames: 45, // 1.5 seconds
    });

    // --- Phase 2: RGB Split / Glitch ---
    // Random jitter for the glitch effect
    // We only glitch during the scan and a bit after
    const isGlitching = frame < 50;

    const glitchX = isGlitching ? (random(frame) - 0.5) * 10 : 0;
    const glitchY = isGlitching ? (random(frame + 1) - 0.5) * 5 : 0;
    const glitchOpacity = interpolate(frame, [40, 60], [0.8, 0]);

    // --- Phase 3: Stabilize ---
    const scale = interpolate(scanProgress, [0, 1], [1.2, 1]);
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
    };

    const imageBaseStyle: React.CSSProperties = {
        gridArea: '1 / 1',
        width: '200px',
        height: 'auto',
        objectFit: 'contain',
    };

    return (
        <div style={containerStyle}>
            {/* 1. Red Channel (Glitch Layer) - Offset Left */}
            <img
                src={LOGO_PATH}
                alt=""
                fetchPriority="high"
                style={{
                    ...imageBaseStyle,
                    transform: `scale(${scale}) translate(${glitchX - 4}px, ${glitchY}px)`,
                    opacity: isGlitching ? 0.6 : 0,
                    filter: 'sepia(100%) saturate(300%) hue-rotate(-50deg) blur(1px)', // Red-ish tint hack
                    mixBlendMode: 'screen',
                }}
            />

            {/* 2. Blue Channel (Glitch Layer) - Offset Right */}
            <img
                src={LOGO_PATH}
                alt=""
                fetchPriority="high"
                style={{
                    ...imageBaseStyle,
                    transform: `scale(${scale}) translate(${glitchX + 4}px, ${glitchY}px)`,
                    opacity: isGlitching ? 0.6 : 0,
                    filter: 'sepia(100%) saturate(300%) hue-rotate(180deg) blur(1px)', // Blue-ish tint hack
                    mixBlendMode: 'screen',
                }}
            />

            {/* 3. Main Layer (Green Tech Glow & Reveal) */}
            <img
                src={LOGO_PATH}
                alt=""
                fetchPriority="high"
                style={{
                    ...imageBaseStyle,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    filter: `drop-shadow(0 0 ${isGlitching ? 20 : 0}px ${PRIMARY_GREEN})`,
                }}
            />
        </div>
    );
};
