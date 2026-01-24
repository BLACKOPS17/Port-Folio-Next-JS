"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import Image from "next/image";

const certifications = [
    {
        title: "Full Stack Web Development",
        platform: "freeCodeCamp",
        year: "2024",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&q=80",
        description: "Comprehensive certification covering modern web development with HTML, CSS, JavaScript, React, and backend technologies",
        skills: ["HTML5", "CSS3", "JavaScript", "React"],
    },
    {
        title: "Python Programming Fundamentals",
        platform: "Coursera",
        year: "2023",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop&q=80",
        description: "Professional certification in Python programming, data structures, algorithms, and object-oriented programming principles",
        skills: ["Python", "OOP", "Data Structures"],
    },
    {
        title: "Responsive Web Design",
        platform: "freeCodeCamp",
        year: "2023",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop&q=80",
        description: "Advanced certification in creating responsive, mobile-first web applications with modern CSS frameworks and best practices",
        skills: ["Responsive Design", "CSS Grid", "Flexbox"],
    },
];

const CertificationCard = ({ cert, index }: { cert: any; index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group perspective-1000"
        >
            <motion.div
                className="relative h-full cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="relative h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front of card */}
                    <div
                        className="absolute inset-0 rounded-3xl bg-zinc-900/50 border border-white/5 overflow-hidden backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {/* Animated glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

                            {/* Year badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                                viewport={{ once: true }}
                                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-bold text-white"
                            >
                                {cert.year}
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="p-6 relative">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-white/10 transition-shadow"
                            >
                                <Award className="text-white" size={24} />
                            </motion.div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                                {cert.title}
                            </h3>

                            <p className="text-sm text-zinc-400 mb-3">{cert.platform}</p>

                            <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                                {cert.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                <span>Click to view details</span>
                                <ExternalLink size={12} />
                            </div>
                        </div>

                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 rounded-3xl border border-white/20" />
                        </div>
                    </div>

                    {/* Back of card */}
                    <div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-6 flex flex-col items-center justify-center text-center backface-hidden"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <Award className="text-white mb-4" size={48} />
                        <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                        <p className="text-zinc-400 mb-4 text-sm">{cert.description}</p>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <span className="font-bold">Platform:</span>
                                <span>{cert.platform}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500">
                                <span className="font-bold">Year:</span>
                                <span>{cert.year}</span>
                            </div>
                        </div>
                        {cert.skills && (
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {cert.skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-zinc-800/50 text-xs text-zinc-400 border border-white/5"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-2 px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors"
                        >
                            View Certificate
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const Certifications = () => {
    // Fixed particle positions to avoid hydration mismatch
    const particlePositions = [
        { x: 15, y: 25 }, { x: 80, y: 10 }, { x: 35, y: 65 }, { x: 65, y: 85 },
        { x: 45, y: 35 }, { x: 25, y: 70 }, { x: 85, y: 50 }, { x: 10, y: 88 },
        { x: 70, y: 20 }, { x: 40, y: 75 }, { x: 90, y: 60 }, { x: 20, y: 45 },
        { x: 60, y: 90 }, { x: 30, y: 15 }, { x: 75, y: 68 },
    ];

    return (
        <section id="certifications" className="py-24 px-6 bg-black relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full"
                        initial={{
                            x: `${pos.x}%`,
                            y: `${pos.y}%`,
                        }}
                        animate={{
                            x: [`${pos.x}%`, `${(pos.x + 20) % 100}%`],
                            y: [`${pos.y}%`, `${(pos.y + 25) % 100}%`],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + (i % 5),
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4"
                    >
                        Achievements
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Certifications & <span className="text-zinc-500">Credentials</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-zinc-500 max-w-2xl mx-auto"
                    >
                        Professional certifications and courses that validate my expertise in modern technologies.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <CertificationCard key={cert.title} cert={cert} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
