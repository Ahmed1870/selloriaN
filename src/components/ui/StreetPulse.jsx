"use client";
import React from 'react';

export default function StreetPulse() {
  const updates = [
    "🔥 تم بيع 5 قطع من 'ساعة نيون' في فيصل الآن",
    "🚚 مندوب سيلوريا في طريقه لشارع الهرم بـ 3 أوردرات",
    "⭐ محل 'الأمانة' دخل لوحة الشرف للمرة الثالثة"،
    "🏷️ خصم فلاش نزل دلوقتي في الطالبية - الحق!"
  ];

  return (
    <div className="w-full bg-[#39FF14]/10 border-y border-[#39FF14]/20 py-3 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee gap-20">
        {[...updates, ...updates].map((text, i) => (
          <span key={i} className="text-[#39FF14] font-bold text-sm tracking-tight italic">
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
