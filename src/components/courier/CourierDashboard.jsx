"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CourierDashboard() {
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, area: "العشرين، فيصل", distance: "0.5 كم", price: 35, status: "متاح" },
    { id: 2, area: "المهندسين، جامعة الدول", distance: "2.1 كم", price: 50, status: "متاح" }
  ]);

  return (
    <div className="max-w-md mx-auto py-10 px-4 text-right" dir="rtl">
      <div className="glass p-8 rounded-[40px] border border-[#FFD700]/20 bg-black/80 shadow-[0_20px_50px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-white italic">طيار سيلوريا 🛵</h2>
          <div className="bg-[#39FF14]/10 px-3 py-1 rounded-full text-[#39FF14] text-[10px] font-bold animate-pulse">متصل بالـ GPS</div>
        </div>

        {/* عداد أرباح المندوب اليومية */}
        <div className="bg-gradient-to-br from-[#111] to-[#222] p-6 rounded-3xl border border-white/5 mb-8 text-center">
          <p className="text-gray-500 text-xs mb-1">أرباحك النهاردة (كاش)</p>
          <h3 className="text-4xl font-black text-[#FFD700]">285 <span className="text-sm">ج.م</span></h3>
        </div>

        <h4 className="text-sm font-bold text-gray-400 mb-4 mr-2">طلبات قريبة منك الآن:</h4>
        
        <div className="space-y-4">
          {activeJobs.map(job => (
            <motion.div 
              key={job.id}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 p-5 rounded-3xl border border-white/10 hover:border-[#39FF14] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-bold">{job.area}</p>
                  <p className="text-[10px] text-gray-500">على بُعد {job.distance}</p>
                </div>
                <div className="text-left">
                  <p className="text-[#39FF14] font-black">+{job.price} ج.م</p>
                  <p className="text-[8px] text-gray-600 italic underline">أسرع طريق متاح 🚀</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-[#39FF14] text-black font-black py-2 rounded-xl text-xs">
                قبول وتحديد المسار 📍
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600">سياسة سيلوريا: المندوب هو "سفيرنا" في الشارع. حافظ على الأمانة والسرعة!</p>
        </div>
      </div>
    </div>
  );
}
