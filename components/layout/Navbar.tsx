'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Search, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import { createClient } from '@/lib/supabase'
import type { User as SupaUser } from '@supabase/supabase-js'
import type { Profile } from '@/types'

export function Navbar() {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<SupaUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) supabase.from('profiles').select('*').eq('id', data.user.id).single().then(({ data: p }) => setProfile(p))
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null))
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => { subscription.unsubscribe(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); setProfile(null) }

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
      <div className="container-main">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-110"
              style={{background: '#39FF14', color: '#0a0a0a', boxShadow: '0 0 16px rgba(57,255,20,0.4)'}}>
              S
            </div>
            <span className="font-bold text-base text-white">Selloria</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color: 'rgba(57,255,20,0.5)'}} />
              <input type="text" placeholder="ابحث عن منتجات..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (window.location.href = `/products?q=${searchQuery}`)}
                className="input pr-10 py-2 text-sm h-9" />
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/products" className="btn-ghost text-sm">المنتجات</Link>
            {user ? (
              <div className="flex items-center gap-1">
                {profile?.is_admin && (
                  <Link href="/admin" className="btn-ghost text-sm" style={{color: '#39FF14'}}>
                    <LayoutDashboard className="w-4 h-4" />الإدارة
                  </Link>
                )}
                <Link href="/account" className="btn-ghost text-sm">
                  <User className="w-4 h-4" />{profile?.full_name?.split(' ')[0] || 'حسابي'}
                </Link>
                <button onClick={handleSignOut} className="btn-ghost text-sm" style={{color: 'rgba(255,68,68,0.7)'}}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="btn-ghost text-sm">دخول</Link>
                <Link href="/auth/register" className="btn-primary py-2 text-sm px-4">ابدأ مجاناً</Link>
              </div>
            )}
            <Link href="/cart" className="relative btn-ghost px-2">
              <ShoppingCart className="w-5 h-5" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-black rounded-full flex items-center justify-center"
                  style={{background: '#39FF14', color: '#0a0a0a'}}>
                  {cart.count > 9 ? '9+' : cart.count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart" className="relative btn-ghost px-2">
              <ShoppingCart className="w-5 h-5" />
              {cart.count > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-xs font-black rounded-full flex items-center justify-center" style={{background: '#39FF14', color: '#0a0a0a'}}>{cart.count}</span>}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn-ghost px-2">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-up space-y-1" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color: 'rgba(57,255,20,0.5)'}} />
              <input type="text" placeholder="ابحث..." className="input pr-10 py-2 text-sm" />
            </div>
            <Link href="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>المنتجات</Link>
            {user ? (
              <>
                {profile?.is_admin && <Link href="/admin" className="nav-link active" onClick={() => setIsMenuOpen(false)}>لوحة الإدارة</Link>}
                <Link href="/account" className="nav-link" onClick={() => setIsMenuOpen(false)}>حسابي</Link>
                <button onClick={handleSignOut} className="nav-link w-full" style={{color: 'rgba(255,68,68,0.7)'}}>تسجيل الخروج</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>تسجيل الدخول</Link>
                <Link href="/auth/register" className="btn-primary w-full justify-center mt-2" onClick={() => setIsMenuOpen(false)}>ابدأ مجاناً</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
