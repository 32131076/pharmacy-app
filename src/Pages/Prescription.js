import React, { useState, useMemo } from 'react';
import '../style/Pages.css';
import products from '../data/products';

export default function Prescription() {
  const [query, setQuery] = useState('');
  // Use all medicines (prescription, otc, health) from products data
  const medicines = products;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return medicines;
    return medicines.filter(m =>
      m.name.toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q)
    );
  }, [query, medicines]);

  const [openId, setOpenId] = useState(null);
  const toggleDetails = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleAdd = (med) => {
    // stub: connect to cart/prescription flow later
    alert(`Added "${med.name}" (stub)`);
  };

  return (
    <div className="products-container">
      <div className="page-inner">
        <h1>All Medicines</h1>
        <p>Browse all medicines and products available at MZ Pharmacy</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="products-grid">
          {filtered.map(med => {
            const isOpen = openId === med.id;

            return (
              <div key={med.id} className="product-card">
                <div>
                  <h3>{med.name}</h3>
                  <p className="category">{med.category || med.description || 'Medicine'}</p>
                </div>

                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="toggle-prescription-btn"
                    onClick={() => toggleDetails(med.id)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Hide Prescription' : 'View Prescription'}
                  </button>
                </div>

                {isOpen && (
                  <div className="prescription-details" aria-live="polite">
                    {med.dosage && <p><strong>Dosage:</strong> {med.dosage}</p>}
                    {med.directions && <p><strong>Directions:</strong> {med.directions}</p>}
                    {med.indications && <p><strong>Indications:</strong> {med.indications}</p>}
                    {med.contraindications && <p><strong>Contraindications:</strong> {med.contraindications}</p>}
                    {Array.isArray(med.sideEffects) && med.sideEffects.length > 0 && (
                      <p><strong>Side effects:</strong> {med.sideEffects.join(', ')}</p>
                    )}
                    {med.manufacturer && <p><strong>Manufacturer:</strong> {med.manufacturer}</p>}
                    {med.ndc && <p><strong>NDC:</strong> {med.ndc}</p>}
                    {med.notes && <p><strong>Notes:</strong> {med.notes}</p>}
                    {/* Fallback for products without prescription info */}
                    {!med.dosage && !med.directions && !med.indications && !med.contraindications && !med.sideEffects && !med.manufacturer && !med.ndc && !med.notes && (
                      <p style={{ color: '#888' }}>No prescription details available for this product.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="no-results">No medicines found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
