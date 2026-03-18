import Link from 'next/link'
import { ArrowLeft, Star, Shield, Truck, Zap, TrendingUp, Users, CheckCircle, MessageCircle } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product, Category } from '@/types'

async function getFeaturedData() {
  const supabase = await createServerSupabaseClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*, category:categories(*)').eq('is_featured', true).eq('is_active', true).limit(6),
    supabase.from('categories').select('*').limit(8),
  ])
  return { products: products || [], categories: categories || [] }
}

export default async function HomePage() {
  const { products, categories } = await getFeaturedData()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338CA 100%)'}}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{background: 'radial-gradient(circle, #818CF8, transparent)', transform: 'translate(30%, -30%)'}} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{background: 'radial-gradient(circle, #C7D2FE, transparent)', transform: 'translate(-30%, 30%)'}} />
        </div>

        <div className="container-main py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{background: 'rgba(255,255,255,0.1)', color: '#C7D2FE', border: '1px solid rgba(255,255,255,0.15)'}}>
              <Zap className="w-3.5 h-3.5" />
              منصة التجارة الإلكترونية الأذكى في مصر
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              بيع أكثر،
              <br />
              <span style={{color: '#A5B4FC'}}>اشتغل أقل</span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{color: 'rgba(255,255,255,0.65)'}}>
              متجرك الإلكتروني الاحترافي مع فواتير واتساب فورية، تتبع الطلبات، وحسابة الأرباح — كل حاجة في مكان واحد.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/products" className="btn-primary px-7 py-3 text-base" style={{background: 'white', color: 'var(--primary)'}}>
                تسوق الآن
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link href="/auth/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white transition-all" style={{border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)'}}>
                افتح متجرك مجاناً
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {[{v: '+500', l: 'تاجر'}, {v: '+10K', l: 'منتج'}, {v: '99%', l: 'رضا'}].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-white">{s.v}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <div style={{background: 'white', borderBottom: '1px solid var(--border)'}}>
        <div className="container-main py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon: <Truck className="w-4 h-4" />, t: 'توصيل سريع', d: 'لباب بيتك'},
              {icon: <Shield className="w-4 h-4" />, t: 'دفع آمن', d: 'فودافون كاش'},
              {icon: <MessageCircle className="w-4 h-4" />, t: 'فواتير واتساب', d: 'فورية ومجانية'},
              {icon: <TrendingUp className="w-4 h-4" />, t: 'تحليل الأرباح', d: 'لحظة بلحظة'},
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-xs" style={{color: 'var(--text)'}}>{f.t}</p>
                  <p className="text-xs" style={{color: 'var(--text-muted)'}}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-main py-14">
          <h2 className="section-title">تسوق حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat: Category) => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}
                className="card p-5 text-center hover-lift group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110" style={{background: 'var(--primary-bg)'}}>
                  <span className="text-2xl">🛍️</span>
                </div>
                <p className="font-semibold text-sm" style={{color: 'var(--text)'}}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-14" style={{background: 'white'}}>
          <div className="container-main">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title mb-0">منتجات مميزة</h2>
              <Link href="/products" className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:opacity-70" style={{color: 'var(--primary)'}}>
                عرض الكل <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {/* Why Selloria */}
      <section className="py-16" style={{background: 'var(--bg)'}}>
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="section-title">لماذا يختار التجار Selloria؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {icon: '⚡', t: 'فواتير واتساب فورية', d: 'أنشئ فاتورة احترافية وشاركها على واتساب في أقل من دقيقة'},
              {icon: '📊', t: 'حاسبة الأرباح', d: 'اعرف ربحك الحقيقي بعد خصم التكاليف والشحن لحظة بلحظة'},
              {icon: '🔔', t: 'تنبيهات المخزون', d: 'تنبيهات تلقائية عند اقتراب نفاد المنتجات'},
            ].map((item, i) => (
              <div key={i} className="card p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{color: 'var(--text)'}}>{item.t}</h3>
                <p className="text-sm leading-relaxed" style={{color: 'var(--text-muted)'}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-main py-10">
        <div className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden" style={{background: 'linear-gradient(135deg, #4F46E5, #6366F1)'}}>
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1), transparent 60%)'}} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">ادفع بسهولة عبر فودافون كاش 📱</h3>
              <p style={{color: 'rgba(255,255,255,0.7)'}}>حوّل على <span className="font-bold text-white">01019672878</span> وارفع صورة الإيصال</p>
            </div>
            <Link href="/products" className="btn-primary flex-shrink-0 px-8 py-3" style={{background: 'white', color: 'var(--primary)'}}>
              ابدأ التسوق
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
