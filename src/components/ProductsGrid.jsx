import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const products = [
  { id: 1, name: 'ساعة سمارت Z', price: '900', vendor: 'محل التقنية', whatsapp: '201019672878', image: 'https://via.placeholder.com/300/39FF14/000000?text=Watch' },
  { id: 2, name: 'سماعة نيون', price: '450', vendor: 'أحمد ستور', whatsapp: '201019672878', image: 'https://via.placeholder.com/300/39FF14/000000?text=Audio' },
];

const ProductsGrid = () => {
  const handleBuy = (product) => {
    const message = `أهلاً ${product.vendor}، أريد شراء ${product.name} بسعر ${product.price} من منصة سيلوريا`;
    window.open(`https://wa.me/${product.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl mx-auto">
      {products.map((product) => (
        <motion.div key={product.id} whileHover={{ y: -10 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 group">
          <div className="relative h-48 rounded-2xl overflow-hidden bg-black/40">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black/60 text-[10px] px-2 py-1 rounded-md text-gray-400">بواسطة: {product.vendor}</div>
          </div>
          <div className="mt-4">
            <h3 className="text-white font-bold">{product.name}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#39FF14] font-black">{product.price} EGP</span>
              <button 
                onClick={() => handleBuy(product)}
                className="bg-[#39FF14] text-black p-2 rounded-xl flex items-center gap-2 font-bold text-xs"
              >
                <FaWhatsapp size={16}/> اطلب الآن
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductsGrid;
