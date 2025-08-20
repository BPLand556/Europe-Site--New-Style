import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, publicUrl } from '../lib/supabase'
import type { Post, Media } from '../types'
import ReactMarkdown from 'react-markdown'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [media, setMedia] = useState<Media[]>([])

  useEffect(() => {
    if (!id) return
    supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => setPost(data as any))
    supabase.from('media').select('*').eq('post_id', id).order('created_at', { ascending: true }).then(({ data }) => setMedia(data || []))
  }, [id])

  if (!post) return <div className="container py-12">Loading…</div>

  return (
    <article className="container max-w-3xl py-12">
      {post.hero_image_path && (
        <img src={publicUrl(post.hero_image_path)} alt={post.title} className="w-full rounded-2xl mb-6" />
      )}
      <div className="flex items-center gap-2 text-xs text-neutral-600">
        {post.date && <span className="badge bg-black/80">{new Date(post.date).toLocaleDateString()}</span>}
        {post.location_name && <span className="badge bg-accent text-black">{post.location_name}</span>}
      </div>
      <h1 className="heading text-3xl mt-2 mb-4">{post.title}</h1>
      {post.content && <div className="prose max-w-none"><ReactMarkdown>{post.content}</ReactMarkdown></div>}

      {media.length > 0 && (
        <section className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {media.map(m => (
            <img key={m.id} src={publicUrl(m.storage_path)} alt="" className="w-full rounded-xl" />
          ))}
        </section>
      )}

      <div className="mt-10">
        <Link to="/blog" className="btn btn-outline">← Back to all posts</Link>
      </div>
    </article>
  )
}
