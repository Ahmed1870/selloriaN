import React from 'react';

const VendorRegister = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white', paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center' }}>
        <h2 style={{ color: '#39FF14', fontWeight: '900', fontSize: '24px', marginBottom: '20px' }}>انضم كتاجر في سيلوريا</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="الاسم بالكامل" style={{ padding: '15px', borderRadius: '10px', backgroundColor: '#000', color: '#fff', border: '1px solid #39FF14' }} />
          <input type="email" placeholder="البريد الإلكتروني" style={{ padding: '15px', borderRadius: '10px', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }} />
          <input type="password" placeholder="كلمة المرور" style={{ padding: '15px', borderRadius: '10px', backgroundColor: '#000', color: '#fff', border: '1px solid #333' }} />
          <button type="button" style={{ padding: '15px', borderRadius: '10px', backgroundColor: '#39FF14', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            إنشاء الحساب
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>لديك حساب؟ <span style={{ color: '#39FF14' }}>تسجيل الدخول</span></p>
      </div>
    </div>
  );
};

export default VendorRegister;
