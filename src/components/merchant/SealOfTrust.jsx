"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function SealOfTrust({ merchantName = "محل الأصدقاء", plan = "إمبراطور الجيزة" }) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center" dir="rtl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative p-1 bg-[#111] border-[12px] border-double border-[#39FF14]/30 rounded-[60px] shadow-[0_0_50px_rgba(0,0,0,1)]"
      >
        {/* خلفية فخمة بنمط هندسي */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
        
        <div className="p-16 border-4 border-[#39FF14]/10 rounded-[45px] bg-black/40 relative z-10">
          <div className="text-[#39FF14] text-6xl mb-6">🛡️</div>
          <h2 className="text-gray-500 font-bold tracking-[5px] mb-4 uppercase text-xs italic">Certificate of Partnership</h2>
          
          <h1 className="text-4xl font-black mb-10 text-white underline decoration-[#39FF14]/30 underline-offset-8">شهادة توثيق شريك سيلوريا</h1>
          
          <p className="text-xl text-gray-400 mb-8 font-light">تتشرف منصة <span className="text-[#39FF14] font-bold">سيلوريا</span> بأن تعلن أن:</p>
          
          <div className="my-10">
            <h3 className="text-5xl font-black text-gradient py-2 inline-block"> {merchantName} </h3>
          </div>
          
          <p className="text-lg text-gray-400 mb-12 leading-relaxed">
            هو تاجر موثق ومعتمد رسمياً ضمن باقة <span className="text-[#00D1FF] font-black italic">[{plan}]</span>، <br/>
            ومصرح له باستخدام أدوات الذكاء الاصطناعي ورادار السوق لضمان أفضل تجربة بيع للعملاء.
          </p>

          <div className="flex justify-between items-end mt-16 px-10">
            <div className="text-right">
              <p className="text-[10px] text-gray-600 mb-1">تاريخ التوثيق:</p>
              <p className="text-sm font-bold text-white">19 مارس 2026</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 border-4 border-[#39FF14] rounded-full flex items-center justify-center text-[#39FF14] font-black text-[10px] rotate-12 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                ختم سيلوريا <br/> المعتمد
              </div>
            </div>

            <div className="text-left">
              <p className="text-[10px] text-gray-600 mb-1">الرقم التسلسلي:</p>
              <p className="text-sm font-mono text-white">SLR-9982-2026</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <button className="mt-10 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#39FF14] hover:text-black transition-all">
        تحميل الشهادة للطباعة (PDF) 📥
      </button>
    </div>
  );
}
