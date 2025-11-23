import React, { useState, useEffect } from 'react';
import '../style/Pages.css';

export default function HealthConsultation() {
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowPopup(true);
    // Here you would send the form data to your backend or email service
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
        <div className="consultation-popup">
          Thank you! Your question has been submitted.
        </div>
      )}
      <h1>Health Consultation</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Ask Our Pharmacist</h2>
          <p>
            Get professional advice from our experienced pharmacists. Fill out the form and we’ll get back to you as soon as possible.
          </p>
          <p>
            <strong>Phone:</strong> (+961) 71182610<br />
            <strong>Email:</strong> 32131076@student.edu.lb
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Consultation Form</h2>
          {submitted ? (
            <p style={{ color: 'green', fontWeight: 600 }}>Thank you! Your question has been submitted.</p>
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
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="question">Your Question</label>
                <textarea
                  id="question"
                  name="question"
                  rows={5}
                  value={form.question}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="submit-button" type="submit">Submit</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
