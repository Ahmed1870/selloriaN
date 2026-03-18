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

  // 1. جلب الفئات أولاً عشان نستخدمها في الفلتر والبحث
  const { data: categories } = await supabase.from('categories').select('*')

  // 2. بناء الاستعلام الأساسي
  let query = supabase
    .from('products')
    .select('*, categories(*)') // تأكد إن اسم الجدول categories
    .order('created_at', { ascending: false })

  // 3. فلترة البحث بالاسم (لو موجود)
  if (q) {
    query = query.ilike('name', `%${q}%`)
  }

  // 4. فلترة الفئة (لو موجودة)
  if (category) {
    const targetCategory = categories?.find(c => c.slug === category)
    if (targetCategory) {
      query = query.eq('category_id', targetCategory.id)
    }
  }

  // 5. تنفيذ الاستعلام النهائي
  const { data: products, error } = await query

  // للتصحيح فقط (Debug) - لو مفيش منتجات اطبع الخطأ في الـ Console بتاع السيرفر
  if (error) console.error('Supabase Error:', error.message)

  return (
    <div className="container-main py-8">
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">متجر رواج</h1>
        {q && (
          <p className="text-slate-500">
            نتائج البحث عن: <span className="font-semibold text-slate-700">"{q}"</span>
            {' '}({products?.length || 0} منتج)
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <ProductFilters categories={categories || []} activeCategory={category} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {!products || products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-5xl mb-4">📦</p>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">لا توجد منتجات حالياً</h3>
              <p className="text-slate-500">تأكد من إضافة منتجات في لوحة تحكم Supabase</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
