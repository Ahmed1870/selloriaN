"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function CourierDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // سحب الأوردرات "المعلقة" اللي مستنية طيار يشيلها
    const fetchAvailableOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, profiles(full_name, city)')
        .eq('status', 'pending');
      
      if (!error) setOrders(data);
      setLoading(false);
    };
    fetchAvailableOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    // المندوب يوافق على توصيل الأوردر
    const { error } = await supabase
      .from('orders')
      .update({ status: 'processing', courier_id: (await supabase.auth.getUser()).data.user?.id })
      .eq('id', orderId);

    if (!error) {
      alert('مبروك، الأوردر بقا معاك! كلم الزبون وابدأ التحرك 🚀');
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-[#39FF14]">رادار الطيارين 🛵</h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">الأوردرات المتاحة في منطقتك الآن</p>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] text-gray-400">
            {orders.length} طلب متاح
          </div>
        </header>

        {loading ? (
          <p className="text-center italic text-gray-700">جاري البحث عن أوردرات...</p>
        ) : (
          <div className="grid gap-4">
            {orders.length > 0 ? orders.map((order) => (
              <div key={order.id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[30px] flex justify-between items-center hover:border-[#39FF14]/30 transition-all">
                <div>
                  <h3 className="font-bold text-lg">طلب توصيل #{order.id.slice(0,5)}</h3>
                  <p className="text-gray-400 text-sm">{order.shipping_address}</p>
                  <p className="text-[#39FF14] text-xs font-black mt-1">الربح المتوقع: 40 ج.م</p>
                </div>
                <button 
                  onClick={() => acceptOrder(order.id)}
                  className="bg-white text-black px-6 py-3 rounded-2xl font-black text-xs hover:bg-[#39FF14] transition-all"
                >
                  استلم الشحنة
                </button>
              </div>
            )) : (
              <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                 <p className="text-gray-600">السوق هادي دلوقتي.. أول ما أوردر ينزل هيظهرلك هنا فوراً.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
