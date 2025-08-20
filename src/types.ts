export type Post = {
  id: string
  title: string
  content: string | null
  location_name: string | null
  date: string | null
  start_date: string | null
  end_date: string | null
  hero_image_path: string | null
  visibility: 'public' | 'private'
  created_at: string
}

export type Media = {
  id: string
  post_id: string
  storage_path: string
  mime_type: string | null
  created_at: string
}
