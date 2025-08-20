import { useEffect, useState } from 'react'
import { supabase, publicUrl } from '../lib/supabase'
import type { Media } from '../types'

export default function Gallery() {
  const [media, setMedia] = useState<Media[]>([])
  useEffect(() => {
    supabase.from('media').select('*').order('created_at', { ascending: false }).then(({ data }) => setMedia(data || []))
  }, [])

  return (
    <div className="container py-12">
      <h1 className="heading text-3xl mb-6">Gallery</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {media.map(m => (
          <img key={m.id} src={publicUrl(m.storage_path)} className="mb-4 rounded-xl break-inside-avoid" />
        ))}
      </div>
    </div>
  )
}
