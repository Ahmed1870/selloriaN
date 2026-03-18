'use client'
// components/layout/Navbar.tsx
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
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()
          .then(({ data: p }) => setProfile(p))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-blue-800">Selloria</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن منتجات..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (window.location.href = `/products?q=${searchQuery}`)}
                className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/products" className="text-slate-600 hover:text-blue-800 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              المنتجات
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                {profile?.is_admin && (
                  <Link href="/admin" className="flex items-center gap-1.5 text-blue-800 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>الإدارة</span>
                  </Link>
                )}
                <Link href="/account" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-800 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="max-w-24 truncate">{profile?.full_name || 'حسابي'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="text-slate-600 hover:text-blue-800 font-medium px-3 py-2">
                  تسجيل الدخول
                </Link>
                <Link href="/auth/register" className="btn-primary py-2 text-sm">
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 transition-colors">
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-blue-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.count > 9 ? '9+' : cart.count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart" className="relative flex items-center justify-center w-10 h-10">
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-blue-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.count}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 animate-fade-in space-y-2">
            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث..."
                className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Link href="/products" className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>المنتجات</Link>
            {user ? (
              <>
                {profile?.is_admin && (
                  <Link href="/admin" className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 font-medium text-blue-800" onClick={() => setIsMenuOpen(false)}>لوحة الإدارة</Link>
                )}
                <Link href="/account" className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>حسابي</Link>
                <button onClick={handleSignOut} className="block w-full text-right py-2.5 px-3 rounded-lg hover:bg-red-50 font-medium text-red-600">تسجيل الخروج</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>تسجيل الدخول</Link>
                <Link href="/auth/register" className="block py-2.5 px-3 rounded-lg bg-blue-800 text-white font-medium text-center" onClick={() => setIsMenuOpen(false)}>إنشاء حساب</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
