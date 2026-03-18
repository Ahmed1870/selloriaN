'use client'
// components/product/AddToCartButton.tsx
import { useState } from 'react'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import type { Product } from '@/types'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (product.stock_quantity === 0) {
    return (
      <button disabled className="btn-primary w-full opacity-50 cursor-not-allowed">
        نفد من المخزون
      </button>
    )
  }

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-700">الكمية:</span>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className={`btn-primary w-full flex items-center justify-center gap-2 transition-all ${
          added ? 'bg-green-600 hover:bg-green-700' : ''
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            تمت الإضافة!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            أضف إلى السلة
          </>
        )}
      </button>
    </div>
  )
}
