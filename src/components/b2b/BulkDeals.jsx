"use client";
import React from 'react';

export default function BulkDeals() {
  const deals = [
    { item: 'كوتشي نايك كوبي', currentUsers: 3, target: 10, discount: '25%' },
    { item: 'ساعة T800', currentUsers: 8, target: 20, discount: '40%' }
  ];

  return (
    <div className="glass-card" style={{ padding: '20px', margin: '20px', border: '2px solid #39FF14' }}>
      <h2 style={{ color: '#39FF14', fontSize: '18px' }}>🤝 جمعية سيلوريا للجملة</h2>
      <p style={{ fontSize: '12px', color: '#888' }}>جمع مع تجار تانيين واشري بسعر المصنع!</p>
      
      {deals.map(d => (
        <div key={d.item} style={{ background: '#111', padding: '15px', borderRadius: '15px', marginTop: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{d.item}</span>
            <span style={{ color: '#39FF14' }}>خصم {d.discount}</span>
          </div>
          <div style={{ height: '8px', background: '#333', borderRadius: '5px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: (d.currentUsers/d.target)*100 + '%', height: '100%', background: '#39FF14' }}></div>
          </div>
          <p style={{ fontSize: '10px', marginTop: '5px' }}>باقي {d.target - d.currentUsers} تجار ونفعل الخصم!</p>
          <button style={{ width: '100%', marginTop: '10px', background: '#39FF14', color: '#000', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 'bold' }}>انضم للطلبية ✅</button>
        </div>
      ))}
    </div>
  );
}
