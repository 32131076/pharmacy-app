import React, { useState } from 'react';
import '../style/Pages.css';
import products from '../data/products';

export default function HealthProducts() {
  const [query, setQuery] = useState('');

  // Use only health products from the shared data file
  const healthProducts = products.filter(p => p.category === 'health');

  const filtered = healthProducts.filter(
    p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="products-container">
      <div className="page-inner">
        <h1>Health Products</h1>
        <p>Browse our selection of quality health and wellness products.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search health products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="products-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="category">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="no-results">No health products found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
