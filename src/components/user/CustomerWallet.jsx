"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CustomerWallet({ points = 150, balance = 50 }) {
  return (
    <div className="max-w-md mx-auto p-6 text-right" dir="rtl">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-8 rounded-[40px] border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#111] to-[#000]"
      >
        {/* تأثيرات ضوئية خلفية */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#39FF14]/10 blur-3xl rounded-full" />
        
        <h3 className="text-xl font-black mb-8 text-white flex justify-between items-center">
          <span>محفظة سيلوريا 💳</span>
          <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full border border-white/10 text-gray-500">حساب نشط</span>
        </h3>

        <div className="space-y-8 relative z-10">
          {/* رصيد النقط */}
          <div>
            <p className="text-xs text-gray-500 mb-1">نقاط الولاء (Gold Points)</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-5xl font-black text-[#39FF14]">{points}</h4>
              <span className="text-xs text-[#39FF14]/60 italic font-bold">نقطة</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-white/5" />

          {/* الرصيد النقدي المتاح */}
          <div>
            <p className="text-xs text-gray-500 mb-1">رصيد كاش مسترد (Cashback)</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-4xl font-black text-[#00D1FF]">{balance}</h4>
              <span className="text-xs text-[#00D1FF]/60 italic font-bold">ج.م</span>
            </div>
          </div>

          {/* زرار التحويل أو الخصم */}
          <button className="w-full bg-white/5 hover:bg-[#39FF14] hover:text-black py-4 rounded-2xl border border-white/10 transition-all font-bold text-sm">
            استبدال النقاط بخصم فوري ⚡
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] text-gray-600 leading-relaxed text-center">
            كل 100 نقطة بتديك 10 جنيه خصم على أوردرك الجاي. <br/> اشتري أكتر.. وفر أكتر مع سيلوريا.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
