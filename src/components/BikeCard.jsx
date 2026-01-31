import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
    return (
        <Link to={`/product/${bike.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <div className="bike-card">
                {bike.condition && <div className="bike-badge">{bike.condition}</div>}
                <button className="favorite-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <Heart size={18} />
                </button>

                <div className="bike-img-container">
                    <img src={bike.image} alt={bike.name} className="bike-image" />
                </div>

                <div className="bike-content">
                    <div className="bike-header">
                        <h3 className="bike-title">
                            {bike.name}
                        </h3>
                        <div className="bike-price">${bike.price.toLocaleString()}</div>
                    </div>

                    <div className="bike-specs">
                        <span>{bike.year} • {bike.engine} • {bike.mileage}</span>
                    </div>

                    <div className="bike-footer">
                        <div className="seller-info">
                            Sold by {bike.seller}
                        </div>
                        <button className="btn-text">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BikeCard;
