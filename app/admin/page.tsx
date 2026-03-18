// app/admin/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { ShoppingBag, Package, DollarSign, Clock } from 'lucide-react'
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/cart'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: totalOrders },
    { count: totalProducts },
    { count: pendingPayments },
    { data: recentOrders },
    { data: ordersForRevenue },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'payment_uploaded'),
    supabase.from('orders')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('orders').select('total_amount').in('status', ['payment_verified', 'processing', 'shipped', 'delivered']),
  ])

  const totalRevenue = ordersForRevenue?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0

  const stats = [
    { label: 'إجمالي الطلبات', value: totalOrders || 0, icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-blue-50 text-blue-700', href: '/admin/orders' },
    { label: 'المنتجات النشطة', value: totalProducts || 0, icon: <Package className="w-5 h-5" />, color: 'bg-purple-50 text-purple-700', href: '/admin/products' },
    { label: 'الإيرادات', value: formatPrice(totalRevenue), icon: <DollarSign className="w-5 h-5" />, color: 'bg-green-50 text-green-700', href: '/admin/orders' },
    { label: 'دفعات تنتظر التحقق', value: pendingPayments || 0, icon: <Clock className="w-5 h-5" />, color: 'bg-amber-50 text-amber-700', href: '/admin/payments' },
  ]

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">لوحة التحكم</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">آخر الطلبات</h2>
          <Link href="/admin/orders" className="text-blue-700 text-sm font-medium hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 text-right">رقم الطلب</th>
                <th className="px-5 py-3 text-right">العميل</th>
                <th className="px-5 py-3 text-right">المبلغ</th>
                <th className="px-5 py-3 text-right">الحالة</th>
                <th className="px-5 py-3 text-right">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders?.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="font-mono text-sm text-blue-700 hover:underline">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-700">
                    {(order.shipping_address as any)?.full_name || '—'}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-900">
                    {formatPrice(order.total_amount)}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${STATUS_COLORS[order.status] || 'bg-slate-100 text-slate-700'}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">
                    {new Date(order.created_at).toLocaleDateString('ar-EG')}
                  </td>
                </tr>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                    لا توجد طلبات بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
