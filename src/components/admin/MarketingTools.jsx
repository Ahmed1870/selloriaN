"use client";
import React, { useState } from 'react';

export default function MarketingTools({ product }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMarket = async () => {
    setLoading(true);
    const res = await fetch('/api/ai-assistant', {
      method: 'POST',
      body: JSON.stringify({ productName: product.name, price: product.price }),
    });
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <div className="glass-card" style={{ padding: '20px', marginTop: '20px', border: '1px solid #00D1FF' }}>
      <h3 style={{ color: '#00D1FF', margin: '0 0 15px 0', fontSize: '16px' }}>🚀 رادار التسويق الذكي</h3>
      
      {!data ? (
        <button onClick={analyzeMarket} disabled={loading} style={{ width: '100%', background: '#00D1FF', color: '#000', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>
          {loading ? 'جاري فحص السوق...' : 'تحليل المنافسين وتجهيز الإعلان'}
        </button>
      ) : (
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#888' }}>📈 أسعار المنافسين حالياً:</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            {data.competitors.map(c => (
              <div key={c.site} style={{ background: '#222', padding: '5px 10px', borderRadius: '8px', fontSize: '11px' }}>
                {c.site}: <span style={{ color: '#ff4444' }}>{c.price}ج</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: '#888' }}>📝 إعلان جاهز للنشر (Copy/Paste):</p>
          <textarea 
            readOnly 
            value={data.adCopy} 
            style={{ width: '100%', height: '100px', background: '#000', color: '#ccc', border: '1px solid #333', padding: '10px', borderRadius: '10px', fontSize: '12px' }} 
          />
          
          <button 
            onClick={() => {navigator.clipboard.writeText(data.adCopy); alert('تم نسخ الإعلان! انشره على فيسبوك 🚀')}}
            style={{ marginTop: '10px', width: '100%', background: 'none', border: '1px solid #00D1FF', color: '#00D1FF', padding: '8px', borderRadius: '10px', fontSize: '12px' }}
          >
            نسخ نص الإعلان 📋
          </button>
        </div>
      )}
    </div>
  );
}
