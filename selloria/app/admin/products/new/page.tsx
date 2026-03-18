// app/admin/products/new/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const supabase = await createServerSupabaseClient()
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">إضافة منتج جديد</h1>
      <ProductForm categories={categories || []} />
    </div>
  )
}
