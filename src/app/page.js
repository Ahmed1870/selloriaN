"use client";
import React from 'react';
import Hero from "../components/landing/Hero";
import LaunchFireworks from "../components/effects/LaunchFireworks";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-right" dir="rtl">
      <LaunchFireworks />
      <nav className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <span className="text-[#39FF14] font-black text-xl tracking-tighter">SELLORIA</span>
        <div className="flex gap-4 text-[10px] font-bold text-gray-400">
          <a href="#shop" className="hover:text-white">المتجر</a>
          <a href="#merchant" className="hover:text-[#39FF14]">التجار</a>
          <a href="#courier" className="hover:text-[#00D1FF]">المناديب</a>
        </div>
      </nav>

      <Hero />

      {/* منطقة المشتري */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-white mb-8 italic">أحدث المنتجات 🛒</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gray-700 text-xs">
              صورة المنتج {i}
            </div>
          ))}
        </div>
      </section>

      {/* منطقة الشركاء (بايع ومندوب) */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div id="merchant" className="p-8 rounded-3xl bg-gradient-to-br from-[#111] to-black border border-[#39FF14]/20">
            <h3 className="text-[#39FF14] font-black mb-2">للتجار 💰</h3>
            <p className="text-gray-500 text-xs mb-6">اعرض منتجاتك، السيستم بيحسب عمولتنا ويحولك صافي ربحك أوتوماتيك.</p>
            <button className="w-full bg-[#39FF14] text-black py-3 rounded-xl font-black text-xs">فتح متجر</button>
          </div>
          <div id="courier" className="p-8 rounded-3xl bg-gradient-to-br from-[#111] to-black border border-[#00D1FF]/20">
            <h3 className="text-[#00D1FF] font-black mb-2">للمناديب 🛵</h3>
            <p className="text-gray-500 text-xs mb-6">انضم لأكبر شبكة شحن في مصر، واستلم أرباحك يومياً بضغطة زر.</p>
            <button className="w-full bg-[#00D1FF] text-black py-3 rounded-xl font-black text-xs">سجل كمندوب</button>
          </div>
        </div>
      </section>
    </main>
  );
}
