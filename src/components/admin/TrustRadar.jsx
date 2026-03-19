"use client";
import React from 'react';

export default function TrustRadar({ customerPhone }) {
  // محاكاة لبيانات من قاعدة بيانات "المشاغبين"
  const isSuspicious = customerPhone === "01019672878"; // مثال لرقم مرتجعاته كتير

  return (
    <div className="glass-card" style={{ 
      padding: '15px', 
      marginTop: '10px', 
      border: isSuspicious ? '2px solid #ff4444' : '2px solid #39FF14',
      background: isSuspicious ? 'rgba(255, 68, 68, 0.1)' : 'rgba(57, 255, 20, 0.1)' 
    }}>
      <h4 style={{ margin: 0, fontSize: '14px' }}>🛡️ رادار الثقة:</h4>
      {isSuspicious ? (
        <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0' }}>
          ⚠️ تحذير: هذا الرقم قام برفض 4 أوردرات سابقة. ننصح بطلب "عربون" شحن!
        </p>
      ) : (
        <p style={{ color: '#39FF14', fontSize: '12px', margin: '5px 0' }}>
          ✅ زبون موثوق: ملتزم بالاستلام دائماً.
        </p>
      )}
    </div>
  );
}
