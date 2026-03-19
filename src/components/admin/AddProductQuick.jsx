"use client";
import React, { useState } from 'react';

export default function AddProductQuick({ onBack }) {
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if(!productName || !sellingPrice) return alert('اكمل البيانات يا بطل!');
    setIsPublished(true);
  };

  if (isPublished) {
    return (
      <div style={{ background: '#000', color: '#fff', padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px' }}>✅</div>
        <h2 style={{ color: '#39FF14' }}>تم النشر بنجاح!</h2>
        <p>المنتج الآن معروض في متجرك بـ {sellingPrice} ج.م</p>
        
        <button 
          onClick={() => window.open('https://wa.me/?text=شاهد منتجي الجديد على سيلوريا: ' + productName + ' بسعر ' + sellingPrice + ' ج.م')}
          style={{ width: '100%', background: '#25D366', color: '#fff', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', marginBottom: '10px' }}
        >
          ارسل للزبائن (واتساب) 💬
        </button>
        
        <button onClick={onBack} style={{ width: '100%', background: '#222', color: '#fff', padding: '15px', borderRadius: '15px', border: 'none' }}>
          الرجوع للوحة التحكم
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px', minHeight: '100vh', textAlign: 'right' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#39FF14', margin: 0, fontSize: '18px' }}>إضافة منتج صاروخية 🚀</h2>
        <button onClick={onBack} style={{ background: '#222', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '20px' }}>إلغاء</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ display: 'block', width: '120px', height: '120px', background: '#111', borderRadius: '15px', border: '2px dashed #39FF14', margin: '0 auto', overflow: 'hidden' }}>
          {imagePreview ? <img src={imagePreview} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <span style={{fontSize:'40px', lineHeight:'120px'}}>📷</span>}
          <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} style={{display:'none'}} />
        </label>
        <p style={{fontSize:'12px', color:'#888', marginTop:'10px'}}>اضغط للتصوير</p>
      </div>

      <input 
        placeholder="اسم المنتج" 
        onChange={(e)=>setProductName(e.target.value)}
        style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '12px', marginBottom: '15px' }}
      />

      <input 
        type="number" 
        placeholder="التكلفة" 
        onChange={(e)=>{setCostPrice(e.target.value); setSellingPrice((e.target.value * 1.2).toFixed(2))}}
        style={{ width: '48%', padding: '15px', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '12px', marginBottom: '15px', marginLeft:'4%' }}
      />
      
      <input 
        placeholder="سعر البيع" 
        value={sellingPrice} 
        readOnly
        style={{ width: '48%', padding: '15px', background: '#1a1a1a', border: '1px solid #39FF14', color: '#39FF14', borderRadius: '12px', fontWeight:'bold' }}
      />

      <button 
        onClick={handlePublish}
        style={{ width: '100%', background: '#39FF14', color: '#000', padding: '18px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '18px', marginTop:'20px' }}
      >
        انشر واكسب 💰
      </button>
    </div>
  );
}
