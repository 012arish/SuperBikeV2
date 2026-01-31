import React from 'react';
import './Skeleton.css';
import '../BikeCard.css'; // Re-use layout styles

const SkeletonCard = () => {
    return (
        <div className="bike-card skeleton-card">
            <div className="bike-img-container skeleton skeleton-rect" style={{ height: '220px', backgroundColor: '#222' }}></div>

            <div className="bike-content">
                <div className="bike-header">
                    <div className="skeleton skeleton-text" style={{ width: '70%', height: '1.4rem' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '25%', height: '1.4rem' }}></div>
                </div>

                <div className="bike-specs" style={{ marginTop: '0.5rem' }}>
                    <div className="skeleton skeleton-text" style={{ width: '60%', height: '0.9rem' }}></div>
                </div>

                <div className="bike-footer" style={{ marginTop: '1rem' }}>
                    <div className="skeleton skeleton-text" style={{ width: '40%', height: '0.8rem' }}></div>
                    <div className="skeleton skeleton-rect" style={{ width: '80px', height: '20px', borderRadius: '4px' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
