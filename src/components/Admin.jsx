"use client";
import React, { useState } from 'react';
import AddProductQuick from './admin/AddProductQuick';

const stats = [
  { label: 'أرباح اليوم', value: '1,250 ج.م', icon: '💰' },
  { label: 'طلبات جديدة', value: '5', icon: '📦' },
  { label: 'نقص في المخزن', value: '2', icon: '⚠️' }
];

export default function Admin() {
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return <AddProductQuick onBack={() => setShowAddForm(false)} />;
  }

  return (
    <div style={{ padding: '20px', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14' }}>لوحة تحكم التاجر</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginBottom: '30px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#111', padding: '15px', borderRadius: '15px', border: '1px solid #222' }}>
            <div style={{ fontSize: '20px' }}>{s.icon}</div>
            <div style={{ color: '#888', fontSize: '12px' }}>{s.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* تعديل الزرار ليفتح الـ Form الجديد */}
      <button 
        onClick={() => setShowAddForm(true)}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', marginBottom: '20px', cursor: 'pointer' }}
      >
        ➕ إضافة منتج جديد (بالكاميرا 📷)
      </button>

      <div style={{ background: '#111', padding: '15px', borderRadius: '15px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>آخر العمليات</h3>
        <div style={{ fontSize: '13px', color: '#ccc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
            <span>طلب #5021</span>
            <span style={{ color: '#39FF14' }}>+450 ج.م</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span>طلب #5020</span>
            <span style={{ color: '#39FF14' }}>+800 ج.م</span>
          </div>
        </div>
      </div>
    </div>
  );
}
