"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AffiliateHub() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://selloria.app/join?ref=AHMED2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-right" dir="rtl">
      <div className="glass p-12 rounded-[50px] border border-[#00D1FF]/20 relative overflow-hidden bg-gradient-to-br from-[#000] to-[#050505]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent opacity-50"></div>
        
        <h2 className="text-4xl font-black mb-4">كن شريكاً في <span className="text-[#00D1FF]">إمبراطورية سيلوريا</span> 🤝</h2>
        <p className="text-gray-400 mb-10 text-lg">سوق لسيلوريا في منطقتك، وخد عمولة 10% على كل اشتراك تاجر برو مدى الحياة!</p>

        {/* لينك التسويق الخاص */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-10">
          <p className="text-xs text-gray-500 mb-2 font-bold">لينك التسويق الخاص بك (Referral Link):</p>
          <div className="flex gap-4 items-center">
            <input 
              readOnly 
              value={referralLink} 
              className="flex-1 bg-black/40 border border-white/10 p-4 rounded-xl text-[#00D1FF] font-mono text-sm outline-none"
            />
            <button 
              onClick={handleCopy}
              className="bg-[#00D1FF] text-black px-8 py-4 rounded-xl font-black hover:scale-105 transition-all"
            >
              {copied ? 'تم النسخ ✅' : 'نسخ الرابط'}
            </button>
          </div>
        </div>

        {/* إحصائيات الأرباح للمسوق */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-gray-500 text-xs mb-1">تجار اشتركوا عن طريقك</p>
            <h4 className="text-2xl font-black text-white">12 تاجر</h4>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-gray-500 text-xs mb-1">أرباح معلقة</p>
            <h4 className="text-2xl font-black text-[#39FF14]">450 ج.م</h4>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-gray-500 text-xs mb-1">أرباح تم سحبها</p>
            <h4 className="text-2xl font-black text-[#00D1FF]">1,200 ج.م</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
