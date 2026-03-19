"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AddProductQuick from './admin/AddProductQuick';

export default function Admin() {
  const [showAdd, setShowAdd] = useState(false);
  const [stats, setStats] = useState({ totalSales: 0, topProduct: '---', orderCount: 0 });

  useEffect(() => {
    // محاكاة لسحب بيانات حقيقية من جدول الـ Orders اللي عملناه
    const fetchStats = async () => {
      const { data: orders } = await supabase.from('orders').select('*');
      if (orders) {
        const total = orders.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
        setStats({
          totalSales: total,
          orderCount: orders.length,
          topProduct: 'ساعة نيون (مثال)' 
        });
      }
    };
    fetchStats();
  }, []);

  if (showAdd) return <AddProductQuick onBack={() => setShowAdd(false)} />;

  return (
    <div style={{ padding: '20px', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14', fontSize: '24px', fontWeight: '900' }}>مرحباً أيها الشريك 👑</h2>
      
      {/* كروت الإحصائيات السريعة */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
        <div className="glass-card" style={{ padding: '15px', borderLeft: '4px solid #39FF14' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>إجمالي المبيعات</p>
          <h3 style={{ margin: '5px 0', color: '#39FF14' }}>{stats.totalSales} ج.م</h3>
        </div>
        <div className="glass-card" style={{ padding: '15px', borderLeft: '4px solid #00D1FF' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>عدد الطلبات</p>
          <h3 style={{ margin: '5px 0', color: '#00D1FF' }}>{stats.orderCount}</h3>
        </div>
      </div>

      {/* قسم المساعد الذكي - تذكير */}
      <div style={{ background: 'linear-gradient(45deg, #111, #000)', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>🤖 نصيحة الذكاء الاصطناعي اليوم:</h4>
        <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>
          "بناءً على السوق المحلي، الطلب على 'الإلكترونيات الذكية' زايد بنسبة 15%. ننصحك بتوفير عروض على الساعات نيون."
        </p>
      </div>

      <button 
        onClick={() => setShowAdd(true)}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '16px', marginBottom: '20px', cursor: 'pointer' }}
      >
        ➕ إضافة منتج وتحليله بالـ AI
      </button>

      <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#888' }}>إدارة المخزن الحالية</h3>
      {/* هنا هيظهر لستة المنتجات

# 1. تحديث واجهة التاجر لإظهار الإحصائيات الذكية
cat <<EOF > src/components/Admin.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AddProductQuick from './admin/AddProductQuick';

export default function Admin() {
  const [showAdd, setShowAdd] = useState(false);
  const [stats, setStats] = useState({ totalSales: 0, topProduct: '---', orderCount: 0 });

  useEffect(() => {
    // محاكاة لسحب بيانات حقيقية من جدول الـ Orders اللي عملناه
    const fetchStats = async () => {
      const { data: orders } = await supabase.from('orders').select('*');
      if (orders) {
        const total = orders.reduce((sum, o) => sum + parseFloat(o.total_price), 0);
        setStats({
          totalSales: total,
          orderCount: orders.length,
          topProduct: 'ساعة نيون (مثال)' 
        });
      }
    };
    fetchStats();
  }, []);

  if (showAdd) return <AddProductQuick onBack={() => setShowAdd(false)} />;

  return (
    <div style={{ padding: '20px', color: '#fff', textAlign: 'right' }}>
      <h2 style={{ color: '#39FF14', fontSize: '24px', fontWeight: '900' }}>مرحباً أيها الشريك 👑</h2>
      
      {/* كروت الإحصائيات السريعة */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
        <div className="glass-card" style={{ padding: '15px', borderLeft: '4px solid #39FF14' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>إجمالي المبيعات</p>
          <h3 style={{ margin: '5px 0', color: '#39FF14' }}>{stats.totalSales} ج.م</h3>
        </div>
        <div className="glass-card" style={{ padding: '15px', borderLeft: '4px solid #00D1FF' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>عدد الطلبات</p>
          <h3 style={{ margin: '5px 0', color: '#00D1FF' }}>{stats.orderCount}</h3>
        </div>
      </div>

      {/* قسم المساعد الذكي - تذكير */}
      <div style={{ background: 'linear-gradient(45deg, #111, #000)', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>🤖 نصيحة الذكاء الاصطناعي اليوم:</h4>
        <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>
          "بناءً على السوق المحلي، الطلب على 'الإلكترونيات الذكية' زايد بنسبة 15%. ننصحك بتوفير عروض على الساعات نيون."
        </p>
      </div>

      <button 
        onClick={() => setShowAdd(true)}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '16px', marginBottom: '20px', cursor: 'pointer' }}
      >
        ➕ إضافة منتج وتحليله بالـ AI
      </button>

      <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#888' }}>إدارة المخزن الحالية</h3>
      {/* هنا هيظهر لستة المنتجات اللي عملناها قبل كدة */}
    </div>
  );
}
