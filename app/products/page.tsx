// app/products/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilters } from '@/components/product/ProductFilters'
import type { Product } from '@/types'

interface ProductsPageProps {
  searchParams: { q?: string; category?: string; page?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = await createServerSupabaseClient()
  const { q, category } = searchParams

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (q) {
    query = query.ilike('name', `%${q}%`)
  }

  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  const { data: products } = await query
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div className="container-main py-8">
      <div className="mb-6">
        <h1 className="page-title">المنتجات</h1>
        {q && (
          <p className="text-slate-500">
            نتائج البحث عن: <span className="font-semibold text-slate-700">"{q}"</span>
            {' '}({products?.length || 0} منتج)
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <ProductFilters categories={categories || []} activeCategory={category} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {!products || products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🛍️</p>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">لا توجد منتجات</h3>
              <p className="text-slate-500">جرب البحث بكلمات مختلفة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
