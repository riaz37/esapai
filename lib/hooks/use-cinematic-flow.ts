import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { RefObject } from "react";

interface UseCinematicFlowProps {
    containerRef: RefObject<HTMLDivElement | null>;
    bgRef: RefObject<HTMLDivElement | null>;
    problemSceneRefs: RefObject<(HTMLDivElement | null)[]>;
    problemTitleRefs: RefObject<(HTMLDivElement | null)[]>;
    problemDescRefs: RefObject<(HTMLDivElement | null)[]>;
    cardsStageRef: RefObject<HTMLDivElement | null>;
    cardWrapperRefs: RefObject<(HTMLDivElement | null)[]>;
    flipperRefs: RefObject<(HTMLDivElement | null)[]>;
    solTitleRefs: RefObject<(HTMLDivElement | null)[]>;
    solDescRefs: RefObject<(HTMLParagraphElement | null)[]>;
    wipeRef: RefObject<HTMLDivElement | null>;
    assistantRef: RefObject<HTMLDivElement | null>;
    setAssistantState: (state: "problem" | "solution") => void;
    dir: number;
    slug: string;
}

export function useCinematicFlow({
    containerRef,
    bgRef,
    problemSceneRefs,
    problemTitleRefs,
    problemDescRefs,
    cardsStageRef,
    cardWrapperRefs,
    flipperRefs,
    solTitleRefs,
    solDescRefs,
    wipeRef,
    assistantRef,
    setAssistantState,
    dir,
    slug,
}: UseCinematicFlowProps) {
    useGSAP(
        () => {
            if (!containerRef.current) return;
            const reduced = prefersReducedMotion();
            const flippers = flipperRefs.current.filter(Boolean);

            if (reduced) {
                gsap.set(bgRef.current, { filter: "none" });
                problemSceneRefs.current.forEach((s, i) => {
                    if (i === 0) {
                        if (s) gsap.set(s, { opacity: 1, x: 0 });
                        if (problemTitleRefs.current[i])
                            gsap.set(problemTitleRefs.current[i], { opacity: 1, y: 0 });
                        if (problemDescRefs.current[i])
                            gsap.set(problemDescRefs.current[i], { opacity: 1, y: 0 });
                    } else if (s) gsap.set(s, { opacity: 0 });
                });
                gsap.set(cardsStageRef.current, { opacity: 1 });
                cardWrapperRefs.current.forEach((w) => w && gsap.set(w, { opacity: 1 }));
                flippers.forEach((f) => f && gsap.set(f, { rotationY: 180 }));
                solTitleRefs.current.forEach((r) => r && gsap.set(r, { opacity: 1, y: 0 }));
                solDescRefs.current.forEach((r) => r && gsap.set(r, { opacity: 1, y: 0 }));
                if (wipeRef.current) gsap.set(wipeRef.current, { clipPath: "inset(0 0 100% 0)" });
                if (assistantRef.current)
                    gsap.set(assistantRef.current, {
                        opacity: 0.6,
                        insetInlineEnd: "10%",
                        insetInlineStart: "auto",
                        yPercent: 0,
                    });
                setAssistantState("solution");
                return;
            }

            // Initial state
            gsap.set(assistantRef.current, {
                opacity: 0,
                top: "45%",
                left: "50%",
                xPercent: -50,
                yPercent: -150,
                scale: 1,
            });
            problemSceneRefs.current.forEach((s, i) => {
                if (s) gsap.set(s, { opacity: 0, x: i === 1 ? dir * 80 : dir * -80 });
                if (problemTitleRefs.current[i])
                    gsap.set(problemTitleRefs.current[i], { opacity: 0, y: 8 });
                if (problemDescRefs.current[i])
                    gsap.set(problemDescRefs.current[i], { opacity: 0, y: 8 });
            });
            gsap.set(cardsStageRef.current, { opacity: 0 });
            cardWrapperRefs.current.forEach((w) => w && gsap.set(w, { opacity: 0 }));
            solTitleRefs.current.forEach((r) => r && gsap.set(r, { opacity: 0, y: 8 }));
            solDescRefs.current.forEach((r) => r && gsap.set(r, { opacity: 0, y: 8 }));

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // Direct Entry: Marco drops and first problem reveals
            tl.addLabel("problem1");
            tl.to(
                assistantRef.current,
                {
                    opacity: 0.7,
                    xPercent: -50,
                    x: `${dir * 20}vw`,
                    yPercent: 0,
                    duration: 1.2,
                    ease: "back.out(1.2)",
                    force3D: true,
                },
                "problem1"
            );

            if (problemSceneRefs.current[0]) {
                tl.to(
                    problemSceneRefs.current[0],
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power4.out",
                    },
                    "problem1+=0.3"
                );
            }
            if (problemTitleRefs.current[0]) {
                tl.to(
                    problemTitleRefs.current[0],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power4.out",
                    },
                    "problem1+=0.5"
                );
            }
            if (problemDescRefs.current[0]) {
                tl.to(
                    problemDescRefs.current[0],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power4.out",
                    },
                    "problem1+=0.7"
                );
            }

            tl.to({}, { duration: 0.8 }); // Hold

            // Transition to Problem 2
            tl.addLabel("problem2");
            tl.to(
                assistantRef.current,
                { x: `${dir * -20}vw`, duration: 1.2, ease: "power3.inOut" },
                "problem2"
            );
            if (problemSceneRefs.current[0]) {
                tl.to(
                    problemSceneRefs.current[0],
                    { opacity: 0, x: dir * -60, duration: 0.6, ease: "power3.in" },
                    "problem2"
                );
            }
            if (problemSceneRefs.current[1]) {
                tl.to(
                    problemSceneRefs.current[1],
                    { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" },
                    "problem2+=0.4"
                );
            }
            if (problemTitleRefs.current[1]) {
                tl.to(
                    problemTitleRefs.current[1],
                    { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" },
                    "problem2+=0.6"
                );
            }
            if (problemDescRefs.current[1]) {
                tl.to(
                    problemDescRefs.current[1],
                    { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
                    "problem2+=0.8"
                );
            }

            tl.to({}, { duration: 0.8 }); // Hold

            // Transition to Problem 3
            tl.addLabel("problem3");
            tl.to(
                assistantRef.current,
                { x: `${dir * 20}vw`, scale: 1.2, duration: 1.2, ease: "power3.inOut" },
                "problem3"
            );
            if (problemSceneRefs.current[1]) {
                tl.to(
                    problemSceneRefs.current[1],
                    { opacity: 0, x: dir * 60, duration: 0.6, ease: "power3.in" },
                    "problem3"
                );
            }
            if (problemSceneRefs.current[2]) {
                tl.to(
                    problemSceneRefs.current[2],
                    { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" },
                    "problem3+=0.4"
                );
            }
            if (problemTitleRefs.current[2]) {
                tl.to(
                    problemTitleRefs.current[2],
                    { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" },
                    "problem3+=0.6"
                );
            }
            if (problemDescRefs.current[2]) {
                tl.to(
                    problemDescRefs.current[2],
                    { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
                    "problem3+=0.8"
                );
            }

            tl.to({}, { duration: 1 }); // Hold

            // Direct transition to Solution
            tl.addLabel("solution");
            if (problemSceneRefs.current[2]) {
                tl.to(
                    problemSceneRefs.current[2],
                    { opacity: 0, x: dir * -60, duration: 0.7, ease: "power3.in" },
                    "solution"
                );
            }

            // Marco transforms and moves to final position (shifted down)
            tl.to(
                assistantRef.current,
                {
                    x: 0,
                    y: "20vh",
                    scale: 0.55,
                    duration: 1.2,
                    ease: "power3.inOut",
                    onStart: () => setAssistantState("solution"),
                    onReverseComplete: () => setAssistantState("problem"),
                    force3D: true,
                },
                "solution"
            );

            // Reveal Solution Stage (shifted up)
            tl.fromTo(
                cardsStageRef.current,
                { y: "15vh", opacity: 0 },
                { y: "-18vh", opacity: 1, duration: 1.2, ease: "power3.inOut" },
                "solution"
            );

            cardWrapperRefs.current.forEach((el, i) => {
                if (el) tl.to(el, { opacity: 1, duration: 0.4 }, `solution+=${0.5 + i * 0.1}`);
            });

            tl.to(
                flippers,
                {
                    rotationY: 180,
                    duration: 1.4,
                    ease: "power4.inOut",
                    stagger: 0.15,
                    force3D: true,
                },
                "solution+=0.8"
            );

            // Staggered text reveal on solution side
            solTitleRefs.current.forEach((r, i) => {
                if (r) {
                    tl.to(
                        r,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power4.out",
                        },
                        `solution+=${1.4 + i * 0.15}`
                    );
                }
            });
            solDescRefs.current.forEach((r, i) => {
                if (r) {
                    tl.to(
                        r,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power4.out",
                        },
                        `solution+=${1.6 + i * 0.15}`
                    );
                }
            });

            tl.addLabel("exit", "+=1.5");
            tl.to(assistantRef.current, { opacity: 0, y: "20vh", duration: 0.8, ease: "power3.in" }, "exit");
            tl.to(cardsStageRef.current, { opacity: 0, y: "-20vh", duration: 1, ease: "power3.in" }, "exit");
            tl.to(bgRef.current, { opacity: 0, duration: 1.2 }, "exit");
            tl.fromTo(
                wipeRef.current,
                { clipPath: "inset(0 0 0% 0)" },
                { clipPath: "inset(0 0 100% 0)", duration: 1.5, ease: "power3.inOut" },
                "exit+=0.5"
            );
        },
        { scope: containerRef, dependencies: [slug, dir] }
    );
}
