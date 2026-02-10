"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Loader } from "@react-three/drei";
import { Suspense, useState } from "react";
import { CarouselScene } from "./CarouselScene";
import { teamMembers } from "./team-data";
import { AnimatePresence, motion } from "motion/react";

export function TeamCarousel() {
    const [activeMember, setActiveMember] = useState(teamMembers[0]);

    return (
        <div className="relative w-full bg-black">
            {/* Scrollytelling Section */}
            <div className="carousel-track h-[250vh] relative">

                {/* Sticky Container — full viewport, pinned */}
                <div className="sticky top-0 h-screen w-full">

                    {/* 3D Canvas — fills ENTIRE viewport */}
                    <Canvas
                        camera={{ position: [0, 0.5, 13], fov: 50 }}
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    >
                        <Suspense fallback={null}>
                            <color attach="background" args={["#000000"]} />
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="city" />

                            <CarouselScene
                                items={teamMembers}
                                onActiveChange={setActiveMember}
                            />
                        </Suspense>
                    </Canvas>
                    <Loader />

                    {/* Title Overlay — positioned below the fixed navbar */}
                    <div className="absolute top-28 left-0 w-full z-10 px-6 text-center pointer-events-none">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30 mb-2"
                        >
                            The Architects of Intelligence
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-white/40 max-w-xl mx-auto text-xs md:text-sm"
                        >
                            Meet the minds building the next generation of autonomous agents.
                        </motion.p>
                    </div>

                    {/* Member Info Overlay — at the bottom */}
                    <div className="absolute bottom-6 left-0 right-0 z-10 pointer-events-none flex justify-center px-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeMember.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center max-w-md w-full"
                            >
                                <div className="inline-block px-3 py-1 mb-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">
                                        {activeMember.role}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                    {activeMember.name}
                                </h2>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {activeMember.bio}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/15 text-[9px] tracking-widest uppercase animate-pulse z-10">
                        Scroll to Rotate
                    </div>
                </div>
            </div>
        </div>
    );
}
