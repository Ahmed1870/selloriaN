import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-url.supabase.co' // حط الـ URL بتاعك هنا
const supabaseKey = 'your-anon-key' // حط الـ Anon Key بتاعك هنا

export const supabase = createClient(supabaseUrl, supabaseKey)
