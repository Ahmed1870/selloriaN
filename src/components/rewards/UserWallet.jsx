"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function UserWallet({ points = 150 }) {
  // كل 100 نقطة بـ 10 جنيه (مثلاً)
  const cashValue = (points / 10).toFixed(0);

  return (
    <div className="glass-card" style={{ margin: '15px', padding: '20px', background: 'linear-gradient(135deg, #FFD700, #b8860b)', border: 'none', color: '#000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>🟡 رصيد سيلوريا جولد</h3>
          <h2 style={{ margin: '5px 0', fontSize: '30px' }}>{points} <span style={{fontSize:'12px'}}>نقطة</span></h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>تساوي {cashValue} ج.م في محفظتك</p>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '10px', borderRadius: '50%' }}>
          💰
        </div>
      </div>
      
      <button style={{ width: '100%', marginTop: '15px', background: '#000', color: '#FFD700', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }}>
        استبدل النقاط بخصم الآن 🔥
      </button>
    </div>
  );
}
