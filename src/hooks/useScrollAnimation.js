// Scroll Animation Hook
import { useEffect } from 'react';

export const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe all elements with scroll-animate class
        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};
