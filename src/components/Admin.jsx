import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    alert('تمت إضافة المنتج بنجاح في Selloria! (سيتم الربط مع قاعدة البيانات قريباً)');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-[#39FF14] rounded-2xl flex items-center justify-center text-black">
            <FaPlus size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">لوحة التحكم <span className="text-[#39FF14]">Admin</span></h2>
            <p className="text-gray-500 text-sm">أضف منتجاتك الجديدة لـ Selloria</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#39FF14] mb-3 uppercase tracking-widest">اسم المنتج</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:border-[#39FF14] outline-none transition-all"
                placeholder="مثلاً: ساعة ذكية الترا"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#39FF14] mb-3 uppercase tracking-widest">السعر (EGP)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:border-[#39FF14] outline-none transition-all"
                placeholder="500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center border-2 border-dashed border-white/10 rounded-3xl p-8 hover:border-[#39FF14]/50 transition-colors group cursor-pointer">
            <FaCloudUploadAlt size={50} className="text-gray-600 group-hover:text-[#39FF14] transition-colors mb-4" />
            <p className="text-gray-500 text-sm">ارفع صورة المنتج هنا</p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(57, 255, 20, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 bg-[#39FF14] text-black font-black py-5 rounded-2xl uppercase tracking-widest text-lg"
          >
            نشر المنتج في المتجر
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Admin;
