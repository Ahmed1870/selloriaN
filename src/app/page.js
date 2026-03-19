"use client";
import React from 'react';
import Hero from "../components/landing/Hero";
import LaunchFireworks from "../components/effects/LaunchFireworks";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-right font-sans" dir="rtl">
      <LaunchFireworks />

      {/* Navbar بسيط جداً للموقع الوسيط */}
      <nav className="p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-[100]">
        <h1 className="text-2xl font-black text-[#39FF14]">SELLORIA</h1>
        <div className="flex gap-6 text-xs font-bold text-gray-400">
          <a href="#shop" className="hover:text-white">تسوق</a>
          <a href="#sell" className="hover:text-[#39FF14]">بيع معنا</a>
          <a href="#deliver" className="hover:text-[#00D1FF]">كن مندوباً</a>
        </div>
      </nav>

      <Hero />

      {/* أقسام المتجر (للزبون) */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-10">اكتشف العروض الحصرية 🏷️</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center group hover:border-[#39FF14] transition-all cursor-pointer">
              <span className="text-gray-600 group-hover:text-[#39FF14]">منتج تجريبي {i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* دعوة التجار والمناديب (لصاحب الموقع) */}
      <section className="py-20 bg-gradient-to-b from-black to-[#111]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div id="sell" className="p-10 rounded-[40px] bg-[#39FF14]/5 border border-[#39FF14]/20">
            <h3 className="text-2xl font-black text-[#39FF14] mb-4">للـتـجـار 💰</h3>
            <p className="text-gray-400 text-sm mb-6">افتح متجرك في سيلوريا، سيطر على مبيعاتك، واترك لنا الشحن والتحصيل.</p>
            <button className="bg-[#39FF14] text-black px-8 py-3 rounded-full font-black text-sm">ابدأ الربح الآن</button>
          </div>
          <div id="deliver" className="p-10 rounded-[40px] bg-[#00D1FF]/5 border border-[#00D1FF]/20">
            <h3 className="text-2xl font-black text-[#00D1FF] mb-4">للمناديب 🛵</h3>
            <p className="text-gray-400 text-sm mb-6">حول مشاويرك لفلوس. انضم لأذكى شبكة توصيل في مصر وابدأ العمل فوراً.</p>
            <button className="bg-[#00D1FF] text-black px-8 py-3 rounded-full font-black text-sm">سجل كمندوب</button>
          </div>
        </div>
      </section>

      {/* زر الواتساب (للدعم) */}
      <a href="https://wa.me/201019672878" className="fixed bottom-8 left-8 z-[110] bg-[#25D366] p-4 rounded-full animate-pulse">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.48 5.228 3.48 8.404c0 6.556-5.332 11.888-11.888 11.888-2.015 0-3.991-.512-5.748-1.483l-6.235 1.708z"/></svg>
      </a>
    </main>
  );
}
