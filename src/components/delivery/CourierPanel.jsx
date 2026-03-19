"use client";
import React, { useState } from 'react';

export default function CourierPanel() {
  const [orders, setOrders] = useState([
    { id: 101, area: 'فيصل - محطة المساحة', fee: 25, status: 'available' },
    { id: 102, area: 'الهرم - مشعل', fee: 30, status: 'available' }
  ]);

  const acceptOrder = (id) => {
    alert('مبروك! الأوردر بقا معاك، كلم التاجر وجهز نفسك 🚀');
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div style={{ padding: '20px', background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#00D1FF' }}>🛵 رادار المناديب (سيلوريا إكسبريس)</h2>
      <p style={{ color: '#888', fontSize: '12px' }}>الأوردرات القريبة منك حالياً:</p>

      {orders.map(o => (
        <div key={o.id} className="glass-card" style={{ padding: '15px', marginBottom: '15px', borderRight: '4px solid #00D1FF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>منطقة: {o.area}</h4>
              <p style={{ color: '#39FF14', margin: '5px 0' }}>عمولتك: {o.fee} ج.م</p>
            </div>
            <button 
              onClick={() => acceptOrder(o.id)}
              style={{ background: '#00D1FF', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold' }}
            >
              قبول ✅
            </button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '30px', padding: '15px', background: '#111', borderRadius: '15px', border: '1px dotted #333' }}>
        <p style={{ fontSize: '11px', color: '#888' }}>* ملاحظة: يتم خصم 2 جنيه من كل توصيلة لصالح صيانة المنصة.</p>
      </div>
    </div>
  );
}
