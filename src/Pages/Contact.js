import React, { useState } from 'react';
import '../style/Pages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>Ein Al-Helwah camp Upper Street</p>
            <p>Saida, Lebanon</p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>(+961) 71182610</p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>32131076@student.edu.lb</p>
          </div>
          <div className="info-item">
            <h3>🕒 Hours</h3>
            <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: closed</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
