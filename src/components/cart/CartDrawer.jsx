import React from 'react';

export default function CartDrawer({ cartItems, onClose, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '2px solid #39FF14', borderRadius: '25px 25px 0 0', padding: '20px', zIndex: 1000, maxHeight: '70vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ color: '#39FF14', margin: 0 }}>سلة المشتريات 🛒</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', fontSize: '20px' }}>✕</button>
      </div>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>السلة فاضية.. املأها بالخير! ✨</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #222' }}>
              <div>
                <div style={{ color: '#fff' }}>{item.name}</div>
                <div style={{ color: '#39FF14', fontSize: '14px' }}>{item.price} ج.م</div>
              </div>
              <button onClick={() => onRemove(index)} style={{ background: '#331111', color: '#ff4444', border: 'none', borderRadius: '10px', padding: '5px 10px' }}>حذف</button>
            </div>
          ))}

          <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: '#888' }}>الإجمالي:</span>
              <span style={{ color: '#39FF14', fontWeight: 'bold', fontSize: '18px' }}>{total} ج.م</span>
            </div>
            <button 
              onClick={() => alert('جارٍ التوجه لصفحة الدفع بأمان.. 💳')}
              style={{ width: '100%', background: '#39FF14', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', border: 'none', fontSize: '16px' }}
            >
              تأكيد الطلب الآن
            </button>
          </div>
        </>
      )}
    </div>
  );
}
