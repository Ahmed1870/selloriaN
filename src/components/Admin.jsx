import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!name || !price || !whatsapp || !imageUrl) return alert('برجاء إكمال كافة البيانات!');
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        name, price, whatsapp, image: imageUrl, createdAt: new Date()
      });
      alert('تم نشر المنتج بنجاح في سيلوريا! 🚀');
      setName(''); setPrice(''); setWhatsapp(''); setImageUrl('');
    } catch (err) { alert('خطأ في الاتصال بقاعدة البيانات'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 text-white">
      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[30px]">
        <h2 className="text-2xl font-black mb-6 text-[#39FF14]">إضافة منتج (رابط مباشر)</h2>
        <form onSubmit={handlePublish} className="space-y-4">
          <input type="text" placeholder="اسم المنتج" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none" />
          <input type="number" placeholder="السعر" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none" />
          <input type="text" placeholder="رابط صورة المنتج (URL)" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none" />
          <input type="number" placeholder="رقم واتساب التاجر" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none" />
          <button className="w-full bg-[#39FF14] text-black font-black py-4 rounded-xl uppercase tracking-widest">
            {loading ? "جاري النشر..." : "نشر المنتج الآن"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Admin;
