import React from 'react';
import { Link } from 'react-router-dom';

const Placeholder = ({ title }) => {
    return (
        <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
            <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title || 'Coming Soon'}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                We are currently working on this page. Check back soon for updates!
            </p>
            <Link to="/" className="btn btn-primary">
                Return Home
            </Link>
        </div>
    );
};

export default Placeholder;
