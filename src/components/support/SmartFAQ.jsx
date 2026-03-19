"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "إزاي أضمن حقي في التقسيط؟", a: "سيلوريا بتضمن حقك بعقد إلكتروني موثق، وبدون أي فوائد أو غرامات تأخير. إنت بتدفع النص والباقي على أسبوعين بكل أمان." },
  { q: "التوصيل بياخد وقت قد إيه؟", a: "بفضل نظام 'طيارين سيلوريا' والـ GPS، الأوردر بيوصلك في نفس اليوم لو إنت في المحافظات الكبرى، وبحد أقصى 48 ساعة لأي مكان في مصر." },
  { q: "هل المنتجات أصلية؟", a: "كل تاجر على سيلوريا معاه 'شهادة توثيق' وبضاعته متراجعة من السيستم بتاعنا. لو المنتج مش زي الصورة، حقك يرجعلك فوراً." }
];

export default function SmartFAQ() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-right" dir="rtl">
      <h2 className="text-3xl font-black mb-12 text-white italic">عندك سؤال؟ <span className="text-[#00D1FF]">سيلوريا بتجاوبك</span> 🤖</h2>
      
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
            <button 
              onClick={() => setActive(active === i ? null : i)}
              className="w-full p-6 text-right flex justify-between items-center hover:bg-white/10 transition-all"
            >
              <span className="font-bold text-gray-200">{item.q}</span>
              <span className="text-[#00D1FF]">{active === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {active === i && (
                <motion.div 
                  initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                  className="px-6 pb-6 text-sm text-gray-400 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-600">لسه محتار؟ ابعتلنا واتساب على <span className="text-[#39FF14] font-bold">01019672878</span> وفريقنا هيرد عليك طيارة!</p>
      </div>
    </div>
  );
}
