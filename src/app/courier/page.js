"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function CourierDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('orders').select('*, stores(store_name, merchant_id)').eq('status', 'pending');
      if (data) setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleAction = async (order) => {
    // 1. تحديث حالة الأوردر في السيستم
    const { error } = await supabase
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', order.id);

    if (!error) {
      // 2. صياغة رسالة الواتساب للزبون (أوتوماتيك)
      const customerMsg = "أهلاً بك في سيلوريا! 🛒 \n أوردر رقم #${order.id.slice(0,5)} بقا مع المندوب وفي الطريق ليك حالاً.";
      const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(customerMsg);
      
      alert('تم استلام الأوردر! هحولك للواتساب عشان تبلغ الزبون بضغطة واحدة.');
      window.open(whatsappUrl);
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 font-sans" dir="rtl">
      <h1 className="text-3xl font-black text-[#39FF14] mb-8">عمليات سيلوريا الحية ⚡</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[30px] flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">طلب جديد من: {order.shipping_address}</p>
              <h3 className="text-lg font-black mt-1">متجر: {order.stores?.store_name || 'عام'}</h3>
            </div>
            <button 
              onClick={() => handleAction(order)}
              className="bg-[#39FF14] text-black px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all"
            >
              استلام وإرسال تنبيه
            </button>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-gray-700 italic py-20">لا توجد طلبات معلقة حالياً..</p>}
      </div>
    </main>
  );
}
