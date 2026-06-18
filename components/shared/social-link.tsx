"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "01$#%&@*?><{}[]";
const TOOLTIP_GAP = 12;

export type SocialLinkItem = {
  name: string;
  handle: string;
  iconPath: string;
  href: string;
};

type ActiveTooltip = {
  link: SocialLinkItem;
  rect: DOMRect;
};

function rectEqual(a: DOMRect, b: DOMRect) {
  return (
    a.top === b.top &&
    a.left === b.left &&
    a.width === b.width &&
    a.height === b.height
  );
}

function TooltipScramble({ text, active }: { text: string; active: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : "");

  useEffect(() => {
    if (!active) {
      setDisplayText("");
      return;
    }

    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = 18;
    let intervalId = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      frame += 1;
      const progress = Math.min(1, frame / totalFrames);

      if (progress >= 1) {
        setDisplayText(text);
        return;
      }

      const locked = Math.floor(progress * text.length);
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < locked) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      intervalId = window.setTimeout(tick, 35);
    };

    tick();

    return () => {
      cancelled = true;
      window.clearTimeout(intervalId);
    };
  }, [text, active, prefersReducedMotion]);

  return (
    <span className="font-mono text-[11px] tracking-wide text-white/90 whitespace-nowrap">
      {displayText}
      {active && !prefersReducedMotion && displayText !== text && (
        <m.span
          className="inline-block w-[5px] h-[11px] bg-primary ms-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

function SocialTooltip({
  active,
}: {
  active: ActiveTooltip | null;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) {
      hasEnteredRef.current = false;
    }
  }, [active]);

  if (!mounted || !active) return null;

  const { link, rect } = active;
  const centerX = rect.left + rect.width / 2;
  const showBelow = rect.top < 96;
  const anchorY = showBelow ? rect.bottom + TOOLTIP_GAP : rect.top - TOOLTIP_GAP;

  return createPortal(
    <AnimatePresence>
      {active && (
        <m.div
          key="social-tooltip"
          role="tooltip"
          className={cn(
            "fixed z-[9998] pointer-events-none -translate-x-1/2",
            showBelow ? "" : "-translate-y-full"
          )}
          initial={false}
          animate={{ left: centerX, top: anchorY }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, transition: { duration: 0.1 } }
          }
          transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.65 }}
        >
          <m.div
            initial={
              hasEnteredRef.current || prefersReducedMotion
                ? false
                : { scale: 0.92, y: 4 }
            }
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
            onAnimationComplete={() => {
              hasEnteredRef.current = true;
            }}
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(19,245,132,0.12),0_0_24px_rgba(19,245,132,0.08)]">
              <div
                className="absolute inset-0 bg-white/5 backdrop-blur-md transform-gpu"
                aria-hidden
              />

              <div className="relative z-10 px-3.5 py-2.5">
                {!prefersReducedMotion && (
                  <m.div
                    key={link.name}
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.55, ease: [0.33, 0, 0.2, 1] }}
                  />
                )}

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-primary/80 select-none">&gt;</span>
                  <TooltipScramble text={link.name} active />
                </div>

                <p className="mt-1 font-mono text-[10px] text-gray-400 tracking-wider ps-3.5">
                  {link.handle}
                </p>
              </div>

              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-white/10 bg-white/5 backdrop-blur-md",
                  showBelow
                    ? "-top-[5px] border-t border-s"
                    : "-bottom-[5px] border-b border-e"
                )}
                aria-hidden
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function SocialLink({
  link,
  isActive,
  onActivate,
  className,
  dataGsap,
}: {
  link: SocialLinkItem;
  isActive: boolean;
  onActivate: (element: HTMLAnchorElement) => void;
  className?: string;
  dataGsap?: string;
}) {
  const { name, handle, iconPath, href } = link;
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activate = useCallback(() => {
    if (buttonRef.current) onActivate(buttonRef.current);
  }, [onActivate]);

  return (
    <m.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${handle}`}
      data-gsap={dataGsap}
      className={cn(
        "relative w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10",
        "hover:bg-primary/15 hover:border-primary/50 transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className
      )}
      onMouseEnter={activate}
      onFocus={activate}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {!prefersReducedMotion && (
        <m.span
          className="absolute inset-0 rounded-full border border-primary/0"
          animate={
            isActive
              ? {
                  borderColor: "rgba(19, 245, 132, 0.35)",
                  boxShadow: [
                    "0 0 0 0 rgba(19, 245, 132, 0)",
                    "0 0 0 6px rgba(19, 245, 132, 0.12)",
                    "0 0 0 0 rgba(19, 245, 132, 0)",
                  ],
                }
              : { borderColor: "rgba(19, 245, 132, 0)", boxShadow: "0 0 0 0 rgba(19, 245, 132, 0)" }
          }
          transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, ease: "easeOut" }}
          aria-hidden
        />
      )}

      <Image
        src={iconPath}
        alt=""
        width={18}
        height={18}
        className={cn(
          "relative z-10 opacity-70 transition-opacity duration-300",
          isActive && "opacity-100"
        )}
      />
    </m.a>
  );
}

export function SocialLinks({
  links,
  className,
}: {
  links: ReadonlyArray<SocialLinkItem>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [active, setActive] = useState<ActiveTooltip | null>(null);

  const showFor = useCallback((link: SocialLinkItem, element: HTMLAnchorElement) => {
    linkRefs.current.set(link.name, element);
    setActive({ link, rect: element.getBoundingClientRect() });
  }, []);

  const hide = useCallback(() => {
    setActive(null);
  }, []);

  const updatePosition = useCallback((linkName: string) => {
    const element = linkRefs.current.get(linkName);
    if (!element) return;

    const nextRect = element.getBoundingClientRect();
    setActive((prev) => {
      if (!prev) return prev;
      if (prev.link.name !== linkName) return prev;
      if (rectEqual(prev.rect, nextRect)) return prev;
      return { link: prev.link, rect: nextRect };
    });
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    // Ensure initial position is correct after a link switch without causing loops.
    updatePosition(active.link.name);
  }, [active?.link.name, updatePosition]);

  useEffect(() => {
    if (!active) return;

    const onScrollOrResize = () => updatePosition(active.link.name);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [active, updatePosition]);

  const handleContainerLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && containerRef.current?.contains(next)) return;
      hide();
    },
    [hide]
  );

  const handleContainerBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && containerRef.current?.contains(next)) return;
      hide();
    },
    [hide]
  );

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center gap-4", className)}
      onMouseLeave={handleContainerLeave}
      onBlur={handleContainerBlur}
    >
      {links.map((link) => (
        <SocialLink
          key={link.name}
          link={link}
          isActive={active?.link.name === link.name}
          onActivate={(element) => showFor(link, element)}
        />
      ))}
      <SocialTooltip active={active} />
    </div>
  );
}
