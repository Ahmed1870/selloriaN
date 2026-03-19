"use client";
import React, { useState } from 'react';

export default function HaggleBot({ productPrice, minPrice }) {
  const [userOffer, setUserOffer] = useState('');
  const [botMessage, setBotMessage] = useState('التيشرت ده لقطة بـ ' + productPrice + ' ج.م، تحب تاخد بكام؟');
  const [finalPrice, setFinalPrice] = useState(productPrice);

  const startHaggle = () => {
    const offer = parseFloat(userOffer);
    if (offer >= productPrice) {
      setBotMessage("ده إنت كرمك مغرقنا! نبيعهولك فوراً بـ " + offer + " ج.م ونشحنهولك هدية!");
    } else if (offer < minPrice) {
      setBotMessage("يا باشا ده قماش غالي والله، ماتخسرناش.. خليه " + (minPrice + 10) + " ج.م وقول مبروك؟");
    } else {
      setBotMessage("ماشي يا عم، عشان أول مرة تتعامل معانا، السعر " + offer + " ج.م شغال.. مبروك عليك!");
      setFinalPrice(offer);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '20px', background: '#111', borderRadius: '20px', border: '1px solid #FFD700' }}>
      <h3 style={{ fontSize: '14px', color: '#FFD700' }}>🤝 فاصل مع المساعد الذكي</h3>
      <p style={{ fontSize: '13px', color: '#eee' }}>{botMessage}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <input 
          type="number" 
          placeholder="سعرك كام؟" 
          value={userOffer}
          onChange={(e) => setUserOffer(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#000', color: '#fff', border: '1px solid #333' }}
        />
        <button 
          onClick={startHaggle}
          style={{ background: '#FFD700', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}
        >
          فصال
        </button>
      </div>
      {finalPrice !== productPrice && (
        <p style={{ fontSize: '12px', color: '#39FF14', marginTop: '10px' }}>✅ تم الاتفاق على سعر: {finalPrice} ج.م</p>
      )}
    </div>
  );
}
