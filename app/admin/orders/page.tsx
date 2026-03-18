// app/admin/orders/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/cart'
import Link from 'next/link'
import { OrderStatusUpdater } from '@/components/admin/OrderStatusUpdater'

export default async function AdminOrdersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">إدارة الطلبات</h1>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 text-right">رقم الطلب</th>
                <th className="px-5 py-3 text-right">العميل</th>
                <th className="px-5 py-3 text-right">المبلغ</th>
                <th className="px-5 py-3 text-right">الدفع</th>
                <th className="px-5 py-3 text-right">الحالة</th>
                <th className="px-5 py-3 text-right">التاريخ</th>
                <th className="px-5 py-3 text-right">تفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders?.map(order => {
                const addr = order.shipping_address as any
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-sm font-bold text-slate-700">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-slate-900">{addr?.full_name}</p>
                      <p className="text-xs text-slate-400">{addr?.phone}</p>
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-slate-900">
                      {formatPrice(order.total_amount)}
                    </td>
                    <td className="px-5 py-3">
                      {order.vodafone_wallet_number ? (
                        <div>
                          <p className="text-xs text-slate-700 font-mono">{order.vodafone_wallet_number}</p>
                          {order.payment_screenshot_url && (
                            <a
                              href={order.payment_screenshot_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              عرض الإيصال
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusUpdater orderId={order.id} currentStatus={order.status as any} />
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">
                      {new Date(order.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-700 text-xs font-medium hover:underline"
                      >
                        التفاصيل
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-slate-400">
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
