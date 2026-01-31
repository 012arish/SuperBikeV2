import React, { createContext, useContext, useState, useEffect } from 'react';

const ListingsContext = createContext();

export const useListings = () => {
    const context = useContext(ListingsContext);
    if (!context) {
        throw new Error('useListings must be used within ListingsProvider');
    }
    return context;
};

export const ListingsProvider = ({ children }) => {
    const [userListings, setUserListings] = useState([]);

    // Load listings from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('userListings');
        if (stored) {
            try {
                setUserListings(JSON.parse(stored));
            } catch (error) {
                console.error('Failed to load listings:', error);
            }
        }
    }, []);

    // Save to localStorage whenever listings change
    useEffect(() => {
        if (userListings.length > 0) {
            localStorage.setItem('userListings', JSON.stringify(userListings));
        }
    }, [userListings]);

    const addListing = (listing) => {
        const newListing = {
            ...listing,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            seller: 'You',
            condition: 'EXCELLENT'
        };
        setUserListings(prev => [newListing, ...prev]);
        return newListing;
    };

    const getListings = () => {
        return userListings;
    };

    const clearListings = () => {
        setUserListings([]);
        localStorage.removeItem('userListings');
    };

    return (
        <ListingsContext.Provider value={{ userListings, addListing, getListings, clearListings }}>
            {children}
        </ListingsContext.Provider>
    );
};
