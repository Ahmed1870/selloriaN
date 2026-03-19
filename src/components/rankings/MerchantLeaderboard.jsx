"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MerchantLeaderboard() {
  // بيانات محاكاة (في المستقبل هتيجي من الـ API الحقيقي مجمعة ومحسوبة)
  const topMerchants = [
    { id: 1, name: 'محل الأمانة للأحذية', area: 'فيصل', sales: 15200 },
    { id: 2, name: 'سنتر الملكة للملابس', area: 'الهرم', sales: 12800 },
    { id: 3, name: 'أولاد رجب للموبايلات', area: 'الطالبية', sales: 9500 },
    { id: 4, name: 'مكتبة النجاح', area: 'المريوطية', sales: 7200 },
    { id: 5, name: 'عطور مكة', area: 'فيصل', sales: 5100 }
  ];

  const getRankIcon = (index) => {
    if (index === 0) return '🏆'; // الأول
    if (index === 1) return '🥈'; // الثاني
    if (index === 2) return '🥉'; // الثالث
    return <span className="text-gray-600 font-bold">{index + 1}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-right">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="glass p-12 rounded-[50px] border border-white/5 relative overflow-hidden"
      >
        {/* خلفية نيون خفيفة */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter">🏆 عمالقة <span className="text-gradient">سيلوريا</span> اليوم</h2>
            <div className="text-sm font-bold text-gray-400 bg-white/5 px-6 py-2 rounded-full border border-white/10">أعلى مبيعات النهاردة</div>
          </div>

          <div className="space-y-6">
            {topMerchants.map((m, i) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex justify-between items-center bg-black/40 p-6 rounded-3xl border border-white/5 hover:border-[#39FF14]/30 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all"
              >
                <div className="flex gap-6 items-center">
                  <div className="text-4xl w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#39FF14]/50 group-hover:scale-110 transition-transform">
                    {getRankIcon(i)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#39FF14]">{m.name}</h3>
                    <p className="text-sm text-gray-500">{m.area}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">مبيعات</div>
                  <h4 className="text-3xl font-black text-white">{m.sales.toLocaleString('ar-EG')} <span className="text-xs text-gray-500">ج.م</span></h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <button className="glass px-12 py-5 rounded-2xl font-bold text-lg border-white/10 hover:border-white/30 transition-all text-white">
                إزاي محلي ينور هنا؟ 🤔
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
