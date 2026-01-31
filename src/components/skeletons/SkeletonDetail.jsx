import React from 'react';
import './Skeleton.css';
import '../../pages/ProductDetail.css'; // Re-use layout styles

const SkeletonDetail = () => {
    return (
        <div className="container product-header-section">
            <div className="product-grid">
                {/* Area: Gallery Skeleton */}
                <div className="product-gallery-area">
                    <div className="skeleton skeleton-rect" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', backgroundColor: '#222' }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
                        <div className="skeleton skeleton-rect" style={{ aspectRatio: '16/9', borderRadius: '8px' }}></div>
                        <div className="skeleton skeleton-rect" style={{ aspectRatio: '16/9', borderRadius: '8px' }}></div>
                        <div className="skeleton skeleton-rect" style={{ aspectRatio: '16/9', borderRadius: '8px' }}></div>
                        <div className="skeleton skeleton-rect" style={{ aspectRatio: '16/9', borderRadius: '8px' }}></div>
                    </div>
                </div>

                {/* Area: Description Skeleton */}
                <div className="product-desc-area">
                    <div className="skeleton skeleton-text" style={{ width: '40%', height: '1.5rem', marginBottom: '1rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '95%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                </div>

                {/* Area: Info (Buy Box) Skeleton */}
                <div className="product-info-area">
                    <div className="product-buy-box">
                        <div className="skeleton skeleton-text" style={{ width: '30%', height: '0.9rem', marginBottom: '0.5rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '80%', height: '2.5rem', marginBottom: '1rem' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '40%', height: '2rem', marginBottom: '2.5rem' }}></div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div className="skeleton skeleton-rect" style={{ height: '48px', width: '100%', borderRadius: '6px' }}></div>
                            <div className="skeleton skeleton-rect" style={{ height: '48px', width: '100%', borderRadius: '6px' }}></div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <div className="skeleton skeleton-text" style={{ width: '30%', height: '0.9rem', marginBottom: '1.5rem' }}></div>
                            <div className="tech-specs-grid">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="tech-spec-item">
                                        <div className="skeleton skeleton-text" style={{ width: '50%', marginBottom: '4px' }}></div>
                                        <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonDetail;
