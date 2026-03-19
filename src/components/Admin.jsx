"use client";
import React, { useState, useEffect } from 'react';
import AddProductQuick from './admin/AddProductQuick';
import { supabase } from '../lib/supabaseClient';

export default function Admin() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
  };

  useEffect(() => { fetchMyProducts(); }, [showAddForm]);

  const handleDelete = async (id) => {
    if(confirm('متأكد إنك عايز تمسح المنتج ده؟')) {
      await supabase.from('products').delete().eq('id', id);
      fetchMyProducts();
    }
  };

  if (showAddForm) return <AddProductQuick onBack={() => setShowAddForm(false)} />;

  return (
    <div style={{ padding: '20px', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14' }}>إدارة مخزنك 📦</h2>
      
      <button 
        onClick={() => setShowAddForm(true)}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', marginBottom: '20px' }}
      >
        ➕ إضافة منتج جديد
      </button>

      <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>منتجاتك الحالية:</h3>
      {products.map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '10px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #222' }}>
          <div>
            <div style={{ fontSize: '14px' }}>{p.name}</div>
            <div style={{ color: '#39FF14', fontSize: '12px' }}>{p.price} ج.م</div>
          </div>
          <button onClick={() => handleDelete(p.id)} style={{ background: '#331111', color: '#ff4444', border: 'none', padding: '5px 10px', borderRadius: '8px', fontSize: '12px' }}>حذف 🗑️</button>
        </div>
      ))}
    </div>
  );
}
