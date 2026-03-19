"use client";
import React from 'react';

export default function AdminControl() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-2 text-[#39FF14]">لوحة تحكم القائد: أحمد 👑</h1>
        <p className="text-gray-500 mb-12">إدارة إمبراطورية سيلوريا - مركز التحكم المركزي</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-6 rounded-3xl border border-white/5 bg-white/5">
            <p className="text-[10px] text-gray-400">إجمالي التجار</p>
            <h2 className="text-3xl font-black">1,240</h2>
          </div>
          <div className="glass p-6 rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/5">
            <p className="text-[10px] text-[#39FF14]">أرباحك (العمولات)</p>
            <h2 className="text-3xl font-black">42,500 ج.م</h2>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5 bg-white/5">
            <p className="text-[10px] text-gray-400">أوردرات قيد التنفيذ</p>
            <h2 className="text-3xl font-black">85</h2>
          </div>
          <div className="glass p-6 rounded-3xl border border-red-500/20 bg-red-500/5">
            <p className="text-[10px] text-red-500">شكاوى التجار</p>
            <h2 className="text-3xl font-black text-red-500">3</h2>
          </div>
        </div>

        {/* أزرار الإدارة السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#111] to-black border border-white/10">
            <h3 className="text-xl font-bold mb-6">إدارة الأقاليم والمحافظات 🗺️</h3>
            <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl mb-4 hover:bg-[#39FF14] hover:text-black transition-all">فتح محافظة جديدة (الإسكندرية)</button>
            <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl">تعديل تسعيرة الشحن القومي</button>
          </div>
          
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#111] to-black border border-white/10">
            <h3 className="text-xl font-bold mb-6">الأمان والرقابة 🔐</h3>
            <button className="w-full bg-red-500/20 text-red-500 py-4 rounded-2xl mb-4">حظر تاجر مخالف</button>
            <button className="w-full bg-[#00D1FF]/20 text-[#00D1FF] py-4 rounded-2xl">تفعيل 'سيلوريا قسّط' لتاجر جديد</button>
          </div>
        </div>
      </div>
    </div>
  );
}
