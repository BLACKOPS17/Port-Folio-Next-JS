"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
    {
        role: "Senior Full-Stack Developer",
        company: "TechFlow Solutions",
        period: "2022 - Present",
        description: "Leading the development of scalable microservices in Python and architecting modern frontends with Next.js. Optimized database performance by 40%.",
    },
    {
        role: "Python Backend Developer",
        company: "DataKernel Inc.",
        period: "2020 - 2022",
        description: "Designed and implemented REST APIs for high-traffic applications. Integrated third-party services and automated CI/CD pipelines.",
    },
    {
        role: "Full-Stack Developer",
        company: "StartUp Hub",
        period: "2018 - 2020",
        description: "Developed end-to-end features for a SaaS platform. Worked closely with designers to ensure pixel-perfect implementation of UI/UX.",
    },
];

const Experience = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <section ref={containerRef} id="experience" className="py-24 px-6 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div style={{ y: yTitle }} className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4">
                        Professional Journey
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold">
                        Experience & <span className="text-zinc-500">History.</span>
                    </h3>
                </motion.div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-800 transform -translate-x-1/2" />
                    
                    {experiences.map((exp, idx) => {
                        // Independent parallax for each card
                        const yCard = useTransform(
                            scrollYProgress,
                            [0, 1],
                            [100 * (idx + 1), -100 * (idx + 1)]
                        );

                        return (
                            <motion.div
                                key={idx}
                                style={{ y: yCard }}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                            >
                                {/* Timeline dot */}
                                <div className="hidden md:flex items-start justify-center w-1/2">
                                    <div className="absolute top-8 w-5 h-5 rounded-full bg-black border-4 border-white shadow-lg shadow-white/20" />
                                </div>

                                {/* Content card */}
                                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                                    <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
                                            {exp.period}
                                        </span>
                                        <h4 className="text-lg md:text-xl font-bold mb-2 text-white">{exp.role}</h4>
                                        <p className="text-zinc-400 font-medium mb-4 text-sm md:text-base">{exp.company}</p>
                                        <p className="text-zinc-500 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
