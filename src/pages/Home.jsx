import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ParallaxHero from '../components/ParallaxHero';
import CategoryRail from '../components/CategoryRail';
import BikeCard from '../components/BikeCard';
import SkeletonCard from '../components/skeletons/SkeletonCard';
import { Link } from 'react-router-dom';
import { Shield, CreditCard, Award, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/scrollAnimations.css';
import './Home.css';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useScrollAnimation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);
    // Mock data for featured superbikes
    const featuredBikes = [
        {
            id: 1,
            name: 'Ducati Panigale V4 S',
            price: 28500,
            image: 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?w=800&q=80',
            year: 2023,
            type: 'Supersport',
            engine: '1103cc',
            mileage: '1,200 mi',
            seller: 'Marco R.',
            condition: 'Like New'
        },
        {
            id: 2,
            name: 'Yamaha MT-10 SP',
            price: 16800,
            image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80',
            year: 2022,
            type: 'Naked',
            engine: '998cc',
            mileage: '4,500 mi',
            seller: 'Sarah J.',
            condition: 'Excellent'
        },
        {
            id: 3,
            name: 'BMW S1000RR',
            price: 19500,
            image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
            year: 2021,
            type: 'Supersport',
            engine: '999cc',
            mileage: '8,300 mi',
            seller: 'Tom H.',
            condition: 'Good'
        },
        {
            id: 4,
            name: 'Kawasaki ZX-10R',
            price: 17900,
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
            year: 2022,
            type: 'Supersport',
            engine: '998cc',
            mileage: '5,600 mi',
            seller: 'Jake M.',
            condition: 'Excellent'
        }
    ];

    return (
        <>
            <Hero />
            <ParallaxHero />
            <div className="scroll-animate">
                <CategoryRail />
            </div>

            {/* Why Choose Us Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose Us</h2>
                        <p className="section-subtitle">Your trusted marketplace for premium superbikes</p>
                    </div>

                    <div className="features-grid scroll-animate">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Shield size={32} />
                            </div>
                            <h3>Verified Sellers</h3>
                            <p>All sellers are verified and vetted for your safety and peace of mind.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <CreditCard size={32} />
                            </div>
                            <h3>Secure Payments</h3>
                            <p>Bank-level encryption and secure payment processing for every transaction.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Award size={32} />
                            </div>
                            <h3>Quality Guaranteed</h3>
                            <p>Every bike undergoes inspection to ensure top-tier quality and performance.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Headphones size={32} />
                            </div>
                            <h3>Expert Support</h3>
                            <p>24/7 customer support from motorcycle experts ready to help you.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding home-section-secondary scroll-animate">
                <div className="container">
                    <div className="section-header">
                        <h2>Trending Machines</h2>
                        <Link to="/shop" className="view-all">
                            View All Inventory <span style={{ fontSize: '1.2em' }}>&rarr;</span>
                        </Link>
                    </div>

                    <div className="trending-grid">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <SkeletonCard key={`skeleton-${i}`} />
                            ))
                        ) : (
                            featuredBikes.map(bike => (
                                <BikeCard key={bike.id} bike={bike} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Popular Brands Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Popular Brands</h2>
                        <p className="section-subtitle">Explore bikes from the world's leading manufacturers</p>
                    </div>

                    <div className="brands-grid scroll-animate">
                        <div className="brand-card">
                            <div className="brand-name">Ducati</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">Yamaha</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">Kawasaki</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">BMW</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">Honda</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">Suzuki</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">Aprilia</div>
                        </div>
                        <div className="brand-card">
                            <div className="brand-name">KTM</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="scroll-animate">
                        <div className="cta-box">
                            <h2 className="cta-title">Ready to Upgrade?</h2>
                            <p className="cta-text">
                                List your superbike today. Reach serious enthusiasts and collectors.
                                Secure payments and verified buyer network.
                            </p>
                            <Link to="/sell" className="btn btn-primary big">Create Listing</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
