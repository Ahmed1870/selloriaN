"use client";
import React, { useState } from 'react';

const pendingSellers = [
  { id: 1, name: 'محل البرنس', category: 'ملابس', phone: '01012345678' },
  { id: 2, name: 'تكنو ستور', category: 'إلكترونيات', phone: '01298765432' },
];

export default function SuperAdmin({ onBack }) {
  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px', minHeight: '100vh', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#39FF14', margin: 0 }}>لوحة المدير العام 👑</h2>
        <button onClick={onBack} style={{ background: '#222', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '20px' }}>خروج</button>
      </div>

      <div style={{ background: '#111', padding: '15px', borderRadius: '20px', marginBottom: '20px' }}>
        <p style={{ color: '#888', fontSize: '14px', margin: '0 0 10px 0' }}>إحصائيات المنصة 📊</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div><span style={{ color: '#39FF14' }}>12</span> تاجر</div>
          <div><span style={{ color: '#39FF14' }}>45</span> منتج</div>
          <div><span style={{ color: '#39FF14' }}>8500</span> ج.م</div>
        </div>
      </div>

      <h3 style={{ fontSize: '16px', color: '#39FF14' }}>طلبات انضمام التجار 📩</h3>
      {pendingSellers.map(s => (
        <div key={s.id} style={{ background: '#111', border: '1px solid #222', padding: '15px', borderRadius: '15px', marginBottom: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>{s.name}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>النشاط: {s.category} | {s.phone}</div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
              onClick={() => alert('تم تفعيل متجر ' + s.name)}
              style={{ flex: 1, background: '#39FF14', color: '#000', border: 'none', padding: '8px', borderRadius: '10px', fontWeight: 'bold' }}
            >
              موافقة ✅
            </button>
            <button style={{ flex: 1, background: '#222', color: '#ff4444', border: '1px solid #ff4444', padding: '8px', borderRadius: '10px' }}>رفض</button>
          </div>
        </div>
      ))}
    </div>
  );
}
