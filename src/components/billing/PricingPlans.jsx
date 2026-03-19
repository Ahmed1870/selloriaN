"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingPlans() {
  const tiers = [
    {
      name: "تاجر ناشئ (المجانية)",
      price: "0",
      features: ["10 منتجات", "لوحة تحكم أساسية", "دعم فني بطيء"],
      color: "#999",
      button: "خطتك الحالية",
      highlight: false
    },
    {
      name: "تاجر محترف (البرو)",
      price: "199",
      features: ["منتجات غير محدودة", "رادار الأسعار (أمازون/نون)", "بوت الفصال الذكي (AI)", "واتساب آلي للزبائن"],
      color: "#39FF14",
      button: "اشترك الآن",
      highlight: true
    },
    {
      name: "إمبراطور الجيزة (VIP)",
      price: "499",
      features: ["كل مميزات البرو", "خريطة الحرارة الحية", "أولوية ظهور في البحث", "مدير حسابات شخصي"],
      color: "#00D1FF",
      button: "امتلك السوق",
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 text-right" dir="rtl">
      {/* عداد الـ FOMO (الطعم) */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="bg-red-600/20 border border-red-500 p-4 rounded-2xl mb-16 text-center"
      >
        <p className="text-red-500 font-black text-lg">
          ⚠️ تنبيه: إنت مفعل دلوقتي نسخة الـ <span className="underline">VIP مجاناً</span> (فترة تجريبية).. متبقي 02:59:59 والسيستم يقفل!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className={`glass p-10 rounded-[50px] border ${tier.highlight ? 'border-[#39FF14]' : 'border-white/5'}`}
          >
            <h3 className="text-2xl font-black mb-2" style={{ color: tier.color }}>{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-white">{tier.price}</span>
              <span className="text-gray-500 text-sm">ج.م / شهر</span>
            </div>
            
            <ul className="space-y-4 mb-12">
              {tier.features.map((f, j) => (
                <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                  <span style={{ color: tier.color }}>✔</span> {f}
                </li>
              ))}
            </ul>

            <button 
              className="w-full py-5 rounded-2xl font-black transition-all"
              style={{ 
                backgroundColor: tier.highlight ? '#39FF14' : 'rgba(255,255,255,0.05)',
                color: tier.highlight ? 'black' : 'white',
                border: tier.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {tier.button}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-500">للتفعيل السريع عبر فودافون كاش: <span className="text-white font-bold tracking-widest">01019672878</span></p>
      </div>
    </div>
  );
}
