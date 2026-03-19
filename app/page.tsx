import Link from 'next/link'
import { ArrowLeft, Zap, Shield, Truck, MessageCircle, TrendingUp, Star } from 'lucide-react'
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
    <div style={{background: '#0a0a0a'}}>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: '#39FF14'}} />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{background: '#39FF14'}} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </div>

        <div className="container-main py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-up"
              style={{background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', color: '#39FF14'}}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              منصة التجارة الإلكترونية الأذكى في مصر
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-fade-up" style={{animationDelay: '0.1s'}}>
              بيع أكثر
              <br />
              <span style={{color: '#39FF14', textShadow: '0 0 40px rgba(57,255,20,0.5)'}}>بسرعة البرق</span>
            </h1>

            <p className="text-lg mb-10 leading-relaxed animate-fade-up" style={{color: 'rgba(255,255,255,0.55)', animationDelay: '0.2s', maxWidth: '520px'}}>
              متجرك الاحترافي مع فواتير واتساب فورية، AI مساعد مبيعات، وتحليل أرباح لحظي — كل حاجة في مكان واحد.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-16 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <Link href="/products" className="btn-primary px-8 py-3.5 text-base gap-2">
                ابدأ التسوق
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="/auth/register" className="btn-secondary px-8 py-3.5 text-base">
                افتح متجرك مجاناً
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 animate-fade-up" style={{animationDelay: '0.4s'}}>
              {[{v: '+500', l: 'تاجر نشط'}, {v: '+10K', l: 'منتج'}, {v: '99%', l: 'رضا العملاء'}].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black" style={{color: '#39FF14'}}>{s.v}</p>
                  <p className="text-sm mt-0.5" style={{color: 'rgba(255,255,255,0.4)'}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{background: 'linear-gradient(to top, #0a0a0a, transparent)'}} />
      </section>

      {/* Features */}
      <section className="py-6" style={{borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon: <Truck className="w-4 h-4" />, t: 'توصيل سريع', d: 'لباب بيتك'},
              {icon: <Shield className="w-4 h-4" />, t: 'دفع آمن', d: 'فودافون كاش'},
              {icon: <MessageCircle className="w-4 h-4" />, t: 'فواتير واتساب', d: 'فورية'},
              {icon: <TrendingUp className="w-4 h-4" />, t: 'تحليل الأرباح', d: 'لحظي'},
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-colors" style={{}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(57,255,20,0.08)', color: '#39FF14'}}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{f.t}</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.4)'}}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container-main py-16">
          <h2 className="section-title">تسوق حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat: Category) => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}
                className="card p-5 text-center hover-lift group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{background: 'rgba(57,255,20,0.08)'}}>
                  <span className="text-2xl">🛍️</span>
                </div>
                <p className="font-semibold text-sm text-white">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-16" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title mb-0">منتجات مميزة</h2>
              <Link href="/products" className="btn-ghost text-sm gap-1.5" style={{color: '#39FF14'}}>
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
      <section className="py-16" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">لماذا يختار التجار Selloria؟</h2>
            <div className="green-divider w-32 mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {icon: '⚡', t: 'فواتير واتساب فورية', d: 'أنشئ فاتورة احترافية وشاركها في أقل من دقيقة'},
              {icon: '📊', t: 'حاسبة الأرباح', d: 'اعرف ربحك الحقيقي بعد خصم التكاليف والشحن'},
              {icon: '🔔', t: 'تنبيهات المخزون', d: 'تنبيهات تلقائية عند اقتراب نفاد المنتجات'},
            ].map((item, i) => (
              <div key={i} className="card-green p-6 hover-lift">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.t}</h3>
                <p className="text-sm leading-relaxed" style={{color: 'rgba(255,255,255,0.5)'}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-main py-10">
        <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.15)'}}>
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{backgroundImage: 'radial-gradient(circle at 80% 50%, #39FF14, transparent 60%)'}} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">ادفع بسهولة عبر فودافون كاش 📱</h3>
              <p style={{color: 'rgba(255,255,255,0.5)'}}>
                حوّل على <span className="font-bold" style={{color: '#39FF14'}}>01019672878</span> وارفع صورة الإيصال
              </p>
            </div>
            <Link href="/products" className="btn-primary flex-shrink-0 px-8 py-3.5">
              ابدأ التسوق
            </Link>
          </div>
        </div>
      </section>

      {/* Footer space */}
      <div className="h-8" />
    </div>
  )
}
