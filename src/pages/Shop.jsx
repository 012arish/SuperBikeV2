import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';
import BikeCard from '../components/BikeCard';
import SkeletonCard from '../components/skeletons/SkeletonCard';
import { useListings } from '../context/ListingsContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/scrollAnimations.css';
import './Shop.css';

const Shop = ({ searchQuery = '' }) => {
    useScrollAnimation();
    const [searchParams] = useSearchParams();
    const { userListings } = useListings();

    // Map URL param IDs to Display Names
    const categoryMap = {
        'supersport': 'Supersport',
        'naked': 'Hyper Naked',
        'adventure': 'Adventure',
        'cafe': 'Cafe Racer'
    };

    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRange: { min: 0, max: 50000 },
        engineSizes: []
    });

    // Initialize filters from URL on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoryMap[categoryParam]) {
            setFilters(prev => ({
                ...prev,
                categories: [categoryMap[categoryParam]]
            }));
        }
    }, [searchParams]);
    const [loading, setLoading] = useState(() => {
        // Only load if not visited before in this session
        return !sessionStorage.getItem('shopLoaded');
    });
    const [sortBy, setSortBy] = useState('newest');

    // Mock data (extended)
    const mockBikes = Array(8).fill(null).map((_, i) => ({
        id: `mock-${i + 1}`,
        name: i % 2 === 0 ? 'Ducati Panigale V4' : 'Kawasaki Ninja ZX-10R',
        price: 15500 + (i * 2000),
        image: i % 2 === 0 ? 'https://images.unsplash.com/photo-1615172282427-9a5752d358cd?w=800&q=80' : 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80',
        year: 2020 + (i % 4),
        type: i % 2 === 0 ? 'Supersport' : 'Track',
        engine: i % 2 === 0 ? '1103cc' : '998cc',
        mileage: `${(i + 1) * 1500} mi`,
        seller: `Rider ${i + 1}`,
        condition: ['Like New', 'Excellent', 'Good'][i % 3]
    }));

    // Format user listings to match BikeCard expected structure
    const formattedUserListings = userListings.map(listing => ({
        id: listing.id,
        name: listing.name,
        price: listing.price,
        image: listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
        year: listing.year,
        type: listing.category || 'Supersport',
        engine: listing.engine ? `${listing.engine}cc` : '',
        mileage: listing.mileage ? `${listing.mileage} mi` : '',
        seller: listing.seller || 'You',
        condition: listing.condition || 'EXCELLENT'
    }));

    // Combine user listings (first) with mock bikes
    const allBikes = [...formattedUserListings, ...mockBikes];

    // Filter bikes based on active filters AND search query
    const filteredBikes = allBikes.filter(bike => {
        // Search filter (name only, case-insensitive)
        if (searchQuery) {
            if (!bike.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
        }

        // Category filter
        if (filters.categories.length > 0) {
            if (!filters.categories.includes(bike.type)) {
                return false;
            }
        }

        // Price filter
        if (bike.price < filters.priceRange.min || bike.price > filters.priceRange.max) {
            return false;
        }

        // Brand filter
        if (filters.brands.length > 0) {
            // Check if bike name contains any of the selected brands
            const bikeName = bike.name.toLowerCase();
            const hasBrand = filters.brands.some(brand => bikeName.includes(brand.toLowerCase()));
            if (!hasBrand) {
                return false;
            }
        }

        // Engine size filter
        if (filters.engineSizes.length > 0) {
            const engineSize = parseInt(bike.engine);
            let matchesEngineFilter = false;

            if (filters.engineSizes.includes('lt600')) {
                if (engineSize < 600) matchesEngineFilter = true;
            }

            if (filters.engineSizes.includes('600-999')) {
                if (engineSize >= 600 && engineSize < 1000) matchesEngineFilter = true;
            }

            if (filters.engineSizes.includes('1000plus')) {
                if (engineSize >= 1000) matchesEngineFilter = true;
            }

            if (!matchesEngineFilter) {
                return false;
            }
        }

        return true;
    });

    // Sort bikes based on sortBy state
    const sortedBikes = [...filteredBikes].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'mileage':
                const aMileage = parseInt(a.mileage.replace(/,/g, ''));
                const bMileage = parseInt(b.mileage.replace(/,/g, ''));
                return aMileage - bMileage;
            case 'newest':
            default:
                return b.year - a.year;
        }
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (loading) {
            // Simulate loading only if it's the first time
            const timer = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('shopLoaded', 'true');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const [visibleCount, setVisibleCount] = useState(8);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    // Reset visible count when filters change to avoid confusion
    useEffect(() => {
        setVisibleCount(8);
    }, [filters, searchQuery, sortBy]);

    return (
        <div className="container shop-container">
            <div className="shop-header">
                <div>
                    <h1 className="shop-title">Browse Inventory</h1>
                    <p className="shop-subtitle">Find your perfect track weapon or street machine.</p>
                </div>

                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort by:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="mileage">Lowest Mileage</option>
                    </select>
                </div>
            </div>

            <div className="shop-layout">
                <div className="shop-sidebar">
                    <Filters onFilterChange={handleFilterChange} activeFilters={filters} />
                </div>

                <div className="shop-grid-container">
                    <div className="shop-grid">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <SkeletonCard key={`skeleton-${i}`} />
                            ))
                        ) : sortedBikes.length > 0 ? (
                            sortedBikes.slice(0, visibleCount).map(bike => (
                                <BikeCard key={bike.id} bike={bike} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
                                <h3 style={{ color: 'var(--text-secondary)' }}>No bikes match your filters</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try adjusting your filter criteria</p>
                            </div>
                        )}
                    </div>

                    {sortedBikes.length > visibleCount && (
                        <div className="load-more-container">
                            <button className="btn btn-outline" onClick={handleLoadMore}>Load More</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Explicit Spacer to force footer down */}
            <div style={{ height: '8rem', width: '100%' }}></div>
        </div>
    );
};

export default Shop;
