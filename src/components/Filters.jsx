import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Filter, X } from 'lucide-react';
import './Filters.css';

const Filters = ({ onFilterChange, activeFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
    const [selectedEngineSizes, setSelectedEngineSizes] = useState([]);

    // Lock body scroll when mobile filters are open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Sync local state with activeFilters from parent (e.g. from URL params)
    React.useEffect(() => {
        if (activeFilters) {
            if (activeFilters.categories) setSelectedCategories(activeFilters.categories);
            if (activeFilters.brands) setSelectedBrands(activeFilters.brands);

            if (activeFilters.priceRange) {
                setPriceRange(prev => {
                    // Logic to avoid overwriting empty user input with '0' from parent loop
                    const incomingMin = activeFilters.priceRange.min;
                    const incomingMax = activeFilters.priceRange.max;

                    const currentEffectiveMin = prev.min === '' ? 0 : prev.min;
                    const currentEffectiveMax = prev.max === '' ? 0 : prev.max;

                    // Only update if the actul numeric value is different (e.g. external change)
                    // If they are strictly equal (0 === 0), keep 'prev' to preserve empty string
                    if (incomingMin === currentEffectiveMin && incomingMax === currentEffectiveMax) {
                        return prev;
                    }
                    return activeFilters.priceRange;
                });
            }

            if (activeFilters.engineSizes) setSelectedEngineSizes(activeFilters.engineSizes);
        }
    }, [activeFilters]);

    const handleCategoryChange = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newCategories);
        onFilterChange({
            categories: newCategories,
            brands: selectedBrands,
            priceRange,
            engineSizes: selectedEngineSizes
        });
    };

    const handleBrandChange = (brand) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];

        setSelectedBrands(newBrands);
        onFilterChange({
            categories: selectedCategories,
            brands: newBrands,
            priceRange,
            engineSizes: selectedEngineSizes
        });
    };

    const handleEngineSizeChange = (size) => {
        const newSizes = selectedEngineSizes.includes(size)
            ? selectedEngineSizes.filter(s => s !== size)
            : [...selectedEngineSizes, size];

        setSelectedEngineSizes(newSizes);
        onFilterChange({
            categories: selectedCategories,
            brands: selectedBrands,
            priceRange,
            engineSizes: newSizes
        });
    };

    // Slider constants
    const MIN = 0;
    const MAX = 5000000;

    const handlePriceChange = (e, type) => {
        const inputValue = e.target.value;

        // Allow empty string for deleting
        if (inputValue === '') {
            const newRange = { ...priceRange, [type]: '' };
            setPriceRange(newRange);
            // Pass effective values to parent filter, treating empty as 0
            onFilterChange({
                categories: selectedCategories,
                brands: selectedBrands,
                priceRange: {
                    min: newRange.min === '' ? 0 : newRange.min,
                    max: newRange.max === '' ? 0 : newRange.max
                },
                engineSizes: selectedEngineSizes
            });
            return;
        }

        let value = parseInt(inputValue);
        if (isNaN(value)) return; // Ignore non-numeric input

        // Prevent negative values
        if (value < 0) value = 0;
        if (value > MAX) value = MAX;

        // Ensure proper range given numeric inputs
        let newRange = { ...priceRange };
        if (type === 'min') {
            // Allow typing freely, clamping only at MAX
            if (value > MAX) value = MAX;
            newRange.min = value;
        } else {
            if (value > MAX) value = MAX;
            newRange.max = value;
        }

        setPriceRange(newRange);

        onFilterChange({
            categories: selectedCategories,
            brands: selectedBrands,
            priceRange: {
                min: newRange.min === '' ? 0 : newRange.min,
                max: newRange.max === '' ? 0 : newRange.max
            },
            engineSizes: selectedEngineSizes
        });
    };

    // Slider specific handlers
    const handleSliderChange = (e, type) => {
        const value = Math.max(0, Math.min(MAX, parseInt(e.target.value)));
        let newRange = { ...priceRange };

        if (type === 'min') {
            newRange.min = Math.min(value, priceRange.max - 10000); // 10000 gap for INR
        } else {
            newRange.max = Math.max(value, priceRange.min + 10000); // 10000 gap for INR
        }

        setPriceRange(newRange);
        // Removed direct onFilterChange here to prevent lag during drag
    };

    const handleSliderCommit = () => {
        onFilterChange({
            categories: selectedCategories,
            brands: selectedBrands,
            priceRange: {
                min: priceRange.min === '' ? 0 : priceRange.min,
                max: priceRange.max === '' ? MAX : priceRange.max
            },
            engineSizes: selectedEngineSizes
        });
    };

    // Calculate percent for track background
    const getPercent = (value) => Math.round(((value - MIN) / (MAX - MIN)) * 100);

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange({ min: 0, max: 5000000 });
        setSelectedEngineSizes([]);
        onFilterChange({
            categories: [],
            brands: [],
            priceRange: { min: 0, max: 5000000 },
            engineSizes: []
        });
        setIsOpen(false); // Close mobile menu if open
    };

    const sidebarContent = (
        <aside className={`filters-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="filters-header">
                <h3>Filters</h3>
                <button className="close-filters" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                </button>
            </div>

            <div className="filter-group">
                <h4>CLASS</h4>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Supersport')}
                        onChange={() => handleCategoryChange('Supersport')}
                    />
                    <span className="checkmark"></span> Supersport
                </label>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Hyper Naked')}
                        onChange={() => handleCategoryChange('Hyper Naked')}
                    />
                    <span className="checkmark"></span> Hyper Naked
                </label>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Adventure')}
                        onChange={() => handleCategoryChange('Adventure')}
                    />
                    <span className="checkmark"></span> Adventure
                </label>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes('Cafe Racer')}
                        onChange={() => handleCategoryChange('Cafe Racer')}
                    />
                    <span className="checkmark"></span> Cafe Racer
                </label>
            </div>

            <div className="filter-group">
                <h4>BRANDS</h4>
                <div className="brands-grid-filter">
                    {['Ducati', 'Yamaha', 'BMW', 'Kawasaki', 'Honda', 'Suzuki', 'Aprilia', 'KTM'].map(brand => (
                        <label key={brand} className="checkbox-wrap">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                            />
                            <span className="checkmark"></span> {brand}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <h4>PRICE RANGE</h4>
                <div className="price-inputs">
                    <div className="price-field">
                        <label>Min</label>
                        <input
                            type="number"
                            value={(priceRange.min === 0 || priceRange.min === '') ? '' : priceRange.min}
                            onChange={(e) => handlePriceChange(e, 'min')}
                            placeholder="0"
                        />
                    </div>
                    <div className="price-separator">-</div>
                    <div className="price-field">
                        <label>Max</label>
                        <input
                            type="number"
                            value={(priceRange.max === MAX || priceRange.max === '') ? '' : priceRange.max}
                            onChange={(e) => handlePriceChange(e, 'max')}
                            placeholder="5000000"
                        />
                    </div>
                </div>

                {/* Dual Range Slider */}
                <div className="slider-container">
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={priceRange.min === '' ? 0 : priceRange.min}
                        onChange={(e) => handleSliderChange(e, 'min')}
                        onMouseUp={handleSliderCommit}
                        onTouchEnd={handleSliderCommit}
                        onKeyUp={handleSliderCommit}
                        className="thumb thumb--left"
                        style={{ zIndex: (priceRange.min === '' ? 0 : priceRange.min) > MAX - 100 && '5' }}
                    />
                    <input
                        type="range"
                        min={MIN}
                        max={MAX}
                        value={priceRange.max === '' ? MAX : priceRange.max}
                        onChange={(e) => handleSliderChange(e, 'max')}
                        onMouseUp={handleSliderCommit}
                        onTouchEnd={handleSliderCommit}
                        onKeyUp={handleSliderCommit}
                        className="thumb thumb--right"
                    />

                    <div className="slider-track" />
                    <div
                        className="slider-range"
                        style={{
                            left: `${getPercent(priceRange.min === '' ? 0 : priceRange.min)}%`,
                            width: `${getPercent(priceRange.max === '' ? MAX : priceRange.max) - getPercent(priceRange.min === '' ? 0 : priceRange.min)}%`
                        }}
                    />
                </div>
            </div>

            <div className="filter-group">
                <h4>ENGINE SIZE</h4>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedEngineSizes.includes('lt600')}
                        onChange={() => handleEngineSizeChange('lt600')}
                    />
                    <span className="checkmark"></span> &lt; 600cc
                </label>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedEngineSizes.includes('600-999')}
                        onChange={() => handleEngineSizeChange('600-999')}
                    />
                    <span className="checkmark"></span> 600cc - 999cc
                </label>
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={selectedEngineSizes.includes('1000plus')}
                        onChange={() => handleEngineSizeChange('1000plus')}
                    />
                    <span className="checkmark"></span> 1000cc+
                </label>
            </div>

            <div className="filter-actions">
                <button
                    className="btn full-width"
                    style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}
                    onClick={resetFilters}
                >
                    Reset All Filters
                </button>
            </div>
        </aside>
    );

    return (
        <>
            <button
                className="filter-toggle btn btn-outline"
                onClick={() => setIsOpen(true)}
            >
                <Filter size={18} style={{ marginRight: '0.5rem' }} /> Filters
            </button>

            {isOpen ? createPortal(
                <>
                    {sidebarContent}
                    <div className="filters-overlay" onClick={() => setIsOpen(false)}></div>
                </>,
                document.body
            ) : sidebarContent}
        </>
    );
};

export default Filters;
