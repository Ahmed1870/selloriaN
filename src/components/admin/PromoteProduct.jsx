"use client";
import React, { useState } from 'react';

export default function PromoteProduct({ product, onBack }) {
  const [loading, setLoading] = useState(false);

  const handlePromote = async () => {
    setLoading(true);
    // محاكاة لعملية الدفع والترقية في قاعدة البيانات
    setTimeout(() => {
      alert('تم تفعيل الإعلان بنجاح! منتجك الآن في "الصف الأول" 🚀');
      onBack();
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ padding: '30px', margin: '20px', textAlign: 'center', border: '2px solid #FFD700' }}>
      <h2 style={{ color: '#FFD700' }}>🚀 ميزة الظهور الأول</h2>
      <p style={{ fontSize: '14px', color: '#ccc' }}>خلي منتجك "{product.name}" يظهر لكل الزباين في أول الصفحة لمدة 24 ساعة.</p>
      
      <div style={{ background: '#111', padding: '15px', borderRadius: '15px', margin: '20px 0' }}>
        <p style={{ fontSize: '12px', color: '#888' }}>تكلفة الإعلان اليومي:</p>
        <h3 style={{ color: '#39FF14', margin: 0 }}>20 ج.م فقط</h3>
      </div>

      <button 
        onClick={handlePromote}
        disabled={loading}
        style={{ width: '100%', background: '#FFD700', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none' }}
      >
        {loading ? 'جاري تفعيل الإعلان...' : 'ادفع وفعل الإعلان الآن 💰'}
      </button>
      
      <button onClick={onBack} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#555' }}>إلغاء</button>
    </div>
  );
}
