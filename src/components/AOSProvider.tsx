"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
            offset: 120,
        });

        return () => {
            AOS.refresh();
        };
    }, []);

    return <>{children}</>;
};
