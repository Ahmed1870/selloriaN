import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaWhatsapp, FaUserCircle } from 'react-icons/fa';

const VendorRegister = () => {
  const [vendorData, setVendorData] = useState({ name: '', store: '', whatsapp: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    alert('مبروك! حسابك كتاجر في سيلوريا جاهز.. ابدأ برفع منتجاتك الآن.');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 px-6 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white/5 backdrop-blur-2xl border border-[#39FF14]/20 rounded-[35px] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-[#39FF14]/10 rounded-2xl mb-4">
            <FaStore className="text-[#39FF14] text-4xl" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest">انضم كتاجر <span className="text-[#39FF14]">Partner</span></h2>
          <p className="text-gray-500 text-sm mt-2">ابدأ بيع منتجاتك بذكاء في سيلوريا</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="اسم التاجر"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-[#39FF14] outline-none"
              onChange={(e) => setVendorData({...vendorData, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <FaStore className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="اسم المحل / البراند"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-[#39FF14] outline-none"
              onChange={(e) => setVendorData({...vendorData, store: e.target.value})}
            />
          </div>
          <div className="relative">
            <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="number" 
              placeholder="رقم الواتساب (للأوردرات)"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-[#39FF14] outline-none"
              onChange={(e) => setVendorData({...vendorData, whatsapp: e.target.value})}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#39FF14] text-black font-black py-5 rounded-2xl uppercase tracking-widest mt-4"
          >
            إنشاء حساب التاجر
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VendorRegister;
