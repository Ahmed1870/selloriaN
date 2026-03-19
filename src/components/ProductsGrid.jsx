import React from 'react';

const products = [
  { id: 1, name: 'ساعة ذكية نيون', price: '850', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
  { id: 2, name: 'سماعة بلوتوث Pro', price: '1200', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { id: 3, name: 'باور بانك سريع', price: '600', img: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=200&h=200&fit=crop' },
];

export default function ProductsGrid({ onAddToCart }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '20px' }}>
      {products.map(p => (
        <div key={p.id} style={{ background: '#111', border: '1px solid #222', padding: '12px', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ borderRadius: '15px', overflow: 'hidden', marginBottom: '10px' }}>
            <img src={p.img} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
          </div>
          <h3 style={{ color: '#fff', fontSize: '13px', margin: '5px 0', height: '32px', overflow: 'hidden' }}>{p.name}</h3>
          <p style={{ color: '#39FF14', fontWeight: 'bold', fontSize: '16px', margin: '5px 0' }}>{p.price} ج.م</p>
          <button 
            onClick={() => onAddToCart(p)}
            style={{ background: '#222', color: '#39FF14', border: '1px solid #39FF14', padding: '8px', borderRadius: '10px', width: '100%', fontSize: '13px', fontWeight: 'bold' }}
          >
            إضافة للسلة +
          </button>
        </div>
      ))}
    </div>
  );
}
