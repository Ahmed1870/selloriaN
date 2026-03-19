"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminControl() {
  const [stats, setStats] = useState({ orders: 0, merchants: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      // 1. حساب إجمالي الأوردرات والفلوس
      const { data: orders } = await supabase.from('orders').select('*');
      const { data: merchants } = await supabase.from('profiles').select('*').eq('role', 'merchant');
      
      if (orders) {
        const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
        setStats({ orders: orders.length, merchants: merchants?.length || 0, revenue: totalRevenue });
        setRecentOrders(orders.slice(0, 5));
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-[#39FF14] tracking-tighter mb-2">رادار سيلوريا 📡</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">نظام الإدارة المركزية | أحمد</p>
        </header>

        {/* كروت الأرقام المرعبة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[45px] hover:border-[#39FF14]/20 transition-all">
            <p className="text-gray-600 text-[10px] font-black uppercase mb-4 tracking-widest">إجمالي المبيعات</p>
            <h2 className="text-5xl font-black">{stats.revenue} <span className="text-sm text-[#39FF14]">ج.م</span></h2>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[45px]">
            <p className="text-gray-600 text-[10px] font-black uppercase mb-4 tracking-widest">عدد التجار</p>
            <h2 className="text-5xl font-black">{stats.merchants} <span className="text-sm text-[#39FF14]">تاجر</span></h2>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[45px]">
            <p className="text-gray-600 text-[10px] font-black uppercase mb-4 tracking-widest">الأوردرات الكلية</p>
            <h2 className="text-5xl font-black">{stats.orders} <span className="text-sm text-[#39FF14]">طلب</span></h2>
          </div>
        </div>

        {/* جدول العمليات الأخيرة */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[50px] overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h3 className="text-xl font-black">أحدث العمليات في مصر 🇪🇬</h3>
            <button className="text-[10px] font-black text-[#39FF14] border border-[#39FF14]/20 px-4 py-2 rounded-full hover:bg-[#39FF14] hover:text-black transition-all">تحميل التقرير الكامل</button>
          </div>
          <div className="p-4">
            <table className="w-full text-right">
              <thead>
                <tr className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                  <th className="p-4">الأوردر</th>
                  <th className="p-4">العنوان</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-sm">#{order.id.slice(0,5)}</td>
                    <td className="p-4 text-gray-400 text-xs">{order.shipping_address}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-[#39FF14]/10 text-[#39FF14] text-[9px] font-black rounded-full uppercase">{order.status}</span>
                    </td>
                    <td className="p-4 font-black">{order.total_amount} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
