"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const categories = ['الكل', 'ملابس', 'إلكترونيات', 'أحذية', 'أخرى'];

export default function ProductsGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('الكل');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(data || []);
      setFiltered(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // محرك البحث والفلترة
  useEffect(() => {
    let result = products;
    if (activeCat !== 'الكل') {
      result = result.filter(p => p.category === activeCat);
    }
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(result);
  }, [search, activeCat, products]);

  if (loading) return <div style={{textAlign:'center', color:'#39FF14', padding:'50px'}}>براد الشاي بيغلي والبضاعة بتتحمل... ☕</div>;

  return (
    <div style={{ padding: '10px' }}>
      {/* شريط البحث */}
      <input 
        placeholder="بتدور على إيه؟ 🔍" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '15px', marginBottom: '15px' }}
      />

      {/* أقسام المنتجات */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '5px' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{ 
              padding: '8px 20px', 
              borderRadius: '20px', 
              border: 'none', 
              whiteSpace: 'nowrap',
              background: activeCat === cat ? '#39FF14' : '#111', 
              color: activeCat === cat ? '#000' : '#888',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* عرض المنتجات */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {filtered.length > 0 ? filtered.map(p => (
          <div key={p.id} style={{ background: '#111', border: '1px solid #222', padding: '10px', borderRadius: '20px', textAlign: 'center' }}>
            <img src={p.image_url || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '15px' }} />
            <h3 style={{ color: '#fff', fontSize: '13px', margin: '8px 0', height: '35px', overflow: 'hidden' }}>{p.name}</h3>
            <p style={{ color: '#39FF14', fontWeight: 'bold' }}>{p.price} ج.م</p>
            <button onClick={() => onAddToCart(p)} style={{ background: '#222', color: '#39FF14', border: '1px solid #39FF14', padding: '8px', borderRadius: '10px', width: '100%', fontWeight: 'bold', fontSize: '12px' }}>إضافة +</button>
          </div>
        )) : <p style={{gridColumn:'1/3', textAlign:'center', color:'#666', padding:'20px'}}>مفيش بضاعة بالاسم ده حالياً.. 🤷‍♂️</p>}
      </div>
    </div>
  );
}
