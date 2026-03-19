"use client";
import React, { useState } from 'react';

export default function Agreement({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: '30px', background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14', fontSize: '22px' }}>🤝 عقد شراكة سيلوريا الذكي</h2>
      <p style={{ color: '#888', fontSize: '14px' }}>أهلاً بك يا شريك النجاح، قبل البدء نود توضيح نظام العمل:</p>

      <div className="glass-card" style={{ padding: '20px', marginTop: '20px', maxHeight: '400px', overflowY: 'auto', border: '1px solid #333' }}>
        <h4 style={{ color: '#00D1FF' }}>1. فترة التجربة المجانية 🎁</h4>
        <p style={{ fontSize: '13px' }}>تمنحك المنصة 15 يوماً تجربة مجانية لجميع أدوات الذكاء الاصطناعي ورادار السوق.</p>
        
        <h4 style={{ color: '#00D1FF' }}>2. نظام العمولة والاشتراك 💰</h4>
        <p style={{ fontSize: '13px' }}>- عمولة المنصة 5% من كل عملية بيع تتم من خلال الموقع.<br/>- اشتراك شهري ثابت (سيتم تحديده بعد فترة التجربة) مقابل خدمات الاستضافة والدعم التقني.</p>

        <h4 style={{ color: '#00D1FF' }}>3. حماية البيانات 🔐</h4>
        <p style={{ fontSize: '13px' }}>نلتزم بحماية بيانات عملائك وأسرار تجارتك، ولا يحق للمنصة مشاركتها مع أي طرف ثالث.</p>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} style={{ width: '20px', height: '20px' }} />
        <label style={{ fontSize: '14px' }}>أوافق على شروط الانضمام لـ "سيلوريا برو"</label>
      </div>

      <button 
        disabled={!checked}
        onClick={onAccept}
        style={{ width: '100%', marginTop: '30px', background: checked ? '#39FF14' : '#222', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', transition: '0.3s' }}
      >
        تفعيل حسابي الآن كتاجر معتمد ✅
      </button>
    </div>
  );
}
