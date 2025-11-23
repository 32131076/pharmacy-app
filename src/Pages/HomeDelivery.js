import React, { useState, useEffect } from 'react';
import '../style/Pages.css';

export default function HomeDelivery() {
  const [form, setForm] = useState({ name: '', address: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowPopup(true);
    // Here you would send the form data to your backend or delivery service
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="contact-container">
      {/* Popup for submit done */}
      {showPopup && (
        <div className="delivery-popup">
          Thank you! Your delivery request has been submitted.
        </div>
      )}
      <h1>Home Delivery</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Fast & Reliable Delivery</h2>
          <p>
            Get your medicines delivered to your doorstep quickly and safely. Fill out the form to request a home delivery.
          </p>
          <p>
            <strong>Delivery Hours:</strong> 9:00 AM - 8:00 PM<br />
            <strong>Phone:</strong> (+961) 71182610
          </p>
          <div className="delivery-locations-box">
            <strong>Delivery Locations:</strong>
            <ul className="delivery-locations-list">
              <li>Beirut</li>
              <li>Mount Lebanon</li>
              <li>Saida</li>
              <li>Tripoli</li>
              <li>Zahle</li>
              <li>Other areas on request</li>
            </ul>
            <div className="delivery-locations-note">
              Please provide your full address for accurate delivery.
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Delivery Request Form</h2>
          {submitted ? (
            <p style={{ color: 'green', fontWeight: 600 }}>Thank you! Your delivery request has been submitted.</p>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>
              <button className="submit-button" type="submit">Request Delivery</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
