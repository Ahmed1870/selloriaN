import React, { useState } from 'react';
import ProductsGrid from './components/ProductsGrid';
import Admin from './components/Admin';
import VendorRegister from './components/VendorRegister';

function App() {
  const [page, setPage] = useState('home');

  const mainStyle = {
    backgroundColor: '#0a0a0a',
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={mainStyle}>
      {/* Navbar */}
      <nav style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#0a0a0aa0', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <h1 onClick={() => setPage('home')} style={{ cursor: 'pointer', margin: 0, fontWeight: '900' }}>SELL<span style={{color: '#39FF14'}}>ORIA</span></h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setPage('register')} style={{ background: 'none', color: '#39FF14', border: '1px solid #39FF14', padding: '5px 15px', borderRadius: '20px', fontSize: '12px' }}>انضم كتاجر</button>
          <button onClick={() => setPage('admin')} style={{ background: '#222', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '20px', fontSize: '12px' }}>لوحة التحكم</button>
        </div>
      </nav>

      {/* محتوى الصفحات */}
      <div style={{ padding: '20px' }}>
        {page === 'home' && (
          <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>SELL<span style={{color: '#39FF14'}}>ORIA</span></h1>
            <p style={{ color: '#888' }}>مستقبل التجارة الذكية</p>
            <ProductsGrid />
          </div>
        )}
        {page === 'admin' && <Admin />}
        {page === 'register' && <VendorRegister />}
      </div>
    </div>
  );
}

export default App;
