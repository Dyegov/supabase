import { createClient } from '@supabase/supabase-js'

const { VITE_SUPABASE_API_KEY } = import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

export const sb = createClient(supabaseUrl, VITE_SUPABASE_API_KEY)
