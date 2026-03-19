"use client";
import React, { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div style={{background: '#000', minHeight: '100vh'}} />;

  return (
    <div style={{ background: '#000', color: '#39FF14', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontWeight: '900' }}>صفحة الدفع - سيلوريا</h1>
      <p style={{ color: '#fff' }}>قيد التجهيز بالوضع الداكن...</p>
    </div>
  );
}
