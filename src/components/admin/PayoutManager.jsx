"use client";
import React from 'react';

const requests = [
  { id: 1, store: "محل الشياكة", amount: 1500, method: "Vodafone Cash", phone: "01012345678" },
  { id: 2, store: "براند الهرم", amount: 3200, method: "InstaPay", phone: "ahmed@instapay" }
];

export default function PayoutManager() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-right" dir="rtl">
      <h2 className="text-2xl font-black text-[#39FF14] mb-8">طلبات سحب الأرباح المعلقة 💸</h2>
      
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white text-lg">{req.store}</h4>
              <p className="text-xs text-gray-500">{req.method}: {req.phone}</p>
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-white mb-2">{req.amount} ج.م</p>
              <button className="bg-[#39FF14] text-black text-[10px] px-4 py-2 rounded-full font-black hover:scale-105 transition-all">
                تأكيد التحويل ✅
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
