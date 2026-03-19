"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // اختبار سحب البيانات من "المخ"
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').limit(4);
      if (!error) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans antialiased" dir="rtl">
      {/* Navbar شيك */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <span className="text-2xl font-black tracking-tighter text-[#39FF14]">SELLORIA</span>
        </div>
      </nav>

      {/* عرض المنتجات من الباك إند */}
      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-12">منتجات مختارة ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.length > 0 ? products.map(product => (
            <div key={product.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-[#39FF14] font-black mt-2">{product.price} ج.م</p>
            </div>
          )) : (
            <p className="text-gray-600 italic">في انتظار أول تاجر يعرض بضاعته...</p>
          )}
        </div>
      </section>
    </main>
  );
}
