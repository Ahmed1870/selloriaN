// app/page.tsx
import Link from 'next/link'
import { ArrowLeft, Star, Shield, Truck, HeadphonesIcon } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product, Category } from '@/types'

async function getFeaturedData() {
  const supabase = await createServerSupabaseClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(6),
    supabase.from('categories').select('*').limit(8),
  ])
  return { products: products || [], categories: categories || [] }
}

export default async function HomePage() {
  const { products, categories } = await getFeaturedData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container-main py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>أفضل متجر إلكتروني في مصر</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              تسوق بذكاء<br />
              <span className="text-amber-400">وفّر أكثر</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              آلاف المنتجات بأسعار منافسة، توصيل سريع، ودفع آمن عبر فودافون كاش.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg">
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="/products?featured=true" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 font-semibold px-8 py-4 rounded-2xl transition-colors border border-white/20">
                العروض المميزة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-main py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="w-5 h-5 text-blue-700" />, title: 'توصيل سريع', desc: 'لباب بيتك' },
              { icon: <Shield className="w-5 h-5 text-green-600" />, title: 'دفع آمن', desc: 'فودافون كاش' },
              { icon: <Star className="w-5 h-5 text-amber-500" />, title: 'منتجات أصلية', desc: 'مضمونة 100%' },
              { icon: <HeadphonesIcon className="w-5 h-5 text-purple-600" />, title: 'دعم 24/7', desc: 'خدمة عملاء' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{f.title}</p>
                  <p className="text-slate-500 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-main py-12">
          <h2 className="section-title">تسوق حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat: Category) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group card p-6 text-center hover-lift hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                  <span className="text-2xl">🛍️</span>
                </div>
                <p className="font-semibold text-slate-800 group-hover:text-blue-800 transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="container-main py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">منتجات مميزة</h2>
            <Link href="/products" className="text-blue-800 font-semibold hover:underline flex items-center gap-1">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Vodafone Cash Banner */}
      <section className="container-main py-8">
        <div className="bg-gradient-to-l from-red-600 to-red-700 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">ادفع بسهولة عبر فودافون كاش 📱</h3>
              <p className="text-red-100">
                حوّل المبلغ على رقم <span className="font-bold text-white">01019672878</span> وارفع صورة الإيصال
              </p>
            </div>
            <Link href="/products" className="flex-shrink-0 bg-white text-red-700 font-bold px-8 py-3 rounded-2xl hover:bg-red-50 transition-colors">
              ابدأ التسوق
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
