"use client";
import React, { useState, useEffect } from 'react';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(3600); // ساعة واحدة بالثواني

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
  };

  return (
    <div className="glass-card" style={{ margin: '15px', padding: '15px', background: 'linear-gradient(90deg, #ff4444, #111)', border: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '16px' }}>⚡ الساعة المحظوظة!</h3>
          <p style={{ color: '#eee', fontSize: '11px', margin: '5px 0' }}>خصومات 50% تنتهي خلال: <span style={{fontWeight:'bold', color:'#39FF14'}}>{formatTime(timeLeft)}</span></p>
        </div>
        <button style={{ background: '#fff', color: '#ff4444', border: 'none', padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>
          تسوق الآن 🔥
        </button>
      </div>
    </div>
  );
}
