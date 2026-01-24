"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Github, Phone, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
    const containerRef = React.useRef<HTMLElement>(null);
    const [aosMounted, setAosMounted] = useState(false);

    useEffect(() => {
        setAosMounted(true);
        AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yInfo = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const yForm = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            message: "",
        };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setErrors({ name: "", email: "", message: "" });
            } else {
                setSubmitStatus("error");
            }

            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } catch (error) {
            setSubmitStatus("error");
            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: "keerthigro123@gmail.com",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "github.com/Keerthivasan0517",
            color: "from-purple-500 to-pink-500",
        },
    ];

    return (
        <section ref={containerRef} id="contact" className="py-24 px-6 relative overflow-hidden bg-black">
            {/* Background elements */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Section */}
                    <motion.div style={{ y: yInfo }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            data-aos="fade-up"
                            className="inline-block mb-4 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium"
                        >
                            Get In Touch
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
                        >
                            Let&apos;s build{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                something great
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            data-aos="fade-up"
                            data-aos-delay="150"
                            className="text-zinc-400 mb-12 leading-relaxed text-lg"
                        >
                            Have a project in mind? Or just want to say hi? I'm always open to discussing new projects,
                            creative ideas, and opportunities to make an impact.
                        </motion.p>

                        {/* Contact Methods */}
                        <div className="space-y-4 mb-12">
                            {contactMethods.map((method, idx) => {
                                const Icon = method.icon;
                                return (
                                    <motion.a
                                        key={idx}
                                        href={idx === 0 ? `mailto:${method.value}` : `https://${method.value}`}
                                        target={idx !== 0 ? "_blank" : undefined}
                                        rel={idx !== 0 ? "noopener noreferrer" : undefined}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 10 }}
                                        data-aos="fade-up"
                                        data-aos-delay={200 + idx * 50}
                                        className="group flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                                    >
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center text-white`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">
                                                {method.label}
                                            </p>
                                            <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                                {method.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-sm text-zinc-500 font-medium">Follow me:</span>
                            <motion.a
                                href="https://github.com/Keerthivasan0517"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full border border-white/20 bg-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
                            >
                                <Github className="w-5 h-5 text-white" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right Section - Form */}
                    <motion.div style={{ y: yForm }}>
                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            data-aos="zoom-in"
                            className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm relative overflow-hidden"
                            onSubmit={handleSubmit}
                        >
                            {/* Animated gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                whileInView={{ opacity: 0.1 }}
                            />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6 text-white">Send me a message</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Name Field */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                                            Name <span className="text-red-400">*</span>
                                        </label>
                                        <motion.input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            whileFocus={{ scale: 1.02 }}
                                            className={`w-full bg-white/5 border ${
                                                errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10"
                                            } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-blue-500/5 transition-all outline-none`}
                                        />
                                        {errors.name && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* Email Field */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <motion.input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            whileFocus={{ scale: 1.02 }}
                                            className={`w-full bg-white/5 border ${
                                                errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10"
                                            } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-blue-500/5 transition-all outline-none`}
                                        />
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Message Field */}
                                <motion.div
                                    className="space-y-2 mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                                        Message <span className="text-red-400">*</span>
                                    </label>
                                    <motion.textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                        whileFocus={{ scale: 1.02 }}
                                        className={`w-full bg-white/5 border ${
                                            errors.message ? "border-red-500/50 bg-red-500/5" : "border-white/10"
                                        } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-blue-500/5 transition-all outline-none resize-none`}
                                    />
                                    {errors.message && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-xs flex items-center gap-1"
                                        >
                                            <AlertCircle size={12} />
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Status Messages */}
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3 text-green-400"
                                    >
                                        <CheckCircle size={20} className="flex-shrink-0" />
                                        <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                                    </motion.div>
                                )}

                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400"
                                    >
                                        <AlertCircle size={20} className="flex-shrink-0" />
                                        <span className="text-sm font-medium">Something went wrong. Please try again later.</span>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                                    <motion.div whileHover={{ x: 5 }}>
                                        <Send size={18} />
                                    </motion.div>
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
