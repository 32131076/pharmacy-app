import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🏥 MZ Pharmacy</h1>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Medicines</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-nav-btn">
            <button type="button" className="login-btn-link">
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
