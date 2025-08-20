import { useEffect, useState } from 'react'
import { supabase, publicUrl } from '../lib/supabase'
import type { Post } from '../types'
import { Link } from 'react-router-dom'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    supabase.from('posts').select('*').order('date', { ascending: false }).then(({ data }) => setPosts(data || []))
  }, [])

  return (
    <div className="container py-12">
      <h1 className="heading text-3xl mb-6">All Posts</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {posts.map(p => (
          <Link to={`/post/${p.id}`} key={p.id} className="group card overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img src={publicUrl(p.hero_image_path)} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-neutral-600">
                {p.date && <span className="badge bg-black/80">{new Date(p.date).toLocaleDateString()}</span>}
                {p.location_name && <span className="badge bg-accent text-black">{p.location_name}</span>}
              </div>
              <h3 className="mt-2 font-semibold">{p.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
