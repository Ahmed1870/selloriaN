// app/admin/payments/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/cart'
import Image from 'next/image'
import { PaymentVerifyButton } from '@/components/admin/PaymentVerifyButton'

export default async function AdminPaymentsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'payment_uploaded')
    .order('created_at', { ascending: true })

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="page-title">التحقق من الدفع</h1>
        <p className="text-slate-500">
          {orders?.length || 0} طلب ينتظر التحقق من دفع فودافون كاش
        </p>
      </div>

      {(!orders || orders.length === 0) ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-slate-700">كل الدفعات تم التحقق منها</h3>
          <p className="text-slate-400 mt-2">لا توجد طلبات تنتظر المراجعة حالياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const addr = order.shipping_address as any
            return (
              <div key={order.id} className="card p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">رقم الطلب</p>
                      <p className="font-mono font-bold text-slate-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">العميل</p>
                      <p className="font-semibold text-slate-900">{addr?.full_name}</p>
                      <p className="text-sm text-slate-500">{addr?.phone}</p>
                      <p className="text-sm text-slate-500">{addr?.city} - {addr?.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">المبلغ المطلوب</p>
                      <p className="text-2xl font-bold text-blue-900">{formatPrice(order.total_amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">رقم محفظة العميل</p>
                      <p className="font-mono font-bold text-slate-800 text-lg">{order.vodafone_wallet_number}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">تاريخ الطلب</p>
                      <p className="text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleString('ar-EG')}
                      </p>
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="lg:col-span-1">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-2">إيصال التحويل</p>
                    {order.payment_screenshot_url ? (
                      <a href={order.payment_screenshot_url} target="_blank" rel="noreferrer">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 hover:opacity-90 transition-opacity">
                          <Image
                            src={order.payment_screenshot_url}
                            alt="إيصال الدفع"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-xs text-blue-600 mt-1 text-center">اضغط لعرض بالحجم الكامل</p>
                      </a>
                    ) : (
                      <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        لم يتم رفع صورة
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center gap-3">
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                      <p className="font-semibold mb-1">تعليمات التحقق:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• تأكد أن المبلغ مطابق للطلب</li>
                        <li>• تأكد أن الإيصال حديث وليس معاد استخدامه</li>
                        <li>• تحقق من رقم المحفظة</li>
                      </ul>
                    </div>
                    <PaymentVerifyButton orderId={order.id} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
