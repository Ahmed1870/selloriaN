"use client";
import React, { useState } from 'react';
import Admin from '../components/Admin';
import ProductsGrid from '../components/ProductsGrid';
import CartDrawer from '../components/cart/CartDrawer';

export default function Page() {
  const [view, setView] = useState('shop');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowCart(true); // افتح السلة أول ما يضيف حاجة عشان يحس بالحركة
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', position: 'sticky', top: 0, background: '#000', zIndex: 100 }}>
        <h1 style={{ color: '#39FF14', margin: 0, fontSize: '22px', fontWeight: '900' }}>SELLORIA</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowCart(true)} style={{ background: '#111', border: '1px solid #333', padding: '8px 12px', borderRadius: '12px', position: 'relative' }}>
            🛒 {cart.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#39FF14', color: '#000', fontSize: '10px', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>{cart.length}</span>}
          </button>
          <button 
            onClick={() => setView(view === 'shop' ? 'admin' : 'shop')}
            style={{ background: '#39FF14', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}
          >
            {view === 'shop' ? '⚙️ لوحة التاجر' : '🛒 المتجر'}
          </button>
        </div>
      </nav>

      {view === 'shop' ? (
        <div style={{ paddingBottom: '100px' }}>
          <ProductsGrid onAddToCart={addToCart} />
        </div>
      ) : (
        <Admin />
      )}

      {showCart && (
        <CartDrawer 
          cartItems={cart} 
          onClose={() => setShowCart(false)} 
          onRemove={removeFromCart} 
        />
      )}
    </div>
  );
}
