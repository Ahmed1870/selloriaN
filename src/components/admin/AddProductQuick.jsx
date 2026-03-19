"use client";
import React, { useState } from 'react';

export default function AddProductQuick({ onBack }) {
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // حساب السعر الذكي (تكلفة + عمولة الموقع + هامش ربح التاجر)
  const calculateSmartPrice = (cost) => {
    if (!cost) return '';
    const platformFee = cost * 0.05; // 5% عمولة سيلوريا
    const profitMargin = cost * 0.15; // 15% هامش ربح مقترح للتاجر
    return (parseFloat(cost) + platformFee + profitMargin).toFixed(2);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCostChange = (e) => {
    const cost = e.target.value;
    setCostPrice(cost);
    setSellingPrice(calculateSmartPrice(cost)); // تسعير ذكي تلقائي
  };

  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px', minHeight: '100vh', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#39FF14', margin: 0, fontSize: '20px' }}>إضافة منتج صاروخية 🚀</h2>
        <button onClick={onBack} style={{ background: '#222', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '20px' }}>الغاء</button>
      </div>

      {/* منطقة التصوير (الميزة النووية) */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', borderRadius: '15px', objectFit: 'cover', border: '2px solid #39FF14' }} />
        ) : (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', background: '#111', borderRadius: '15px', border: '2px dashed #333', cursor: 'pointer', margin: '0 auto' }}>
            <span style={{ fontSize: '30px' }}>📷</span>
            <span style={{ fontSize: '12px', color: '#888' }}>صور البضاعة</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" // الميزة اللي بتفتح الكاميرا فوراً على الموبايل
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
          </label>
        )}
      </div>

      {/* الخانات (بسيطة جداً) */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>اسم المنتج</label>
        <input 
          placeholder="مثلاً: قميص أسود شيك" 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '10px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ color: '#888', display: 'block', marginBottom: '5px' }}>تكلفة القطعة (ج.م)</label>
          <input 
            type="number" 
            placeholder="مثلاً: 100" 
            value={costPrice}
            onChange={handleCostChange}
            style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '10px' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ color: '#39FF14', display: 'block', marginBottom: '5px' }}>سعر البيع المقترح (ج.م)</label>
          <input 
            type="number" 
            placeholder="مثلاً: 121" 
            value={sellingPrice}
            readOnly // سعر ذكي، التاجر ميتدخلش عشان نضمن عمولتك
            style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid #39FF14', color: '#39FF14', borderRadius: '10px', fontWeight: 'bold' }}
          />
        </div>
      </div>

      {/* زرار النشر النهائي (مكنة الفلوس) */}
      <button 
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '18px' }}
        onClick={() => {
            alert('تم نشر المنتج وجارٍ عرضه في المتجر! مبروك 💰');
            onBack(); // رجوع للوحة التحكم
        }}
      >
        ✅ نشر المنتج فوراً
      </button>
    </div>
  );
}
