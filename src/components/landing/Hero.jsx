"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-32 lg:px-8 bg-black overflow-hidden" dir="rtl">
      {/* تأثير الإضاءة الخلفية (Blur Accent) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#39FF14] to-[#00D1FF] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        {/* شارة العلم المصري (تظبيط الـ UI اللي فات) */}
        <div className="mb-12 flex justify-center">
          <div className="relative rounded-full px-4 py-2 text-xs leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 bg-white/5 backdrop-blur-lg">
            مستقبل التجارة الذكية في مصر 🇪🇬 {' '}
            <a href="#plans" className="font-semibold text-[#39FF14] mr-2">
              اكتشف التقسيط <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* العنوان الرئيسي (The Title Masterpiece) */}
        <h1 className="text-5xl font-black text-white sm:text-7xl tracking-tighter leading-tight mb-8">
          سيلوريا <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] to-[#00D1FF]">تغزو السوق</span>، <br /> وتحقق المليار.
        </h1>

        {/* النص الفرعي المقروء */}
        <p className="text-xl font-medium text-gray-400 max-w-lg mx-auto leading-relaxed mb-16">
          أول منصة مصرية ذكية تربط التجار، المناديب، والزبائن بذكاء اصطناعي حقيقي. قسط حلال، شحن طلقة، وبزنس بيكبر كل ثانية.
        </p>

        {/* الأزرار العصرية (The CTAs Masterpiece) */}
        <div className="mt-10 flex items-center justify-center gap-x-6 gap-y-4 flex-wrap">
          <motion.a
            whileHover={{ scale: 1.05, shadow: "0px 0px 30px rgb(57,255,20)" }}
            href="#join"
            className="rounded-full bg-[#39FF14] px-12 py-5 text-sm font-black text-black shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ابدأ البيع الآن 🚀
          </motion.a>
          <a href="#faq" className="text-sm font-semibold leading-6 text-white hover:text-[#00D1FF] transition-all">
            جرب بوت الفصال 🤖 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
