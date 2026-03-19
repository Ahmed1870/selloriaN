import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl mx-auto">
      {products.map((p) => (
        <motion.div key={p.id} whileHover={{ y: -10 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 overflow-hidden">
          <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-2xl bg-gray-900" />
          <div className="mt-4">
            <h3 className="text-white font-bold">{p.name}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[#39FF14] font-black">{p.price} EGP</span>
              <button onClick={() => window.open(`https://wa.me/${p.whatsapp}`)} className="bg-[#39FF14] text-black p-2 rounded-xl font-bold text-xs flex items-center gap-1">
                <FaWhatsapp /> اطلب الآن
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default ProductsGrid;
