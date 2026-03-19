"use client";
import React from 'react';
import UserWallet from '../../../components/rewards/UserWallet';
import ProductsGrid from '../../../components/ProductsGrid';

export default function StoreProfile({ params }) {
  // هنا بنجيب بيانات المحل بناءً على الـ ID من السوبابيس
  const storeName = "محل الأمانة للأحذية"; // مثال

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'right' }}>
      <div style={{ background: 'linear-gradient(to bottom, #39FF14, #000)', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#000' }}>{storeName}</h1>
        <p style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>شريك معتمد في منظومة سيلوريا 💎</p>
      </div>

      <div style={{ marginTop: '-30px' }}>
        <UserWallet points={5} /> {/* هدية الترحيب */}
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', color: '#39FF14' }}>🔥 عروض المحل الحصرية:</h3>
        <ProductsGrid storeId={params.storeId} />
      </div>

      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#111', padding: '15px', textAlign: 'center', borderTop: '1px solid #333' }}>
        <button style={{ background: '#39FF14', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '15px', fontWeight: 'bold' }}>
          اطلب الآن واتساب 💬
        </button>
      </div>
    </div>
  );
}
