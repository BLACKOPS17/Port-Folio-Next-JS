"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <footer ref={footerRef} className="py-12 px-6 border-t border-white/5 bg-black overflow-hidden">
            <motion.div style={{ y }} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <Link href="/" className="text-xl font-display font-bold tracking-tighter text-white">
                    DEV<span className="text-zinc-500">.</span>PY
                </Link>

                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} All rights reserved. Built with Next.js & Framer Motion.
                </p>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                        <Github size={20} />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                        <Twitter size={20} />
                    </Link>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
