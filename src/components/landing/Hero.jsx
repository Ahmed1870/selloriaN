"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* دوائر النيون الخلفية (Ambient Light) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#39FF14]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 text-center max-w-5xl">
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] tracking-[4px] uppercase text-[#39FF14] font-black">
            مستقبل التجارة الذكية في مصر 🇪🇬
          </span>
          <h1 className="text-6xl md:text-8xl font-black mt-8 mb-6 tracking-tighter leading-none">
            سيلوريا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00D1FF]">تغزو السوق</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            أول منصة مصرية ذكية بتربط التجار، المناديب، والزباين بذكاء اصطناعي حقيقي. قسط حلال، شحن طلقة، وبزنس بيكبر كل ثانية.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="bg-[#39FF14] text-black px-12 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_#39FF14] transition-all">
            ابدأ البيع الآن 🚀
          </button>
          <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
            جرب بوت الفصال 🤖
          </button>
        </motion.div>

        {/* إحصائيات سريعة */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
          <div><h4 className="text-2xl font-black">500+</h4><p className="text-xs text-gray-500">تاجر موثق</p></div>
          <div><h4 className="text-2xl font-black text-[#39FF14]">24h</h4><p className="text-xs text-gray-500">دعم فني</p></div>
          <div><h4 className="text-2xl font-black">100%</h4><p className="text-xs text-gray-500">تقسيط حلال</p></div>
          <div><h4 className="text-2xl font-black text-[#00D1FF]">GPS</h4><p className="text-xs text-gray-500">تتبع حي</p></div>
        </div>
      </div>
    </div>
  );
}
