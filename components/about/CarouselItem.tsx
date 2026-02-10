"use client";

import { useRef, useState } from "react";
import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Mesh, Group } from "three";

export interface CarouselItemProps {
    item: any;
    position: [number, number, number];
    rotation: [number, number, number];
    index?: number;
    total?: number;
}

export function CarouselItem({ item, position, rotation }: CarouselItemProps) {
    const groupRef = useRef<Group>(null);
    const [hovered, setHover] = useState(false);

    useFrame(() => {
        if (!groupRef.current) return;
        const targetScale = hovered ? 1.08 : 1;
        groupRef.current.scale.x = MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
        groupRef.current.scale.y = MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
        groupRef.current.scale.z = MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <mesh
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <Image
                    url={item.image}
                    transparent
                    side={2}
                    scale={[1.8, 2.7]}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}
