import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Contact from './Pages/Contact';
import Prescription from './Pages/Prescription';
import HealthConsultation from './Pages/HealthConsultation';
import HomeDelivery from './Pages/HomeDelivery';
import HealthProducts from './Pages/HealthProducts';
import Login from './Pages/Login'; 
import './App.css';

function App() {
  // 1. Cart State: Stored here as the single source of truth
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  // 2. Persistence: Saves cart state to Local Storage
  useEffect(() => {
    try { 
      localStorage.setItem('cart', JSON.stringify(cart)); 
    } catch (error) {
      console.error("Error writing cart to localStorage:", error);
    }
  }, [cart]);

  // 3. Add to Cart function (Passed to Products)
  const handleAddToCart = (product) => {
    // Updates the cart state, which automatically updates the Header
    setCart(prev => [...prev, product]);
  };

  // 4. Remove from Cart function (Passed to Header)
  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="App">
        {/* Pass cart state and remove function to Header */}
        <Header 
          cart={cart} 
          removeFromCart={handleRemoveFromCart} 
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/prescriptions" element={<Prescription />} />
            <Route path="/consultation" element={<HealthConsultation />} />
            <Route path="/delivery" element={<HomeDelivery />} />
            <Route path="/health-products" element={<HealthProducts />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;