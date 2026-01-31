import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg">
                <img
                    src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2600&auto=format&fit=crop"
                    alt="Superbike in garage"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <span className="hero-label animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Premier Superbike Marketplace
                </span>
                <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    Unleash the <br /> <span className="text-gradient">Power of Performance</span>
                </h1>
                <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    Buy and sell certified pre-owned superbikes.
                    From track weapons to hyper nakeds, find your dream machine.
                </p>
                <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.7s' }}>
                    <Link to="/shop" className="btn btn-primary big">
                        View Inventory <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                    <Link to="/sell" className="btn btn-outline big">
                        Sell Your Bike
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
