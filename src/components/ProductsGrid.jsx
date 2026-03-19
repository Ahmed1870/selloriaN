"use client";
import React, { useEffect, useState } from 'react';

export default function ProductsGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تخيل إن دي مكنة بتسحب البيانات من السيرفر
  useEffect(() => {
    // هنا هنحط كود الـ API لاحقاً
    const fakeFetch = [
      { id: 1, name: 'ساعة نيون برو', price: '850', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
      { id: 2, name: 'سماعة سيلوريا AI', price: '1200', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' }
    ];
    setProducts(fakeFetch);
    setLoading(false);
  }, []);

  if (loading) return <div style={{textAlign:'center', color:'#39FF14', padding:'50px'}}>جاري تحميل الخير... ✨</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '20px' }}>
      {products.map(p => (
        <div key={p.id} style={{ background: '#111', border: '1px solid #222', padding: '12px', borderRadius: '20px', textAlign: 'center' }}>
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '15px' }} />
          <h3 style={{ color: '#fff', fontSize: '13px', margin: '10px 0' }}>{p.name}</h3>
          <p style={{ color: '#39FF14', fontWeight: 'bold' }}>{p.price} ج.م</p>
          <button 
            onClick={() => onAddToCart(p)}
            style={{ background: '#222', color: '#39FF14', border: '1px solid #39FF14', padding: '8px', borderRadius: '10px', width: '100%', fontWeight: 'bold' }}
          >
            إضافة +
          </button>
        </div>
      ))}
    </div>
  );
}
