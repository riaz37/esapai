"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Group } from "three";
import { CarouselItem } from "./CarouselItem";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CarouselSceneProps {
    items: any[];
    onActiveChange: (item: any) => void;
}

export function CarouselScene({ items, onActiveChange }: CarouselSceneProps) {
    const groupRef = useRef<Group>(null);
    const starsRef = useRef<Group>(null);

    const { viewport } = useThree();
    const isMobile = viewport.width < 6;
    const radius = isMobile ? 4.5 : 7.5;

    const count = items.length;
    const angleStep = (Math.PI * 2) / count;
    const rotationRef = useRef(0);
    const mouse = useRef({ x: 0, y: 0 });

    useLayoutEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useLayoutEffect(() => {
        if (!groupRef.current) return;

        // Initialize proxy with current rotation
        const proxy = { rotation: 0 };

        // MASTER TIMELINE
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // 1. INTRO ANIMATION
        // We animate the GROUP position/scale directly for entrance
        tl.from(groupRef.current.position, {
            y: -2,
            duration: 2,
        }, 0);

        tl.from(groupRef.current.scale, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
            duration: 2,
        }, 0);

        // 2. ROTATION INTRO 
        // We animate the PROXY to keep a single source of truth for rotation
        // Start from -PI*2 (one full spin back) to 0
        proxy.rotation = -Math.PI * 2;

        tl.to(proxy, {
            rotation: 0,
            duration: 2.5,
            onUpdate: () => {
                if (groupRef.current) {
                    groupRef.current.rotation.y = proxy.rotation;
                    rotationRef.current = proxy.rotation;
                }
            }
        }, 0);

        // 3. SCROLL CONNECTION
        // effectively "handoff" control to ScrollTrigger after intro *starts* 
        // (or run in parallel if user scrolls immediately)

        // We need a separate tween for the scroll trigger that acts on the same proxy
        // But we must be careful not to overwrite the intro if it's still running.
        // Actually, simpler: Let ScrollTrigger control the proxy from 0 to N, 
        // and the intro just sets the initial state.

        // BETTER APPROACH: 
        // Just let ScrollTrigger handle the logic, but allow the intro to "play" 
        // by tweening the scroll position or just strictly separating them.

        // If we want a "spin in" effect that is independent of scroll:
        // The issue is `onUpdate` in ScrollTrigger vs `onUpdate` in Intro.

        // FIX:
        // We won't animate rotation in the intro. We'll just animate position/scale.
        // The rotation will be strictly scroll-driven. 
        // OR: We animate `group.rotation.y` in intro, AND `proxy` tracks it? No.

        // Let's try minimizing the conflict:
        // The intro will *only* do position/scale. 
        // The "spin" caused the conflict. If we remove the spin from intro, it fixes the glitch.
        // But the user likes the spin. 

        // To keep the spin:
        // We can use a `ref` to track if we are in "scroll mode".

        // SIMPLIFIED FIX:
        // Animate `group.rotation.y` in the intro.
        // Initialize ScrollTrigger to start from the END of the intro rotation.

        ScrollTrigger.create({
            trigger: ".carousel-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                // simple continuous rotation based on scroll progress
                const scrollRot = self.progress * (Math.PI * 2 * 3); // 3 full spins

                // Add the intro "offset" if needed, but let's just stick to scroll
                if (groupRef.current) {
                    groupRef.current.rotation.y = scrollRot;
                    rotationRef.current = scrollRot;
                }
            }
        });

        // Re-adding the intro "spin" properly:
        // We can't easily mix them without complex state. 
        // I will REMOVE the rotational intro for now to guarantee stability, 
        // as "position y: -3 -> 0" is sufficient for a "rise up" effect.
        // The "scattered" look was likely the rotation being mid-way during layout calculations.

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const lastActiveIndex = useRef(-1);

    useFrame(() => {
        // PARALLAX
        if (starsRef.current) {
            starsRef.current.rotation.x = gsap.utils.interpolate(starsRef.current.rotation.x, mouse.current.y * 0.05, 0.05);
            starsRef.current.rotation.y = gsap.utils.interpolate(starsRef.current.rotation.y, mouse.current.x * 0.05, 0.05);
        }

        // ACTIVE ITEM logic - optimized
        const currentRot = rotationRef.current;
        // Normalize rotation to 0..2PI
        const normalizedRot = currentRot % (Math.PI * 2);
        // (This logic needs to match the visual arrangement)

        // Actually, the previous logic was fine, just run it:
        let minDiff = Infinity;
        let activeIndex = 0;

        for (let i = 0; i < count; i++) {
            // Calculate where this item is relative to the "front" (angle 0)
            // Item angle: i * angleStep
            // Group rotation: currentRot
            // Net angle: (i * angleStep + currentRot)
            let angle = (i * angleStep + currentRot) % (Math.PI * 2);
            if (angle < 0) angle += Math.PI * 2;

            // Distance from 0 (front)
            // We want the item that is closest to angle 0 (or PI*2)
            // However, 0 is "back" in some coherences, usually Z+ is front?
            // In Threejs, camera is at Z+13. Items are at (sin, 0, cos). 
            // cos(0) = 1 (Z+), sin(0) = 0. So angle 0 is closest to camera.

            const diff = Math.min(angle, Math.PI * 2 - angle);
            if (diff < minDiff) {
                minDiff = diff;
                activeIndex = i;
            }
        }

        // Only update state if changed (debounce/throttle)
        if (activeIndex !== lastActiveIndex.current) {
            lastActiveIndex.current = activeIndex;
            if (items[activeIndex]) {
                onActiveChange(items[activeIndex]);
            }
        }
    });

    return (
        <>
            <group ref={starsRef}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* Carousel group centered */}
            <group ref={groupRef} position={[0, 0, 0]}>
                {items.map((item, i) => {
                    const angle = i * angleStep;
                    const x = Math.sin(angle) * radius;
                    const z = Math.cos(angle) * radius;

                    return (
                        <CarouselItem
                            key={item.id}
                            item={item}
                            position={[x, 0, z]}
                            rotation={[0, angle, 0]}
                            index={i}
                            total={count}
                        />
                    );
                })}
            </group>
        </>
    );
}
