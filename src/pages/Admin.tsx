import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="container py-16 max-w-md">
        <h1 className="heading text-3xl mb-4">Admin Login</h1>
        <p className="mb-4 text-sm text-neutral-600">Enter your email to receive a magic link.</p>
        <form onSubmit={async e => { e.preventDefault(); await supabase.auth.signInWithOtp({ email }); alert('Check your email for a login link.')}}>
          <input className="w-full border rounded-lg px-4 py-2 mb-3" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn w-full" type="submit">Send Magic Link</button>
        </form>
      </div>
    )
  }

  return <Editor />
}

function Editor() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')
  const [hero, setHero] = useState<File | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const [saving, setSaving] = useState(false)

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="heading text-3xl mb-6">New Post</h1>
      <form className="grid gap-4" onSubmit={async e => {
        e.preventDefault(); setSaving(true)
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) throw new Error('Not authenticated')

          let heroPath: string | null = null
          if (hero) {
            const path = `${user.id}/${date || new Date().toISOString().slice(0,10)}/${hero.name}`
            const { error } = await supabase.storage.from('trip-media').upload(path, hero, { upsert: true })
            if (error) throw error
            heroPath = path
          }

          const { data: post, error: postErr } = await supabase
            .from('posts')
            .insert([{ title, content, location_name: location, date: date || null, hero_image_path: heroPath, visibility: 'public' }])
            .select()
            .single()
          if (postErr) throw postErr

          if (files && files.length) {
            for (const f of Array.from(files)) {
              const path = `${user.id}/${date || new Date().toISOString().slice(0,10)}/${f.name}`
              const { error } = await supabase.storage.from('trip-media').upload(path, f, { upsert: true })
              if (!error) {
                await supabase.from('media').insert([{ post_id: post.id, storage_path: path, mime_type: f.type }])
              }
            }
          }

          alert('Post published!')
          setTitle(''); setDate(''); setLocation(''); setContent(''); setHero(null); (document.getElementById('files') as HTMLInputElement).value = ''
        } catch (err: any) {
          alert(err.message)
        } finally { setSaving(false) }
      }}>
        <input className="border rounded-lg px-4 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border rounded-lg px-4 py-2" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <input className="border rounded-lg px-4 py-2" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        </div>
        <textarea className="border rounded-lg px-4 py-2 h-40" placeholder="Story (Markdown supported)" value={content} onChange={e=>setContent(e.target.value)} />
        <div>
          <label className="block text-sm mb-1">Hero image</label>
          <input type="file" accept="image/*" onChange={e=>setHero(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Gallery (multiple)</label>
          <input id="files" type="file" accept="image/*,video/*" multiple onChange={e=>setFiles(e.target.files)} />
        </div>
        <button className="btn" disabled={saving}>{saving ? 'Publishing…' : 'Publish'}</button>
      </form>
    </div>
  )
}
