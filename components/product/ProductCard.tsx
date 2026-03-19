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
    <div className="card group hover-lift" style={{transition: 'all 0.3s ease'}}>
      <div className="relative aspect-square overflow-hidden" style={{background: 'rgba(255,255,255,0.03)'}}>
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{color: 'rgba(255,255,255,0.1)'}}>
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          {discount && <span className="badge badge-green text-xs">-{discount}%</span>}
          {product.stock_quantity === 0 && <span className="badge badge-slate text-xs">نفد</span>}
          {product.stock_quantity > 0 && product.stock_quantity < 5 && (
            <span className="badge badge-warning text-xs">⚠️ {product.stock_quantity} فقط</span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(4px)'}}>
          <Link href={`/products/${product.slug}`}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
            style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <Eye className="w-4 h-4 text-white" />
          </Link>
          {product.stock_quantity > 0 && (
            <button onClick={() => addItem(product)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
              style={{background: '#39FF14', boxShadow: '0 0 16px rgba(57,255,20,0.4)'}}>
              <ShoppingCart className="w-4 h-4" style={{color: '#0a0a0a'}} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-3 line-clamp-2 text-white hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-base" style={{color: '#39FF14'}}>{formatPrice(product.price)}</p>
            {product.compare_price && (
              <p className="text-xs line-through" style={{color: 'rgba(255,255,255,0.3)'}}>{formatPrice(product.compare_price)}</p>
            )}
          </div>
          {product.stock_quantity > 0 ? (
            <button onClick={() => addItem(product)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all hover:scale-105"
              style={{background: 'rgba(57,255,20,0.1)', color: '#39FF14', border: '1px solid rgba(57,255,20,0.2)'}}>
              <ShoppingCart className="w-3.5 h-3.5" />
              أضف
            </button>
          ) : (
            <span className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>غير متاح</span>
          )}
        </div>
      </div>
    </div>
  )
}
