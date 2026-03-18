'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/components/cart/CartProvider'
import { formatPrice } from '@/lib/cart'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null

  return (
    <div className="card group hover-lift">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{color: 'var(--border)'}}>
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          {discount && <span className="badge badge-primary text-xs">{discount}% خصم</span>}
          {product.stock_quantity === 0 && <span className="badge badge-slate text-xs">نفد</span>}
          {product.stock_quantity > 0 && product.stock_quantity < 5 && (
            <span className="badge badge-warning text-xs pulse-warning">⚠️ {product.stock_quantity} فقط</span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'rgba(15,23,42,0.25)'}}>
          <Link href={`/products/${product.slug}`} className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <Eye className="w-4 h-4" style={{color: 'var(--text)'}} />
          </Link>
          {product.stock_quantity > 0 && (
            <button onClick={() => addItem(product)} className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform text-white" style={{background: 'var(--primary)'}}>
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:opacity-70 transition-opacity" style={{color: 'var(--text)'}}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-base" style={{color: 'var(--primary)'}}>{formatPrice(product.price)}</p>
            {product.compare_price && <p className="text-xs text-slate-400 line-through">{formatPrice(product.compare_price)}</p>}
          </div>
          {product.stock_quantity > 0 ? (
            <button onClick={() => addItem(product)} className="btn-secondary py-1.5 px-3 text-xs">
              <ShoppingCart className="w-3.5 h-3.5" />
              أضف
            </button>
          ) : (
            <span className="text-xs font-medium" style={{color: 'var(--text-muted)'}}>غير متاح</span>
          )}
        </div>
      </div>
    </div>
  )
}
