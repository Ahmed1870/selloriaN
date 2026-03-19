"use client";
import React, { useState } from 'react';

export default function CartDrawer({ cartItems, onClose, onRemove }) {
  const [step, setStep] = useState(1); // 1: السلة, 2: بيانات الشحن
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      return alert('يا ريت تكمل بياناتك عشان الأوردر يوصلك صح! 🚚');
    }

    // بناء رسالة الواتساب الاحترافية
    const productsList = cartItems.map(item => "- " + item.name + " (" + item.price + " ج.م)").join('\n');
    const message = "طلب جديد من سيلوريا 🛒\n\n" +
                    "المنتجات:\n" + productsList + "\n\n" +
                    "الإجمالي: " + total + " ج.م\n" +
                    "-----------\n" +
                    "بيانات العميل:\n" +
                    "الاسم: " + formData.name + "\n" +
                    "الموبايل: " + formData.phone + "\n" +
                    "العنوان: " + formData.address;

    const encodedMessage = encodeURIComponent(message);
    window.open("https://wa.me/201018705351?text=" + encodedMessage); // هنحط رقمك أو رقم التاجر هنا
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '2px solid #39FF14', borderRadius: '25px 25px 0 0', padding: '20px', zIndex: 1000, maxHeight: '85vh', overflowY: 'auto', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ color: '#39FF14', margin: 0 }}>{step === 1 ? 'سلة المشتريات 🛒' : 'بيانات الشحن 🚚'}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', fontSize: '20px' }}>✕</button>
      </div>

      {step === 1 ? (
        <>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>السلة فاضية.. املأها بالخير! ✨</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #222' }}>
                  <div style={{ color: '#fff' }}>{item.name} <span style={{ color: '#39FF14' }}>({item.price}ج)</span></div>
                  <button onClick={() => onRemove(index)} style={{ background: '#331111', color: '#ff4444', border: 'none', borderRadius: '10px', padding: '5px 10px' }}>حذف</button>
                </div>
              ))}
              <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>الإجمالي:</span>
                <span style={{ color: '#39FF14', fontWeight: 'bold' }}>{total} ج.م</span>
              </div>
              <button onClick={() => setStep(2)} style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', marginTop: '20px' }}>تأكيد البيانات ➔</button>
            </>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="الاسم بالكامل" onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px' }} />
          <input placeholder="رقم الموبايل" type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px' }} />
          <textarea placeholder="العنوان بالتفصيل" onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '12px', height: '80px' }} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: '#222', color: '#fff', padding: '15px', borderRadius: '15px', border: 'none' }}>رجوع</button>
            <button onClick={handleCheckout} style={{ flex: 2, background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none' }}>إرسال الطلب (واتساب) ✅</button>
          </div>
        </div>
      )}
    </div>
  );
}
