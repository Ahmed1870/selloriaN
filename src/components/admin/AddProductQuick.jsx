"use client";
import React, { useState } from 'react';

export default function AddProductQuick({ onBack }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [insight, setInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const askAi = async () => {
    if(!name) return alert('اكتب اسم المنتج أولاً عشان المساعد يعرف يحلله!');
    setLoadingAi(true);
    const res = await fetch('/api/ai-assistant', {
      method: 'POST',
      body: JSON.stringify({ productName: name }),
    });
    const data = await res.json();
    setDesc(data.description);
    setInsight(data.marketInsight);
    setLoadingAi(false);
  };

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', textAlign: 'right', minHeight: '100vh' }}>
      <h2 style={{ color: '#39FF14' }}>المساعد الذكي للتاجر 🤖</h2>
      
      <input 
        placeholder="اسم المنتج (مثلاً: ساعة يد ذكية)" 
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '12px' }}
      />

      <button 
        onClick={askAi}
        disabled={loadingAi}
        style={{ width: '100%', marginTop: '10px', background: 'linear-gradient(45deg, #39FF14, #00D1FF)', color: '#000', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}
      >
        {loadingAi ? 'جاري تحليل السوق والمنتج...' : '✨ توليد وصف وتسعير بالذكاء الاصطناعي'}
      </button>

      {desc && (
        <div style={{ marginTop: '20px', background: '#111', padding: '15px', borderRadius: '15px', border: '1px solid #39FF14' }}>
          <p style={{ color: '#39FF14', fontSize: '12px' }}>💡 اقتراح الـ AI للوصف:</p>
          <p style={{ fontSize: '14px', color: '#ccc' }}>{desc}</p>
          <hr style={{ borderColor: '#222' }} />
          <p style={{ color: '#00D1FF', fontSize: '12px' }}>🌍 تحليل السوق:</p>
          <p style={{ fontSize: '14px', color: '#ccc' }}>{insight}</p>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: '20px', color: '#888', background: 'none', border: 'none' }}>رجوع للوحة التحكم</button>
    </div>
  );
}
