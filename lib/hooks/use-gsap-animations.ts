import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export interface FadeInOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export interface ContinuousAnimationOptions {
  duration?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
  delay?: number;
}

export interface StaggerOptions {
  stagger?: number;
}

/**
 * Reusable GSAP animation utilities hook
 */
export function useGSAPAnimations(scope: RefObject<HTMLElement | SVGSVGElement | null>) {
  // Scope is kept for potential future use with useGSAP context
  void scope;
  /**
   * Fade in animation with optional slide and scale
   */
  const fadeIn = (
    target: gsap.TweenTarget,
    options: FadeInOptions = {}
  ) => {
    const {
      duration = 0.6,
      delay = 0,
      ease = "power2.out",
      from = { opacity: 0 },
      to = { opacity: 1 },
    } = options;

    const fromVars: gsap.TweenVars = from;
    const toVars: gsap.TweenVars = {
      ...to,
      duration,
      delay,
      ease: ease as string,
    };

    gsap.fromTo(target, fromVars, toVars);
  };

  /**
   * Staggered fade-in for multiple elements
   */
  const staggerFadeIn = (
    targets: gsap.TweenTarget,
    options: (FadeInOptions & StaggerOptions) = {}
  ) => {
    const {
      duration = 0.6,
      delay = 0,
      ease = "power2.out",
      stagger = 0.1,
      from = { opacity: 0, scale: 0.95 },
      to = { opacity: 1, scale: 1 },
    } = options;

    const fromVars: gsap.TweenVars = from as gsap.TweenVars;
    const toVars: gsap.TweenVars = {
      ...(to as gsap.TweenVars),
      duration,
      delay,
      ease: ease as string,
      stagger,
    };

    gsap.fromTo(targets, fromVars, toVars);
  };

  /**
   * Continuous breathing/pulse animation
   */
  const breathing = (
    target: gsap.TweenTarget,
    options: ContinuousAnimationOptions = {}
  ) => {
    const {
      duration = 2.5,
      ease = "sine.inOut",
      repeat = -1,
      yoyo = true,
      delay = 0,
    } = options;

    gsap.to(target, {
      scale: 1.05,
      opacity: 0.7,
      duration,
      ease,
      repeat,
      yoyo,
      delay,
    });
  };

  /**
   * Continuous float animation
   */
  const float = (
    target: gsap.TweenTarget,
    options: ContinuousAnimationOptions = {}
  ) => {
    const {
      duration = 3,
      ease = "sine.inOut",
      repeat = -1,
      yoyo = true,
      delay = 0,
    } = options;

    gsap.to(target, {
      y: -20,
      opacity: 0.8,
      duration,
      ease,
      repeat,
      yoyo,
      delay,
    });
  };

  /**
   * Continuous glow animation
   */
  const glow = (
    target: gsap.TweenTarget,
    options: ContinuousAnimationOptions = {}
  ) => {
    const {
      duration = 2.5,
      ease = "sine.inOut",
      repeat = -1,
      yoyo = true,
      delay = 0,
    } = options;

    gsap.fromTo(
      target,
      {
        filter: "drop-shadow(0 0 20px rgba(19,245,132,0.15))",
      },
      {
        filter: "drop-shadow(0 0 50px rgba(19,245,132,0.45))",
        duration,
        ease,
        repeat,
        yoyo,
        delay,
      }
    );
  };

  /**
   * Animate SVG circle attributes
   */
  const animateSVGCircle = (
    target: SVGCircleElement,
    config: {
      r?: { from: number; to: number };
      cx?: { from: number; to: number };
      cy?: { from: number; to: number };
      opacity?: { from: number; to: number };
      rotation?: { from: number; to: number; origin?: string };
      duration?: number;
      ease?: string;
      repeat?: number;
      yoyo?: boolean;
    }
  ) => {
    const {
      duration = 4,
      ease = "sine.inOut",
      repeat = -1,
      yoyo = true,
    } = config;

    if (config.r) {
      gsap.fromTo(
        target,
        { attr: { r: config.r.from } },
        {
          attr: { r: config.r.to },
          duration,
          ease,
          repeat,
          yoyo,
        }
      );
    }

    if (config.cx) {
      gsap.fromTo(
        target,
        { attr: { cx: config.cx.from } },
        {
          attr: { cx: config.cx.to },
          duration: duration * 1.4,
          ease,
          repeat,
          yoyo,
        }
      );
    }

    if (config.cy) {
      gsap.fromTo(
        target,
        { attr: { cy: config.cy.from } },
        {
          attr: { cy: config.cy.to },
          duration: duration * 1.2,
          ease,
          repeat,
          yoyo,
        }
      );
    }

    if (config.opacity) {
      gsap.fromTo(
        target,
        { opacity: config.opacity.from },
        {
          opacity: config.opacity.to,
          duration: duration * 0.9,
          ease,
          repeat,
          yoyo,
        }
      );
    }

    if (config.rotation) {
      gsap.to(target, {
        rotation: config.rotation.to,
        transformOrigin: config.rotation.origin || "center",
        duration: duration * 2,
        ease,
        repeat,
        yoyo,
      });
    }
  };

  /**
   * Animate SVG rect (for sweep effects)
   */
  const animateSVGRect = (
    target: SVGRectElement,
    config: {
      x?: { from: number; to: number };
      opacity?: { from: number; to: number };
      duration?: number;
      ease?: string;
      repeat?: number;
      yoyo?: boolean;
    }
  ) => {
    const {
      duration = 8,
      ease = "sine.inOut",
      repeat = -1,
      yoyo = true,
    } = config;

    if (config.x) {
      gsap.fromTo(
        target,
        { x: config.x.from },
        {
          x: config.x.to,
          duration,
          ease,
          repeat,
          yoyo,
        }
      );
    }

    if (config.opacity) {
      gsap.fromTo(
        target,
        { opacity: config.opacity.from },
        {
          opacity: config.opacity.to,
          duration,
          ease,
          repeat,
          yoyo,
        }
      );
    }
  };

  /**
   * Create a timeline for sequenced animations
   */
  const createTimeline = () => {
    return gsap.timeline();
  };

  /**
   * Batch set initial states for multiple elements
   * Prevents flash of unstyled content before animations
   */
  const setInitialStates = (
    elements: Array<{ ref: RefObject<HTMLElement | SVGSVGElement | null>; props: gsap.TweenVars }>
  ) => {
    elements.forEach(({ ref, props }) => {
      if (ref.current) {
        gsap.set(ref.current, props);
      }
    });
  };

  /**
   * Continuous rotation animation
   */
  const rotate = (
    target: gsap.TweenTarget,
    options: {
      duration?: number;
      ease?: string;
      repeat?: number;
      delay?: number;
      rotation?: number;
    } = {}
  ) => {
    const {
      duration = 20,
      ease = "none",
      repeat = -1,
      delay = 0,
      rotation = 360,
    } = options;

    gsap.to(target, {
      rotation,
      duration,
      ease,
      repeat,
      delay,
    });
  };

  /**
   * Animate gradient paths with subtle variations
   */
  const animateGradientPaths = (
    paths: NodeListOf<Element> | Element[],
    options: {
      count?: number;
      opacityRange?: [number, number];
      durationRange?: [number, number];
      stagger?: number;
    } = {}
  ) => {
    const {
      count = 15,
      opacityRange = [0.8, 1.0],
      durationRange = [2, 4],
      stagger = 0.15,
    } = options;

    const pathsArray = Array.from(paths).slice(0, count);
    
    if (pathsArray.length > 0) {
      gsap.to(pathsArray, {
        opacity: () => opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
        duration: () => durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger,
      });
    }
  };

  return {
    fadeIn,
    staggerFadeIn,
    breathing,
    float,
    glow,
    animateSVGCircle,
    animateSVGRect,
    createTimeline,
    animateGradientPaths,
    setInitialStates,
    rotate,
  };
}

/**
 * Hook wrapper that automatically provides scope
 */
export function useGSAPAnimationsWithScope(
  scope: RefObject<HTMLElement | SVGSVGElement | null>
) {
  const animations = useGSAPAnimations(scope);

  useGSAP(() => {
    // Hook is ready, animations can be called
  }, { scope });

  return animations;
}

