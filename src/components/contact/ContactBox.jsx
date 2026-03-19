"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactBox() {
  const myNumber = "201019672878"; // رقمك اللي سجلناه يا بطل

  const openWhatsApp = (msg) => {
    const url = "https://wa.me/" + myNumber + "?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center" dir="rtl">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="glass p-12 rounded-[50px] border border-[#39FF14]/20 relative overflow-hidden"
      >
        <h2 className="text-4xl font-black mb-6">لسه عندك <span className="text-[#39FF14]">استفسار؟</span></h2>
        <p className="text-gray-400 text-lg mb-10">فريق دعم سيلوريا (أو أحمد شخصياً) جاهز يحللك أي مشكلة في ثانية.</p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button 
            onClick={() => openWhatsApp("يا أحمد، أنا تاجر وعايز مساعدة في ربط محلي بسيلوريا.")}
            className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all"
          >
            <span>واتساب التجار 🏪</span>
          </button>
          
          <button 
            onClick={() => openWhatsApp("يا أحمد، أنا زبون وعندي استفسار بخصوص أوردر أو نقاط.")}
            className="glass text-white px-10 py-5 rounded-2xl font-black text-xl border-white/10 hover:border-[#39FF14] transition-all"
          >
            <span>دعم الزبائن 👤</span>
          </button>
        </div>
      </motion.div>
      
      {/* زرار عائم سريع (Floating Action Button) */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[100]"
        onClick={() => openWhatsApp("رسالة سريعة من موقع سيلوريا")}
      >
        <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:scale-110 transition-all text-black text-3xl">
          💬
        </div>
      </motion.div>
    </div>
  );
}
