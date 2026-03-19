"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Checkout() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تسجيل الأوردر في الداتابيز (المخ)
    const { data, error } = await supabase
      .from('orders')
      .insert([{ 
        shipping_address: address, 
        status: 'pending',
        // هنا بنفترض إن السيستم عارف المنتج اللي اختاره الزبون
      }]);

    if (!error) {
      // فتح واتساب أوتوماتيك لخدمة العملاء (أحمد) لتأكيد الأوردر
      const message = "طلب جديد من سيلوريا! \n العنوان: " + address + " \n الموبايل: " + phone;
      window.open("https://wa.me/201019672878?text=" + encodeURIComponent(message));
      alert('تم استلام طلبك! فريق سيلوريا هيكلمك حالاً 🚀');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center" dir="rtl">
      <div className="w-full max-w-md bg-[#111] p-10 rounded-[40px] border border-white/5">
        <h1 className="text-[#39FF14] font-black text-2xl mb-8">تأكيد الأوردر 📦</h1>
        <form onSubmit={placeOrder} className="space-y-6">
          <input type="text" placeholder="عنوان التوصيل بالتفصيل (محافظة/مدينة/شارع)" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" onChange={(e)=>setAddress(e.target.value)} required />
          <input type="tel" placeholder="رقم الموبايل" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" onChange={(e)=>setPhone(e.target.value)} required />
          
          <button disabled={loading} className="w-full bg-[#39FF14] text-black font-black py-5 rounded-2xl hover:scale-105 transition-all">
            {loading ? 'جاري الحجز...' : 'تأكيد وشحن الآن 🔥'}
          </button>
        </form>
      </div>
    </main>
  );
}
