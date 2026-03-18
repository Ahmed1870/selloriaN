'use client'
// app/checkout/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/components/cart/CartProvider'
import { createClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/cart'
import { Phone, Upload, CheckCircle, ArrowLeft, ArrowRight, User, MapPin } from 'lucide-react'

type Step = 'shipping' | 'payment' | 'confirm'

interface ShippingForm {
  full_name: string
  phone: string
  address: string
  city: string
  notes: string
}

export default function CheckoutPage() {
  const { cart, clearItems } = useCart()
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<Step>('shipping')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const [shipping, setShipping] = useState<ShippingForm>({
    full_name: '', phone: '', address: '', city: '', notes: ''
  })
  const [walletNumber, setWalletNumber] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, screenshot: 'يجب رفع صورة فقط' }))
      return
    }
    setScreenshot(file)
    setScreenshotPreview(URL.createObjectURL(file))
    setErrors(prev => ({ ...prev, screenshot: '' }))
  }

  const validateShipping = () => {
    const e: Record<string, string> = {}
    if (!shipping.full_name.trim()) e.full_name = 'الاسم مطلوب'
    if (!shipping.phone.trim()) e.phone = 'رقم الهاتف مطلوب'
    if (!shipping.address.trim()) e.address = 'العنوان مطلوب'
    if (!shipping.city.trim()) e.city = 'المدينة مطلوبة'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e: Record<string, string> = {}
    if (!walletNumber.trim()) e.wallet = 'رقم المحفظة مطلوب'
    else if (!/^01[0-9]{9}$/.test(walletNumber)) e.wallet = 'رقم غير صحيح (يجب أن يبدأ بـ 01 ويتكون من 11 رقم)'
    if (!screenshot) e.screenshot = 'صورة الإيصال مطلوبة'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login?redirect=/checkout'); return }

      // Upload screenshot
      const fileExt = screenshot!.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, screenshot!)

      if (uploadError) throw new Error('فشل رفع صورة الإيصال')

      const { data: { publicUrl } } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName)

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'payment_uploaded',
          total_amount: cart.total,
          shipping_address: {
            full_name: shipping.full_name,
            phone: shipping.phone,
            address: shipping.address,
            city: shipping.city,
            notes: shipping.notes,
          },
          vodafone_wallet_number: walletNumber,
          payment_screenshot_url: publicUrl,
        })
        .select()
        .single()

      if (orderError) throw new Error('فشل إنشاء الطلب')

      // Insert order items
      const items = cart.items.map(({ product, quantity }) => ({
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        product_image: product.images?.[0] || null,
        quantity,
        unit_price: product.price,
        total_price: product.price * quantity,
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(items)
      if (itemsError) throw new Error('فشل حفظ عناصر الطلب')

      setOrderId(order.id)
      clearItems()
      setStep('confirm')
    } catch (err: any) {
      setErrors({ general: err.message || 'حدث خطأ، حاول مرة أخرى' })
    } finally {
      setLoading(false)
    }
  }

  // ── Step Indicator ──
  const steps = [
    { id: 'shipping', label: 'بيانات الشحن', icon: <MapPin className="w-4 h-4" /> },
    { id: 'payment', label: 'الدفع', icon: <Phone className="w-4 h-4" /> },
    { id: 'confirm', label: 'تأكيد', icon: <CheckCircle className="w-4 h-4" /> },
  ]

  if (cart.items.length === 0 && step !== 'confirm') {
    router.push('/cart')
    return null
  }

  return (
    <div className="container-main py-8 max-w-4xl">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-10 gap-0">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              step === s.id
                ? 'bg-blue-800 text-white shadow-md'
                : steps.findIndex(x => x.id === step) > i
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-400'
            }`}>
              {steps.findIndex(x => x.id === step) > i
                ? <CheckCircle className="w-4 h-4" />
                : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${
                steps.findIndex(x => x.id === step) > i ? 'bg-green-400' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">

          {/* ── STEP 1: Shipping ── */}
          {step === 'shipping' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-800" />
                بيانات الشحن
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">الاسم بالكامل *</label>
                    <input
                      className={`input ${errors.full_name ? 'border-red-400 ring-red-200' : ''}`}
                      placeholder="أحمد محمد"
                      value={shipping.full_name}
                      onChange={e => setShipping({ ...shipping, full_name: e.target.value })}
                    />
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                  </div>
                  <div>
                    <label className="label">رقم الهاتف *</label>
                    <input
                      className={`input ${errors.phone ? 'border-red-400 ring-red-200' : ''}`}
                      placeholder="01xxxxxxxxx"
                      value={shipping.phone}
                      onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="label">العنوان التفصيلي *</label>
                  <input
                    className={`input ${errors.address ? 'border-red-400 ring-red-200' : ''}`}
                    placeholder="الشارع، الحي، رقم المنزل..."
                    value={shipping.address}
                    onChange={e => setShipping({ ...shipping, address: e.target.value })}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="label">المدينة *</label>
                  <input
                    className={`input ${errors.city ? 'border-red-400 ring-red-200' : ''}`}
                    placeholder="القاهرة"
                    value={shipping.city}
                    onChange={e => setShipping({ ...shipping, city: e.target.value })}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="label">ملاحظات (اختياري)</label>
                  <textarea
                    className="input resize-none"
                    rows={3}
                    placeholder="أي تعليمات خاصة بالتوصيل..."
                    value={shipping.notes}
                    onChange={e => setShipping({ ...shipping, notes: e.target.value })}
                  />
                </div>
              </div>
              <button
                onClick={() => validateShipping() && setStep('payment')}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                التالي: الدفع
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 'payment' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                الدفع عبر فودافون كاش
              </h2>

              {/* Instructions */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6">
                <h3 className="font-bold text-red-800 mb-3">📱 خطوات الدفع:</h3>
                <ol className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                    <span>افتح تطبيق فودافون كاش على هاتفك</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                    <span>اختر "تحويل أموال" وحوّل مبلغ <strong>{formatPrice(cart.total)}</strong> إلى الرقم:</span>
                  </li>
                  <li className="flex items-start gap-2 mr-7">
                    <div className="bg-white border-2 border-red-300 rounded-xl px-4 py-2 font-bold text-red-900 text-lg tracking-wider">
                      01019672878
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                    <span>خد Screenshot لإيصال التحويل وارفعه في الخانة أدناه</span>
                  </li>
                </ol>
              </div>

              <div className="space-y-5">
                {/* Wallet Number */}
                <div>
                  <label className="label">رقم محفظتك (اللي حوّلت منه) *</label>
                  <input
                    className={`input ${errors.wallet ? 'border-red-400' : ''}`}
                    placeholder="01xxxxxxxxx"
                    value={walletNumber}
                    onChange={e => setWalletNumber(e.target.value)}
                    maxLength={11}
                  />
                  {errors.wallet && <p className="text-red-500 text-xs mt-1">{errors.wallet}</p>}
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="label">صورة إيصال التحويل *</label>
                  <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
                    errors.screenshot
                      ? 'border-red-400 bg-red-50'
                      : screenshotPreview
                        ? 'border-green-400 bg-green-50'
                        : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300'
                  }`}>
                    {screenshotPreview ? (
                      <div className="relative w-full h-full">
                        <Image src={screenshotPreview} alt="Receipt" fill className="object-contain p-2" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600">اضغط لرفع الصورة</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                  </label>
                  {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
                </div>
              </div>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-4">
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('shipping')}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  رجوع
                </button>
                <button
                  onClick={() => validatePayment() && handlePlaceOrder()}
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري تأكيد الطلب...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      تأكيد الطلب
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 'confirm' && (
            <div className="card p-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">تم تأكيد طلبك! 🎉</h2>
              <p className="text-slate-500 mb-6">
                رقم الطلب: <span className="font-mono font-bold text-slate-800">{orderId?.slice(0, 8).toUpperCase()}</span>
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-right">
                <p className="text-amber-800 font-semibold mb-1">⏳ الخطوة التالية</p>
                <p className="text-amber-700 text-sm">
                  فريقنا سيراجع صورة الإيصال وسيتواصل معك خلال ساعتين لتأكيد شحن الطلب.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => router.push('/')} className="btn-secondary">
                  الرئيسية
                </button>
                <button onClick={() => router.push('/account/orders')} className="btn-primary">
                  متابعة طلباتي
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step !== 'confirm' && (
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">ملخص الطلب</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      {product.images?.[0] && (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{product.name}</p>
                      <p className="text-xs text-slate-500">×{quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900 flex-shrink-0">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between font-bold">
                  <span>الإجمالي</span>
                  <span className="text-blue-900">{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
