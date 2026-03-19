import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SelloriaBot from './components/SelloriaBot';
import ProductsGrid from './components/ProductsGrid';
import Admin from './components/Admin';

function App() {
  const [page, setPage] = useState('home'); // نظام تنقل بسيط

  return (
    <div className="App bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      {/* Navbar بسيط للتنقل */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <h1 className="font-black text-xl cursor-pointer" onClick={() => setPage('home')}>
          SELL<span className="text-[#39FF14]">ORIA</span>
        </h1>
        <button 
          onClick={() => setPage(page === 'home' ? 'admin' : 'home')}
          className="text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-[#39FF14] hover:text-black transition-all"
        >
          {page === 'home' ? 'لوحة التحكم' : 'العودة للمتجر'}
        </button>
      </nav>

      {page === 'home' ? (
        <>
          <div className="flex flex-col items-center justify-center pt-40 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-center"
            >
              SELL<span className="text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">ORIA</span>
            </motion.h1>
            <p className="text-gray-400 text-center max-w-xl font-light">مستقبل التجارة الذكية. تصاميم تبهرك، وذكاء يخدمك.</p>
          </div>
          <ProductsGrid />
        </>
      ) : (
        <Admin />
      )}

      <SelloriaBot />
    </div>
  );
}

export default App;
