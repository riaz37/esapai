"use client";

import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useKeyboardSequence } from "@/lib/hooks/use-keyboard-sequence";
import { cn } from "@/lib/utils";

const SEQUENCES = ["riaz", "esap"];
const SCRAMBLE_CHARS = "01$#%&@*?><{}[]";
const DISPLAY_MS = 4200;
const COOLDOWN_MS = 8000;

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
          duration: 2.8,
          ease: [0.33, 0, 0.2, 1],
          repeat: Infinity,
          repeatDelay: 3.2,
        }}
      >
        {/* Soft trailing glow */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent" />
        {/* Mid trail */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/[0.14] to-transparent blur-sm" />
        {/* Leading edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-90 shadow-[0_0_16px_1px_rgba(19,245,132,0.45)]" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-[2px]" />
      </m.div>
    </div>
  );
}

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const timeout = setTimeout(() => setDisplayText(text), delay * 1000);
      return () => clearTimeout(timeout);
    }

    let frame = 0;
    const totalFrames = 24;
    let animationFrameId = 0;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const progress = timestamp - lastTimestamp;

      if (progress >= 40) {
        lastTimestamp = timestamp;
        if (frame >= totalFrames) {
          setDisplayText(text);
          return;
        }

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < (frame / totalFrames) * text.length) return text[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");

        setDisplayText(scrambled);
        frame += 1;
      }

      if (frame < totalFrames) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [text, delay, prefersReducedMotion]);

  return <span>{displayText}</span>;
}

export function BuilderEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    setIsVisible(false);
    setCooldown(true);
    window.setTimeout(() => setCooldown(false), COOLDOWN_MS);
  }, []);

  const trigger = useCallback(() => {
    if (isVisible || cooldown) return;
    setIsVisible(true);
  }, [isVisible, cooldown]);

  useKeyboardSequence(SEQUENCES, trigger, { enabled: !isVisible && !cooldown });

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
  }, [isVisible, dismiss]);

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
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.6 } }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
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
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
            className="relative z-10 flex flex-col items-center gap-5 px-6 text-center pointer-events-none"
            onClick={(event) => event.stopPropagation()}
          >
            <m.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.05, 1] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-16 rounded-full bg-primary/15 blur-[80px]"
            />

            <p className="text-[10px] uppercase tracking-[0.45em] text-primary/70 font-medium">
              <ScrambleText text="> keystrokes detected" delay={0.1} />
            </p>

            <h2
              className={cn(
                "relative font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white",
                "drop-shadow-[0_0_30px_rgba(19,245,132,0.35)]"
              )}
            >
              <ScrambleText text="Built by Riaz" delay={0.35} />
            </h2>

            <m.a
              href="https://github.com/riaz37"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0.2 : 1.4, duration: 0.6 }}
              className="pointer-events-auto text-xs sm:text-sm text-white/45 tracking-wide hover:text-primary transition-colors duration-300"
              onClick={(event) => event.stopPropagation()}
            >
              github.com/riaz37
            </m.a>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0.3 : 1.8 }}
              className="flex gap-2 mt-2"
            >
              {[0, 0.35, 0.7].map((delay) => (
                <m.span
                  key={delay}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.4, 1], opacity: [0.25, 0.7, 0.25] }
                  }
                  transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
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
