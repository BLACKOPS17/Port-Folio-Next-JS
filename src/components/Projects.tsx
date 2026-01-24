"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Zap } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
    {
        title: "E-Commerce Frontend Website",
        description: "Responsive and user-friendly e-commerce frontend built with modern UI practices, featuring product listings, cart functionality, and smooth user interactions.",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        link: "https://keerthivasan0517.github.io/Front-end-E-Commerce/",
        github: "https://github.com/Keerthivasan0517/Front-end-E-Commerce",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop&q=80",
    },
    {
        title: "EcoLink Dashboard",
        description: "A sustainable energy monitoring dashboard with real-time analytics and predictive modeling.",
        tags: ["Next.js", "TypeScript", "Django", "PostgreSQL"],
        link: "#",
        github: "https://github.com/Keerthivasan0517/EcoLink-Dashboard",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
    },
    {
        title: "CryptoPort API",
        description: "Secure and scalable REST API for cryptocurrency portfolio management and live tracking.",
        tags: ["Python", "Docker", "AWS", "CoinGecko API"],
        link: "#",
        github: "#",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&q=80",
    },
];

const Projects = () => {
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

    const yBackground1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const yBackground2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yContent = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section ref={containerRef} id="projects" className="py-24 px-6 overflow-hidden relative bg-black">
            {/* Decorative background elements with parallax */}
            <motion.div
                style={{ y: yBackground1 }}
                className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: yBackground2 }}
                className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
            />

            <motion.div style={{ y: yContent }} className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            data-aos="fade-up"
                            className="text-sm font-bold tracking-[0.2em] uppercase text-blue-400 mb-4"
                        >
                            Recent Work
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
                        >
                            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
                        </motion.h3>
                    </div>
                    <motion.a
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        href="https://github.com/Keerthivasan0517"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-4 py-2"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <span className="text-sm font-medium">View All Projects</span>
                        <motion.div whileHover={{ x: 5 }}>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </motion.a>
                </div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            whileHover={{ y: -12 }}
                            className="group relative h-full"
                            data-aos="zoom-in-up"
                            data-aos-delay={idx * 100}
                        >
                            <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                                    {/* Gradient overlay on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />

                                    {/* Project image */}
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-125 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-5xl font-bold">
                                            {project.title.split(" ")[0]}
                                        </div>
                                    )}

                                    {/* Shine effect */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </motion.div>

                                    {/* Action buttons overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <div className="flex gap-3">
                                            {project.link && project.link !== "#" && (
                                                <motion.a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-3 rounded-full bg-white text-black hover:bg-blue-400 transition-colors"
                                                >
                                                    <ExternalLink size={20} />
                                                </motion.a>
                                            )}
                                            {project.github && project.github !== "#" && (
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                                                >
                                                    <Github size={20} />
                                                </motion.a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <motion.h4
                                            className="text-lg md:text-xl font-bold mb-3 group-hover:text-white transition-colors flex items-center gap-2"
                                            whileHover={{ x: 5 }}
                                        >
                                            {project.title}
                                            <Zap className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.h4>
                                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIdx) => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: tagIdx * 0.05 }}
                                                viewport={{ once: true }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-blue-300 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Projects;
