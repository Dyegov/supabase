import { createClient } from '@supabase/supabase-js'

const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env

export const sb = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY)
