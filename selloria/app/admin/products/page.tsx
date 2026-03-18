// app/admin/products/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/cart'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Eye } from 'lucide-react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import type { Product } from '@/types'

export default async function AdminProductsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title mb-0">إدارة المنتجات</h1>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          منتج جديد
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-5 py-3 text-right">المنتج</th>
                <th className="px-5 py-3 text-right">الفئة</th>
                <th className="px-5 py-3 text-right">السعر</th>
                <th className="px-5 py-3 text-right">المخزون</th>
                <th className="px-5 py-3 text-right">الحالة</th>
                <th className="px-5 py-3 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products?.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        {product.images?.[0] && (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm line-clamp-1">{product.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {product.category?.name || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-slate-900">{formatPrice(product.price)}</p>
                    {product.compare_price && (
                      <p className="text-xs text-slate-400 line-through">{formatPrice(product.compare_price)}</p>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-semibold ${
                      product.stock_quantity === 0
                        ? 'text-red-600'
                        : product.stock_quantity < 10
                          ? 'text-amber-600'
                          : 'text-green-600'
                    }`}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {product.is_active ? 'نشط' : 'مخفي'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-slate-400">
                    لا توجد منتجات. ابدأ بإضافة منتج جديد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
