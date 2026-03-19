"use client";
import React, { useEffect, useState } from 'react';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{background: '#000', minHeight: '100vh'}} />;

  return (
    <div style={{ backgroundColor: '#000', color: '#39FF14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900' }}>SELLORIA DARK FIX</h1>
      <p style={{ color: '#fff' }}>Build Error Fixed 🚀</p>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #39FF14', borderRadius: '15px' }}>
         النظام الآن يعمل بالكامل بالوضع الداكن
      </div>
      <style>{"body { background-color: #000 !important; margin: 0; }"}</style>
    </div>
  );
}
