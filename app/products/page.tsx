import { createServerSupabaseClient } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilters } from '@/components/product/ProductFilters'

interface ProductsPageProps {
  searchParams: { q?: string; category?: string; page?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = await createServerSupabaseClient()
  const { q, category } = searchParams

  // 1. جلب الفئات (تأكد أن اسم الجدول هو categories)
  const { data: categories } = await supabase.from('categories').select('*')

  // 2. بناء الاستعلام الأساسي (استخدمنا اسم الجدول products)
  let query = supabase
    .from('products')
    .select('*') // هنجيب كل الأعمدة بما فيها title و price
    .order('created_at', { ascending: false })

  // 3. فلترة البحث (استخدمنا title بدل name لأن ده اللي في صورتك)
  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  // 4. فلترة الفئة (لو category_id موجود ومربوط صح)
  if (category) {
    const targetCategory = categories?.find(c => c.slug === category)
    if (targetCategory) {
      query = query.eq('category_id', targetCategory.id)
    }
  }

  const { data: products, error } = await query

  if (error) {
    console.error('Supabase Error:', error.message)
  }

  return (
    <div className="container-main py-8 px-4">
      <div className="mb-8 text-right">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">متجر رواج</h1>
        <p className="text-slate-600 font-medium">أحدث المنتجات المتاحة</p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-8">
        {/* الفلاتر على اليمين عشان العربي */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductFilters categories={categories || []} activeCategory={category} />
        </aside>

        {/* شبكة المنتجات */}
        <div className="flex-1">
          {!products || products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-6xl mb-4">📦</p>
              <h3 className="text-xl font-semibold text-slate-800">لا توجد منتجات حالياً</h3>
              <p className="text-slate-500 mt-2">جاري تحديث البيانات من سوبابيز...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
