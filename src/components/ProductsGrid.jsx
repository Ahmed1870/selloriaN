"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export default function ProductsGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'100px', color:'#39FF14'}}>جاري تحضير الواجهة الفخمة... ✨</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px' }}>
      {products.map((p, i) => (
        <motion.div 
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card"
          style={{ padding: '10px', textAlign: 'center' }}
        >
          <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden' }}>
            <img src={p.image_url || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200'} 
                 style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontSize: '14px', margin: '10px 0', fontWeight: '500' }}>{p.name}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px' }}>
             <span style={{ color: '#39FF14', fontWeight: 'bold' }}>{p.price}ج</span>
             <motion.button 
               whileTap={{ scale: 0.9 }}
               onClick={() => onAddToCart(p)}
               style={{ background: '#39FF14', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: '#000', fontWeight: 'bold' }}
             >+</motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
