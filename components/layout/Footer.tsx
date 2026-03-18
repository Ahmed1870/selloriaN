import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{background: 'var(--navy)'}}>
      {/* Gold top line */}
      <div className="h-px w-full" style={{background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)'}} />
      
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{background: 'linear-gradient(135deg, #c9a84c, #e8c76a)', color: '#0a1628'}}>S</div>
              <span className="text-xl font-bold" style={{color: '#e8c76a', fontFamily: 'Playfair Display, serif'}}>Selloria</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{color: 'rgba(255,255,255,0.5)'}}>
              منصة التجارة الإلكترونية الأولى في مصر. منتجات أصلية بأسعار منافسة وتوصيل سريع لباب بيتك.
            </p>
            <div className="space-y-2 text-sm">
              {[
                { icon: <Phone className="w-4 h-4" />, text: '01019672878' },
                { icon: <Mail className="w-4 h-4" />, text: 'support@selloria.com' },
                { icon: <MapPin className="w-4 h-4" />, text: 'القاهرة، مصر' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2" style={{color: 'rgba(255,255,255,0.4)'}}>
                  <span style={{color: 'var(--gold)'}}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{color: 'var(--gold)'}}>روابط سريعة</h4>
            <ul className="space-y-2">
              {[['/', 'الرئيسية'], ['/products', 'المنتجات'], ['/cart', 'السلة'], ['/account', 'حسابي']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:opacity-100" style={{color: 'rgba(255,255,255,0.45)'}}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{color: 'var(--gold)'}}>الدفع</h4>
            <div className="p-4 rounded-2xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Vodafone Cash</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.4)'}}>01019672878</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{color: 'rgba(255,255,255,0.35)'}}>
                حوّل وارفع صورة الإيصال عند الطلب
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{borderTop: '1px solid rgba(201,168,76,0.1)', color: 'rgba(255,255,255,0.25)'}}>
          <p>© {new Date().getFullYear()} Selloria. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
