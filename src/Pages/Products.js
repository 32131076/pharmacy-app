import React, { useState, useEffect, useRef } from 'react';
import '../style/Pages.css';
import products from '../data/products';

function Products() {
  // Use all products from the shared data file
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  // read-only view when cart button is placed on Home (or pages that should only view cart)
  const readOnlyView = typeof window !== 'undefined' && (
    window.location.pathname === '/' ||
    window.location.pathname === '' ||
    window.location.pathname.toLowerCase().includes('home')
  );

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  // close cart dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (showCart && cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showCart]);

  const addToCart = (product) => {
    setCart(prev => {
      const next = [...prev, { id: product.id, name: product.name, price: product.price }];
      return next;
    });
    setShowCart(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const [searchTerm, setSearchTerm] = useState('');

  // Use all products from the imported products array
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Track which prescription details are open (only one at a time)
  const [openId, setOpenId] = useState(null);
  const toggleDetails = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="products-container">
      <h1>MZ Medicines</h1>
      <p>Browse our wide selection of quality medicines and health products</p>

      {/* cart button + dropdown */}
      <div className="cart-wrap" ref={cartRef}>
        <button
          type="button"
          className="cart-button"
          onClick={() => setShowCart(s => !s)}
          aria-expanded={showCart}
        >
          Cart ({cart.length})
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
                    {readOnlyView ? (
                      <span className="cart-item-readonly" aria-hidden="true">View only</span>
                    ) : (
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(idx)}
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

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
                onClick={() => addToCart(product)}
              >
                {product.inStock === false ? 'Unavailable' : 'Add to Cart'}
              </button>
              {/* Show prescription toggle for all products */}
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
              {/* Show prescription details if open */}
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
                  {/* Fallback for products without prescription info */}
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
