'use client'
// app/cart/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import { formatPrice } from '@/lib/cart'

export default function CartPage() {
  const { cart, removeItem, updateItem } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="container-main py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-slate-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-700 mb-3">السلة فارغة</h2>
        <p className="text-slate-500 mb-8">لم تضف أي منتجات بعد</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          تسوق الآن
        </Link>
      </div>
    )
  }

  return (
    <div className="container-main py-8">
      <h1 className="page-title">سلة التسوق ({cart.count} منتج)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(({ product, quantity }) => (
            <div key={product.id} className="card p-4 flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                {product.images?.[0] && (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-slate-900 hover:text-blue-800 truncate">{product.name}</h3>
                </Link>
                <p className="text-blue-900 font-bold mt-1">{formatPrice(product.price)}</p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => updateItem(product.id, quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => updateItem(product.id, quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <p className="font-bold text-slate-900 w-24 text-center hidden sm:block">
                {formatPrice(product.price * quantity)}
              </p>

              <button
                onClick={() => removeItem(product.id)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4">ملخص الطلب</h3>

            <div className="space-y-3 mb-4">
              {cart.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm text-slate-600">
                  <span className="truncate ml-2">{product.name} ×{quantity}</span>
                  <span className="flex-shrink-0">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-slate-900">
                <span>الإجمالي</span>
                <span className="text-blue-900 text-lg">{formatPrice(cart.total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">شامل التوصيل</p>
            </div>

            <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
              إتمام الطلب
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link href="/products" className="btn-secondary w-full mt-3 flex items-center justify-center gap-2 text-sm">
              متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
