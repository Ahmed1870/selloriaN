// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { formatPrice } from '@/lib/cart'
import { Tag, Package } from 'lucide-react'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createServerSupabaseClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null

  return (
    <div className="container-main py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Package className="w-24 h-24" />
              </div>
            )}
            {discount && (
              <div className="absolute top-4 right-4 badge bg-red-500 text-white text-sm px-3 py-1.5">
                وفّر {discount}%
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {product.category && (
            <div className="flex items-center gap-1.5 text-blue-700 text-sm font-medium">
              <Tag className="w-4 h-4" />
              <span>{(product.category as any).name}</span>
            </div>
          )}

          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-blue-900">{formatPrice(product.price)}</span>
            {product.compare_price && (
              <span className="text-xl text-slate-400 line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-slate-600 leading-relaxed text-base">{product.description}</p>
          )}

          {/* Stock */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
            product.stock_quantity > 0
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {product.stock_quantity > 0
              ? `متاح في المخزون (${product.stock_quantity} قطعة)`
              : 'نفد من المخزون'}
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product as any} />

          {/* Vodafone Info */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-red-800 font-semibold text-sm mb-1">💳 الدفع عبر فودافون كاش</p>
            <p className="text-red-700 text-sm">
              بعد تأكيد طلبك، حوّل المبلغ على رقم <strong>01019672878</strong> وارفع صورة الإيصال
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
