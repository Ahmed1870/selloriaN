'use client'
// components/admin/PaymentVerifyButton.tsx
import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function PaymentVerifyButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleApprove = async () => {
    setLoading('approve')
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('orders').update({
      status: 'payment_verified',
      payment_verified_at: new Date().toISOString(),
      payment_verified_by: user?.id,
    }).eq('id', orderId)
    router.refresh()
  }

  const handleReject = async () => {
    setLoading('reject')
    await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId)
    router.refresh()
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleApprove}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {loading === 'approve' ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        تأكيد الدفع ✅
      </button>
      <button
        onClick={handleReject}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {loading === 'reject' ? (
          <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        رفض الطلب ❌
      </button>
    </div>
  )
}
