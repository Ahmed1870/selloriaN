import "./index.css";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SelloriaBot from './components/SelloriaBot';
import ProductsGrid from './components/ProductsGrid';
import Admin from './components/Admin';
import VendorRegister from './components/VendorRegister';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <h1 className="font-black text-xl cursor-pointer" onClick={() => setPage('home')}>
          SELL<span className="text-[#39FF14]">ORIA</span>
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setPage('register')}
            className="text-[10px] font-bold text-[#39FF14] border border-[#39FF14]/30 px-4 py-2 rounded-full hover:bg-[#39FF14]/10 transition-all"
          >
            انضم كتاجر
          </button>
          <button 
            onClick={() => setPage(page === 'home' ? 'admin' : 'home')}
            className="text-[10px] font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all"
          >
            {page === 'home' ? 'لوحة التحكم' : 'العودة للمتجر'}
          </button>
        </div>
      </nav>

      {page === 'home' && (
        <>
          <div className="flex flex-col items-center justify-center pt-40 px-4">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl md:text-8xl font-black mb-4 text-center">
              SELL<span className="text-[#39FF14]">ORIA</span>
            </motion.h1>
            <p className="text-gray-400 text-center max-w-xl font-light">أكبر مول إلكتروني مدعوم بالذكاء الاصطناعي.. لكل التجار.</p>
          </div>
          <ProductsGrid />
        </>
      )}
      {page === 'admin' && <Admin />}
      {page === 'register' && <VendorRegister />}

      <SelloriaBot />
    </div>
  );
}

export default App;
