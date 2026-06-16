"use client";

import { m, AnimatePresence, useAnimation, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useKeyboardSequence } from "@/lib/hooks/use-keyboard-sequence";
import { cn } from "@/lib/utils";

const SEQUENCES = ["riaz"];
const SCRAMBLE_CHARS = "01$#%&@*?><{}[]";
const DISPLAY_MS = 4200;
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN_STYLE = {
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
} as const;

function ScanBeam() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <m.div
        className="absolute inset-x-0 will-change-transform"
        initial={{ y: "-20%" }}
        animate={{ y: "120%" }}
        transition={{
          duration: 3.4,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatDelay: 2.6,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/[0.14] to-transparent blur-sm" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-90 shadow-[0_0_16px_1px_rgba(19,245,132,0.45)]" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-[2px]" />
      </m.div>
    </div>
  );
}

function ScrambleText({
  text,
  delay = 0,
  replayToken = 0,
}: {
  text: string;
  delay?: number;
  replayToken?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timeout = setTimeout(() => setDisplayText(text), isFirstRunRef.current ? delay * 1000 : 0);
      isFirstRunRef.current = false;
      return () => clearTimeout(timeout);
    }

    const isReplay = replayToken > 0 && !isFirstRunRef.current;
    isFirstRunRef.current = false;

    const totalFrames = isReplay ? 14 : 28;
    const frameInterval = isReplay ? 28 : 32;
    let frame = 0;
    let animationFrameId = 0;
    let lastTimestamp = 0;
    let cancelled = false;

    const easeOut = (t: number) => 1 - (1 - t) ** 2.2;
    const resolvedCount = (progress: number) =>
      Math.min(text.length, Math.floor(easeOut(progress) * text.length));

    const animate = (timestamp: number) => {
      if (cancelled) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= frameInterval) {
        lastTimestamp = timestamp;
        const progress = Math.min(1, frame / totalFrames);
        const locked = resolvedCount(progress);

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < locked) return text[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");

        setDisplayText(scrambled);
        frame += 1;

        if (frame > totalFrames) {
          setDisplayText(text);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const startDelay = isReplay ? 0 : delay * 1000;
    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [text, delay, prefersReducedMotion, replayToken]);

  return <span>{displayText}</span>;
}

export function BuilderEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const [pulseId, setPulseId] = useState(0);
  const isVisibleRef = useRef(false);
  const contentControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    isVisibleRef.current = false;
    setIsVisible(false);
  }, []);

  const trigger = useCallback(() => {
    const wasVisible = isVisibleRef.current;
    isVisibleRef.current = true;
    setIsVisible(true);
    setReplayToken((token) => token + 1);

    if (wasVisible) {
      setPulseId((id) => id + 1);
      if (prefersReducedMotion) return;

      void contentControls.start({
        scale: [1, 1.035, 1.008, 1],
        y: [0, -4, 0],
        transition: { duration: 0.7, ease: SMOOTH_EASE },
      });
      return;
    }

    void contentControls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: SMOOTH_EASE, delay: 0.1 },
    });
  }, [contentControls, prefersReducedMotion]);

  useKeyboardSequence(SEQUENCES, trigger);

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(dismiss, DISPLAY_MS);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [isVisible, dismiss, replayToken]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          key="builder-easter-egg"
          role="dialog"
          aria-modal="true"
          aria-label="Built by Riaz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.55, ease: SMOOTH_EASE } }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: SMOOTH_EASE }}
          className="fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden bg-black/85 backdrop-blur-sm"
          dir="ltr"
          onClick={dismiss}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
            style={GRAIN_STYLE}
          />

          {!prefersReducedMotion && <ScanBeam />}

          <m.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            animate={contentControls}
            className="relative z-10 flex flex-col items-center gap-5 px-6 text-center pointer-events-none"
            onClick={(event) => event.stopPropagation()}
          >
            <m.div
              animate={
                prefersReducedMotion
                  ? { opacity: 0.35 }
                  : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.05, 1] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-16 rounded-full bg-primary/15 blur-[80px]"
            />

            {pulseId > 0 && !prefersReducedMotion && (
              <m.div
                key={pulseId}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.55, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.75, ease: SMOOTH_EASE }}
                className="absolute -inset-16 rounded-full bg-primary/20 blur-[90px] pointer-events-none"
                aria-hidden
              />
            )}

            <p className="text-[10px] uppercase tracking-[0.45em] text-primary/70 font-medium">
              <ScrambleText text="> keystrokes detected" delay={0.08} replayToken={replayToken} />
            </p>

            <h2
              className={cn(
                "relative font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white",
                "drop-shadow-[0_0_30px_rgba(19,245,132,0.35)]"
              )}
            >
              <ScrambleText text="Built by Riaz" delay={0.28} replayToken={replayToken} />
            </h2>

            <m.a
              href="https://github.com/riaz37"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: prefersReducedMotion ? 0.15 : 1.2, duration: 0.8, ease: SMOOTH_EASE }}
              className="pointer-events-auto text-xs sm:text-sm text-white/45 tracking-wide hover:text-primary transition-colors duration-300"
              onClick={(event) => event.stopPropagation()}
            >
              github.com/riaz37
            </m.a>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0.2 : 1.5, duration: 0.8, ease: SMOOTH_EASE }}
              className="flex gap-2 mt-2"
            >
              {[0, 0.35, 0.7].map((dotDelay) => (
                <m.span
                  key={dotDelay}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.4, 1], opacity: [0.25, 0.7, 0.25] }
                  }
                  transition={{ duration: 1.8, repeat: Infinity, delay: dotDelay, ease: "easeInOut" }}
                  className="h-1 w-1 rounded-full bg-primary"
                />
              ))}
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
