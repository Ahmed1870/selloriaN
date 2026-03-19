"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* دوائر ضوئية في الخلفية */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-black tracking-tighter text-gradient">SELLORIA <span className="text-white">PRO</span></h1>
        <button className="glass px-6 py-2 rounded-full text-sm font-bold border-white/20 hover:bg-white/10 transition-all">تسجيل الدخول</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-40 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
            مستقبل التجارة الذكية في مصر 🇪🇬
          </span>
          <h2 className="text-6xl md:text-8xl font-black mt-8 mb-6 leading-tight">
            حوّل محلك لـ <br/>
            <span className="text-gradient">ماكينة أرباح</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            انضم لآلاف التجار في فيصل والهرم والجيزة، وسيطر على سوقك بذكاء اصطناعي يسبق "أمازون" بخطوات.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="w-full md:w-auto bg-[#39FF14] text-black px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all">
              ابدأ تجربتك المجانية 🚀
            </button>
            <button className="w-full md:w-auto glass px-10 py-5 rounded-2xl font-bold text-xl border-white/10 hover:border-white/30 transition-all">
              تصفح السوق
            </button>
          </div>
        </motion.div>

        {/* كروت المميزات الفخمة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { title: 'رادار المنافسين', desc: 'راقب أسعار أمازون ونون لحظياً وعدل أسعارك لتكتسحهم.', icon: '🕵️‍♂️', color: 'blue' },
            { title: 'مساعد التسويق AI', desc: 'الذكاء الاصطناعي يكتب إعلاناتك ويصور منتجاتك باحترافية.', icon: '🤖', color: 'green' },
            { title: 'الجمعية الرقمية', desc: 'اجمع مع تجار منطقتك واشتروا بسعر المصنع لتضاعف ربحك.', icon: '🤝', color: 'purple' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[30px] text-right border-white/5 relative group cursor-pointer"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-[#39FF14] transition-colors">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 blur-3xl rounded-full group-hover:bg-green-500/20 transition-all" />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
