'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/cart'
import { Search, Plus, Minus, Trash2, FileText, MessageCircle, Printer, User, Phone, MapPin } from 'lucide-react'
import type { Product } from '@/types'

interface OrderItem { product: Product; quantity: number }
interface CustomerInfo { name: string; phone: string; address: string; notes: string }

export default function QuickInvoicePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customer, setCustomer] = useState<CustomerInfo>({ name: '', phone: '', address: '', notes: '' })
  const [shipping, setShipping] = useState(0)
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceId] = useState(`INV-${Date.now().toString().slice(-6)}`)
  const supabase = createClient()

  useEffect(() => {
    supabase.from('products').select('*').eq('is_active', true).then(({ data }) => setProducts(data || []))
  }, [])

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const addItem = (product: Product) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) setOrderItems(prev => prev.filter(i => i.product.id !== id))
    else setOrderItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i))
  }

  const subtotal = orderItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const total = subtotal + shipping

  const whatsappMessage = () => {
    const items = orderItems.map(i => `• ${i.product.name} ×${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n')
    const msg = `🧾 *فاتورة ${invoiceId}*\n\n👤 *العميل:* ${customer.name}\n📞 ${customer.phone}\n📍 ${customer.address}\n\n*المنتجات:*\n${items}\n\n💰 *المجموع:* ${formatPrice(subtotal)}\n🚚 *الشحن:* ${formatPrice(shipping)}\n✅ *الإجمالي:* ${formatPrice(total)}\n\n${customer.notes ? `📝 ملاحظات: ${customer.notes}` : ''}`
    return `https://wa.me/?text=${encodeURIComponent(msg)}`
  }

  const InvoicePreview = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)'}}>
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Invoice Header */}
        <div className="p-6 text-center" style={{background: 'linear-gradient(135deg, #4F46E5, #6366F1)'}}>
          <h2 className="text-2xl font-bold text-white">Selloria</h2>
          <p className="text-indigo-200 text-sm mt-1">فاتورة رقم {invoiceId}</p>
          <p className="text-indigo-200 text-xs mt-0.5">{new Date().toLocaleDateString('ar-EG', { dateStyle: 'full' })}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Customer */}
          <div className="p-4 rounded-2xl" style={{background: 'var(--bg)', border: '1px solid var(--border)'}}>
            <p className="font-bold text-sm mb-2" style={{color: 'var(--primary)'}}>بيانات العميل</p>
            <div className="space-y-1 text-sm" style={{color: 'var(--text)'}}>
              <p className="flex items-center gap-2"><User className="w-4 h-4 text-slate-400" />{customer.name}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" />{customer.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" />{customer.address}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="font-bold text-sm mb-3" style={{color: 'var(--text)'}}>المنتجات</p>
            <div className="space-y-2">
              {orderItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between py-2 px-3 rounded-xl" style={{background: 'var(--bg)'}}>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-slate-400">{formatPrice(product.price)} × {quantity}</p>
                  </div>
                  <p className="font-bold text-sm" style={{color: 'var(--primary)'}}>{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-2" style={{borderTop: '1px solid var(--border)'}}>
            <div className="flex justify-between text-sm text-slate-500">
              <span>المجموع الفرعي</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>الشحن</span><span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2" style={{color: 'var(--text)'}}>
              <span>الإجمالي</span>
              <span style={{color: 'var(--primary)'}}>{formatPrice(total)}</span>
            </div>
          </div>

          {customer.notes && (
            <div className="p-3 rounded-xl text-sm" style={{background: '#FEF3C7', color: '#92400E'}}>
              📝 {customer.notes}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a href={whatsappMessage()} target="_blank" rel="noreferrer"
              className="btn-success flex-1 flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              واتساب
            </a>
            <button onClick={() => window.print()} className="btn-secondary flex items-center gap-2">
              <Printer className="w-4 h-4" />
              طباعة
            </button>
            <button onClick={() => setShowInvoice(false)} className="btn-secondary">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">نقطة البيع السريع ⚡</h1>
          <p className="text-sm text-slate-500">أنشئ فاتورة وشاركها على واتساب في ثوانٍ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input pr-10" placeholder="ابحث عن منتج..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(product => (
              <button key={product.id} onClick={() => addItem(product)}
                className="card p-3 text-right hover-lift group cursor-pointer w-full"
                style={{opacity: product.stock_quantity === 0 ? 0.5 : 1}}>
                <p className="font-semibold text-sm line-clamp-2 mb-1" style={{color: 'var(--text)'}}>{product.name}</p>
                <p className="font-bold text-sm" style={{color: 'var(--primary)'}}>{formatPrice(product.price)}</p>
                {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                  <p className="text-xs mt-1 pulse-warning" style={{color: 'var(--warning)'}}>⚠️ متبقي {product.stock_quantity}</p>
                )}
                <div className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'var(--primary-bg)', color: 'var(--primary)'}}>
                  + إضافة
                </div>
              </button>
            ))}
          </div>

          {/* Customer Info */}
          <div className="card p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{color: 'var(--text)'}}>
              <User className="w-4 h-4" style={{color: 'var(--primary)'}} />
              بيانات العميل
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">الاسم *</label>
                <input className="input" placeholder="اسم العميل" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
              </div>
              <div>
                <label className="label">رقم الهاتف *</label>
                <input className="input" placeholder="01xxxxxxxxx" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">العنوان</label>
                <input className="input" placeholder="المدينة، الشارع..." value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">ملاحظات</label>
                <input className="input" placeholder="أي تعليمات خاصة..." value={customer.notes} onChange={e => setCustomer({...customer, notes: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="card p-5 sticky top-24">
            <h3 className="font-bold mb-4" style={{color: 'var(--text)'}}>الطلب الحالي</h3>

            {orderItems.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">لم تضف منتجات بعد</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {orderItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-2 p-2 rounded-xl" style={{background: 'var(--bg)'}}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{product.name}</p>
                      <p className="text-xs text-slate-400">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(product.id, quantity - 1)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white transition-colors" style={{color: 'var(--primary)'}}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white transition-colors" style={{color: 'var(--primary)'}}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => updateQty(product.id, 0)} className="text-slate-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Shipping */}
            <div className="mb-4">
              <label className="label text-xs">رسوم الشحن (جنيه)</label>
              <input type="number" className="input text-sm" value={shipping} onChange={e => setShipping(Number(e.target.value))} min={0} />
            </div>

            {/* Totals */}
            <div className="space-y-1.5 mb-4 pt-3" style={{borderTop: '1px solid var(--border)'}}>
              <div className="flex justify-between text-sm text-slate-500">
                <span>المجموع</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>الشحن</span><span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1">
                <span>الإجمالي</span>
                <span style={{color: 'var(--primary)'}}>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowInvoice(true)}
              disabled={orderItems.length === 0 || !customer.name}
              className="btn-primary w-full flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              إنشاء الفاتورة
            </button>

            {orderItems.length === 0 || !customer.name ? (
              <p className="text-xs text-slate-400 text-center mt-2">أضف منتج وبيانات العميل أولاً</p>
            ) : null}
          </div>

          {/* Profit Calculator */}
          <ProfitCalculator items={orderItems} shipping={shipping} />
        </div>
      </div>

      {showInvoice && <InvoicePreview />}
    </div>
  )
}

