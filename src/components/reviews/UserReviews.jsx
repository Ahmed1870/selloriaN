"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function UserReviews() {
  const reviews = [
    { name: "محمد السيد", city: "الإسكندرية", text: "الخامة تحفة ووصلتني في أقل من ساعتين! فعلاً سيلوريا طيارة 🚀", stars: 5, img: "👕" },
    { name: "سارة محمود", city: "طنطا", text: "نظام التقسيط سهل عليا كتير، دفعت النص والباقي بعد أسبوعين فعلاً بدون فوائد ✅", stars: 5, img: "👜" }
  ];

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 text-right" dir="rtl">
      <h2 className="text-3xl font-black mb-12 text-white">قالوا عن <span className="text-[#39FF14]">سيلوريا</span> 💬</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 p-8 rounded-[40px] border border-white/5 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#39FF14] to-[#00D1FF] rounded-full flex items-center justify-center text-2xl">
                {rev.img}
              </div>
              <div>
                <h4 className="font-bold text-white">{rev.name}</h4>
                <p className="text-[10px] text-gray-500">{rev.city}</p>
              </div>
              <div className="mr-auto flex text-[#FFD700]">
                {[...Array(rev.stars)].map((_, s) => <span key={s}>★</span>)}
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed italic">" {rev.text} "</p>
            
            <div className="mt-4 flex gap-2">
              <span className="text-[8px] bg-[#39FF14]/10 text-[#39FF14] px-2 py-1 rounded-full font-bold">تم التحقق من الشراء ✅</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
