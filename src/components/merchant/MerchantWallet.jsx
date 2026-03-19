"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MerchantWallet({ balance = 0 }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 rounded-[40px] bg-gradient-to-br from-[#111] to-black border border-[#39FF14]/20 shadow-[0_0_50px_rgba(57,255,20,0.05)] text-right" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] font-black text-[#39FF14] tracking-widest uppercase">محفظة سيلوريا 💳</span>
        <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-ping"></div>
      </div>
      
      <p className="text-gray-500 text-xs mb-2">رصيدك القابل للسحب</p>
      <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">
        {balance.toLocaleString()} <span className="text-lg text-[#39FF14]">ج.م</span>
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <p className="text-[8px] text-gray-500 mb-1">أرباح اليوم</p>
          <p className="font-bold text-white text-sm">+450 ج.م</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <p className="text-[8px] text-gray-500 mb-1">عمولات المنصة</p>
          <p className="font-bold text-gray-400 text-sm">-45 ج.م</p>
        </div>
      </div>

      <button className="w-full bg-[#39FF14] text-black py-4 rounded-2xl font-black text-sm hover:shadow-[0_0_30px_#39FF14] transition-all flex items-center justify-center gap-2">
         طلب سحب الأرباح 💸
      </button>
      
      <p className="text-[9px] text-center text-gray-600 mt-6 italic">
        * يتم تحويل الأرباح خلال 24 ساعة عبر فودافون كاش أو إنستا باي.
      </p>
    </div>
  );
}
