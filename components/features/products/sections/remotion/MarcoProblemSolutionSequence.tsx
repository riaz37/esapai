import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Img } from "remotion";

const ANGRY_SVG = "/logo/marco/Angry-01.svg";
const SMILEY_SVG = "/logo/marco/Smill face-01.svg";

/** Duration used when composition is driven by scroll; keep in sync with ProductCinematicFlow. */
export const MARCO_SEQUENCE_DURATION_IN_FRAMES = 90;

/**
 * Remotion composition: Marco angry (problems) → crossfade → Marco smiley (solution).
 * Frame-driven only (no random) for deterministic scroll scrubbing.
 */
export function MarcoProblemSolutionSequence() {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const total = durationInFrames;
    const problemEnd = Math.floor(total * 0.5);
    const transitionEnd = Math.floor(total * 0.67);

    const angryOpacity = interpolate(
        frame,
        [0, problemEnd, transitionEnd],
        [1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const smileyOpacity = interpolate(
        frame,
        [problemEnd, transitionEnd, total],
        [0, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const problemPulse = interpolate(
        Math.sin((frame / 20) * Math.PI * 2),
        [-1, 1],
        [0.98, 1.02]
    );
    const solutionGlow = interpolate(
        frame,
        [transitionEnd, transitionEnd + 15, total],
        [1, 1.05, 1.02],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const containerStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
    };

    const imageStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "contain",
    };

    return (
        <div style={containerStyle}>
            <Img
                src={ANGRY_SVG}
                style={{
                    ...imageStyle,
                    opacity: angryOpacity,
                    transform: `scale(${problemPulse})`,
                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.08))",
                }}
            />
            <Img
                src={SMILEY_SVG}
                style={{
                    ...imageStyle,
                    opacity: smileyOpacity,
                    transform: `scale(${solutionGlow})`,
                    filter: "drop-shadow(0 0 40px rgba(19,245,132,0.12))",
                }}
            />
        </div>
    );
}
