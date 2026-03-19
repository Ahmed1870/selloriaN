"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 text-center" dir="rtl">
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="absolute w-96 h-96 bg-[#39FF14]/20 rounded-full blur-[100px] animate-pulse"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-12 rounded-[50px] border border-[#39FF14]/30 max-w-xl relative z-10"
      >
        <motion.div 
          initial={{ y: 20 }} animate={{ y: 0 }}
          className="text-7xl mb-8"
        >
          🎉
        </motion.div>
        
        <h1 className="text-4xl font-black text-white mb-4">مبروك يا بطل!</h1>
        <p className="text-[#39FF14] font-bold text-lg mb-8 italic">أوردرك دلوقتي في عهدة "طيارين سيلوريا" 🛵</p>
        
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 mb-10">
          <p className="text-sm text-gray-400 mb-2">رقم الطلب:</p>
          <p className="text-2xl font-mono font-black text-white tracking-widest">#SLR-2026-X9</p>
        </div>

        <p className="text-gray-500 text-xs mb-10 leading-relaxed">
          تقدر تتابع حالة الأوردر من 'رادار التتبع الحي'.. <br/> 
          ومتقلقش، مندوبنا هيكلمك قبل ما يوصل بـ 10 دقايق بالظبط.
        </p>

        <button 
          onClick={() => window.location.href = '/'}
          className="w-full bg-[#39FF14] text-black py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_#39FF14] transition-all"
        >
          العودة للرئيسية 🏠
        </button>
      </motion.div>
    </div>
  );
}
