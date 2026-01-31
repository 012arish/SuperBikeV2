import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './ParallaxHero.css';

const slides = [
    {
        id: 1,
        name: 'Hayabusa',
        splitText: ['HAYA', 'BUSA'],
        colors: { left: 'gradient-orange', right: 'gradient-purple' },
        image: '/images/hayabusa_hero.png', // Fallback to hero naming if distinct needed
        // Using the assets we moved/have
    },
    {
        id: 2,
        name: 'Panigale V4',
        splitText: ['PANI', 'GALE'],
        colors: { left: 'gradient-red', right: 'gradient-white' },
        image: '/images/ducati_hero.png'
    },
    {
        id: 3,
        name: 'Ninja H2',
        splitText: ['NINJA', 'H2'],
        colors: { left: 'gradient-green', right: 'gradient-carbon' },
        image: '/images/kawasaki_hero.png'
    },
    {
        id: 4,
        name: 'BMW S1000RR',
        splitText: ['S1000', 'RR'],
        colors: { left: 'gradient-white', right: 'gradient-bmw' },
        image: '/images/bmw_hero.png'
    }
];

const ParallaxHero = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false); // New state for exit phase

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isExiting) nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentSlide, isExiting]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 2 - 1;
            const y = ((e.clientY - top) / height) * 2 - 1;
            setMousePos({ x, y });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (container) container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const nextSlide = () => {
        if (isExiting) return;
        setIsExiting(true); // Trigger exit animation

        // Wait for exit animation to finish (1.2s matches CSS)
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsExiting(false); // Reset to enter phase
        }, 1100);
    };

    const prevSlide = () => {
        if (isExiting) return;
        setIsExiting(true);

        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setIsExiting(false);
        }, 1100);
    };

    // Parallax Config
    const bikeSpeed = -5;
    const textSpeed = 10;

    const slide = slides[currentSlide];

    return (
        <div className="parallax-container" ref={containerRef}>
            <div className="info-badge">
                Parallax Split-Screen
            </div>

            {/* Slider Navigation */}
            <div className="slider-nav">
                <button className="nav-btn" onClick={prevSlide}>
                    <ChevronLeft size={20} />
                </button>
                <button className="nav-btn" onClick={nextSlide}>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dots */}
            <div className="slider-dots">
                {slides.map((s, idx) => (
                    <div
                        key={s.id}
                        className={`dot ${currentSlide === idx ? 'active' : ''}`}
                        onClick={() => {
                            if (!isExiting && idx !== currentSlide) {
                                setIsExiting(true);
                                setTimeout(() => {
                                    setCurrentSlide(idx);
                                    setIsExiting(false);
                                }, 1100);
                            }
                        }}
                    />
                ))}
            </div>

            {/* Background Text Layer */}
            <div className={`parallax-text-layer ${isExiting ? 'exiting' : ''}`} key={`text-${slide.id}`}>
                <svg
                    className="parallax-svg"
                    viewBox="0 0 2000 750"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B00" />
                            <stop offset="100%" stopColor="#FF0055" />
                        </linearGradient>
                        <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9D50BB" />
                            <stop offset="100%" stopColor="#6E48AA" />
                        </linearGradient>
                        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#15803d" />
                        </linearGradient>
                        <linearGradient id="gradient-carbon" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4b5563" />
                            <stop offset="100%" stopColor="#1f2937" />
                        </linearGradient>
                        <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#B91C1C" />
                        </linearGradient>
                        <linearGradient id="gradient-white" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#94a3b8" />
                        </linearGradient>
                        <linearGradient id="gradient-bmw" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0066B1" />
                            <stop offset="100%" stopColor="#E30613" />
                        </linearGradient>
                    </defs>

                    <text
                        x="48%"
                        y="55%"
                        textAnchor="end"
                        fill={`url(#${slide.colors.left})`}
                        className="svg-text"
                    >
                        {slide.splitText[0]}
                    </text>
                    <text
                        x="52%"
                        y="55%"
                        textAnchor="start"
                        fill={`url(#${slide.colors.right})`}
                        className="svg-text"
                    >
                        {slide.splitText[1]}
                    </text>
                </svg>
            </div>

            {/* Foreground Bike Layer */}
            <div className={`parallax-bike-layer ${isExiting ? 'exiting' : ''}`} key={`bike-${slide.id}`}>
                <img
                    src={slide.image}
                    alt={slide.name}
                    className="hero-bike-img"
                    style={{
                        transform: `translate(${mousePos.x * bikeSpeed}px, 0px) scale(1)`
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {/* Decoration Star */}
            <div className="star-deco">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
            </div>
        </div>
    );
};

export default ParallaxHero;
