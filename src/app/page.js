"use client";
import React, { useState } from 'react';
import Admin from '../components/Admin';
import ProductsGrid from '../components/ProductsGrid';
import CartDrawer from '../components/cart/CartDrawer';
import SellerJoin from '../components/admin/SellerJoin';
import SuperAdmin from '../components/admin/SuperAdmin';

export default function Page() {
  const [view, setView] = useState('shop'); // shop, admin, join, superadmin
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <h1 onClick={() => setView('shop')} style={{ color: '#39FF14', margin: 0, fontSize: '22px', fontWeight: '900', cursor: 'pointer' }}>SELLORIA</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
           <button onClick={() => setView('join')} style={{ background: '#39FF14', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>بيع معنا 💰</button>
           <button onClick={() => setShowCart(true)} style={{ background: '#111', border: '1px solid #333', padding: '8px 12px', borderRadius: '12px' }}>🛒</button>
           {/* زرار سري للدخول للوحة التحكم العليا (الضغط المطول أو ضغطة خاصة) */}
           <button onDoubleClick={() => setView('superadmin')} style={{ background: 'none', border: 'none', color: '#222' }}>•</button>
        </div>
      </nav>

      <main>
        {view === 'shop' && <ProductsGrid onAddToCart={(p) => {setCart([...cart, p]); setShowCart(true);}} />}
        {view === 'admin' && <Admin />}
        {view === 'join' && <SellerJoin onBack={() => setView('shop')} />}
        {view === 'superadmin' && <SuperAdmin onBack={() => setView('shop')} />}
      </main>

      {showCart && <CartDrawer cartItems={cart} onClose={() => setShowCart(false)} onRemove={(i) => setCart(cart.filter((_, idx) => idx !== i))} />}
    </div>
  );
}
