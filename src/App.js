import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');

  const darkStyle = {
    backgroundColor: '#050505',
    color: '#39FF14',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={darkStyle}>
      <h1 style={{fontSize: '3rem', fontWeight: 'bold'}}>SELLORIA v2.0</h1>
      <p style={{color: '#fff'}}>تم تحديث النظام بالكامل باللون الأسود الملكي</p>
      <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
         <button onClick={() => setPage('home')} style={{padding: '10px 20px', background: '#39FF14', color: '#000', border: 'none', borderRadius: '5px'}}>الرئيسية</button>
         <button onClick={() => alert('قريباً')} style={{padding: '10px 20px', background: '#222', color: '#39FF14', border: '1px solid #39FF14', borderRadius: '5px'}}>لوحة التحكم</button>
      </div>
      {/* ستايل إجباري لكل الصفحة */}
      <style>{"body { background-color: #050505 !important; margin: 0; }"}</style>
    </div>
  );
}

export default App;
