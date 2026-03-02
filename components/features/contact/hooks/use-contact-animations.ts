"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";

interface UseContactAnimationsProps {
    sectionRef: React.RefObject<HTMLElement | null>;
    formCardRef: React.RefObject<HTMLDivElement | null>;
    leftColumnRef: React.RefObject<HTMLDivElement | null>;
}

export function useContactAnimations({
    sectionRef,
    formCardRef,
    leftColumnRef,
}: UseContactAnimationsProps) {
    const hasAnimatedRef = useRef(false);
    const leftHasAnimatedRef = useRef(false);
    const socialFloatTweensRef = useRef<gsap.core.Tween[]>([]);

    // Intersection observer to trigger animations when in view
    const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
        threshold: 0.15,
        rootMargin: "100px",
    });

    // Separate observer for the left content (title + social section)
    const { setRef: setLeftIntersectionRef, isInView: isLeftInView } =
        useIntersectionAnimation({
            threshold: 0.15,
            rootMargin: "100px",
        });

    // Reset animation refs on mount
    useEffect(() => {
        hasAnimatedRef.current = false;
        leftHasAnimatedRef.current = false;
        socialFloatTweensRef.current = [];
    }, []);

    // Set initial states
    useGSAP(
        () => {
            if (prefersReducedMotion()) return;

            // Form card items
            if (formCardRef.current) {
                const items = formCardRef.current.querySelectorAll<HTMLElement>(
                    '[data-gsap="contact-form-item"]'
                );
                gsap.set(formCardRef.current, { opacity: 0, y: 28, scale: 0.98 });
                gsap.set(items, { opacity: 0, y: 16 });
            }

            // Left column items
            if (leftColumnRef.current) {
                const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
                    '[data-gsap="contact-left-item"]'
                );
                const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
                    '[data-gsap="contact-social-icon"]'
                );
                gsap.set(leftItems, { opacity: 0, y: 22 });
                gsap.set(socialIcons, { opacity: 0, y: 12, scale: 0.92 });
            }
        },
        { scope: sectionRef }
    );

    // Form card entrance animation
    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            if (!formCardRef.current || hasAnimatedRef.current) return;

            const rect = formCardRef.current.getBoundingClientRect();
            const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isInView && !isCurrentlyVisible) return;

            animateFormCard();
        },
        { scope: sectionRef, dependencies: [isInView] }
    );

    // Left column entrance animation
    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            if (!leftColumnRef.current || leftHasAnimatedRef.current) return;

            const rect = leftColumnRef.current.getBoundingClientRect();
            const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isLeftInView && !isCurrentlyVisible) return;

            animateLeftColumn();
        },
        { scope: sectionRef, dependencies: [isLeftInView] }
    );

    const animateFormCard = () => {
        if (!formCardRef.current || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const items = formCardRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="contact-form-item"]'
        );

        const tl = gsap.timeline();
        tl.to(formCardRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
        }).to(
            items,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
            },
            "-=0.45"
        );
    };

    const animateLeftColumn = () => {
        if (!leftColumnRef.current || leftHasAnimatedRef.current) return;
        leftHasAnimatedRef.current = true;

        const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="contact-left-item"]'
        );
        const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="contact-social-icon"]'
        );

        const tl = gsap.timeline();
        tl.to(leftItems, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.08,
        }).to(
            socialIcons,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.06,
            },
            "-=0.25"
        );
    };

    // Fallback checks
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const checkAndAnimate = () => {
            if (formCardRef.current && !hasAnimatedRef.current) {
                const rect = formCardRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) animateFormCard();
            }
            if (leftColumnRef.current && !leftHasAnimatedRef.current) {
                const rect = leftColumnRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) animateLeftColumn();
            }
        };

        checkAndAnimate();
        const timeoutId = setTimeout(checkAndAnimate, 100);
        const safetyTimeout = setTimeout(() => {
            if (formCardRef.current && !hasAnimatedRef.current) animateFormCard();
            if (leftColumnRef.current && !leftHasAnimatedRef.current) animateLeftColumn();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(safetyTimeout);
        };
    }, [isInView, isLeftInView]);

    return {
        setIntersectionRef,
        setLeftIntersectionRef,
    };
}
