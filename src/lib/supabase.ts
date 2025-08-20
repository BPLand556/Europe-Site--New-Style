import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const publicUrl = (path?: string | null) => {
  if (!path) return ''
  return supabase.storage.from('trip-media').getPublicUrl(path).data.publicUrl
}
