"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function MerchantVault() {
  const stats = [
    { label: 'إجمالي المبيعات', value: 12500, color: '#39FF14' },
    { label: 'عمولة سيلوريا (5%)', value: 625, color: '#FF4444' },
    { label: 'صافي ربحك الحقيقي', value: 11875, color: '#00D1FF' }
  ];

  const pendingDeliveries = [
    { courier: 'محمد الكومي', amount: 3200, status: 'في الطريق' },
    { courier: 'أحمد سعيد', amount: 1500, status: 'تم التحصيل' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 text-right" dir="rtl">
      <div className="glass p-10 rounded-[50px] border border-white/5 relative">
        <h2 className="text-4xl font-black mb-10 text-gradient">خزنة الشريك 💰</h2>
        
        {/* عدادات الأرباح */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center"
            >
              <p className="text-gray-400 text-sm mb-2">{s.label}</p>
              <h3 style={{ color: s.color }} className="text-3xl font-black italic">
                {s.value.toLocaleString('ar-EG')} <span className="text-xs">ج.م</span>
              </h3>
            </motion.div>
          ))}
        </div>

        {/* كشف عهدة المناديب */}
        <div className="bg-black/40 rounded-3xl p-8 border border-white/5">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping"></span>
            تحصيل المناديب الآن:
          </h4>
          <div className="space-y-4">
            {pendingDeliveries.map((d, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <div>
                  <p className="font-bold text-white">{d.courier}</p>
                  <p className="text-xs text-gray-500">{d.status}</p>
                </div>
                <div className="text-left">
                  <p className="text-[#00D1FF] font-black">{d.amount} ج.م</p>
                  <button className="text-[10px] bg-white/10 px-3 py-1 rounded-full mt-1">تأكيد الاستلام</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
