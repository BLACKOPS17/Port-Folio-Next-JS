"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechFlow Solutions",
    period: "2022 - Present",
    description:
      "Leading the development of scalable microservices in Python and architecting modern frontends with Next.js. Optimized database performance by 40%.",
  },
  {
    role: "Python Backend Developer",
    company: "DataKernel Inc.",
    period: "2020 - 2022",
    description:
      "Designed and implemented REST APIs for high-traffic applications. Integrated third-party services and automated CI/CD pipelines.",
  },
  {
    role: "Full-Stack Developer",
    company: "StartUp Hub",
    period: "2018 - 2020",
    description:
      "Developed end-to-end features for a SaaS platform. Worked closely with designers to ensure pixel-perfect UI/UX.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Professional Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            Experience & <span className="text-zinc-500">History</span>
          </h3>
        </div>

        {/* Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-700" />

        <div className="space-y-16">
          {experiences.map((exp, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

            return (
              <motion.div
                key={i}
                style={{ y }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-4 border-white" />

                {/* Card */}
                <div className="md:w-1/2">
                  <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition">
                    <span className="text-xs uppercase tracking-widest text-zinc-500">
                      {exp.period}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">
                      {exp.role}
                    </h4>
                    <p className="text-zinc-400 mb-4">{exp.company}</p>
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
}
