import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const useAOS = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
            offset: 120,
        });

        // Refresh AOS when DOM changes
        return () => {
            AOS.refresh();
        };
    }, []);
};
