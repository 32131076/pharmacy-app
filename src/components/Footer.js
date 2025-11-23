import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your trusted pharmacy providing quality healthcare services and products.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Medicines</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📞 (+961) 71182610</p>
          <p>📧 32131076@student.edu.lb</p>
          <p>📍 Saida Ein Al-Helwah camp Upper Street</p>
        </div>
        <div className="footer-section">
          <h3>Hours</h3>
          <p>Mon-Fri: 8:00 AM - 8:00 PM</p>
          <p>Sat: 9:00 AM - 4:00 PM</p>
          <p>Sun: closed</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MZ Pharmacy App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
