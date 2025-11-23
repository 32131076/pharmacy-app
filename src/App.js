import React from 'react';
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
import Login from './Pages/Login'; // Make sure this import matches your Login component location
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
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
