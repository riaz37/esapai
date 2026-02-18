"use client";

import { Player } from "@remotion/player";
import { LogoBootSequence } from "@/components/features/products/hero/remotion/LogoBootSequence";

export function RemotionPlayerWrapper() {
    return (
        <Player
            component={LogoBootSequence}
            durationInFrames={120}
            compositionWidth={400}
            compositionHeight={400}
            fps={30}
            loop={false}
            autoPlay
            style={{
                width: '100%',
                height: '100%',
            }}
            inputProps={{}}
        />
    );
}
