"use client";
import React, { useState } from 'react';

export default function WarrantyCard({ orderId, storeName }) {
  const [requestReturn, setRequestReturn] = useState(false);

  return (
    <div className="glass-card" style={{ 
      padding: '20px', 
      margin: '15px', 
      border: '2px solid #FFD700', 
      background: 'linear-gradient(45deg, #000, #1a1a00)',
      textAlign: 'center' 
    }}>
      <div style={{ fontSize: '30px', marginBottom: '10px' }}>🛡️</div>
      <h3 style={{ color: '#FFD700', fontSize: '18px', margin: '0' }}>ضمان سيلوريا الذهبي</h3>
      <p style={{ fontSize: '12px', color: '#ccc', margin: '10px 0' }}>
        أوردر رقم: <span style={{color: '#fff'}}>{orderId}</span> من <span style={{color: '#fff'}}>{storeName}</span>
      </p>
      
      {!requestReturn ? (
        <button 
          onClick={() => setRequestReturn(true)}
          style={{ width: '100%', background: 'none', border: '1px solid #FFD700', color: '#FFD700', padding: '10px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}
        >
          طلب استرجاع فوري (خلال 24 ساعة) 💸
        </button>
      ) : (
        <div style={{ background: '#222', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
          <p style={{ fontSize: '11px', color: '#39FF14' }}>جاري إرسال أقرب مندوب لاستلام المنتج ورد المبلغ..</p>
          <button style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', fontSize: '10px', marginTop: '5px' }}>إلغاء الطلب</button>
        </div>
      )}
    </div>
  );
}
