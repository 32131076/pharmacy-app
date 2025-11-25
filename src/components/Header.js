import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; 
import './Header.css';

// Receives cart and removeFromCart as props
function Header({ cart = [], removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (showCart && cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showCart]);

  return (
    <header className="header">
      <div className="header-container">
        {/* 1. Logo (Styled to be white) */}
        <div className="logo">
          <h1> 🏥 MZ Pharmacy</h1>
        </div>
        
        {/* 2. Primary Navigation Links (Home, Medicines, Contact) */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Medicines</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* 3. Right-side Action Group (Cart + Login/Register) */}
        <div className="action-group">
          
          {/* Cart Icon and Dropdown UI */}
          <div className="cart-wrap" ref={cartRef}>
            <button
              type="button"
              className="cart-icon-btn" 
              onClick={() => setShowCart(s => !s)}
              aria-expanded={showCart}
              aria-label={`View Cart (${cart.length} items)`}
            >
              <ShoppingCart size={24} /> 
              
              {/* Red Counter Badge (Visible if items > 0) */}
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>

            {showCart && (
              <div className="cart-dropdown" role="dialog" aria-label="Cart items">
                {cart.length === 0 ? (
                  <div className="cart-empty">Your cart is empty.</div>
                ) : (
                  <ul className="cart-list">
                    {cart.map((item, idx) => (
                      <li key={idx} className="cart-item">
                        <span className="cart-item-name">{item.name}</span>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(idx)} 
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Login / Register Button (Simple link to /login page) */}
          <Link to="/login" className="login-nav-btn">
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;