'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, CheckSquare, LogOut, Home, Zap, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard, exact: true },
  { href: '/admin/pos', label: 'البيع السريع ⚡', icon: Zap },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
  { href: '/admin/orders', label: 'الطلبات', icon: ShoppingBag },
  { href: '/admin/payments', label: 'التحقق من الدفع', icon: CheckSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="w-60 flex flex-col min-h-screen" style={{background: 'white', borderLeft: '1px solid var(--border)'}}>
      {/* Logo */}
      <div className="p-5" style={{borderBottom: '1px solid var(--border)'}}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm text-white" style={{background: 'var(--primary)'}}>S</div>
          <div>
            <p className="font-bold text-sm" style={{color: 'var(--text)'}}>Selloria</p>
            <p className="text-xs" style={{color: 'var(--text-muted)'}}>لوحة الإدارة</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              className={`nav-link ${isActive ? 'active' : ''}`}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 space-y-0.5" style={{borderTop: '1px solid var(--border)'}}>
        <Link href="/" className="nav-link">
          <Home className="w-4 h-4" />
          المتجر
        </Link>
        <button onClick={handleSignOut} className="nav-link w-full text-right" style={{color: 'var(--danger)'}}>
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}
