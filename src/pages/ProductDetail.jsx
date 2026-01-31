import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import SkeletonDetail from '../components/skeletons/SkeletonDetail';
import { Shield, Truck, MessageCircle, Gauge, Timer, Zap, Mail } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/scrollAnimations.css';
import './ProductDetail.css';

const ProductDetail = () => {
    useScrollAnimation();
    const { id } = useParams();
    const { userListings } = useListings();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    // Check if this is a user listing
    const userListing = userListings.find(listing => listing.id === id);

    // If user listing exists, use that data
    const bike = userListing ? {
        id: userListing.id,
        name: userListing.name,
        price: userListing.price,
        images: userListing.images && userListing.images.length > 0 ? userListing.images : [
            'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?w=1200&q=80',
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80',
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80'
        ],
        description: userListing.description || 'No description provided.',
        specs: [
            { label: 'Year', value: userListing.year || '-' },
            { label: 'Odometer', value: userListing.mileage ? `${userListing.mileage} miles` : '-' },
            { label: 'Engine', value: userListing.engine ? `${userListing.engine}cc` : '-' },
            { label: 'Power', value: userListing.power ? `${userListing.power} HP` : '-' },
            { label: 'Wet Weight', value: userListing.weight ? `${userListing.weight} kg` : '-' },
            { label: 'Service History', value: userListing.serviceHistory || '-' }
        ],
        seller: {
            name: userListing.seller || 'You',
            rating: 5.0,
            joined: new Date(userListing.createdAt).getFullYear().toString()
        }
    } : {
        // Mock data fallback
        id,
        name: 'Ducati Panigale V4 S',
        price: 3450000,
        images: [
            'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?w=1200&q=80',
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80',
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=80'
        ],
        description: 'The Panigale V4 S is the absolute pinnacle of Ducati racing technology for the road. Featuring the Desmosedici Stradale engine, Öhlins electronic suspension, and Marchesini forged aluminum wheels. This unit has been meticulously maintained and never tracked.',
        specs: [
            { label: 'Year', value: '2023' },
            { label: 'Odometer', value: '1,200 miles' },
            { label: 'Engine', value: '1103cc V4' },
            { label: 'Power', value: '214 HP' },
            { label: 'Wet Weight', value: '195 kg' },
            { label: 'Service History', value: 'Full Dealer' }
        ],
        seller: {
            name: 'Marco Rossi',
            rating: 5.0,
            joined: '2022'
        }
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi, I'm interested in the ${bike.name} listed for ₹${bike.price.toLocaleString()} on Velocita. Is it still available?`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    const handleEmail = () => {
        const subject = encodeURIComponent(`Inquiry: ${bike.name}`);
        const body = encodeURIComponent(`Hi,\n\nI'm interested in the ${bike.name} listed for ₹${bike.price.toLocaleString()} on Velocita.\n\nPlease provide more details regarding its availability and condition.\n\nThanks.`);
        window.location.href = `mailto:sales@velocita.com?subject=${subject}&body=${body}`;
    };

    if (loading) {
        return <SkeletonDetail />;
    }

    return (
        <div className="container product-header-section">
            <div className="product-grid">
                {/* Area: Gallery */}
                <div className="product-gallery-area">
                    <Gallery images={bike.images} />
                </div>

                {/* Area: Description */}
                <div className="product-desc-area">
                    <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Machine Details</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{bike.description}</p>
                </div>

                {/* Area: Info (Buy Box) */}
                <div className="product-info-area">
                    <div className="product-buy-box">
                        <div style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)', fontWeight: '700', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
                            PRE-OWNED CERTIFIED
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>{bike.name}</h1>
                        <div className="product-price-tag">
                            ₹{bike.price.toLocaleString()}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexDirection: 'column' }}>
                            <button
                                onClick={handleWhatsApp}
                                className="btn full-width"
                                style={{
                                    background: '#25D366',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem'
                                }}
                            >
                                <MessageCircle size={20} /> Chat on WhatsApp
                            </button>
                            <button
                                onClick={handleEmail}
                                className="btn btn-outline full-width"
                            >
                                <Mail size={20} style={{ marginRight: '0.75rem' }} /> Send Email
                            </button>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>Tech Specs</h4>
                            <div className="tech-specs-grid">
                                {bike.specs.map((spec, i) => (
                                    <div key={i} className="tech-spec-item">
                                        <span className="tech-spec-label">{spec.label}</span>
                                        <span className="tech-spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <Shield size={18} color="var(--accent-primary)" /> Inspection Certified
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <Truck size={18} color="var(--accent-primary)" /> Nationwide Transport
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;
