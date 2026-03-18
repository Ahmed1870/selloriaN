import { createBrowserClient, createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// دالة الكلاينت (للفرويت إيند)
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// دالة السيرفر (دي اللي كانت مسببة المشكلة)
export async function createServerSupabaseClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = cookies() // في نكست 14 الـ cookies() مش محتاجة await في أغلب الحالات
  
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // الـ Server Components مبيسمحش بالـ set للهيدرز، بنعملها pass عادي
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {}
      },
    },
  })
}

// دالة الأدمن (للعمليات الحساسة)
export function createAdminClient() {
  const { createClient: createSupabaseClient } = require('@supabase/supabase-js')
  return createSupabaseClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
             }
