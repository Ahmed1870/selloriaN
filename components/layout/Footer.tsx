import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)'}}>
      <div className="green-divider" />
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                style={{background: '#39FF14', color: '#0a0a0a', boxShadow: '0 0 16px rgba(57,255,20,0.3)'}}>S</div>
              <span className="font-bold text-lg text-white">Selloria</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{color: 'rgba(255,255,255,0.35)'}}>
              منصة التجارة الإلكترونية الأولى في مصر. منتجات أصلية وتوصيل سريع لباب بيتك.
            </p>
            <div className="space-y-2 text-sm">
              {[
                {icon: <Phone className="w-3.5 h-3.5" />, text: '01019672878'},
                {icon: <Mail className="w-3.5 h-3.5" />, text: 'xcm3108@gmail.com'},
                {icon: <MapPin className="w-3.5 h-3.5" />, text: 'القاهرة، مصر'},
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2" style={{color: 'rgba(255,255,255,0.35)'}}>
                  <span style={{color: '#39FF14'}}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color: '#39FF14'}}>روابط</h4>
            <ul className="space-y-2">
              {[['/', 'الرئيسية'], ['/products', 'المنتجات'], ['/cart', 'السلة'], ['/account', 'حسابي']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{color: 'rgba(255,255,255,0.35)'}}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color: '#39FF14'}}>الدفع</h4>
            <div className="p-4 rounded-2xl" style={{background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.15)'}}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Vodafone Cash</p>
                  <p className="text-xs" style={{color: 'rgba(255,255,255,0.4)'}}>01019672878</p>
                </div>
              </div>
              <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>حوّل وارفع صورة الإيصال</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)'}}>
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
