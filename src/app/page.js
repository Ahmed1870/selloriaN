"use client";
import React from 'react';
import { motion } from 'framer-motion';
import StreetPulse from "../components/ui/StreetPulse";
import MerchantLeaderboard from "../components/rankings/MerchantLeaderboard";
import LiveMap from "../components/analytics/LiveMap";
import MarketPulse from "../components/emergency/MarketPulse";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-black overflow-hidden font-sans text-right" dir="rtl">
      
      {/* 📹 فيديو الخلفية */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-busy-street-at-night-with-car-lights-4250-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      <div className="relative z-10">
        {/* شريط النبض العلوي */}
        <StreetPulse />

        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
          <motion.h1 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-black tracking-tighter text-gradient"
          >
            SELLORIA <span className="text-white">PRO</span>
          </motion.h1>
          <div className="flex gap-4">
             <button className="text-white/70 hover:text-white text-sm font-bold transition-all px-4">دخول التجار</button>
             <button className="bg-[#39FF14] text-black px-6 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all">ابدأ الآن</button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-6 pt-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm font-bold tracking-wide uppercase">الذكاء الاصطناعي متاح الآن في الجيزة</span>
            </div>

            <h2 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9]">
              بيزنس أذكى <br/>
              <span className="text-gradient">أرباح أسرع</span>
            </h2>
            
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
              سيلوريا هي أول منصة في مصر بتدير محلك بالذكاء الاصطناعي.. بنسعر، بنسوق، وبنوصل بالنيابة عنك.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="group relative w-full md:w-auto overflow-hidden bg-[#39FF14] text-black px-12 py-6 rounded-3xl font-black text-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(57,255,20,0.4)]">
                <span className="relative z-10">سجل محلك مجاناً</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </div>
          </motion.div>

          {/* لوحة الشرف والخريطة */}
          <MerchantLeaderboard />
          <LiveMap />

          {/* المميزات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 pb-40">
            {[
              { title: 'كاش فوري', desc: 'استلم فلوس مبيعاتك في نفس اليوم من المندوب كاش أو فودافون كاش.', icon: '💸' },
              { title: 'حماية المرتجع', desc: 'رادار ذكي بيحذرك من "الزباين المشاغبين" قبل ما تشحن أي أوردر.', icon: '🛡️' },
              { title: 'فصال ذكي', desc: 'سيب الـ AI يفاصل مع الزبون ويقنعه بالسعر المناسب بدالك.', icon: '🤝' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 text-right group transition-all"
              >
                <div className="text-5xl mb-8 inline-block">{f.icon}</div>
                <h3 className="text-3xl font-black mb-4 group-hover:text-[#39FF14] transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </main>

        <MarketPulse />

        <footer className="p-10 border-t border-white/10 text-center text-gray-600">
          <p>© 2026 Selloria Pro - صنع في الجيزة بكل فخر</p>
        </footer>
      </div>
    </div>
  );
}
