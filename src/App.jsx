import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ListingsProvider } from './context/ListingsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Sell from './pages/Sell';
import Placeholder from './pages/Placeholder';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider>
      <ListingsProvider>
        <ScrollToTop />
        <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/help" element={<Placeholder title="Help Center" />} />
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            <Route path="/selling-guide" element={<Placeholder title="Selling Guide" />} />
            <Route path="/track-days" element={<Placeholder title="Track Day Calendar" />} />
            <Route path="*" element={<Placeholder title="Page Not Found" />} />
          </Routes>
        </Layout>
      </ListingsProvider>
    </ThemeProvider>
  );
}

export default App;
