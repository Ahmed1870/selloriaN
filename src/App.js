import React, { useState } from 'react';
import NewJoin from './components/NewJoin';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', textAlign: 'center' }}>
      <nav style={{ padding: '20px', borderBottom: '1px solid #333' }}>
        <h1 onClick={() => setPage('home')} style={{ color: '#39FF14', cursor: 'pointer' }}>SELLORIA v3</h1>
        <button onClick={() => setPage('join')} style={{ background: '#39FF14', color: '#000', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>انضم الآن</button>
      </nav>

      <div style={{ padding: '40px' }}>
        {page === 'home' ? (
          <h2 style={{ fontSize: '40px' }}>مرحباً بك في النسخة الجديدة ⚡</h2>
        ) : (
          <NewJoin />
        )}
      </div>

      <style>{"body { background: #000 !important; margin: 0; }"}</style>
    </div>
  );
}
export default App;
