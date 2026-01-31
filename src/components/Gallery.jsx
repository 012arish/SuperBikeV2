import React, { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="gallery">
            <div className="main-image-container">
                <img src={selectedImage} alt="Product View" className="main-image" />
            </div>
            <div className="thumbnails">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
