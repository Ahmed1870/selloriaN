import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db, storage } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPlus, FaCloudUploadAlt } from 'react-icons/fa';

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !name || !price || !whatsapp) return alert('برجاء إكمال كافة البيانات!');
    
    setLoading(true);
    try {
      // 1. رفع الصورة للسيرفر
      const imageRef = ref(storage, `products/${image.name + Date.now()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);

      // 2. حفظ بيانات المنتج في Firestore
      await addDoc(collection(db, "products"), {
        name,
        price,
        whatsapp,
        image: url,
        createdAt: new Date()
      });

      alert('تم نشر المنتج بنجاح في Selloria! 🚀');
      setName(''); setPrice(''); setWhatsapp(''); setImage(null);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء النشر، تأكد من إعدادات Firebase');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8">
        <h2 className="text-3xl font-black mb-8 uppercase text-[#39FF14]">إضافة منتج جديد</h2>
        
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input type="text" placeholder="اسم المنتج" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#39FF14]" />
            <input type="number" placeholder="السعر (EGP)" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#39FF14]" />
            <input type="number" placeholder="رقم واتساب التاجر (بدون مفتاح الدولة)" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#39FF14]" />
          </div>

          <div className="relative border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center group hover:border-[#39FF14]/50 transition-all">
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
            <FaCloudUploadAlt size={40} className="text-gray-500 group-hover:text-[#39FF14]" />
            <p className="mt-2 text-xs text-gray-500">{image ? image.name : "اضغط لرفع صورة المنتج"}</p>
          </div>

          <button disabled={loading} className="md:col-span-2 bg-[#39FF14] text-black font-black py-5 rounded-2xl hover:scale-105 transition-transform">
            {loading ? "جاري النشر..." : "نشر المنتج الآن"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Admin;
