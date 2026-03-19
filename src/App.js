import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "./index.css";
import SelloriaBot from './components/SelloriaBot';
import ProductsGrid from './components/ProductsGrid';
import Admin from './components/Admin';
import VendorRegister from './components/VendorRegister';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App" style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh' }}>
      {/* Navbar ثابت وفخم */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="font-black text-xl cursor-pointer" onClick={() => setPage('home')}>
          SELL<span className="text-[#39FF14]">ORIA</span>
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setPage('register')} className="text-[10px] font-bold text-[#39FF14] border border-[#39FF14]/30 px-3 py-1.5 rounded-full">انضم كتاجر</button>
          <button onClick={() => setPage('admin')} className="text-[10px] font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">لوحة التحكم</button>
        </div>
      </nav>

      {/* محتوى الصفحات مع إجبار الخلفية السوداء */}
      <main className="pt-20" style={{ backgroundColor: '#0a0a0a' }}>
        {page === 'home' && (
          <>
            <div className="flex flex-col items-center justify-center pt-20 px-4">
              <h1 className="text-6xl md:text-8xl font-black mb-4 text-center">SELL<span className="text-[#39FF14]">ORIA</span></h1>
              <p className="text-gray-400 text-center max-w-xl font-light">مستقبل التجارة الذكية لكل التجار.</p>
            </div>
            <ProductsGrid />
          </>
        )}
        {page === 'admin' && <Admin />}
        {page === 'register' && <VendorRegister />}
      </main>

      <SelloriaBot />

      {/* ستايل إجباري لقتل اللون الأبيض في أي مكان في الموقع */}
      <style>{`
        * { background-color: transparent !important; color: white !important; }
        html, body, #root, .App { background-color: #0a0a0a !important; }
        input, select, textarea { background-color: #1a1a1a !important; color: white !important; border: 1px solid #333 !important; }
        .bg-white, .bg-slate-50, .bg-gray-100 { background-color: #0a0a0a !important; }
      `}</style>
    </div>
  );
}

export default App;
// Updated on: Thu Mar 19 03:03:52 EET 2026
