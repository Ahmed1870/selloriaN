import React from 'react';
import { motion } from 'framer-motion';

const products = [
  { id: 1, name: 'منتج سيلوريا المميز', price: '500 EGP', image: 'https://via.placeholder.com/300x300/1a1a1a/39FF14?text=Product+1' },
  { id: 2, name: 'ساعة ذكية تيك', price: '1200 EGP', image: 'https://via.placeholder.com/300x300/1a1a1a/39FF14?text=Product+2' },
  { id: 3, name: 'سماعات نيون لايت', price: '850 EGP', image: 'https://via.placeholder.com/300x300/1a1a1a/39FF14?text=Product+3' },
];

const ProductsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl mx-auto">
      {products.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ y: -10, boxShadow: "0px 0px 30px rgba(57, 255, 20, 0.2)" }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group p-4 transition-all"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden bg-black/40">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 right-4 bg-[#39FF14] text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_#39FF14]">جديد</div>
          </div>
          <div className="mt-6">
            <h3 className="text-white font-bold text-lg">{product.name}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#39FF14] font-black text-xl">{product.price}</span>
              <button className="bg-white/10 hover:bg-[#39FF14] hover:text-black text-white p-3 rounded-xl transition-all">
                أضف للسلة
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductsGrid;
