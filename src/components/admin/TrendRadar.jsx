"use client";
import React from 'react';

export default function TrendRadar() {
  const trends = [
    { name: 'ساعات الترا 2', demand: 'مرتفع جداً 🔥', margin: '40%' },
    { name: 'إيربودز نيون', demand: 'مرتفع 🚀', margin: '30%' },
    { name: 'شاحن سريع 65W', demand: 'مستقر 📦', margin: '50%' }
  ];

  return (
    <div className="glass-card" style={{ padding: '20px', marginTop: '20px', border: '1px solid #FFD700' }}>
      <h3 style={{ color: '#FFD700', fontSize: '16px', margin: '0 0 15px 0' }}>📈 رادار المنتجات الرابحة (Trend)</h3>
      <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>بناءً على تحليلات السوق اليوم في مصر:</p>
      
      {trends.map(t => (
        <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
          <span style={{ fontSize: '13px' }}>{t.name}</span>
          <span style={{ fontSize: '12px', color: '#39FF14' }}>{t.demand}</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>ربح {t.margin}</span>
        </div>
      ))}
      
      <button style={{ width: '100%', marginTop: '15px', background: 'none', border: '1px solid #FFD700', color: '#FFD700', padding: '8px', borderRadius: '10px', fontSize: '12px' }}>
        تحميل تقرير السوق الكامل (قريباً)
      </button>
    </div>
  );
}
