'use client'
// components/admin/DeleteProductButton.tsx
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setLoading(true)
    await supabase.from('products').update({ is_active: false }).eq('id', productId)
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
        >
          {loading ? '...' : 'تأكيد'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-200"
        >
          إلغاء
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      title={`حذف ${productName}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
