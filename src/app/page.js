"use client";
import React, { useState } from 'react';
import Admin from '../components/Admin';
import ProductsGrid from '../components/ProductsGrid';
import CartDrawer from '../components/cart/CartDrawer';
import SellerJoin from '../components/admin/SellerJoin';

export default function Page() {
  const [view, setView] = useState('shop'); // shop, admin, join
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowCart(true);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* Navigation Bar */}
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', position: 'sticky', top: 0, background: '#000', zIndex: 100 }}>
        <h1 onClick={() => setView('shop')} style={{ color: '#39FF14', margin: 0, fontSize: '22px', fontWeight: '900', cursor: 'pointer' }}>SELLORIA</h1>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {view === 'shop' && (
            <button onClick={() => setView('join')} style={{ background: '#39FF14', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              بيع معنا 💰
            </button>
          )}
          
          <button onClick={() => setShowCart(true)} style={{ background: '#111', border: '1px solid #333', padding: '8px 12px', borderRadius: '12px', position: 'relative' }}>
            🛒 {cart.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#39FF14', color: '#000', fontSize: '10px', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>{cart.length}</span>}
          </button>

          <button 
            onClick={() => setView(view === 'admin' ? 'shop' : 'admin')}
            style={{ background: '#222', color: '#fff', border: '1px solid #333', padding: '8px 12px', borderRadius: '12px', fontSize: '13px' }}
          >
            {view === 'admin' ? 'المتجر' : '⚙️'}
          </button>
        </div>
      </nav>

      {/* Dynamic Views */}
      <main style={{ paddingBottom: '80px' }}>
        {view === 'shop' && <ProductsGrid onAddToCart={addToCart} />}
        {view === 'admin' && <Admin />}
        {view === 'join' && <SellerJoin onBack={() => setView('shop')} />}
      </main>

      {/* Footer بسيط للتاجر */}
      {view === 'shop' && (
        <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #111' }}>
          <p style={{ color: '#555', fontSize: '14px' }}>عايز تفتح محلك الخاص؟</p>
          <button onClick={() => setView('join')} style={{ color: '#39FF14', background: 'none', border: 'none', textDecoration: 'underline', fontWeight: 'bold' }}>سجل كتاجر الآن</button>
        </footer>
      )}

      {showCart && (
        <CartDrawer cartItems={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} />
      )}
    </div>
  );
}
