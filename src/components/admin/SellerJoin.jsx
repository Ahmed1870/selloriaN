"use client";
import React, { useState } from 'react';

export default function SellerJoin({ onBack }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div style={{ background: '#000', color: '#fff', padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px' }}>🤝</div>
        <h2 style={{ color: '#39FF14' }}>طلبك قيد المراجعة!</h2>
        <p>فريق سيلوريا هيتواصل معاك خلال 24 ساعة لتفعيل متجرك وبدء البيع 💰</p>
        <button onClick={onBack} style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', border: 'none', marginTop: '20px', fontWeight: 'bold' }}>الرجوع للرئيسية</button>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', color: '#fff', padding: '30px', minHeight: '100vh', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14', fontSize: '28px', fontWeight: '900' }}>ابدأ بيع على سيلوريا 🚀</h2>
      <p style={{ color: '#888', marginBottom: '30px' }}>انضم لأسرع منصة تجارة في مصر وابدأ لم أرباحك دلوقتي.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input placeholder="اسم المحل / العلامة التجارية" style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px' }} />
        <select style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px' }}>
          <option>نوع النشاط (ملابس، إلكترونيات، إلخ)</option>
          <option>ملابس وأحذية</option>
          <option>إلكترونيات وموبايلات</option>
          <option>أدوات منزلية</option>
          <option>أخرى</option>
        </select>
        <input placeholder="رقم واتساب المبيعات" type="tel" style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px' }} />
        
        <div style={{ background: '#111', padding: '15px', borderRadius: '15px', border: '1px solid #222' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#39FF14' }}>💡 مميزات التاجر في سيلوريا:</p>
          <ul style={{ fontSize: '12px', color: '#888', paddingRight: '20px', marginTop: '10px' }}>
            <li>لوحة تحكم ذكية لمتابعة الأرباح.</li>
            <li>رفع المنتجات بالكاميرا في ثواني.</li>
            <li>ربط مباشر بواتساب الزبائن.</li>
          </ul>
        </div>

        <button 
          onClick={() => setDone(true)}
          style={{ width: '100%', background: '#39FF14', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '18px', marginTop: '10px' }}
        >
          تقديم طلب الانضمام ✅
        </button>
        <button onClick={onBack} style={{ color: '#888', background: 'none', border: 'none' }}>رجوع للمتجر</button>
      </div>
    </div>
  );
}
