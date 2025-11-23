import React from 'react';
import '../style/Pages.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to MZ Pharmacy</h1>
        <p>Your trusted healthcare partner for quality medicines and professional service</p>
        <Link to="/products" className="products-link">
          <button className="cta-button">Shop Now</button>
        </Link>
      </section>

      <section className="services">
        <h2>MZ Services</h2>
        <div className="service-grid">
          <Link to="/prescriptions" className="service-card">
            <h3>💊 Prescription Medicines</h3>
            <p>Wide range of prescription medications available</p>
          </Link>

          <Link to="/consultation" className="service-card">
            <h3>🏥 Health Consultation</h3>
            <p>Professional pharmacist consultation services</p>
          </Link>
          <Link to="/delivery" className="service-card">
            <h3>🚚 Home Delivery</h3>
            <p>Fast and reliable delivery to your doorstep</p>
          </Link>
          <Link to="/health-products" className="service-card">
            <h3>📋 Health Products</h3>
            <p>Quality health and wellness products</p>
          </Link>
        </div>
      </section>

      <section className="about">
        <h2>About MZ Pharmacy</h2>
        <p>We are committed to providing quality healthcare services and products to our community.
          With experienced pharmacists and a wide selection of medicines, we ensure your health is in good hands.</p>
      </section>
    </div>
  );
}

export default Home;
