import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert("Thanks for subscribing to our newsletter!");
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <Bike className="logo-icon" />
                            <span>Velocita</span>
                        </Link>
                        <p className="footer-desc">
                            The premier marketplace for certified pre-owned performance motorcycles. Track ready, street legal.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Inventory</h4>
                        <ul>
                            <li><Link to="/shop?category=supersport">Supersport</Link></li>
                            <li><Link to="/shop?category=naked">Hyper Naked</Link></li>
                            <li><Link to="/shop?category=adventure">Adventure</Link></li>
                            <li><Link to="/shop?category=cafe">Cafe Racer</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/help">Help Center</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/selling-guide">Selling Guide</Link></li>
                            <li><Link to="/track-days">Track Day Calendar</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Stay Tuned</h4>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook size={20} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><Twitter size={20} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={20} /></a>
                        </div>
                        <form className="newsletter" onSubmit={handleNewsletterSubmit}>
                            <input type="email" placeholder="Join the club" required />
                            <button type="submit" className="btn-icon"><Mail size={16} /></button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Velocita Moto Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
