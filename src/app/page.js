"use client";
import React, { useState } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Admin from '../components/Admin';
import Auth from '../components/auth/Auth';

export default function Page() {
  const [view, setView] = useState('landing'); // landing, shop, admin, auth
  const [user, setUser] = useState(null);

  const LandingPage = () => (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'center', padding: '40px 20px' }}>
      <h1 style={{ color: '#39FF14', fontSize: '45px', fontWeight: '900', marginBottom: '10px' }}>SELLORIA PRO</h1>
      <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px' }}>حوّل محلك العادي لـ "بيزنس ذكي" في 5 دقائق 🚀</p>
      
      <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ color: '#39FF14' }}>🤖 مساعد AI شخصي</h3>
          <p style={{ fontSize: '14px' }}>الذكاء الاصطناعي بيكتب لك مواصفات منتجاتك وبيحلل السوق بدالك.</p>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ color: '#00D1FF' }}>🌍 رادار المنافسين</h3>
          <p style={{ fontSize: '14px' }}>قارن أسعارك بـ Amazon و Noon لحظة بلحظة عشان تبيع صح.</p>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ color: '#FFD700' }}>🛒 متجر متكامل</h3>
          <p style={{ fontSize: '14px' }}>استقبل طلبات زباينك على الواتساب فوراً وبنظام احترافي.</p>
        </div>
      </div>

      <button 
        onClick={() => setView('auth')}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '20px', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', border: 'none', boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)' }}
      >
        ابدأ رحلة الأرباح الآن 💰
      </button>

      <p onClick={() => setView('shop')} style={{ marginTop: '20px', color: '#555', cursor: 'pointer', textDecoration: 'underline' }}>
        تصفح المنتجات كـ "زبون" فقط
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {view === 'landing' && <LandingPage />}
      {view === 'shop' && <ProductsGrid onAddToCart={() => alert('ميزة الشراء ستفعل قريباً')} />}
      {view === 'auth' && <Auth onSession={(session) => { setUser(session); setView('admin'); }} />}
      {view === 'admin' && <Admin />}
    </div>
  );
}
