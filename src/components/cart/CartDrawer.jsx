"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function CartDrawer({ cartItems, onClose, onRemove }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      return alert('البيانات ناقصة يا بطل! 🚚');
    }

    setLoading(true);
    
    // أولاً: حفظ الطلب في Supabase عشان يفضل عندك سجل للفلوس
    const { error } = await supabase.from('orders').insert([
      { 
        customer_name: formData.name, 
        customer_phone: formData.phone, 
        address: formData.address,
        total_price: total,
        items: cartItems // سيفنا لستة المنتجات كـ JSON
      }
    ]);

    if (error) {
        alert('عطل فني بسيط في السيستم، بس هنحولك للواتساب برضه!');
    }

    // ثانياً: تجهيز رسالة الواتساب للتاجر
    const productsList = cartItems.map(item => "- " + item.name).join('\n');
    const message = "طلب جديد من سيلوريا 🛒\n" +
                    "المنتجات:\n" + productsList + "\n" +
                    "الإجمالي: " + total + " ج.م\n" +
                    "العميل: " + formData.name + "\n" +
                    "العنوان: " + formData.address;

    window.open("https://wa.me/201018705351?text=" + encodeURIComponent(message));
    setLoading(false);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '2px solid #39FF14', borderRadius: '25px 25px 0 0', padding: '20px', zIndex: 1000, maxHeight: '85vh', overflowY: 'auto', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ color: '#39FF14', margin: 0 }}>{step === 1 ? 'سلتك 🛒' : 'بياناتك 🚚'}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', fontSize: '20px' }}>✕</button>
      </div>

      {step === 1 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
              <div style={{ color: '#fff' }}>{item.name}</div>
              <button onClick={() => onRemove(index)} style={{ color: '#ff4444', background: 'none', border: 'none' }}>حذف</button>
            </div>
          ))}
          <button onClick={() => setStep(2)} style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', marginTop: '20px', border: 'none' }}>تأكيد {total} ج.م</button>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="الاسم" onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px' }} />
          <input placeholder="الموبايل" onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px' }} />
          <input placeholder="العنوان" onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px' }} />
          <button onClick={handleCheckout} disabled={loading} style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none' }}>
            {loading ? 'جاري الحفظ...' : 'إتمام الطلب ✅'}
          </button>
        </div>
      )}
    </div>
  );
}
