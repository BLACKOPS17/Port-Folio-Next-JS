"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Zap, Target } from "lucide-react";

const About = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [aosMounted, setAosMounted] = useState(false);

    useEffect(() => {
        setAosMounted(true);
        AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const ySubHeading = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const yMainHeading = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const rotateImage = useTransform(scrollYProgress, [0, 1], [-8, 8]);
    const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

    const skillHighlights = [
        { icon: <Code className="w-5 h-5" />, title: "Clean Code", description: "Writing maintainable and well-documented code" },
        { icon: <Zap className="w-5 h-5" />, title: "Performance", description: "Optimizing applications for speed and efficiency" },
        { icon: <Target className="w-5 h-5" />, title: "Precision", description: "Pixel-perfect implementation of UI/UX designs" },
    ];

    return (
        <section ref={containerRef} id="about" className="relative py-24 px-6 overflow-hidden bg-black">
            {/* Background parallax elements */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10"
            />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            style={{ y: ySubHeading }}
                            data-aos="fade-up"
                            className="text-sm font-bold tracking-[0.2em] uppercase text-blue-400 mb-4"
                        >
                            Behind the Code
                        </motion.h2>
                        <motion.h3
                            style={{ y: yMainHeading }}
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight"
                        >
                            Passionate about{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                scalable architecture
                            </span>
                        </motion.h3>

                        <motion.p
                            data-aos="fade-up"
                            data-aos-delay="150"
                            className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6"
                        >
                            I'm a Python Full-Stack Developer fresher with strong hands-on experience from real-world projects and a 6+ month internship. I specialize in building efficient, scalable applications with clean architecture and optimal performance.
                        </motion.p>

                        <motion.p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8"
                        >
                            From crafting robust REST APIs to designing responsive frontends, I focus on creating reliable applications with attention to detail and user experience.
                        </motion.p>

                        {/* Skill Highlights */}
                        <div className="space-y-4">
                            {skillHighlights.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    data-aos="fade-up"
                                    data-aos-delay={250 + idx * 50}
                                    className="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{skill.title}</h4>
                                        <p className="text-sm text-zinc-400">{skill.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Image/Visual */}
                    <motion.div
                        style={{ rotate: rotateImage, scale: scaleImage }}
                        className="relative"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        {/* Main Card */}
                        <motion.div
                            whileHover={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative aspect-square max-w-md mx-auto lg:max-w-none"
                        >
                            {/* Decorative border */}
                            <div className="absolute -inset-1 rounded-3xl border border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Main image card */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 backdrop-blur-sm p-8 flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-center"
                                >
                                    <div className="text-8xl md:text-9xl font-display font-bold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                        PY
                                    </div>
                                    <p className="text-zinc-300 text-sm font-medium">Python Developer</p>
                                </motion.div>
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-blue-500/20 pointer-events-none"
                            />
                            <motion.div
                                animate={{
                                    rotate: -360,
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-purple-500/20 pointer-events-none"
                            />

                            {/* Floating stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-8 text-center"
                            >
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">6+</p>
                                    <p className="text-xs text-zinc-400 uppercase tracking-wide">Months Internship</p>
                                </div>
                                <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <div>
                                    <p className="text-2xl font-bold text-purple-400">10+</p>
                                    <p className="text-xs text-zinc-400 uppercase tracking-wide">Projects Completed</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
