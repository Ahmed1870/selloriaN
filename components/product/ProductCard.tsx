'use client'
// components/product/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/components/cart/CartProvider'
import { formatPrice } from '@/lib/cart'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null

  return (
    <div className="card group hover-lift hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <ShoppingCart className="w-16 h-16" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {discount && (
            <span className="badge bg-red-500 text-white">
              -{discount}%
            </span>
          )}
          {product.stock_quantity === 0 && (
            <span className="badge bg-slate-700 text-white">
              نفد المخزون
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-700" />
          </Link>
          {product.stock_quantity > 0 && (
            <button
              onClick={() => addItem(product)}
              className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center shadow-md hover:bg-blue-900 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-slate-900 hover:text-blue-800 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-blue-900">{formatPrice(product.price)}</p>
            {product.compare_price && (
              <p className="text-sm text-slate-400 line-through">{formatPrice(product.compare_price)}</p>
            )}
          </div>
          {product.stock_quantity > 0 ? (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              أضف
            </button>
          ) : (
            <span className="text-sm text-slate-400 font-medium">غير متاح</span>
          )}
        </div>
      </div>
    </div>
  )
}
