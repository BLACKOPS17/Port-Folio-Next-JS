"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Sparkles, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 25,
                y: (e.clientY / window.innerHeight - 0.5) * 25,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Parallax floating elements */}
            <motion.div
                style={{ x: mousePosition.x, y: mousePosition.y }}
                className="absolute top-20 left-20 opacity-20"
            >
                <Code size={40} className="text-white" />
            </motion.div>
            <motion.div
                style={{ x: -mousePosition.x, y: -mousePosition.y }}
                className="absolute bottom-20 right-20 opacity-20"
            >
                <Sparkles size={40} className="text-white" />
            </motion.div>

            <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                {/* Availability badge with pulse */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-zinc-400">Available for new opportunities</span>
                </motion.div>

                {/* Main heading with gradient text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight"
                >
                    <span className="inline-block">
                        Building{" "}
                        <motion.span
                            className="relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent animate-gradient">
                                Digital
                            </span>
                            <motion.span
                                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.span>
                    </span>
                    <br />
                    <span className="text-zinc-500">Experiences</span>
                </motion.h1>

                {/* Subtitle with typing effect feel */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Full-stack developer crafting elegant solutions with{" "}
                    <span className="text-white font-semibold">Python</span>,{" "}
                    <span className="text-white font-semibold">React</span>, and{" "}
                    <span className="text-white font-semibold">Next.js</span>
                </motion.p>

                {/* CTA Buttons with magnetic effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 rounded-lg bg-white text-black font-semibold flex items-center gap-2 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <motion.span 
                            className="relative z-10"
                            whileHover={{ x: -5 }}
                        >
                            View Projects
                        </motion.span>
                        <motion.div 
                            className="relative z-10"
                            whileHover={{ x: 5 }}
                        >
                            <ArrowRight size={18} />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                    <motion.button
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 rounded-lg border-2 border-white/30 bg-white/5 text-white font-semibold backdrop-blur-sm transition-all duration-300"
                    >
                        Contact Me
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex items-center justify-center gap-4 mt-12"
                >
                    <motion.a 
                        href="https://github.com/Keerthivasan0517" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 transition-colors"
                    >
                        <Github size={20} className="text-white" />
                    </motion.a>
                    <motion.a 
                        href="#contact" 
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 transition-colors"
                    >
                        <Mail size={20} className="text-white" />
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: "100px 100px",
                    }}
                />
            </div>
        </section>
    );
};

export default Hero;
