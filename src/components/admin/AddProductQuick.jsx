"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AddProductQuick({ onBack }) {
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if(!productName || !sellingPrice) return alert('اكمل البيانات يا بطل!');
    setLoading(true);

    const { data, error } = await supabase
      .from('products')
      .insert([
        { name: productName, price: parseFloat(sellingPrice), image_url: 'https://via.placeholder.com/150' }
      ]);

    if (error) {
      alert('حصل مشكلة في الربط: ' + error.message);
    } else {
      alert('مبروك! المنتج نزل على الموقع والبيع بدأ 💰');
      onBack();
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px', minHeight: '100vh', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14' }}>إضافة منتج حقيقي 🚀</h2>
      <input 
        placeholder="اسم المنتج" 
        onChange={(e)=>setProductName(e.target.value)}
        style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '12px', marginBottom: '15px' }}
      />
      <input 
        type="number" 
        placeholder="سعر البيع" 
        onChange={(e)=>setSellingPrice(e.target.value)}
        style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #39FF14', color: '#fff', borderRadius: '12px', marginBottom: '20px' }}
      />
      <button 
        onClick={handlePublish}
        disabled={loading}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', opacity: loading ? 0.5 : 1 }}
      >
        {loading ? 'جاري النشر...' : 'انشر واكسب 💰'}
      </button>
      <button onClick={onBack} style={{ width: '100%', background: 'none', color: '#888', border: 'none', marginTop: '10px' }}>رجوع</button>
    </div>
  );
}
