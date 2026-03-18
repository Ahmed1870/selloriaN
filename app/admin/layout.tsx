import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase' // اتأكد إن الاسم مطابق للي فوق
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login?redirect=/admin')
  
  // باقي الكود بتاعك سليم...
