"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  { 
    q: "إزاي سيلوريا بتضمن حقي كتاجر؟", 
    a: "عن طريق 'رادار الثقة' اللي بيفلتر الزباين، ونظام 'التحصيل الفوري' من المناديب المعتمدين في منطقتك." 
  },
  { 
    q: "يعني إيه فصال ذكي بالـ AI؟", 
    a: "ده بوت ذكي بياخد ويدي مع الزبون في السعر بناءً على 'أقل سعر' إنت محدده، عشان يقفل البيعة وأنت نايم." 
  },
  { 
    q: "إزاي أسحب أرباحي من المحفظة؟", 
    a: "بكل سهولة، تقدر تطلب سحب كاش مع أقرب مندوب أو تحويل فوري على فودافون كاش في أي وقت." 
  },
  { 
    q: "لو المنتج طلع فيه عيب، إيه الحل؟", 
    a: "عندنا 'الضمان الذهبي'؛ المندوب بيجيلك لحد البيت ياخد المرتجع ويرجعلك فلوسك كاش في أقل من 24 ساعة." 
  }
];

export default function SmartFAQ() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-8 text-right" dir="rtl">
      <h2 className="text-4xl font-black mb-12 text-center text-gradient">إزاي سيلوريا بتشغل السوق؟ 🤔</h2>
      
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div key={i} className="glass rounded-3xl border border-white/5 overflow-hidden">
            <button 
              onClick={() => setActive(active === i ? null : i)}
              className="w-full p-6 text-right flex justify-between items-center hover:bg-white/5 transition-all"
            >
              <span className="text-lg font-bold text-white">{item.q}</span>
              <span className="text-[#39FF14] text-2xl">{active === i ? '−' : '+'}</span>
            </button>
            
            <AnimatePresence>
              {active === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-gray-400 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
