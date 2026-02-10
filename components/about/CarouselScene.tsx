"use client";

import { useRef, useEffect } from "react";
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

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        if (!groupRef.current) return;

        // INTRO ANIMATION
        const tl = gsap.timeline();
        tl.from(groupRef.current.rotation, {
            y: Math.PI * 2,
            duration: 2.5,
            ease: "power3.out",
        }, 0);
        tl.from(groupRef.current.position, {
            y: -3,
            duration: 2,
            ease: "power3.out",
        }, 0);

        // SCROLL ANIMATION
        const proxy = { rotation: 0 };

        const rotationTween = gsap.to(proxy, {
            rotation: Math.PI * 2 * 3,
            ease: "none",
            scrollTrigger: {
                trigger: ".carousel-track",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
            onUpdate: () => {
                if (groupRef.current) {
                    groupRef.current.rotation.y = proxy.rotation;
                    rotationRef.current = proxy.rotation;
                }
            },
        });

        return () => {
            rotationTween.kill();
        };
    }, []);

    useFrame(() => {
        // PARALLAX
        if (starsRef.current) {
            starsRef.current.rotation.x = gsap.utils.interpolate(starsRef.current.rotation.x, mouse.current.y * 0.05, 0.05);
            starsRef.current.rotation.y = gsap.utils.interpolate(starsRef.current.rotation.y, mouse.current.x * 0.05, 0.05);
        }

        // ACTIVE ITEM
        const currentRot = rotationRef.current;
        let minDiff = Infinity;
        let activeIndex = 0;

        for (let i = 0; i < count; i++) {
            let angle = (i * angleStep + currentRot) % (Math.PI * 2);
            if (angle < 0) angle += Math.PI * 2;
            const diff = Math.min(angle, Math.PI * 2 - angle);
            if (diff < minDiff) {
                minDiff = diff;
                activeIndex = i;
            }
        }

        if (items[activeIndex]) {
            onActiveChange(items[activeIndex]);
        }
    });

    return (
        <>
            <group ref={starsRef}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* Carousel group raised slightly so cards appear in upper-center of viewport */}
            <group ref={groupRef} position={[0, 7.5, 0]}>
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
