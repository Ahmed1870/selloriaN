'use client'
// components/admin/ProductForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Save, Upload, X } from 'lucide-react'
import Image from 'next/image'
import type { Product, Category } from '@/types'

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    compare_price: product?.compare_price?.toString() || '',
    stock_quantity: product?.stock_quantity?.toString() || '0',
    category_id: product?.category_id || '',
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
  })
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (name: string) =>
    name.toLowerCase()
      .replace(/[أإآا]/g, 'a').replace(/[بپ]/g, 'b').replace(/ت/g, 't').replace(/[ثث]/g, 'th')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').trim()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const newUrls: string[] = []
      for (const file of files) {
        const ext = file.name.split('.').pop()
        const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(path, file)
        if (uploadErr) throw uploadErr
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
        newUrls.push(publicUrl)
      }
      setImages(prev => [...prev, ...newUrls])
    } catch (err: any) {
      setError('فشل رفع الصورة: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      setError('اسم المنتج والسعر مطلوبان')
      return
    }

    setSaving(true)
    setError('')

    const data = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      description: form.description || null,
      price: parseFloat(form.price),
      compare_price: form.compare_price ? parseFloat(form.compare_price) : null,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      category_id: form.category_id || null,
      images,
      is_active: form.is_active,
      is_featured: form.is_featured,
    }

    const { error: saveError } = product
      ? await supabase.from('products').update(data).eq('id', product.id)
      : await supabase.from('products').insert(data)

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
    } else {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Basic Info */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">المعلومات الأساسية</h3>
        <div className="space-y-4">
          <div>
            <label className="label">اسم المنتج *</label>
            <input
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })}
              placeholder="مثال: سماعات بلوتوث لاسلكية"
            />
          </div>
          <div>
            <label className="label">Slug (الرابط)</label>
            <input
              className="input font-mono text-sm"
              value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })}
              placeholder="wireless-earbuds"
            />
          </div>
          <div>
            <label className="label">الوصف</label>
            <textarea
              className="input resize-none"
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="وصف تفصيلي للمنتج..."
            />
          </div>
          <div>
            <label className="label">الفئة</label>
            <select
              className="input"
              value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
            >
              <option value="">بدون فئة</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">السعر والمخزون</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">السعر (جنيه) *</label>
            <input
              type="number"
              className="input"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              min="0"
            />
          </div>
          <div>
            <label className="label">السعر قبل الخصم</label>
            <input
              type="number"
              className="input"
              value={form.compare_price}
              onChange={e => setForm({ ...form, compare_price: e.target.value })}
              placeholder="0.00"
              min="0"
            />
          </div>
          <div>
            <label className="label">الكمية في المخزون</label>
            <input
              type="number"
              className="input"
              value={form.stock_quantity}
              onChange={e => setForm({ ...form, stock_quantity: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">الصور</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group">
              <Image src={url} alt={`صورة ${i + 1}`} fill className="object-cover" />
              <button
                onClick={() => setImages(images.filter((_, j) => j !== i))}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            {uploading ? (
              <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-5 h-5 text-slate-300 mb-1" />
                <span className="text-xs text-slate-400">رفع</span>
              </>
            )}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Settings */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-4">إعدادات</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={e => setForm({ ...form, is_active: e.target.checked })}
              className="w-4 h-4 rounded text-blue-700"
            />
            <span className="font-medium text-slate-700">منتج نشط (ظاهر للعملاء)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={e => setForm({ ...form, is_featured: e.target.checked })}
              className="w-4 h-4 rounded text-blue-700"
            />
            <span className="font-medium text-slate-700">منتج مميز (يظهر في الرئيسية)</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary flex items-center gap-2"
      >
        {saving ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {product ? 'حفظ التعديلات' : 'إضافة المنتج'}
      </button>
    </div>
  )
}
