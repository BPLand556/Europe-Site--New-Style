import { useEffect, useState } from 'react'
import { supabase, publicUrl } from '../lib/supabase'
import type { Post } from '../types'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    supabase.from('posts').select('*').order('date', { ascending: false }).limit(9).then(({ data }) => setPosts(data || []))
  }, [])

  return (
    <div className="container py-16">
      <section className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="heading text-4xl md:text-5xl">Europe Journey</h1>
        <p className="mt-3 text-neutral-600">Following our three-month adventure, one post at a time.</p>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading text-2xl">Our Journey</h2>
          <Link to="/blog" className="btn btn-outline">View All Posts →</Link>
        </div>
        {posts.length === 0 ? (
          <div className="card p-12 text-center text-neutral-500">No posts yet. Come back soon!</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {posts.slice(0, 6).map(p => (
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
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading text-2xl">Latest Updates</h2>
          <Link to="/blog" className="btn btn-outline">View All Posts →</Link>
        </div>
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
                {p.content && <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{p.content}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
