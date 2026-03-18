'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye, Package } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'

interface ProductCardProps {
  product: any // استخدمنا any مؤقتاً عشان نتخطى مشاكل الـ Types لحد ما الموقع ينطق
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  
  // حساب الخصم لو موجود (بناءً على compare_price و price)
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null

  // تحديد رابط الصورة (بيقرأ من image_url اللي في سوبابيز عندك)
  const mainImage = product.image_url || null

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group">
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title || 'منتج رواج'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-100">
            <Package className="w-12 h-12 mb-2" />
            <span className="text-xs">لا توجد صورة</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {discount && discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
              خصم {discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-right" dir="rtl">
        <Link href={`/products/${product.slug || product.id}`}>
          <h3 className="font-bold text-slate-800 hover:text-blue-700 transition-colors line-clamp-1 mb-1">
            {product.title} {/* غيرناها من name لـ title */}
          </h3>
        </Link>
        
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 h-8">
          {product.description || 'لا يوجد وصف للمنتج'}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-blue-900">
              {product.price} <span className="text-[10px] font-normal text-slate-500">ج.م</span>
            </span>
            {product.compare_price && (
              <span className="text-xs text-slate-400 line-through">
                {product.compare_price} ج.م
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            className="bg-blue-800 hover:bg-blue-900 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            title="أضف للسلة"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
