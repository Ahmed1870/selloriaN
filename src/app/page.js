"use client";
import React, { useState } from 'react';
import Admin from '../components/Admin';
import ProductsGrid from '../components/ProductsGrid';

export default function Page() {
  const [view, setView] = useState('shop'); // shop or admin

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {/* Header بسيط وشيك */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <h1 style={{ color: '#39FF14', margin: 0, fontSize: '24px' }}>SELLORIA</h1>
        <button 
          onClick={() => setView(view === 'shop' ? 'admin' : 'shop')}
          style={{ background: '#222', color: '#fff', border: '1px solid #333', padding: '5px 15px', borderRadius: '20px' }}
        >
          {view === 'shop' ? 'لوحة التاجر ⚙️' : 'عرض المتجر 🛒'}
        </button>
      </nav>

      {view === 'shop' ? <ProductsGrid /> : <Admin />}
    </div>
  );
}
