'use client'
// components/admin/OrderStatusUpdater.tsx
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/cart'
import type { OrderStatus } from '@/types'

const ALL_STATUSES: OrderStatus[] = [
  'pending', 'payment_uploaded', 'payment_verified',
  'processing', 'shipped', 'delivered', 'cancelled'
]

interface Props {
  orderId: string
  currentStatus: OrderStatus
}

export function OrderStatusUpdater({ orderId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleChange = async (newStatus: OrderStatus) => {
    setLoading(true)
    const updates: any = { status: newStatus }
    if (newStatus === 'payment_verified') {
      const { data: { user } } = await supabase.auth.getUser()
      updates.payment_verified_at = new Date().toISOString()
      updates.payment_verified_by = user?.id
    }
    await supabase.from('orders').update(updates).eq('id', orderId)
    setStatus(newStatus)
    setLoading(false)
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value as OrderStatus)}
      disabled={loading}
      className={`badge cursor-pointer border-0 focus:ring-2 focus:ring-blue-400 focus:outline-none ${STATUS_COLORS[status]}`}
    >
      {ALL_STATUSES.map(s => (
        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
      ))}
    </select>
  )
}
