"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Code, Database, Layout, Server, Settings, Zap } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const skillCategories = [
    {
        title: "Backend Development",
        icon: <Server className="text-white w-6 h-6" />,
        skills: [
            { name: "Python", level: 90 },
            { name: "Django", level: 85 },
            { name: "FastAPI", level: 80 },
            { name: "PostgreSQL", level: 75 },
            { name: "REST APIs", level: 88 },
        ],
        gradient: "from-blue-500/30 to-cyan-500/30",
        color: "blue",
    },
    {
        title: "Frontend Engineering",
        icon: <Layout className="text-white w-6 h-6" />,
        skills: [
            { name: "HTML", level: 95 },
            { name: "CSS", level: 90 },
            { name: "JavaScript", level: 88 },
            { name: "React", level: 87 },
            { name: "Next.js", level: 82 },
        ],
        gradient: "from-purple-500/30 to-pink-500/30",
        color: "purple",
    },
    {
        title: "DevOps & Tools",
        icon: <Settings className="text-white w-6 h-6" />,
        skills: [
            { name: "Git", level: 90 },
            { name: "GitHub Actions", level: 75 },
            { name: "Docker", level: 78 },
        ],
        gradient: "from-emerald-500/30 to-teal-500/30",
        color: "emerald",
    },
];

const SkillCard = ({ category, index }: { category: any; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const colorMap: { [key: string]: string } = {
        blue: "from-blue-500 to-cyan-500",
        purple: "from-purple-500 to-pink-500",
        emerald: "from-emerald-500 to-teal-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ transform: "translateZ(-10px)" }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-white/10 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Icon with animation */}
                <motion.div
                    whileHover={{ scale: 1.15, rotate: 10, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[category.color]} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-white/20 transition-all shadow-md`}
                >
                    {category.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-6 group-hover:text-white transition-colors">
                    {category.title}
                </h3>

                <div className="space-y-5">
                    {category.skills.map((skill: any, idx: number) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + idx * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-center mb-2.5">
                                <motion.span
                                    className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                >
                                    {skill.name}
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.15 + idx * 0.08 + 0.2 }}
                                    viewport={{ once: true }}
                                    className={`text-xs font-bold bg-gradient-to-r ${colorMap[category.color]} bg-clip-text text-transparent`}
                                >
                                    {skill.level}%
                                </motion.span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{
                                        duration: 1.2,
                                        delay: index * 0.15 + idx * 0.08 + 0.3,
                                        ease: "easeOut",
                                    }}
                                    viewport={{ once: true }}
                                    className={`h-full bg-gradient-to-r ${colorMap[category.color]} rounded-full relative shadow-lg`}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white/40"
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
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

    const yParticles = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Fixed particle positions to avoid hydration mismatch
    const particlePositions = [
        { x: 10, y: 20 }, { x: 85, y: 15 }, { x: 30, y: 60 }, { x: 70, y: 80 },
        { x: 50, y: 30 }, { x: 20, y: 75 }, { x: 90, y: 45 }, { x: 15, y: 90 },
        { x: 65, y: 25 }, { x: 40, y: 70 }, { x: 80, y: 55 }, { x: 25, y: 40 },
        { x: 55, y: 85 }, { x: 35, y: 10 }, { x: 75, y: 65 }, { x: 45, y: 50 },
        { x: 60, y: 35 }, { x: 12, y: 55 }, { x: 88, y: 72 }, { x: 48, y: 18 },
    ];

    return (
        <section ref={containerRef} id="skills" className="py-24 px-6 bg-black relative overflow-hidden">
            {/* Animated background particles with scroll parallax */}
            <motion.div style={{ y: yParticles }} className="absolute inset-0 overflow-hidden pointer-events-none">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full blur-sm"
                        initial={{
                            x: `${pos.x}%`,
                            y: `${pos.y}%`,
                        }}
                        animate={{
                            y: [`${pos.y}%`, `${(pos.y + 30) % 100}%`],
                            opacity: [0.2, 0.8, 0.2],
                            x: [`${pos.x}%`, `${(pos.x + 10) % 100}%`],
                        }}
                        transition={{
                            duration: 15 + (i % 10),
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </motion.div>

            <motion.div style={{ y: yContent }} className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        data-aos="fade-up"
                        className="inline-block mb-4 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium"
                    >
                        <Zap className="w-4 h-4 inline mr-2" />
                        Tech Stack
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl md:text-6xl font-display font-bold mb-4"
                    >
                        Technical <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-zinc-400 max-w-3xl mx-auto text-lg"
                    >
                        A comprehensive toolkit I've mastered to build scalable, performant, and user-centric applications.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, idx) => (
                        <SkillCard key={category.title} category={category} index={idx} />
                    ))}
                </div>

                {/* Additional Tech Icons - Floating */}
                <motion.div
                    className="mt-20 pt-20 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-center text-zinc-400 mb-8 text-sm font-medium uppercase tracking-widest">
                        Also proficient with
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {["Bootstrap", "Tailwind CSS", "API Design", "Database", "Cloud", "Testing"].map(
                            (tech, idx) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-center cursor-pointer"
                                    data-aos="fade-up"
                                    data-aos-delay={idx * 50}
                                >
                                    <p className="text-sm font-medium text-zinc-300">{tech}</p>
                                </motion.div>
                            )
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Skills;
