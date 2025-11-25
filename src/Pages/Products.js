import React, { useState } from 'react';
import '../style/Pages.css';
import products from '../data/products';

// Receives the add function as a prop
function Products({ onAddToCart }) {
  // All cart state and UI logic were removed from here

  // The add function calls the prop passed from App.js
  const handleAddToCart = (product) => {
    // Calling this prop triggers state update in App.js,
    // which in turn re-renders the Header with the new cart count.
    if (onAddToCart) {
      onAddToCart({ id: product.id, name: product.name, price: product.price });
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const [openId, setOpenId] = useState(null);
  const toggleDetails = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="products-container">
      <h1>MZ Medicines</h1>
      <p>Browse our wide selection of quality medicines and health products</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => {
          const isPrescription = product.category === 'prescription';
          const isOpen = openId === product.id;
          return (
            <div
              key={product.id}
              className={`product-card${isOpen ? ' expanded' : ''}`}
              style={isOpen ? { zIndex: 2, boxShadow: '0 8px 32px rgba(14,165,164,0.18)', position: 'relative', transform: 'scale(1.03)' } : {}}
            >
              <h3>{product.name}</h3>
              <p className="category">{product.category || product.description}</p>
              {product.price !== undefined && (
                <p className="price">${product.price}</p>
              )}
              {product.inStock !== undefined && (
                <p className={product.inStock ? 'in-stock' : 'out-stock'}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              )}
              <button
                className="add-to-cart"
                disabled={product.inStock === false}
                onClick={() => handleAddToCart(product)}
              >
                {product.inStock === false ? 'Unavailable' : 'Add to Cart'}
              </button>

              <div style={{ marginTop: 10 }}>
                <button
                  type="button"
                  className="toggle-prescription-btn"
                  onClick={() => toggleDetails(product.id)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? 'Hide Prescription' : 'View Prescription'}
                </button>
              </div>
              {isOpen && (
                <div className="prescription-details" aria-live="polite">
                  {product.dosage && <p><strong>Dosage:</strong> {product.dosage}</p>}
                  {product.directions && <p><strong>Directions:</strong> {product.directions}</p>}
                  {product.indications && <p><strong>Indications:</strong> {product.indications}</p>}
                  {product.contraindications && <p><strong>Contraindications:</strong> {product.contraindications}</p>}
                  {Array.isArray(product.sideEffects) && product.sideEffects.length > 0 && (
                    <p><strong>Side effects:</strong> {product.sideEffects.join(', ')}</p>
                  )}
                  {product.manufacturer && <p><strong>Manufacturer:</strong> {product.manufacturer}</p>}
                  {product.ndc && <p><strong>NDC:</strong> {product.ndc}</p>}
                  {product.notes && <p><strong>Notes:</strong> {product.notes}</p>}
                  {!product.dosage && !product.directions && !product.indications && !product.contraindications && !product.sideEffects && !product.manufacturer && !product.ndc && !product.notes && (
                    <p style={{ color: '#888' }}>No prescription details available for this product.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-results">No products found matching your search.</p>
      )}
    </div>
  );
}

export default Products;