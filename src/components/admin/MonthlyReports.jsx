"use client";
import React from 'react';

export default function MonthlyReports() {
  const stats = [
    { label: "صافي ربح أحمد (العمولات)", value: "12,450 ج.م", growth: "+15%" },
    { label: "إجمالي مبيعات المنصة", value: "145,000 ج.م", growth: "+22%" },
    { label: "أفضل محافظة", value: "الجيزة 🔥", growth: "Top" },
    { label: "نسبة المرتجعات", value: "2%", growth: "Low" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 text-right" dir="rtl">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-black text-white italic">تقارير <span className="text-[#00D1FF]">سيلوريا</span> الشهرية 📊</h2>
          <p className="text-gray-500 text-xs mt-2">تحليل الأداء للفترة من 1 مارس حتى 19 مارس 2026</p>
        </div>
        <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl text-[10px] font-bold hover:bg-[#39FF14] hover:text-black transition-all">
          تحميل تقرير PDF 📄
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-[30px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#39FF14]/5 blur-3xl group-hover:bg-[#39FF14]/20 transition-all"></div>
            <p className="text-[10px] text-gray-500 mb-2 font-bold">{s.label}</p>
            <h3 className="text-2xl font-black text-white">{s.value}</h3>
            <span className="text-[8px] text-[#39FF14] font-black mt-2 inline-block bg-[#39FF14]/10 px-2 py-0.5 rounded-full">{s.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
