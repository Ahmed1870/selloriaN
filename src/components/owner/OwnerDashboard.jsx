"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function OwnerDashboard() {
  const [finances, setFinances] = useState({ totalVolume: 0, myCommissions: 0, activeMerchants: 0 });

  useEffect(() => {
    const calcMoney = async () => {
      const { data: orders } = await supabase.from('orders').select('total_price');
      if (orders) {
        const volume = orders.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
        // نفترض عمولتك 5% من كل عملية بيع على المنصة
        setFinances({
          totalVolume: volume,
          myCommissions: (volume * 0.05).toFixed(2),
          activeMerchants: 12 // محاكاة
        });
      }
    };
    calcMoney();
  }, []);

  return (
    <div style={{ padding: '30px', background: '#000', minHeight: '100vh', color: '#fff', textAlign: 'right' }}>
      <h1 style={{ color: '#39FF14', fontSize: '24px' }}>💰 خزنة سيلوريا المركزية</h1>
      <p style={{ color: '#888' }}>إحصائيات الأرباح الصافية لك كصاحب المنصة</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '30px' }}>
        <div className="glass-card" style={{ padding: '25px', borderRight: '5px solid #39FF14' }}>
          <p style={{ color: '#888', margin: 0 }}>إجمالي مبيعات المنصة</p>
          <h2 style={{ fontSize: '32px', margin: '10px 0' }}>{finances.totalVolume} <span style={{fontSize:'14px'}}>ج.م</span></h2>
        </div>

        <div className="glass-card" style={{ padding: '25px', borderRight: '5px solid #FFD700', background: 'linear-gradient(45deg, #111, #050505)' }}>
          <p style={{ color: '#FFD700', margin: 0 }}>عمولتك الصافية (5%) 💵</p>
          <h2 style={{ fontSize: '40px', margin: '10px 0', color: '#FFD700' }}>{finances.myCommissions} <span style={{fontSize:'14px'}}>ج.م</span></h2>
          <p style={{ fontSize: '12px', color: '#555' }}>* يتم تحصيلها من التجار شهرياً أو عند السحب</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '16px', color: '#00D1FF' }}>🔔 تنبيهات "سبوبة" جديدة:</h3>
        <div style={{ background: '#111', padding: '15px', borderRadius: '15px', marginTop: '10px', fontSize: '13px' }}>
          تمت بيعة بقيمة 1200ج عند تاجر (محل الأمانة) .. عمولتك 60ج سجلت في حسابك.
        </div>
      </div>
    </div>
  );
}
