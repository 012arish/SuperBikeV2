import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryRail.css';

const categories = [
    { id: 'supersport', name: 'Supersport', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80' },
    { id: 'naked', name: 'Hyper Naked', image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80' },
    { id: 'adventure', name: 'Adventure', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80' },
    { id: 'cafe', name: 'Cafe Racer', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80' },
];

const CategoryRail = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="section-header">
                    <h2>Shop by Category</h2>
                    <Link to="/shop" className="view-all">View All Categories</Link>
                </div>

                <div className="category-grid">
                    {categories.map((cat) => (
                        <Link to={`/shop?category=${cat.id}`} key={cat.id} className="category-card">
                            <div className="cat-img-wrap">
                                <img src={cat.image} alt={cat.name} />
                                <div className="cat-overlay"></div>
                            </div>
                            <span className="cat-name">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryRail;
