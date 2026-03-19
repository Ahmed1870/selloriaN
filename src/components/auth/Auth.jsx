"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Auth({ onSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // login or signup

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = mode === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else if (data.session) onSession(data.session);
    else if (mode === 'signup') alert('تحقق من بريدك الإلكتروني لتفعيل الحساب! 📧');
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'right', background: '#000', minHeight: '100vh' }}>
      <h2 style={{ color: '#39FF14', fontSize: '28px' }}>{mode === 'login' ? 'دخول التجار 🔑' : 'انضم لعائلة سيلوريا 🤝'}</h2>
      <p style={{ color: '#888' }}>ادخل عالم التجارة الذكية بالذكاء الاصطناعي</p>
      
      <form onSubmit={handleAuth} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" placeholder="البريد الإلكتروني" 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px' }} 
        />
        <input 
          type="password" placeholder="كلمة السر" 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '15px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '15px' }} 
        />
        
        <button 
          disabled={loading}
          style={{ padding: '18px', background: '#39FF14', color: '#000', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'جاري التحقق...' : (mode === 'login' ? 'دخول' : 'إنشاء حساب جديد')}
        </button>
      </form>

      <button 
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#39FF14', textDecoration: 'underline' }}
      >
        {mode === 'login' ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخول'}
      </button>
    </div>
  );
}
