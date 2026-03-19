"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TrackOrder() {
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);

  const steps = [
    { label: 'تم الاستلام', status: 'done' },
    { label: 'تجهيز الطلب', status: 'done' },
    { label: 'مع المندوب', status: 'active' },
    { label: 'تم التوصيل', status: 'pending' }
  ];

  const handleTrack = () => {
    // محاكاة سحب بيانات الأوردر من السوبابيس برقم الموبايل
    setOrder({ id: 'SL-5092', area: 'فيصل - الطالبية' });
  };

  return (
    <div style={{ padding: '40px 20px', background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14' }}>📍 رادار تتبع أوردرك</h2>
      <p style={{ color: '#888', fontSize: '14px' }}>دخل رقم الموبايل اللي طلبت بيه عشان تعرف مكان حاجتك فين دلوقتي.</p>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="01xxxxxxxxx" 
          onChange={(e) => setPhone(e.target.value)}
          style={{ flex: 1, padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px', textAlign: 'center' }} 
        />
        <button onClick={handleTrack} style={{ background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none' }}>تتبع</button>
      </div>

      {order && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '40px', background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #222' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ color: '#39FF14' }}>رقم الأوردر: {order.id}</span>
            <span style={{ color: '#888' }}>{order.area}</span>
          </div>

          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ 
                width: '12px', height: '12px', borderRadius: '50%', 
                background: s.status === 'done' ? '#39FF14' : s.status === 'active' ? '#00D1FF' : '#333',
                boxShadow: s.status === 'active' ? '0 0 10px #00D1FF' : 'none'
              }} />
              <div style={{ flex: 1, color: s.status === 'pending' ? '#444' : '#fff', fontSize: '14px' }}>{s.label}</div>
            </div>
          ))}
          
          <button style={{ width: '100%', background: 'none', border: '1px solid #333', color: '#888', padding: '10px', borderRadius: '12px', fontSize: '12px' }}>
            تحتاج مساعدة؟ كلم الدعم الفني 🛠️
          </button>
        </motion.div>
      )}
    </div>
  );
}
