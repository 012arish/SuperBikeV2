import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bike, Search, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ searchQuery = '', onSearchChange = () => { } }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Buy Bikes', path: '/shop' },
        { name: 'Sell Your Bike', path: '/sell' },
    ];

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            onSearchChange('');
        }
    };

    const handleSearchChange = (value) => {
        console.log('Navbar onChange:', value);
        onSearchChange(value);

        // Auto-redirect to shop page if not already there
        if (location.pathname !== '/shop' && value.trim() !== '') {
            navigate('/shop');
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <Bike className="logo-icon" />
                    <span className="logo-text">Velocita</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions desktop-only">
                    <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isSearchOpen ? (
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search bikes..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="search-input"
                                autoFocus
                            />
                            <button className="icon-btn" onClick={handleSearchToggle}>
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <button className="icon-btn" onClick={handleSearchToggle}>
                            <Search size={20} />
                        </button>
                    )}

                    <button className="icon-btn"><User size={20} /></button>
                    <Link to="/sell" className="btn btn-primary small">List a Bike</Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu glass-panel">
                    <div className="mobile-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search bikes..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="mobile-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        className="mobile-link"
                        onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