function ProfitCalculator({ items, shipping }: { items: OrderItem[], shipping: number }) {
  const [costs, setCosts] = useState<Record<string, number>>({})
  const revenue = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const totalCost = items.reduce((sum, i) => sum + (costs[i.product.id] || 0) * i.quantity, 0)
  const profit = revenue - totalCost - shipping
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : '0'

  return (
    <div className="card p-5">
      <h3 className="font-bold mb-4 flex items-center gap-2" style={{color: 'var(--text)'}}>
        💰 حاسبة الأرباح
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-3">أضف منتجات لحساب الأرباح</p>
      ) : (
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id}>
              <label className="text-xs font-medium text-slate-500 mb-1 block">تكلفة: {product.name}</label>
              <input type="number" className="input text-sm" placeholder="0"
                value={costs[product.id] || ''} min={0}
                onChange={e => setCosts(prev => ({...prev, [product.id]: Number(e.target.value)}))} />
            </div>
          ))}

          <div className="pt-3 space-y-2" style={{borderTop: '1px solid var(--border)'}}>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">الإيراد</span>
              <span className="font-semibold">{formatPrice(revenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">التكلفة + الشحن</span>
              <span className="font-semibold text-red-500">-{formatPrice(totalCost + shipping)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1" style={{borderTop: '1px solid var(--border)'}}>
              <span>صافي الربح</span>
              <div className="text-right">
                <span className={profit >= 0 ? 'profit-positive' : 'profit-negative'}>{formatPrice(profit)}</span>
                <p className="text-xs text-slate-400">هامش {margin}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
