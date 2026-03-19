"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddProductAI() {
  const [analyzing, setAnalyzing] = useState(false);
  const [product, setProduct] = useState(null);

  const handleSimulateAI = () => {
    setAnalyzing(true);
    // محاكاة تحليل الصورة بالذكاء الاصطناعي
    setTimeout(() => {
      setProduct({
        name: "كوتشي ناييكي إير جوردان - أبيض في أسود",
        desc: "خامة مستوردة نعل مريح جداً، مناسب للمشي الطويل والرياضة، تصميم عصري يخطف العين في شارع فيصل!",
        category: "أحذية",
        suggestedPrice: 850
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-right" dir="rtl">
      <div className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
        <h2 className="text-3xl font-black mb-8 text-gradient">إضافة منتج بذكاء سيلوريا 🤖</h2>
        
        {/* منطقة رفع الصور */}
        <div 
          onClick={handleSimulateAI}
          className="border-2 border-dashed border-white/20 rounded-3xl p-12 text-center hover:border-[#39FF14] transition-all cursor-pointer group"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📸</div>
          <p className="text-gray-400 font-bold">صور المنتج أو ارفع الصورة هنا</p>
          <p className="text-xs text-gray-600 mt-2">الـ AI هيكتب الوصف ويحدد السعر لوحده</p>
        </div>

        {analyzing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-8 p-6 bg-[#39FF14]/5 rounded-2xl border border-[#39FF14]/20 text-center"
          >
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-[#39FF14] rounded-full mb-3" role="status"></div>
            <p className="text-[#39FF14] font-bold text-sm">جاري تحليل تفاصيل المنتج وصياغة الوصف...</p>
          </motion.div>
        )}

        {product && !analyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            <div>
              <label className="block text-xs text-gray-500 mb-2 mr-2">اسم المنتج (مقترح)</label>
              <input value={product.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#39FF14]" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 mr-2">الوصف البيعي (AI)</label>
              <textarea rows="3" value={product.desc} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#39FF14]" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-2 mr-2">السعر المقترح (ج.م)</label>
                <input value={product.suggestedPrice} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[#39FF14] font-bold text-xl outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-2 mr-2">القسم</label>
                <input value={product.category} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none" />
              </div>
            </div>
            <button className="w-full bg-[#39FF14] text-black font-black py-5 rounded-2xl text-xl shadow-[0_0_30px_rgba(57,255,20,0.3)]">
              تأكيد ونشر في سوق سيلوريا ✅
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
